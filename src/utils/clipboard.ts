/**
 * Safe clipboard copy utility with legacy execCommand('copy') fallback
 * for restricted environments (iframes, non-HTTPS, or permission blocks).
 */
export function copyToClipboard(text: string): boolean {
  if (!text) return false;

  let success = false;

  // Attempt modern navigator.clipboard API
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopyToClipboard(text);
      });
      success = true;
    } catch (e) {
      success = fallbackCopyToClipboard(text);
    }
  } else {
    success = fallbackCopyToClipboard(text);
  }

  return success;
}

function fallbackCopyToClipboard(text: string): boolean {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Position fixed off-screen to avoid scrolling page
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const copied = document.execCommand('copy');
    document.body.removeChild(textArea);
    return copied;
  } catch (err) {
    console.error('Fallback copy error:', err);
    return false;
  }
}
