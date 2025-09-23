export interface PostcodeResponse {
  status: "match" | "no_match";
  error?: string;
  input?: string;
  match_type?: "unit_postcode" | "postcode_sector" | "postcode_district" | "postcode_area";
  data?: PostcodeData;
  copyright?: string[];
}

export interface PostcodeData {
  postcode?: string;
  status?: "live" | "terminated";
  usertype?: "small" | "large";
  easting?: number;
  northing?: number;
  positional_quality_indicator?: number;
  country?: string;
  latitude?: string;
  longitude?: string;
  postcode_no_space?: string;
  postcode_fixed_width_seven?: string;
  postcode_fixed_width_eight?: string;
  postcode_area?: string;
  postcode_district?: string;
  postcode_sector?: string;
  outcode?: string;
  incode?: string;
}

export async function fetchPostcode(postcode: string): Promise<PostcodeResponse> {
  const response = await fetch(`http://api.getthedata.com/postcode/${postcode}`);
  const json = await response.json();
  return json;
}
