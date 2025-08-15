import { getPriceByCountry } from "@/lib/pricing";
import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const geo = geolocation(request);
  const countryCode = geo?.country || "default";

  const priceDetails = getPriceByCountry(countryCode);

  return NextResponse.json({ priceDetails }, { status: 200 });
}
