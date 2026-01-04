import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto mt-6 md:mt-10 flex flex-col lg:flex-row px-4 sm:px-6 pb-16 gap-10">
      <aside className="w-full lg:w-1/3 flex flex-col items-center text-center gap-3">
        <div className="w-32 h-32 rounded-full skeleton" />
        <div className="h-4 w-32 skeleton" />
        <div className="h-3 w-40 skeleton" />
      </aside>
      <section className="w-full lg:w-2/3 lg:ml-12">
        <div className="flex space-x-2 mb-4">
          <div className="h-10 w-28 skeleton rounded-md" />
          <div className="h-10 w-32 skeleton rounded-md" />
        </div>
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <div className="h-4 w-44 skeleton" />
          <div className="h-3 w-full skeleton" />
          <div className="h-3 w-5/6 skeleton" />
          <div className="h-3 w-4/6 skeleton" />
          <div className="h-3 w-1/2 skeleton" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="h-10 skeleton rounded" />
            <div className="h-10 skeleton rounded" />
            <div className="h-10 skeleton rounded" />
            <div className="h-10 skeleton rounded" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSkeleton;
