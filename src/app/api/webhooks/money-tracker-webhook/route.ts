import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/services/email.service";

export async function POST(request: Request) {
  const requestBody = await request.json();
  const headers = request.headers;
  const secretHash = process.env.FLUTTERWAVE_SECRET_HASH_KEY;

  // ✅ Step 1: Verify webhook signature
  const signature = headers.get("verif-hash");
  if (!signature || signature !== secretHash) {
    return NextResponse.json(
      { message: "This request isn't from Flutterwave" },
      { status: 401 }
    );
  }

  try {
    const transactionId = requestBody?.data?.id;
    if (!transactionId) {
      return NextResponse.json(
        { message: "Transaction ID missing in webhook payload" },
        { status: 400 }
      );
    }

    // ✅ Step 2: Verify transaction with Flutterwave API
    const transactionData = await verifyTransaction(transactionId);

    if (!transactionData || transactionData?.data?.status !== "successful") {
      return NextResponse.json(
        { message: "Transaction not successful" },
        { status: 400 }
      );
    }

    // ✅ Step 3: Send congratulatory email to user
    const customerEmail = transactionData?.data?.meta?.email;
    const amount = transactionData?.data?.amount;

    const trackerURL =
      "https://docs.google.com/spreadsheets/d/1TuJ5mcUom32cu0tF86rzausmsIVA1F_Q42ILrPsR_jM/edit?usp=sharing";
    const YOUTUBE_TUTORIAL_LINK = "https://youtu.be/e2avV3gkcVA";

    if (customerEmail) {
      const primaryColor = "#1e90ff"; // sky blue
      const secondaryColor = "#10b981"; // Soft green
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              background-color: #f9f9f9; 
              padding: 20px; 
              margin: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #fff; 
              padding: 30px; 
              border: 1px solid #eee; 
              border-radius: 12px; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 20px; 
              color: ${primaryColor}; 
              text-align: center;
              border-bottom: 2px solid ${secondaryColor};
              padding-bottom: 15px;
            }
            .success-badge {
              background: ${secondaryColor};
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: bold;
              display: inline-block;
              margin-bottom: 20px;
            }
            .transaction-details {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;
              border-left: 4px solid ${secondaryColor};
            }
            .section { 
              margin-bottom: 20px; 
            }
            .label { 
              font-weight: bold; 
              display: inline-block; 
              width: 150px; 
              color: ${primaryColor}; 
            }
            .steps-section {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 8px;
              margin: 25px 0;
            }
            .steps-title {
              color: ${primaryColor};
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .steps-list {
              margin: 15px 0;
              padding-left: 0;
            }
            .steps-list li {
              margin-bottom: 10px;
              padding-left: 25px;
              position: relative;
            }
            .steps-list li::before {
              content: "✓";
              position: absolute;
              left: 0;
              color: ${secondaryColor};
              font-weight: bold;
            }
            .download-section {
              text-align: center;
              margin: 30px 0;
              padding: 25px;
              background: #fff;
              border: 2px solid ${secondaryColor};
              border-radius: 8px;
            }
            .button { 
              display: inline-block; 
              background: ${primaryColor}; 
              color: white !important; 
              padding: 15px 30px; 
              border-radius: 8px; 
              text-decoration: none; 
              font-weight: bold; 
              margin: 10px;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background: ${secondaryColor};
            }
            .button.secondary {
              background: ${secondaryColor};
            }
            .button.secondary:hover {
              background: #059669;
            }
            .video-section {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
              border: 1px solid #e5e7eb;
            }
            .important-note {
              background: #fef3c7;
              border: 1px solid #f59e0b;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
            }
            .important-note strong {
              color: #92400e;
            }
            .benefits {
              margin: 20px 0;
            }
            .benefits h3 {
              color: ${primaryColor};
              margin-bottom: 10px;
            }
            .benefits ul {
              list-style: none;
              padding-left: 0;
            }
            .benefits li {
              padding: 5px 0;
              padding-left: 20px;
              position: relative;
            }
            .benefits li::before {
              content: "💰";
              position: absolute;
              left: 0;
            }
            .footer { 
              font-size: 12px; 
              color: #777; 
              margin-top: 30px; 
              text-align: center; 
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
            .support-info {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">🎉 Payment Successful - Welcome to Financial Freedom!</div>
            
            <div class="success-badge">✅ PAYMENT CONFIRMED</div>
            
            <div class="transaction-details">
              <div class="section"><span class="label">Amount Paid:</span> ₦${amount}</div>
              <div class="section"><span class="label">Transaction Ref:</span> ${transactionData.data.tx_ref}</div>
              <div class="section"><span class="label">Status:</span> <span style="color: ${secondaryColor}; font-weight: bold;">Successful</span></div>
            </div>

            <p>Congratulations! Your payment was successful. Thank you for trusting <strong>FinanceWithAnne</strong>.</p>
            
            <div class="download-section">
              <h2 style="color: ${primaryColor}; margin-bottom: 15px;">🎯 Your Complete Money Tracker is Ready!</h2>
              <p style="margin-bottom: 20px;">Click the button below to access your Money Tracker template:</p>
              <a href="${trackerURL}" class="button">📊 Download Money Tracker</a>
            </div>

            <div class="steps-section">
              <div class="steps-title">📋 How to Get Started (Takes 5 Minutes):</div>
              <ol class="steps-list">
                <li>Click the download button above to open your Money Tracker</li>
                <li>Click "File" → "Make a Copy" to save it to your Google Drive</li>
                <li>Start entering your daily income and expenses</li>
                <li>Watch your financial clarity improve day by day</li>
                <li>Use the insights to make smarter money decisions</li>
              </ol>
            </div>

            <div class="important-note">
              <strong>⚠️ Important:</strong> Make sure to create your own copy of the Google Sheet so you can edit it. The original link is view-only for security purposes.
            </div>

            <div class="video-section">
              <h3 style="color: ${primaryColor};">📺 Step-by-Step Video Tutorial</h3>
              <p>Watch our comprehensive guide to maximize your Money Tracker:</p>
              <a href="${YOUTUBE_TUTORIAL_LINK}" class="button secondary">🎥 Watch Tutorial Video</a>
            </div>

            <div class="benefits">
              <h3>What You'll Achieve with Your Money Tracker:</h3>
              <ul>
                <li>Find your "money leaks" within the first week</li>
                <li>Discover money you didn't know you had</li>
                <li>Make smarter spending decisions automatically</li>
                <li>See exactly how much you can save each month</li>
                <li>Build wealth through better money management</li>
              </ul>
            </div>

            <div class="support-info">
              <strong>Need Help?</strong><br>
              If you have any questions or need assistance, reply to this email or contact us at ${process.env.ANNE_CONTACT_EMAIL}
            </div>

            <div class="footer">
              This message was sent by FinanceWithAnne.<br>
              Thank you for choosing us for your financial journey! 🚀
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: customerEmail,
        subject: "🎉 Payment Successful - Your Money Tracker is Ready!",
        text: `Congratulations! Your payment of ₦${amount} was successful. Transaction Ref: ${transactionData.data.tx_ref}. Download your Money Tracker here: ${trackerURL} and watch the tutorial: ${YOUTUBE_TUTORIAL_LINK}`,
        html: htmlContent,
      });

      console.log("email - amount", { customerEmail, amount });
    }

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function verifyTransaction(transactionId: number) {
  const res = await fetch(
    `${
      process.env.FLUTTERWAVE_API_URL || "https://api.flutterwave.com/v3"
    }/transactions/${transactionId}/verify`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to verify transaction:", res.statusText);
    return null;
  }

  return res.json();
}
