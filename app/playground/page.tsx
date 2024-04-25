"use client";

import { createRoom, getCookie } from "@/actions/user-action";
import { saveUser } from "@/redux/slices/user-slices";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import icon from "@/public/fifaIcon.svg";
import { UserButton, useUser } from "@clerk/nextjs";

const RoomPage = () => {
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const [roomId, setRoomId] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  /// FETCHING COOKIE USING SERVER ACTION
  useEffect(() => {
    async function existingCookie() {
      const response = await getCookie().then((data) => {
        setLoggedUser((prevLoggedUser: any) => {
          console.log("save data", prevLoggedUser); // Access previous state
          return data; // Return new state
        });
      });
    }

    existingCookie();
  }, []);

  useEffect(() => {
    if (!isSignedIn) {
      router.push(`/`);
    }
  }, [user]);

  // Creating room and playground dynamically
  async function createRoomHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission

    if (!roomId) {
      // Handle empty room ID case
      console.error("Please enter a room ID");
      return;
    }

    const formData = new FormData();
    formData.set("rid", roomId); // Set room ID in FormData

    try {
      formData.set("uid", loggedUser?.id); // Add user ID if available
      console.log(formData);

      const response = await createRoom(formData).then((data) => {
        console.log(data);
        router.push(`/playground/${data?.roomID}`);
      });
    } catch (error) {
      // Handle errors during room creation
      console.error("Error creating room:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <div className="absolute top-0 left-0 m-2">
            <Image
              src={icon} // Replace with your SVG icon
              alt="Football icon"
              width={80}
              height={50}
            />
          </div>

          <div>
            <UserButton />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Join the Room
          </h2>
        </div>
        <form onSubmit={createRoomHandler}>
          <div className="mb-6">
            <label
              htmlFor="rid"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Room ID
            </label>
            <Input
              placeholder="Enter room number"
              name="rid"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <Button type="primary" htmlType="submit">
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RoomPage;
