import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  timeSlot: string;
  guestCount: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Edge function called - send-booking-email");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();
    console.log("Received booking data:", JSON.stringify(bookingData, null, 2));


    // Check if RESEND_API_KEY is configured
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    console.log("RESEND_API_KEY is configured");
    
    const { name, email, phone, eventType, eventDate, timeSlot, guestCount, message } = bookingData;

    // Email HTML template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          New Event Booking - Happy Function Hall
        </h1>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #4CAF50; margin-top: 0;">Booking Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Event Type:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${eventType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Event Date:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${eventDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Time Slot:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Guest Count:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${guestCount}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Special Requirements:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          This is an automated email from Happy Function Hall booking system.
        </p>
      </div>
    `;

    // Send confirmation email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "Happy Function Hall <onboarding@resend.dev>",
      to: [email],
      subject: "Booking Confirmation - Happy Function Hall",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4CAF50;">Thank you for your booking!</h1>
          <p>Dear ${name},</p>
          <p>We have received your booking request for <strong>${eventType}</strong> on <strong>${eventDate}</strong>.</p>
          <p>Our team will contact you shortly at <strong>${phone}</strong> to confirm the details and discuss further arrangements.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Booking Summary:</h3>
            <p><strong>Event Type:</strong> ${eventType}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Time:</strong> ${timeSlot}</p>
            <p><strong>Guests:</strong> ${guestCount}</p>
          </div>
          
          <p>If you have any questions, please contact us at:</p>
          <p><strong>Phone:</strong> 9677352267</p>
          
          <p style="margin-top: 30px;">Best regards,<br>Happy Function Hall Team</p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Happy Function Hall <onboarding@resend.dev>",
      to: ["somesh.kandregula@gmail.com"],
      subject: `New Booking: ${eventType} on ${eventDate}`,
      html: emailHTML,
    });

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail: customerEmailResponse,
        adminEmail: adminEmailResponse 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
