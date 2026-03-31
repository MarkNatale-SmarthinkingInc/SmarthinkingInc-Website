import { type NextRequest, NextResponse } from "next/server";

// Using Mailchimp Marketing API
import mailchimp from "@mailchimp/mailchimp_marketing";

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us1", "us2", etc.
});

interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      companyName,
      email,
      phone,
      message,
    }: ContactFormData = await request.json();

    // Validate required fields
    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        { error: "First name is required" },
        { status: 400 }
      );
    }

    if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json(
        { error: "Last name is required" },
        { status: 400 }
      );
    }

    if (!companyName || typeof companyName !== "string") {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
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
      !process.env.MAILCHIMP_CONTACT_FORM_AUDIENCE_ID
    ) {
      console.error("Missing Mailchimp configuration for contact forms");
      return NextResponse.json(
        { error: "Contact service is temporarily unavailable" },
        { status: 500 }
      );
    }

    const contactListId = process.env.MAILCHIMP_CONTACT_FORM_AUDIENCE_ID;

    // Add contact submission to Mailchimp audience
    const response = await mailchimp.lists.addListMember(contactListId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        COMPANY: companyName,
        PHONE: phone,
        MESSAGE: message,
        SOURCE: "Website Contact Form",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Contact form submitted successfully! We'll get back to you soon.",
        contact_id: (response as any).id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact form submission error:", error);

    // Handle Mailchimp specific errors
    if (error.response?.body?.title === "Member Exists") {
      // For contact forms, we might want to update the existing member
      // or just return success since they've already contacted us
      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you for your message! We have your details on file and will respond soon.",
        },
        { status: 200 }
      );
    }

    if (error.response?.body?.title === "Invalid Resource") {
      return NextResponse.json(
        { error: "Please check that all information is correct and try again" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
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
