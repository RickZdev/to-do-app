import { useTaskStore } from "@/store";

const useFilteredTasks = (category?: string) => {
  const { tasks } = useTaskStore();

  const recentTasks = [...tasks].reverse().slice(0, 5);

  const tasksByCategory = tasks
    .filter((task) => task.category === category)
    .reverse();

  const tasksCompleted = tasks
    .filter((task) => task.completed === true)
    .reverse();

  const tasksNotComplete = tasksByCategory.filter(
    (task) => task.completed === false
  );

  return {
    recentTasks,
    tasksByCategory,
    tasksCompleted,
    tasksNotComplete,
  };
};

export default useFilteredTasks;
