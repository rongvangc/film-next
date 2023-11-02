"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useAppStore from "@/stores/app";

import {
  AlignStartHorizontal,
  Clapperboard,
  Columns,
  Library,
  ListStart,
  ListVideo,
  Tv,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "./search";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { showMobileDraw, setShowMobileDraw } = useAppStore();

  return (
    <div
      className={cn(
        "col-span-4 bg-white rounded-xl h-full w-full py-0 md:p-4 left-0 top-0 md:col-span-1 absolute md:relative z-20 activeDraw md:visible md:translate-x-0",
        showMobileDraw ? "active" : ""
      )}
    >
      <div className={cn("pb-12", className)}>
        <div className="space-y-4">
          <div className="px-3 py-2">
            <i
              className="cursor-pointer md:hidden float-right mb-2"
              onClick={() => setShowMobileDraw(false)}
            >
              <Columns />
            </i>
            <div className="space-y-1 mb-2">
              <Search />
            </div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight flex items-center justify-between">
              Discover
            </h2>
            <div className="space-y-1">
              <Link href="/discover/movie">
                <Button
                  variant={
                    pathname === "/discover/movie" || pathname === "/"
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => setShowMobileDraw(false)}
                  className="w-full justify-start"
                >
                  <Clapperboard className="mr-2 h-4 w-4" />
                  Movie
                </Button>
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Movies
            </h2>
            <div className="space-y-1">
              <Link href="/movie/now_playing">
                <Button
                  variant={
                    pathname === "/movie/now_playing" ? "secondary" : "ghost"
                  }
                  onClick={() => setShowMobileDraw(false)}
                  className="w-full justify-start"
                >
                  <ListVideo className="mr-2 h-4 w-4" />
                  Now Playing
                </Button>
              </Link>
              <Link href="/movie/popular">
                <Button
                  variant={
                    pathname === "/movie/popular" ? "secondary" : "ghost"
                  }
                  onClick={() => setShowMobileDraw(false)}
                  className="w-full justify-start"
                >
                  <Library className="mr-2 h-4 w-4" />
                  Popular
                </Button>
              </Link>
              <Link href="/movie/top_rated">
                <Button
                  variant={
                    pathname === "/movie/top_rated" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setShowMobileDraw(false)}
                  active={pathname === "/movie/top_rated" ? "ghost" : "none"}
                >
                  <AlignStartHorizontal className="mr-2 h-4 w-4" />
                  Top Rated
                </Button>
              </Link>
              <Link href="/movie/upcoming">
                <Button
                  variant={
                    pathname === "/movie/upcoming" ? "secondary" : "ghost"
                  }
                  onClick={() => setShowMobileDraw(false)}
                  className="w-full justify-start"
                >
                  <ListStart className="mr-2 h-4 w-4" />
                  Upcoming
                </Button>
              </Link>
            </div>
          </div>
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              TV series
            </h2>
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-1 p-2">
                <Link href="/tv/airing_today">
                  <Button
                    variant={
                      pathname === "/tv/airing_today" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setShowMobileDraw(false)}
                  >
                    <Tv className="mr-2 h-4 w-4" />
                    Airing Today
                  </Button>
                </Link>
                <Link href="/tv/popular">
                  <Button
                    variant={pathname === "/tv/popular" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setShowMobileDraw(false)}
                  >
                    <Tv className="mr-2 h-4 w-4" />
                    Popular
                  </Button>
                </Link>
                <Link href="/tv/top_rated">
                  <Button
                    variant={
                      pathname === "/tv/top_rated" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setShowMobileDraw(false)}
                  >
                    <Tv className="mr-2 h-4 w-4" />
                    Top Rated
                  </Button>
                </Link>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
