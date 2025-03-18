import { useQuery } from "@tanstack/react-query";

import { getTasks } from "@/services";

const useGenerateTask = () => {
  const tasks = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    enabled: false,
  });

  return tasks;
};

export default useGenerateTask;
