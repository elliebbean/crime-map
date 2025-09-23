import { useQuery } from "@tanstack/react-query";
import { fetchCrimeCategories } from "../api/crimesApi";

export default function useCrimeCategoriesQuery() {
  return useQuery({
    queryKey: ["crime-categories"],
    queryFn: async () => {
      const response = await fetchCrimeCategories();
      const categories: { [index: string]: string } = {};

      for (const category of response) {
        categories[category.url] = category.name;
      }

      return categories;
    },
  });
}
