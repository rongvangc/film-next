"use client"; // Error components must be Client Components

import Image from "next/image";
import { useEffect } from "react";
import SomethingWrongJPG from "@/assets/images/something-wrong.jpg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { push } = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Image
        src={SomethingWrongJPG}
        width={400}
        height={400}
        alt="Something wrong"
      />
      <h2 className="font-bold text-2xl mb-4">Something went wrong!</h2>
      <div className="flex center items-center gap-2">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        or
        <Button
          variant="outline"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => push("/")
          }
        >
          Go to home
        </Button>
      </div>
    </div>
  );
}
