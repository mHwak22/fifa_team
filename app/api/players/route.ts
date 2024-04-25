"use server";

// pages/api/players.js
import axios, { AxiosResponse } from "axios";

export async function GET(req: Request): Promise<Response> {
  try {
    const response: AxiosResponse<any, any> = await axios.get(
      "https://drop-api.ea.com/rating/fc-24?limit=100"
    );

    // console.log(response.data.items);

    return new Response(JSON.stringify(response.data.items));
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return new Response();
  }
}
