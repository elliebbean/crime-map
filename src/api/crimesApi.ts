export interface CrimeData {
  id: number;
  category: string;
  persistent_id: string;
  month: string;
  location_type: "Force" | "BTP";
  location_subtype: string;
  location: {
    latitude: string;
    longitude: string;
    street: {
      id: number;
      name: string;
    };
  };
  context: string;
  outcome_status: CrimeOutcomeStatus | null;
}

export interface CrimeOutcomeStatus {
  category: string;
  date: string;
}

export interface CrimeCategoryData {
  url: string;
  name: string;
}

export async function fetchCrimes(
  latitude: number,
  longitude: number,
  year?: number,
  month?: number
): Promise<CrimeData[]> {
  let url = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`;

  if (year && month) {
    url += `&date=${year}-${month}`;
  }
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function fetchCrimeCategories(): Promise<CrimeCategoryData[]> {
  const response = await fetch(`https://data.police.uk/api/crime-categories`);
  const json = await response.json();
  return json;
}
