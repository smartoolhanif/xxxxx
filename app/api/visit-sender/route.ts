import { type NextRequest, NextResponse } from "next/server"

// API endpoint for sending visits
const VISIT_API = "https://hanif-visit.vercel.app"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const uid = searchParams.get("uid")
    const serverName = searchParams.get("server_name") || "bd" // Only BD server is supported

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

    // Only allow BD server for visits
    if (serverName.toLowerCase() !== "bd") {
      return NextResponse.json(
        {
          status: "error",
          message: "Visit sender only supports Bangladesh (BD) server",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    // Construct the API URL with the player ID
    const apiUrl = `${VISIT_API}/${uid}`

    console.log("Sending visits to:", apiUrl)

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
      success: data.success || false,
      totalTimeTakes: data.total_time_takes || 0,
      totalViewsSent: data.total_views_sent || 0,
      uid: uid
    }

    return NextResponse.json({
      status: "success",
      message: "Visits sent successfully",
      data: formattedData,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error sending visits:", error)

    return NextResponse.json(
      {
        status: "error",
        message: `Failed to send visits: ${error.message}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
} 