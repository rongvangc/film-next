import { AxiosError } from "axios";
import axiosClient from "./config";

type GetDiscoverResponse = {
  data: MovieList;
};

export const getDiscover = async (
  keyUrl: string,
  page?: number
): Promise<any> => {
  try {
    const { data } = await axiosClient.get<null, GetDiscoverResponse>(
      `/discover/${keyUrl}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errMsg = err.response?.data?.status_message as string;
    throw new Error(errMsg);
  }
};
