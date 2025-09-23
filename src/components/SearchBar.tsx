import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export default function SearchBar() {
  const navigate = useNavigate();

  const params = useParams();
  const [search, setSearch] = useState(params.search ?? "");
  const [year, setYear] = useState(params.year ?? new Date().getFullYear().toString());
  const [month, setMonth] = useState(params.month ?? "latest");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!search) {
      navigate("/");
    } else if (month == "latest") {
      navigate(`/latest/${encodeURIComponent(search)}`);
    } else {
      navigate(`/${year}/${month}/${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="p-2 bg-gray-200 border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <form className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-baseline" onSubmit={onSubmit}>
        <h1 className="hidden sm:inline text-blue-900 text-xl font-bold dark:text-blue-400">CrimeMap</h1>

        <Input
          className="grow sm:max-w-md"
          type="text"
          placeholder="Search for multiple postcodes, separated by commas"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          aria-label="Postcodes"
        />

        <div className="flex grow gap-2 justify-between">
          <Button type="submit" variant="accent">
            Search
          </Button>

          <div className="flex gap-2">
            <Select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
              aria-label="Month"
            >
              <option value="latest">Latest</option>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </Select>

            {month != "latest" && (
              <Input
                type="number"
                min="2022"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                aria-label="Year"
              />
            )}

            <Button type="button">Theme</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
