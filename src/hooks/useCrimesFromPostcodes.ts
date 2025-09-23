import { useMemo } from "react";
import type { CrimeData } from "../api/crimesApi";
import useCrimeQueries from "./useCrimeQueries";
import usePostcodeQueries from "./usePostcodeQueries";

export default function useCrimesFromPostcodes(postcodes: string[], year?: number, month?: number) {
  const postcodeQueries = usePostcodeQueries(postcodes);

  const postcodeLocations = useMemo(() => {
    return postcodeQueries.data
      .map((result): [number, number] | undefined => {
        if (
          result &&
          result.status == "match" &&
          result.match_type == "unit_postcode" &&
          result.data?.latitude &&
          result.data?.longitude
        ) {
          const latitude = parseFloat(result.data.latitude);
          const longitude = parseFloat(result.data.longitude);

          if (isFinite(latitude) && isFinite(longitude)) {
            return [latitude, longitude];
          }
        }
      })
      .filter((location) => location !== undefined);
  }, [postcodeQueries.data]);

  const crimeQueries = useCrimeQueries(postcodeLocations, year, month);

  const isPending = postcodeQueries.isPending || crimeQueries.isPending;

  // Get all unique crimes from the query responses, as overlapping areas may include duplicates
  const crimes = useMemo(() => {
    // Wait until all queries are done
    if (isPending) {
      return [];
    }

    const crimeIds = new Set<number>();
    const crimes: CrimeData[] = [];

    for (const result of crimeQueries.data) {
      if (result) {
        for (const crime of result) {
          if (!crimeIds.has(crime.id)) {
            crimes.push(crime);
            crimeIds.add(crime.id);
          }
        }
      }
    }

    return crimes;
  }, [crimeQueries.data, isPending]);

  return {
    crimes,
    isPending,
  };
}
