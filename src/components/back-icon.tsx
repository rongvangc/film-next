"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackIcon = () => {
  const { back } = useRouter();

  return (
    <i
      className="absolute -left-4 -top-4 z-[2] bg-orange-500 border-2 border-orange-700 rounded-full w-10 h-10 flex items-center justify-center shadow cursor-pointer"
      onClick={() => back()}
    >
      <ArrowBigLeft size={24} color="white" />
    </i>
  );
};
