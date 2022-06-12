import React from "react";

const Avatar: React.FC = () => {
  return (
    <div className="mb-4 flex items-center">
      <div className="mr-2">
        <div className="h-6 w-6 rounded-full bg-slate-500"></div>
      </div>
      <div className="flex flex-col text-sm text-gray-500">
        <span>username</span>
        <span>view profile &rarr;</span>
      </div>
    </div>
  );
};

export default Avatar;
