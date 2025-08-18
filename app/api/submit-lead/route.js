import dbConnect from "@/lib/mongodb";
import Lead from "@/modules/Lead";

export async function POST(req) {
  try {
    await dbConnect(); // connect to DB

    const body = await req.json();
    const { name, email, phone, service, jobDetails } = body;

    if (!name || !email || !phone || !service || !jobDetails) {
      return new Response(
        JSON.stringify({ message: "Missing fields" }),
        { status: 400 }
      );
    }

    const lead = new Lead({ name, email, phone, jobDetails, service });
    await lead.save();

    return new Response(
      JSON.stringify({ message: "Lead saved successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Server error" }),
      { status: 500 }
    );
  }
}
