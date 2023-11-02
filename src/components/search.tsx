import NotFoundSVG from "@/assets/images/not-found.svg";
import UnknownSVG from "@/assets/images/unknown.svg";
import { useDebounce } from "@/hooks/useDebounce";
import { mergeUrlImg } from "@/lib/common";
import { cn } from "@/lib/utils";
import { searchMovie } from "@/services/movie";
import useAppStore from "@/stores/app";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { Command, CommandInput, CommandList } from "./ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export const Search = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchMovieList>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const observer = useRef<IntersectionObserver | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const prevDebouncedValue = useRef<string | null>(null);
  const { push } = useRouter();
  const { setShowMobileDraw } = useAppStore();

  const handleGoTodetail = (id: number) => {
    push(`/detail/${id}`);
    setOpen(false);
    setShowMobileDraw(false);
  };

  const handleCloseSearch = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setSearchValue("");
      setSearchData({
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
      prevDebouncedValue.current = null;
    }
  };

  const searchMovieApi = useCallback(async (keyword: string, page: number) => {
    try {
      const searchData = await searchMovie(keyword, page);
      setSearchData((prev) => {
        return {
          ...prev,
          page,
          total_results: searchData?.total_results,
          total_pages: searchData?.total_pages,
          results: [...(prev?.results ?? []), ...(searchData?.results ?? [])],
        };
      });
    } catch (error) {
      setSearchData({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      });
    }
  }, []);

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
    setSearchData({
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    });
    searchRef?.current?.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const lastItemElementRef = useCallback(
    (index: number) => (node: any) => {
      if (searchData?.results?.length === index + 1) return;
      if (searchData?.page >= searchData?.total_pages) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (entry.isIntersecting) {
            searchMovieApi(debouncedValue, searchData?.page + 1);
          }
        },
        {
          threshold: 0.3,
          rootMargin: "0px",
        }
      );
      if (node) observer.current.observe(node);
    },
    [
      debouncedValue,
      searchData?.page,
      searchData?.results?.length,
      searchData?.total_pages,
      searchMovieApi,
    ]
  );

  useEffect(() => {
    if (debouncedValue && debouncedValue !== prevDebouncedValue.current) {
      searchMovieApi(debouncedValue, 1);
      prevDebouncedValue.current = debouncedValue;
    }
  }, [debouncedValue, searchMovieApi]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground h-9"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">Search film...</span>
        <kbd className="pointer-events-none absolute right-1.5 dark:text-white top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>F
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={handleCloseSearch}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Search your film</DialogTitle>
            <DialogDescription>
              Please write down your keywork to searching film
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput
              value={searchValue}
              onValueChange={handleSearchValue}
              placeholder="Search film..."
            />
            <CommandList className="overflow-hidden">
              {searchData?.results?.length ? (
                <CardContent
                  ref={searchRef}
                  className="h-72 w-full py-4 px-2 overflow-x-hidden"
                >
                  {searchData?.results?.map((movie, index) => (
                    <div
                      key={movie?.id}
                      id={
                        searchData?.results?.length === index + 1
                          ? "isLast"
                          : ""
                      }
                      className={`flex items-start px-2 mb-3 cursor-pointer`}
                      onClick={() => handleGoTodetail(movie?.id)}
                      ref={
                        searchData?.results?.length === index + 1
                          ? lastItemElementRef(index + 1)
                          : null
                      }
                    >
                      <Image
                        width={70}
                        height={70}
                        loading="lazy"
                        src={
                          movie?.poster_path
                            ? mergeUrlImg(movie?.poster_path)
                            : UnknownSVG
                        }
                        className="h-auto w-auto max-w-[96px] min-h-36 rounded-md object-cover"
                        alt={movie?.title ?? ""}
                      />
                      <div className="py-1 px-4">
                        <p className="font-medium text-lg">{movie?.title}</p>
                        <em className="truncate-3-line">{movie?.overview}</em>
                      </div>
                    </div>
                  ))}
                </CardContent>
              ) : (
                <div className="flex py-7 flex-col h-full items-center justify-center">
                  <Image
                    src={NotFoundSVG}
                    alt="not-found"
                    width={150}
                    height={150}
                  />
                  <p className="text-lg font-medium -mt-11">Not found</p>
                </div>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};
