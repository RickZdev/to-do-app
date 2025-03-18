import { CATEGORY } from "@/constants";

type TaskItemType = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  completed: boolean;
};

export default TaskItemType;
