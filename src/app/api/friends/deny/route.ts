import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("unauthorized", { status: 401 });
    }

    const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

    await db.srem(`user:${session.user.id}:incoming_friendRequests`, idToDeny);

    return new Response("Ok");
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return new Response("invalid request payload", { status: 422 });
    }

    return new Response("invalid request", { status: 400 });
  }
}
