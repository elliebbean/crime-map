import { useParams } from "react-router";
import useCrimesFromPostcodes from "../hooks/useCrimesFromPostcodes";
import { getValidPostcodes } from "../utils/postcode";

export default function Dashboard() {
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
      <p>{message}</p>
      <p>{crimes.length} crimes found</p>
    </>
  );
}
