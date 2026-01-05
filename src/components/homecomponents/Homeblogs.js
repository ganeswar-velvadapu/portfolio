import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import blogData from "../../../public/blogData.json";

const Homeblogs = () => {
  const latestBlogs = blogData.blogs.slice(0, 3);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="md:flex-1 max-w-full lg:max-w-6xl w-full mx-auto ">
          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold tracking-tight mb-4 text-white text-center lg:text-left px-2">
            Blogs
          </h2>

          {/* Divider */}
          <div className="w-16 sm:w-20 h-1  mb-8 sm:mb-12 mx-auto lg:mx-0"></div>

          {/* Empty State (if no blogs) */}
          {latestBlogs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No Blogs yet
              </h3>
              <p className="text-gray-500">
                Check back soon for exciting Blogs!
              </p>
            </div>
          )}

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
            {latestBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-6 transition-all duration-300 group cursor-pointer"
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3">
                  <Calendar size={14} />
                  <span>{formatDate(blog.published_date)}</span>
                </div>

                {/* Blog Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors">
                  {blog.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 line-clamp-3">
                  {blog.shortDescription}
                </p>

                {/* Read More */}
                <div className="inline-flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                  Read More
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center lg:justify-start px-2">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-full text-sm sm:text-base md:text-lg font-medium text-white transition-all duration-300 group"
            >
              View All Blogs
              <ArrowRight
                size={18}
                className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeblogs;
