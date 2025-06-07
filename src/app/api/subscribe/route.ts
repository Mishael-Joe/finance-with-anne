import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_NEWSLETTER_API_KEY!,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [8],
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok) {
      const errorData = await brevoRes.json();
      return NextResponse.json({ error: errorData.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
