import { AxiosError } from "axios";
import axiosClient from "./config";

type GetMoviesResponse = {
  data: MovieList;
};

type GetMovieDetailResponse = {
  data: MovieDetail;
};

export const getMovies = async (keyUrl: string, page: number): Promise<any> => {
  try {
    const { data } = await axiosClient.get<null, GetMoviesResponse>(
      `/movie/${keyUrl}?language=en-US&page=${page ?? 1}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errMsg = err.response?.data?.status_message as string;
    throw new Error(errMsg);
  }
};

export const getMoviesDetail = async (id: number): Promise<any> => {
  try {
    const { data } = await axiosClient.get<null, GetMovieDetailResponse>(
      `/movie/${id}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errMsg = err.response?.data?.status_message as string;
    throw new Error(errMsg);
  }
};
