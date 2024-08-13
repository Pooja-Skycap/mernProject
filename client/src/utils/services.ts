import Axios, { AxiosResponse } from "axios";
const BASE_PATH = import.meta.env.VITE_BACKEND_BASE_URL;
import type { CreateEventData } from "../formvalidation/zod";
import { ResponseData } from "../Interfaces/usersInterface";

console.log("BASE_PATH-------", BASE_PATH);

const getApiPath = (endpoint: string) => BASE_PATH + endpoint;

export const getRequest = async (endpoint: string) => {
  try {
    const response = await Axios.get(getApiPath(endpoint));
    return response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      console.error("API request failed:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const postRequest = async (
  endpoint: string,
  body?: CreateEventData
): Promise<ResponseData> => {
  console.log("endpoint------------", getApiPath(endpoint));
  console.log("body------------", getConfigSetting());
  try {
    const response: AxiosResponse<ResponseData> = await Axios.post(
      getApiPath(endpoint),
      body,
      getConfigSetting()
    );
    console.log("response======>", response);
    return response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      console.error("API request failed:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

const getConfigSetting = () => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  return {
    headers: headers,
  };
};
