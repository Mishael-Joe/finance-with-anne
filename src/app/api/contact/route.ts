import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_NEWSLETTER_API_KEY! as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Finance with Anne", email: email },
        to: [{ email: "mishaeljoe55@gmail.com", name: "Admin" }],
        subject: "New Contact Message",
        htmlContent: `
          <h3>New Message from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      }),
    });

    if (!brevoRes.ok) throw new Error("Email not sent");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
