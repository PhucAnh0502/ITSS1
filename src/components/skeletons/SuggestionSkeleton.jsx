import React from "react";

const SuggestionSkeleton = () => {
  return (
    <div className="bg-gray-300/50 p-0 flex flex-col md:flex-row h-auto md:h-48 rounded shadow-sm overflow-hidden mb-4">
      <div className="w-full md:w-1/3 h-48 md:h-full skeleton" />
      <div className="flex-1 p-4 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          <div className="h-4 w-40 skeleton" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="h-3 w-52 skeleton" />
              <div className="h-3 w-44 skeleton" />
              <div className="h-3 w-36 skeleton" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-32 skeleton" />
              <div className="h-3 w-28 skeleton" />
              <div className="h-3 w-24 skeleton" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="h-8 w-24 rounded-full skeleton" />
        </div>
      </div>
    </div>
  );
};

export default SuggestionSkeleton;
