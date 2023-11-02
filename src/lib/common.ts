export const mappingHeading = (keyUrl: string) => {
  switch (keyUrl) {
    case "now_playing":
      return "Now Playing";
    case "popular":
      return "Popular";
    case "top_rated":
      return "Top Rated";
    case "upcoming":
      return "Upcoming";
    case "movie":
      return "Discover Movies";
    case "airing_today":
      return "Airing Today";
    default:
      return "Unknow heading";
  }
};

export const mergeUrlImg = (keyUrl: string) => {
  if (!keyUrl) return "";
  return `${"http://image.tmdb.org/t/p/w500"}${keyUrl}`;
};

export const randomColorTailWind = () => {
  const colorsClass = [
    "bg-rose-300 text-rose-700",
    "bg-purple-300 text-purple-700",
    "bg-violet-300 text-violet-700",
    "bg-blue-300 text-blue-700",
    "bg-emerald-300 text-elue-700",
    "bg-orange-300 text-orange-700",
    "bg-gray-300 text-gray-700",
  ];
  return colorsClass[Math.floor(Math.random() * colorsClass.length)];
};

export const rankByPoint = (point: number) => {
  if (point > 7) {
    return "!border-green-500";
  }
  if (point > 5 && point <= 7) {
    return "!border-yellow-500";
  }
  return "!border-red-500";
};

export const PUBLIC_PATH: string[] = ["/login", "/register-success"];

export const checkPublicPath = (pathname: string) =>
  PUBLIC_PATH.some((url: string) => url.includes(pathname));
