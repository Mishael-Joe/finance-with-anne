import { IpApiResponse } from "@/types/ip-detection-types";

/**
 * Fetches the user's IP-based geographical location data from ipapi.co.
 * This function is designed for client-side execution.
 *
 * @returns A Promise that resolves to the IP API response data, or null if an error occurs.
 */
export async function getIpLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      console.error("Failed to fetch IP location:", response.statusText);
      return null;
    }
    const data = (await response.json()) as IpApiResponse;
    return data;
  } catch (error) {
    console.error("Error fetching IP location:", error);
    return null;
  }
}
