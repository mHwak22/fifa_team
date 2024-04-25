"use server";

// pages/api/getPlayerbyId.js
import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";

interface RequestQuery {
  pid: number; // Define the type of pid property
}

export async function GET(req: NextRequest): Promise<Response> {
  const pid = req.nextUrl.searchParams.get("pid") as unknown as RequestQuery;
  try {
    const response: AxiosResponse<any, any> = await axios.get(
      `https://drop-api.ea.com/rating/fc-24?player=${pid}`
    );

    // console.log(response.data.items);

    return new Response(JSON.stringify(response.data.items));
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return new Response();
  }
}
