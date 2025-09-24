import { Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import CrimeStats from "../components/CrimeStats";
import MapView from "../components/MapView";
import SearchBar from "../components/SearchBar";
import useCrimesFromPostcodes from "../hooks/useCrimesFromPostcodes";
import { getValidPostcodes } from "../utils/postcode";

const maxPostcodes = 20;

export default function Dashboard() {
  const mapRef = useRef<LeafletMap>(null);
  const params = useParams();

  const postcodes = getValidPostcodes(params.search ?? "");

  let year: number | undefined;
  let month: number | undefined;

  if (params.year && params.month) {
    const parsedYear = parseInt(params.year);
    const parsedMonth = parseInt(params.month);

    if (isFinite(parsedYear) && isFinite(parsedMonth)) {
      year = parsedYear;
      month = parsedMonth;
    }
  }

  const tooManyPostcodes = postcodes.length > maxPostcodes;

  const { crimes, isPending } = useCrimesFromPostcodes(tooManyPostcodes ? [] : postcodes, year, month);

  // Recenter the map when the data changes
  useEffect(() => {
    const map = mapRef.current;
    const latitudes = crimes.map((crime) => parseFloat(crime.location.latitude));
    const longitudes = crimes.map((crime) => parseFloat(crime.location.longitude));

    const minLatitude = Math.min(...latitudes);
    const minLongitude = Math.min(...longitudes);
    const maxLatitude = Math.max(...latitudes);
    const maxLongitude = Math.max(...longitudes);

    if (
      !isPending &&
      map &&
      isFinite(minLatitude) &&
      isFinite(maxLatitude) &&
      isFinite(minLongitude) &&
      isFinite(maxLongitude)
    ) {
      map.fitBounds([
        [minLatitude, minLongitude],
        [maxLatitude, maxLongitude],
      ]);
    }
  }, [crimes, isPending]);

  let message: string | undefined;

  if (isPending) {
    message = "Loading...";
  } else if (tooManyPostcodes) {
    message = `Please enter a maximum of ${maxPostcodes} postcodes`;
  } else if (params.search && postcodes.length === 0) {
    message = "No valid postcodes found in your search query";
  } else if (params.search && crimes.length === 0) {
    message = "No crimes found";
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <SearchBar />
        <div className="grow relative">
          <div className="absolute flex flex-col w-full h-full">
            {message && (
              <div className="z-10 self-center bg-gray-50 border border-gray-300 text-gray-900 text-lg m-4 p-2 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
                {message}
              </div>
            )}

            {!isPending && crimes.length > 0 && (
              <CrimeStats className="z-10 self-stretch shrink max-w-sm overflow-y-auto m-2 shadow-lg" crimes={crimes} />
            )}
          </div>

          <MapView ref={mapRef} crimes={crimes} />
        </div>
      </div>
    </>
  );
}
