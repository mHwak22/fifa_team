"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { Liveblocks } from "@liveblocks/node";

// const liveblocks = new Liveblocks({
//   secret:
//     "sk_dev_TgtzSx0OXV0uJtPl-bMKDiCOvpTdQPwKkp_8wXhzUNBpRSq25rCytax6mk1ozH7J",
// });

export async function createUser(emailAddress: string, firstName: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: emailAddress },
    });

    if (existingUser) {
      cookies().set("user", JSON.stringify(existingUser), { secure: true });
      // console.log("Existing user:", existingUser);
      // console.log("Cookie set for existing user:", cookies().get("user"));
      return existingUser;
    }

    let user: Prisma.UserCreateInput;

    user = {
      username: firstName,
      email: emailAddress,
    };

    const newUser = await prisma.user.create({
      data: user,
    });
    console.log("New user created:", newUser);

    if (newUser) {
      cookies().set("user", JSON.stringify(newUser), { secure: true });
      // console.log("Cookie set for new user:", cookies().get("user"));

      return newUser;
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

//Will fetch the existing cookie
export async function getCookie() {
  try {
    const existingCookieObj = await cookies().get("user");
    if (existingCookieObj) {
      const existingCookie = await existingCookieObj.value;
      // console.log("existingCookie:", existingCookie);
      // console.log("user cookie", JSON.parse(existingCookie));

      return JSON.parse(existingCookie);
    } else {
      console.log("No user cookie found.");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createRoom(data: FormData) {
  try {
    // console.log("createRoom", data);
    let uid = data.get("uid");
    let rid = data.get("rid");
    // const existingUser = await prisma.user.findUnique({
    //   where: { id: Number(uid) },
    // });

    // if (!existingUser) {
    //   return null;
    // }

    const existingRoom = await prisma.room.findUnique({
      where: { roomID: rid?.toString() },
    });

    let room: Prisma.RoomCreateInput;

    room = {
      roomID: rid?.toString(),
      roomName: "test",
    };

    if (existingRoom) {
      return existingRoom;
    } else {
      const newRoom = await prisma.room.create({
        data: room,
      });

      return newRoom;
    }
  } catch (error) {
    console.log(error);
  }
}
