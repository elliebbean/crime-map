import { Map as LeafletMap } from "leaflet";
import { useRef } from "react";
import { useParams } from "react-router";
import CrimeStats from "../components/CrimeStats";
import MapView from "../components/MapView";
import useCrimesFromPostcodes from "../hooks/useCrimesFromPostcodes";
import { getValidPostcodes } from "../utils/postcode";

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

  const { crimes, isPending } = useCrimesFromPostcodes(postcodes, year, month);

  let message: string | undefined;

  if (isPending) {
    message = "Loading...";
  } else if (params.search && postcodes.length === 0) {
    message = "No valid postcodes found in your search query";
  } else if (params.search && crimes.length === 0) {
    message = "No crimes found";
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <div className="grow">
          <div className="absolute flex flex-col w-full h-full">
            {message && (
              <div className="z-10 self-center bg-gray-50 border border-gray-300 text-gray-900 text-lg m-4 p-2 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
                {message}
              </div>
            )}

            {!isPending && crimes.length > 0 && (
              <div className="z-10 self-stretch shrink max-w-sm overflow-y-auto m-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200">
                <CrimeStats crimes={crimes} />
              </div>
            )}
          </div>

          <MapView ref={mapRef} crimes={crimes} />
        </div>
      </div>
    </>
  );
}
