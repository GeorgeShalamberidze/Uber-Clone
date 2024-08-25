import { neon } from "@neondatabase/serverless";

export async function POST(req: Request, res: Response) {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const { name, email, clerkId } = await req.json();

  if (!name || !email || !clerkId)
    Response.json({ error: "Missing required fields" }, { status: 400 });
  try {
    const response = await sql`
    INSERT INTO users(
      name,
      email,
      clerkId
    )
    VALUES(
      ${name},
      ${email},
      ${clerkId}
    )
  `;

    return new Response(JSON.stringify({ data: response, status: 201 }));
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
