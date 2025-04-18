import { type NextRequest, NextResponse } from "next/server"

// API endpoint for sending likes
const LIKE_API = "https://myapihanif.vercel.app/like"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const uid = searchParams.get("uid")
    const serverName = searchParams.get("server_name") || "ind" // Default to IND if not specified

    if (!uid) {
      return NextResponse.json(
        {
          status: "error",
          message: "Player UID is required",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Construct the API URL with the player ID and region
    const apiUrl = `${LIKE_API}?uid=${uid}&server_name=${serverName.toLowerCase()}`

    console.log("Sending likes to:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status code: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response received:", data)

    // Format the response data
    const formattedData = {
      status: data.status === 1 ? "success" : "error",
      nickname: data.PlayerNickname || "Unknown Player",
      uid: data.UID || uid,
      likesSent: data.LikesGivenByAPI || 0,
      likesBefore: data.LikesbeforeCommand || 0,
      likesAfter: data.LikesafterCommand || 0,
    }

    return NextResponse.json({
      status: "success",
      message: "Likes sent successfully",
      data: formattedData,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error sending likes:", error)

    return NextResponse.json(
      {
        status: "error",
        message: `Failed to send likes: ${error.message}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
} 