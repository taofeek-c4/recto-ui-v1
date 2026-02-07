import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      {/* 1. Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded-md animate-shimmer mb-2"></div>
        <div className="h-4 w-48 bg-gray-100 rounded-md animate-shimmer"></div>
      </div>

      {/* 2. Hero Card Skeleton */}
      <div className="w-full h-64 rounded-3xl p-10 mb-12 animate-shimmer-purple flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-white/20 rounded-md"></div>
          <div className="space-y-2">
            <div className="h-4 w-2/3 bg-white/10 rounded-md"></div>
            <div className="h-4 w-1/2 bg-white/10 rounded-md"></div>
          </div>
        </div>
        <div className="h-12 w-40 bg-white rounded-full"></div>
      </div>

      {/* 3. Grid Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded-md animate-shimmer"></div>
        <div className="h-4 w-24 bg-gray-100 rounded-md animate-shimmer"></div>
      </div>

      {/* 4. Project Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="space-y-4">
            {/* Image Placeholder */}
            <div className="aspect-square w-full bg-gray-200 rounded-2xl animate-shimmer"></div>
            {/* Text Placeholders */}
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-shimmer"></div>
              <div className="h-4 w-1/4 bg-gray-100 rounded-md animate-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
