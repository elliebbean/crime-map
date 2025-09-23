import { useQueries } from "@tanstack/react-query";
import { fetchCrimes } from "../api/crimesApi";

export default function useCrimeQueries(locations: [number, number][], year?: number, month?: number) {
  return useQueries({
    queries: locations.map(([latitude, longitude]) => {
      return {
        queryKey: ["crime", latitude, longitude, year, month],
        queryFn: () => {
          if (year && month) {
            return fetchCrimes(latitude, longitude, year, month);
          } else {
            return fetchCrimes(latitude, longitude);
          }
        },
      };
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
}
