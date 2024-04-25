"use server";

import { Liveblocks } from "@liveblocks/node";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import test from "node:test";
import { currentUser } from "@clerk/nextjs";

const API_KEY: string = process.env.LIVEBLOCKS_SECRET_KEY || "";
const liveblocks = new Liveblocks({
  secret: API_KEY,
});

// export async function POST(request: Request) {
//   // Get the current user from your database

//   const existingCookieObj = await cookies().get("user");

//   if (!existingCookieObj) {
//     return;
//     // return existingCookie;
//   }
//   const existingCookie = await existingCookieObj.value;
//   // console.log("existingCookie:", existingCookie);
//   // console.log("user cookie", JSON.parse(existingCookie));
//   const parsedCookie = JSON.parse(existingCookie);

//   const user: any = await prisma?.user.findUnique({
//     where: { id: parsedCookie?.id },
//   });

//   console.log("REQUEST", await request.json());

//   // Start an auth session inside your endpoint
//   const session = liveblocks.prepareSession(
//     user?.id.toString()

//     // Optional
//   );

//   // Identify the user and return the result
//   const { status, body } = await liveblocks.identifyUser({
//     userId: user?.id.toString(),
//     groupIds: [],
//   });
//   return new Response(body, { status });
// }

export async function POST(request: Request) {
  // Get the current user from your database
  const userName: any = await currentUser();

  const existingCookieObj = await cookies().get("user");

  if (!existingCookieObj) {
    return;
    // return existingCookie;
  }
  const existingCookie = await existingCookieObj.value;
  // console.log("existingCookie:", existingCookie);
  const parsedCookie = JSON.parse(existingCookie);
  console.log("user id", parsedCookie.id);

  const user: any = await prisma?.user.findUnique({
    where: { id: parsedCookie?.id },
  });

  const data = await request.json();

  console.log("REQUEST", data.room);

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user?.id.toString(),
    {
      userInfo: {
        name: userName?.firstName,
      },
    }
    // Optional
  );

  session.allow(data.room.toString(), session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
