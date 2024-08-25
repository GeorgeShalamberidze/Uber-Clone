import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const { name, email, clerkid } = await req.json();

  if (!name || !email || !clerkid)
    Response.json({ error: "Missing required fields" }, { status: 400 });
  try {
    const response = await sql`
    INSERT INTO users(
      name,
      email,
      clerkid
    )
    VALUES(
      ${name},
      ${email},
      ${clerkid}
    )
  `;

    return new Response(JSON.stringify({ data: response, status: 201 }));
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
