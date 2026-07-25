import React, { useState } from 'react';
import { blogPostsData } from '../data/blogData';
import { BlogPost } from '../types';
import { ArrowLeft, BookOpen, Clock, User, Share2, CheckCircle2 } from 'lucide-react';

interface BlogPageProps {
  selectedPostId?: string;
  onNavigate: (tab: string, param?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ selectedPostId, onNavigate }) => {
  const selectedPost = blogPostsData.find((p) => p.id === selectedPostId);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // If viewing a single blog article post
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pb-20">
        <div className="bg-white border-b border-[#E5E7EB] py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs font-bold text-[#F04D23] hover:underline flex items-center cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> All Savings Guides
            </button>
            <button
              onClick={handleShare}
              className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded flex items-center space-x-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-[#E5E7EB] space-y-6">
            
            <div className="space-y-2">
              <span className="bg-orange-50 text-[#F04D23] text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border border-[#E5E7EB]">
                {selectedPost.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center space-x-4 text-xs text-[#6B7280] font-medium pt-2">
                <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> {selectedPost.author}</span>
                <span>•</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {selectedPost.readTime}</span>
                <span>•</span>
                <span>Published {selectedPost.date}</span>
              </div>
            </div>

            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-80 object-cover rounded-lg border border-[#E5E7EB]"
            />

            <div
              className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />

            <div className="pt-8 border-t border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-[#10B981] font-bold uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Deal Hunter Guide</span>
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="bg-[#F04D23] text-white font-bold text-xs px-4 py-2 rounded-md cursor-pointer"
              >
                Start Saving Now
              </button>
            </div>

          </div>
        </article>
      </div>
    );
  }

  // Blog Directory view
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-50 border border-[#E5E7EB] rounded-lg text-[#F04D23]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">DealSaver Savings Guides</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mt-2">
            Smart shopping strategies, coupon stacking rules, store clearance schedules, and Google Ads Quality Score insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog-post', post.id)}
              className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:border-[#F04D23]/50 transition-colors cursor-pointer group flex flex-col justify-between"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-[#F04D23] uppercase tracking-wider mb-1">
                    {post.category} • {post.readTime}
                  </div>
                  <h2 className="font-bold text-[#1A1A1A] text-lg group-hover:text-[#F04D23] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
