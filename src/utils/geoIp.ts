/**
 * Geo-IP Detection & Conditional Outbound Routing Module
 */

let cachedCountryCode: string | null = null;

/**
 * Clean official brand domains for non-US visitors.
 */
export const CLEAN_BRAND_DOMAINS: Record<string, string> = {
  'dicks-sporting-goods': 'https://www.dickssportinggoods.com',
  'walmart': 'https://www.walmart.com',
  'nike': 'https://www.nike.com',
  'target': 'https://www.target.com',
  'amazon': 'https://www.amazon.com',
  'best-buy': 'https://www.bestbuy.com',
  'sephora': 'https://www.sephora.com',
  'uber-eats': 'https://www.ubereats.com',
  'doordash': 'https://www.doordash.com',
  'adidas': 'https://www.adidas.com',
  'home-depot': 'https://www.homedepot.com',
  'expedia': 'https://www.expedia.com',
  'lululemon': 'https://shop.lululemon.com',
};

/**
 * Pre-fetch visitor country code using CORS-friendly APIs on app start.
 * Caches country code in sessionStorage for instant synchronous lookup.
 */
export async function initGeoIp(): Promise<string> {
  // 1. Check in-memory cache
  if (cachedCountryCode) {
    return cachedCountryCode;
  }

  // 2. Check sessionStorage
  try {
    const stored = sessionStorage.getItem('geo_country_code');
    if (stored) {
      cachedCountryCode = stored;
      return stored;
    }
  } catch (e) {
    // ignore sessionStorage block
  }

  // 3. Primary API: Cloudflare Trace (extremely fast, CORS-friendly)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const text = await res.text();
      const match = text.match(/^loc=(.+)$/m);
      if (match && match[1]) {
        const country = match[1].trim().toUpperCase();
        setCachedCountry(country);
        return country;
      }
    }
  } catch (e) {
    // trace failed
  }

  // 4. Fallback API 1: ipwho.is
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://ipwho.is/', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        const country = String(data.country_code).trim().toUpperCase();
        setCachedCountry(country);
        return country;
      }
    }
  } catch (e) {
    // ipwho.is failed
  }

  // 5. Fallback API 2: ipapi.co
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        const country = String(data.country).trim().toUpperCase();
        setCachedCountry(country);
        return country;
      }
    }
  } catch (e) {
    // ipapi.co failed
  }

  // Default fallback if all fail: US
  const defaultCountry = 'US';
  setCachedCountry(defaultCountry);
  return defaultCountry;
}

function setCachedCountry(country: string) {
  cachedCountryCode = country;
  try {
    sessionStorage.setItem('geo_country_code', country);
  } catch (e) {
    // ignore
  }
}

/**
 * Synchronously retrieves visitor country code from memory or sessionStorage.
 * Default fallback is 'US'.
 */
export function getVisitorCountrySync(): string {
  if (cachedCountryCode) return cachedCountryCode;
  try {
    const stored = sessionStorage.getItem('geo_country_code');
    if (stored) {
      cachedCountryCode = stored;
      return stored;
    }
  } catch (e) {
    // ignore
  }
  return 'US';
}

/**
 * Returns conditional outbound URL based on visitor location:
 * - US visitor: Affiliate / Target URL
 * - Non-US visitor: Clean official brand domain
 */
export function getConditionalOutboundUrl(
  storeId: string,
  affiliateUrl: string
): string {
  const country = getVisitorCountrySync();

  // If visitor is from US, return target affiliate link
  if (country === 'US') {
    return affiliateUrl;
  }

  // Non-US visitor: return clean official brand domain if available
  if (CLEAN_BRAND_DOMAINS[storeId]) {
    return CLEAN_BRAND_DOMAINS[storeId];
  }

  // If affiliate link contains affiliate wrapper, strip down or default to clean domain
  try {
    const urlObj = new URL(affiliateUrl);
    if (
      urlObj.hostname.includes('10offpromocodes.com') ||
      urlObj.hostname.includes('ltk.com')
    ) {
      return `https://www.${storeId.replace(/-/g, '')}.com`;
    }
  } catch (e) {
    // ignore URL parse errors
  }

  return affiliateUrl;
}
