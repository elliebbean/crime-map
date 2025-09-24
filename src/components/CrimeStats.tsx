import clsx from "clsx";
import { useMemo } from "react";
import type { CrimeData } from "../api/crimesApi";
import useTranslateCrimeCategory from "../hooks/useTranslateCrimeCategory";
import StatsTable from "./StatsTable";

interface CrimeStatsProps {
  crimes: CrimeData[];
  className?: string;
}

export default function CrimeStats({ crimes, className }: CrimeStatsProps) {
  const translateCrimeCategory = useTranslateCrimeCategory();

  const crimesByCategory = useMemo(() => {
    const result = new Map<string, number>();

    for (const crime of crimes) {
      const count = result.get(crime.category) ?? 0;
      result.set(crime.category, count + 1);
    }

    return result;
  }, [crimes]);

  const crimesByOutcome = useMemo(() => {
    const result = new Map<string, number>();

    for (const crime of crimes) {
      const outcome = crime.outcome_status?.category ?? "None";
      const count = result.get(outcome) ?? 0;
      result.set(outcome, count + 1);
    }

    return result;
  }, [crimes]);

  return (
    <details
      className={clsx(
        "overflow-clip bg-gray-100 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200",
        className
      )}
    >
      <summary className="cursor-pointer p-2 font-bold text-xl sm:text-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 hover:dark:bg-gray-600">
        {crimes.length} crimes
      </summary>

      <div className="flex flex-col p-2 gap-4">
        <StatsTable
          headers={["Category", "Crimes"]}
          rows={[...crimesByCategory.entries()].map(([category, count]) => [
            translateCrimeCategory(category),
            count.toString(),
          ])}
        />

        <StatsTable
          headers={["Outcome", "Crimes"]}
          rows={[...crimesByOutcome.entries()].map(([outcome, count]) => [outcome, count.toString()])}
        />
      </div>
    </details>
  );
}
