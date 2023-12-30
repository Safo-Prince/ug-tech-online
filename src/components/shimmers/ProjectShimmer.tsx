import * as React from "react";


const ProjectShimmer = () => {
  return (
    <div className=" w-full sm:w-80 xl:w-96  h-96  border rounded-md p-3   shadow-sm space-y-2 hover:scale-95 transition-all cursor-pointer">
      <div className="h-1/2 bg-slate-200 rounded-md"></div>
      <div>
        <h1 className="h-6 bg-slate-200 rounded w-1/3"></h1>
        <h2 className="h-6 bg-slate-200 rounded w-1/2 mt-2"></h2>
      </div>
      <div>
        <p className="h-14 bg-slate-200 rounded w-3/4 mt-2"></p>
        <button className="bg-[#153D6D] text-white py-1 px-3  rounded-md text-sm mt-2">
          Details
        </button>
      </div>
    </div>
  );
};

export default ProjectShimmer;
