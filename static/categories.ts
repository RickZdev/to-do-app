import { CategoryItemType } from "@/types";
import { IMAGES } from "@/utils";

const categories: CategoryItemType[] = [
  {
    id: 0,
    categoryName: "General",
    categoryDescription: "Tasks about General Tasks",
    categoryImage: IMAGES.CATEGORIES.GENERAL,
  },
  {
    id: 1,
    categoryName: "Projects",
    categoryDescription: "Tasks about projects",
    categoryImage: IMAGES.CATEGORIES.PROJECTS,
  },
  {
    id: 2,
    categoryName: "Study",
    categoryDescription: "Tasks about study",
    categoryImage: IMAGES.CATEGORIES.STUDY,
  },
];

export default categories;
