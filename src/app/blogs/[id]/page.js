'use client'
import React, { useEffect, useState } from 'react';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogData from '../../../../public/blogData.json';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import remarkGfm from 'remark-gfm';

const BlogPost = ({ params }) => {
  const blog = blogData.blogs.find(async (b) => await b.id === params.id);
  const [content, setContent] = useState('');

  if (!blog) {
    notFound();
  }

  useEffect(() => {
    if (blog.markdown) {
      fetch(blog.markdown)
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch((err) => console.error('Error loading markdown:', err));
    }
  }, [blog.markdown]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-12 sm:py-16 md:py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>

        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(blog.published_date)}</span>
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

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8 sm:mb-12"></div>

        {/* Updated prose classes with more specific configuration */}
        <div className="prose prose-invert prose-lg prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-gray-200 prose-pre:bg-zinc-800 prose-blockquote:text-gray-400 max-w-none">
          {content ? (
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-white" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-white" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-semibold mt-3 mb-2 text-white" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-300 leading-7 mb-4" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 text-gray-300" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 text-gray-300" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 underline" {...props} />,
                code: ({ node, inline, ...props }) =>
                  inline ? (
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-gray-200" {...props} />
                  ) : (
                    <code {...props} />
                  ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4" {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border border-gray-700 rounded-lg" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-white/5" {...props} />,
                tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-700" {...props} />,
                tr: ({ node, ...props }) => <tr className="border-b border-gray-700" {...props} />,
                th: ({ node, ...props }) => (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-gray-700 last:border-r-0" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700 last:border-r-0" {...props} />
                ),

              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-400">Loading content...</p>
          )}
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-12 sm:mt-16 mb-8"></div>
      </article>
    </div>
  );
};

export default BlogPost;