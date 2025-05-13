"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import useApi from "@/hooks/useAPI";
import { ScheduleEntry } from "../api/schedule/route";

export default function SchedulePage() {  

  const { data, callAPI } = useApi();

  const entries: ScheduleEntry[] = data || [];

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
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead className="text-right">Cycle</TableHead>
              <TableHead className="text-right">Subject</TableHead>
              <TableHead className="text-right">Teacher</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.idx}>
                <TableCell>{entry.Room}</TableCell>
                <TableCell>{entry.Hours}</TableCell>
                <TableCell className="text-right">{entry.Cycle}</TableCell>
                <TableCell className="text-right">{entry.Subject}</TableCell>
                <TableCell className="text-right">{entry.Teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </div>

    </>
  );
}