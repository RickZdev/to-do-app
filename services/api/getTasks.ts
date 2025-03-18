import { axios } from "../axios-config";
import { TaskItemType } from "@/types";

const getTasks = async (): Promise<{
  message: string;
  data: TaskItemType[] | undefined;
  error: string;
}> => {
  try {
    const response = await axios.get("/todos");
    const limitedData = response.data.slice(0, 3);
    return { message: "success", data: limitedData, error: "" };
  } catch (error: any) {
    return {
      message: "error",
      data: undefined,
      error: error.response.data.error,
    };
  }
};

export default getTasks;
