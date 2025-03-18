import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TaskItemType } from "@/types";

type TaskStore = {
  tasks: TaskItemType[];
  selectedTasks: string[];
  addTask: (task: TaskItemType) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  toggleTaskSelection: (id: string) => void;
  deleteSelectedTasks: () => void;
  completeSelectedTasks: () => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      selectedTasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      completeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: true } : task
          ),
        })),
      toggleTaskSelection: (id) =>
        set((state) => ({
          selectedTasks: state.selectedTasks.includes(id)
            ? state.selectedTasks.filter((taskId) => taskId !== id)
            : [...state.selectedTasks, id],
        })),
      deleteSelectedTasks: () =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => !state.selectedTasks.includes(task.id)
          ),
          selectedTasks: [],
        })),
      completeSelectedTasks: () =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            state.selectedTasks.includes(task.id)
              ? { ...task, completed: true }
              : task
          ),
          selectedTasks: [],
        })),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
