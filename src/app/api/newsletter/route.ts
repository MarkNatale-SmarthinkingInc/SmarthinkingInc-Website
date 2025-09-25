import { type NextRequest, NextResponse } from "next/server";

// Using Mailchimp Marketing API
import mailchimp from "@mailchimp/mailchimp_marketing";

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us1", "us2", etc.
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_SERVER_PREFIX ||
      !process.env.MAILCHIMP_AUDIENCE_ID
    ) {
      console.error("Missing Mailchimp configuration");
      return NextResponse.json(
        { error: "Newsletter service is temporarily unavailable" },
        { status: 500 }
      );
    }

    const listId = process.env.MAILCHIMP_AUDIENCE_ID;

    // Add member to Mailchimp audience
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        SIGNUP: "Website Newsletter",
        OPTIN_TIME: new Date().toISOString(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter!",
        subscriber_id: (response as any).id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);

    // Handle Mailchimp specific errors
    if (error.response?.body?.title === "Member Exists") {
      return NextResponse.json(
        { error: "This email is already subscribed to our newsletter" },
        { status: 409 }
      );
    }

    if (error.response?.body?.title === "Invalid Resource") {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter. Please try again." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
