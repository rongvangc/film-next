"use client";

import useAppStore from "@/stores/app";
import { Columns, Popcorn } from "lucide-react";
import Link from "next/link";

export function Menu() {
  const { setShowMobileDraw } = useAppStore();

  return (
    <div className="rounded-none border-b border-none px-2 py-2 lg:px-4 relative">
      <div className="flex items-center gap-2 cursor-pointer md:justify-start justify-center">
        <i
          className="md:hidden absolute left-4"
          onClick={() => setShowMobileDraw(true)}
        >
          <Columns />
        </i>
        <Link href="/discover/movie">
          <div className="flex items-center gap-2 cursor-pointer">
            <Popcorn className="text" />
            <p className="font-medium">Moviee</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
