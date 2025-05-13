"use client";

import useInitialAuthCheck from "@/hooks/useInitialAuthCheck";
import useApi from "@/hooks/useAPI";


export default function SchedulePage() {  

  const { data, callAPI } = useApi();

  return (
    <> 

      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <button
          onClick={() => {
            callAPI("/api/schedule");
          }}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
        >
          Fetch Schedule
        </button>
        {data && (
          <div
            className="mt-4 p-4 border border-gray-300 rounded"
            dangerouslySetInnerHTML={{ __html: data.schedule }}
          />
        )}
      </div>

    </>
  );
}