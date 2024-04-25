"use client";

import { createUser } from "@/actions/user-action";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "@/redux/slices/user-slices";
import { useRouter } from "next/navigation";
import Image from "next/image";
import cover from "@/public/cover.jpg";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const newUser = useSelector((state: any) => {
    state.user;
  });
  // console.log("Redux state", newUser);
  //fixed

  useEffect(() => {
    async function generateUser() {
      if (user) {
        const { emailAddress, firstName } = user?.externalAccounts[0];
        const response = await createUser(emailAddress, firstName).then(
          (data) => {
            dispatch(saveUser(data));
            console.log("Redux state", data);
          }
        );
        // console.log("server response", response);
      }
    }
    generateUser();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header component (optional) */}
      {/* <Header /> */}

      {/* Hero section */}
      <div className="relative flex items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
        <div className="absolute "></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                FIFA: The World's Game
              </h1>
              <p className="mt-6 text-gray-500 sm:text-lg">
                Experience the beautiful game like never before.
              </p>

              {!isSignedIn && (
                <SignInButton mode="modal">
                  <Button
                    className="mt-8 inline-flex items-center px-5 py-2.5 text-center font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                    type="primary"
                  >
                    Log in to Ultimate Team
                  </Button>
                </SignInButton>
              )}
              {isSignedIn && (
                <Button
                  className="mt-8 inline-flex items-center px-5 py-2.5 text-center font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                  type="primary"
                >
                  <Link href="/playground">Enter Utlimate Team</Link>
                </Button>
              )}
            </div>
            <div className="flex justify-center">
              <Image
                src={cover} // Replace with your image path
                alt="FIFA action photo"
                width={1024}
                height={768}
                // layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features section (optional) */}
      {/* <Features /> */}

      {/* Footer component (optional) */}
      {/* <Footer /> */}

      <div className="absolute top-0 right-0 m-2">
        <UserButton />
      </div>
    </div>
  );
}
