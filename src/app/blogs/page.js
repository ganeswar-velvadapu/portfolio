'use client'
import React from 'react';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import blogData from '../../../public/blogData.json';



const BlogsPage = () => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 mt-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-white text-center lg:text-left">
            All Blogs
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-400 mx-auto lg:mx-0"></div>
        </div>

        <div>
          {/* Blogs Grid */}
          {!blogData.blogs || blogData.blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="bg-white/5 border border-white/10 rounded-lg p-12 max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Blogs Available
                </h3>
                <p className="text-gray-400 text-sm">
                  Check back soon for new content and updates.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogData.blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {blog.shortDescription}
                  </p>
                  {blog.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;