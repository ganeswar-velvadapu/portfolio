'use client'
import React from 'react';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogData from '../../../../public/blogData.json';



const BlogPost = ({ params }) => {

  const blog = blogData.blogs.find((b) => b.id === params.id);

  if (!blog) {
    notFound();
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-12 sm:py-16 md:py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>

        {/* Blog Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(blog.date)}</span>
            </div>
            {blog.author && <span>By {blog.author}</span>}
          </div>

          {blog.tags && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-gray-400" />
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8 sm:mb-12"></div>

        {/* Blog Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {blog.description}
          </div>
        </div>

        {/* Footer Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-12 sm:mt-16 mb-8"></div>

       
      </article>
    </div>
  );
};

export default BlogPost;