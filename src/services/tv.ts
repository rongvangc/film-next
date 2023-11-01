import { AxiosError } from "axios";
import axiosClient from "./config";

type GetTvsResponse = {
  data: MovieList;
};

type GetTvsDetailResponse = {
  data: TvDetail;
};

export const getTvs = async (keyUrl: string, page?: number): Promise<any> => {
  try {
    const { data } = await axiosClient.get<null, GetTvsResponse>(
      `/tv/${keyUrl}?language=en-US&page=${page ?? 1}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errMsg = err.response?.data?.status_message as string;
    throw new Error(errMsg);
  }
};

export const getTvsDetail = async (id: number): Promise<any> => {
  try {
    const { data } = await axiosClient.get<null, GetTvsDetailResponse>(
      `/tv/${id}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errMsg = err.response?.data?.status_message as string;
    throw new Error(errMsg);
  }
};
