import { mergeUrlImg, randomColorTailWind, rankByPoint } from "@/lib/common";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  BookA,
  CalendarRange,
  CircleDollarSign,
  Link,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import UnknownSVG from "@/assets/images/unknown.svg";

type TvDetailProps = {
  tvData: TvDetail;
} & React.HTMLAttributes<HTMLDivElement>;

export const TvDetail = ({ tvData, className }: TvDetailProps) => {
  const heading = tvData?.name || tvData?.original_name;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div
        className={cn(
          "mb-3 rounded-md min-w-96 h-min relative col-span-2 md:col-span-1",
          className
        )}
      >
        <Image
          src={
            tvData?.poster_path ? mergeUrlImg(tvData?.poster_path) : UnknownSVG
          }
          alt={heading}
          width={400}
          height={600}
          loading="lazy"
          className={cn(
            "h-auto w-full object-cover rounded-md overflow-hidden",
            "aspect-[3/4]"
          )}
        />
        {!!tvData?.vote_average && (
          <span
            className={cn(
              rankByPoint(Math.round(tvData?.vote_average)),
              "baged-point-detail"
            )}
          >
            {Math.round(tvData?.vote_average)} &#9734;
          </span>
        )}
      </div>

      <div className="py-4 px-6 col-span-2">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          {tvData?.name}
          {tvData?.adult && (
            <span className="text-sm rounded-sm bg-red-300 text-red-700 px-1 font-semibold capitalize">
              18+
            </span>
          )}
          <a href={tvData?.homepage} target="_blank">
            <Link size={14} />
          </a>
        </h3>

        <em>{tvData?.tagline}</em>

        <Separator className="my-4" />

        <div className="mb-2 flex justify-start items-center gap-2 text-xs font-medium">
          <p>Genres:</p>
          {tvData?.genres?.map((genre) => (
            <span
              key={genre?.id}
              className={cn(randomColorTailWind(), "mr-1 rounded-sm py-1 px-2")}
            >
              {genre?.name}
            </span>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <CalendarRange />
          </i>
          Release date:
          <p>{tvData?.first_air_date}</p>
        </div>

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <BookA />
          </i>
          Languages:
          {tvData?.spoken_languages?.map((item, index) => (
            <span
              key={item?.iso_639_1}
              className="text-sm rounded-sm bg-white text-slate-900 font-semibold capitalize"
            >
              {item?.name}
              {index !== tvData.spoken_languages.length - 1 && ","}
            </span>
          ))}
        </div>

        <div className="mb-2 flex justify-start items-center gap-2 text-sm font-medium">
          <i>
            <BarChart2 />
          </i>
          Status:
          <p
            className={`${
              tvData?.status === "Released"
                ? "bg-green-300 text-green-700"
                : "bg-orange-300 text-orange-700"
            } py-0.5 px-2 rounded-sm`}
          >
            {tvData?.status}
          </p>
        </div>

        <Separator className="my-4" />

        <div className="mb-2">
          <h3 className="text-lg font-bold mb-4">Overview</h3>
          <p>{tvData?.overview}</p>
        </div>

        <Separator className="my-4" />

        <div className="mb-2">
          <h3 className="text-lg font-bold mb-4">Production Companies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {tvData?.production_companies?.map((company) => (
              <div
                key={company?.id}
                className="flex flex-col justify-center items-center text-center"
              >
                <div className="h-32 w-32 relative">
                  <Image
                    src={
                      company?.logo_path
                        ? mergeUrlImg(company?.logo_path)
                        : UnknownSVG
                    }
                    fill
                    alt={company?.name}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-medium">{company?.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-3 py-4">
        <h3 className="text-2xl font-bold mb-4 text-center">Seasons</h3>

        <Separator className="my-4" />

        <div className="mb-2 grid grid-cols-2 md:grid-cols-5 gap-6">
          {tvData?.seasons?.map((season) => (
            <div key={season?.id} className="text-center relative mb-5">
              <span className="z-10 h-fit text-sm shadow-sm bg-orange-300 text-orange-700 font-medium absolute -top-1 -left-1 py-0.5 pl-2">
                {season.name}
                <em className="bg-green-300 text-green-700 bottom-1 border-red-900 py-0.5 px-2 right-0 ml-2 h-full">
                  {season?.episode_count > 1
                    ? `${season?.episode_count} eps`
                    : "1 ep"}
                </em>
              </span>
              <div className="h-64 w-full relative rounded-md overflow-hidden">
                <Image
                  src={
                    season?.poster_path
                      ? mergeUrlImg(season?.poster_path)
                      : UnknownSVG
                  }
                  fill
                  alt={season?.name}
                  className="object-cover w-full h-auto"
                />
              </div>
              <h4 className="font-medium">{season?.name}</h4>
              <p className="text-sm">{season?.overview}</p>
              <em className="text-sm">{season?.air_date}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
