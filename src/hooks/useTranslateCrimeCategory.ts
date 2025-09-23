import { useCallback } from "react";
import useCrimeCategoriesQuery from "./useCrimeCategoriesQuery";

export default function useTranslateCrimeCategory() {
  const crimeCategoriesQuery = useCrimeCategoriesQuery();

  return useCallback(
    (category: string) => {
      if (!crimeCategoriesQuery.isPending && !crimeCategoriesQuery.isError && crimeCategoriesQuery.data) {
        return crimeCategoriesQuery.data[category] ?? category;
      } else {
        return category;
      }
    },
    [crimeCategoriesQuery.isPending, crimeCategoriesQuery.isError, crimeCategoriesQuery.data]
  );
}
