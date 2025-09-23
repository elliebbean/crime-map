import { useQueries } from "@tanstack/react-query";
import { fetchPostcode } from "../api/postcodeApi";

export default function usePostcodeQueries(postcodes: string[]) {
  return useQueries({
    queries: postcodes.map((postcode) => {
      return {
        queryKey: ["postcode", postcode],
        queryFn: () => fetchPostcode(postcode),
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
