import { useState } from "react";

import { TaskItemType } from "@/types";

const useSearchQuery = ({ tasks }: { tasks: TaskItemType[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchableList = searchQuery.trim()
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  return {
    searchQuery,
    setSearchQuery,
    searchableList,
  };
};

export default useSearchQuery;
