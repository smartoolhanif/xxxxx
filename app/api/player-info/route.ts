import { type NextRequest, NextResponse } from "next/server"

// API endpoints for player information
const PLAYER_INFO_API = "https://ariiflexlabs-playerinfo-icxc.onrender.com/ff_info"
const ARIFLEXLABS_API = "https://ariiflexlabs-playerinfo-icxc.onrender.com/ff_info" // Using same endpoint as primary API since it works

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const playerId = searchParams.get("id")
    const region = searchParams.get("region") || "ind" // Default to IND region if not specified

    if (!playerId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Player ID is required",
          credits: "TEAM-AKIRU",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      )
    }

    // Construct the API URL with the player ID and region
    const apiUrl = `${PLAYER_INFO_API}?uid=${playerId}&region=${region.toLowerCase()}`

    console.log("Fetching player info from:", apiUrl)

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
    console.log("API response received:", Object.keys(data))

    // Transform the API response to our expected format
    const playerData = {
      basic_info: {
        id: playerId,
        name: data.AccountInfo?.AccountName || data.captainBasicInfo?.nickname || "Unknown Player",
        level: data.AccountInfo?.AccountLevel || data.captainBasicInfo?.level || null,
        likes: data.AccountInfo?.AccountLikes || data.captainBasicInfo?.liked || null,
        server: data.AccountInfo?.AccountRegion || data.captainBasicInfo?.region || region.toUpperCase(),
        bio: data.socialinfo?.AccountSignature || null,
        booyah_pass_level: null, // Not available in this API
        account_created: data.AccountInfo?.AccountCreateTime
          ? new Date(Number(data.AccountInfo.AccountCreateTime) * 1000).toISOString().split("T")[0]
          : null,
        language: data.socialinfo?.AccountLanguage?.replace("Language_", "") || null,
        preferred_mode: data.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || null,
        credit_score: data.creditScoreInfo?.creditScore || null,
        rank: {
          br: {
            current: data.AccountInfo?.BrRankPoint || data.captainBasicInfo?.rankingPoints || null,
            max_rank: data.AccountInfo?.BrMaxRank || data.captainBasicInfo?.maxRank || null,
            show: data.AccountInfo?.ShowBrRank || data.captainBasicInfo?.showBrRank || false,
          },
          cs: {
            current: data.AccountInfo?.CsRankPoint || data.captainBasicInfo?.csRankingPoints || null,
            max_rank: data.AccountInfo?.CsMaxRank || data.captainBasicInfo?.csMaxRank || null,
            show: data.AccountInfo?.ShowCsRank || data.captainBasicInfo?.showCsRank || false,
          },
        },
        last_login: data.AccountInfo?.AccountLastLogin
          ? new Date(Number(data.AccountInfo.AccountLastLogin) * 1000).toISOString().split("T")[0]
          : null,
        equipped_weapon: data.AccountInfo?.EquippedWeapon || data.captainBasicInfo?.EquippedWeapon || [],
        title: data.AccountInfo?.Title || data.captainBasicInfo?.title || null,
        avatar_id: data.AccountInfo?.AccountAvatarId || data.captainBasicInfo?.headPic || null,
        banner_id: data.AccountInfo?.AccountBannerId || data.captainBasicInfo?.bannerId || null,
        badge_id: data.AccountInfo?.AccountBPID || data.captainBasicInfo?.badgeId || null,
        badge_count: data.AccountInfo?.AccountBPBadges || data.captainBasicInfo?.badgeCnt || null,
        season_id: data.AccountInfo?.AccountSeasonId || data.captainBasicInfo?.seasonId || null,
        release_version: data.AccountInfo?.ReleaseVersion || data.captainBasicInfo?.releaseVersion || null,
      },
      Guild: data.GuildInfo
        ? {
            name: data.GuildInfo.GuildName || null,
            id: data.GuildInfo.GuildID || null,
            level: data.GuildInfo.GuildLevel || null,
            members_count: data.GuildInfo.GuildMember || null,
            capacity: data.GuildInfo.GuildCapacity || null,
            leader: {
              id: data.GuildInfo.GuildOwner || null,
              name: null, // Not available in this API
              level: null, // Not available in this API
            },
          }
        : null,
      animal: data.petInfo
        ? {
            name: "Pet", // Specific name not available in this API
            id: data.petInfo.id || null,
            level: data.petInfo.level || null,
            exp: data.petInfo.exp || null,
            is_selected: data.petInfo.isSelected || false,
            skin_id: data.petInfo.skinId || null,
            selected_skill_id: data.petInfo.selectedSkillId || null,
          }
        : null,
      outfit: data.AccountProfileInfo?.EquippedOutfit || [],
      skills: data.AccountProfileInfo?.EquippedSkills || [],
      social_info: {
        signature: data.socialinfo?.AccountSignature || null,
        language: data.socialinfo?.AccountLanguage?.replace("Language_", "") || null,
        preferred_mode: data.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || null,
      },
      credits: data.credits || data._credits || "TEAM-AKIRU",
    }

    return NextResponse.json({
      status: "success",
      message: "Player information retrieved successfully",
      data: playerData,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error in player-info API:", error)

    // Try fallback to ariflexlabs API with callback format
    try {
      const playerId = request.nextUrl.searchParams.get("id")
      const region = request.nextUrl.searchParams.get("region") || "ind"
      
      if (!playerId) throw new Error("Player ID is required")

      // Construct the API URL with the player ID and region for ariflexlabs
      const ariflexUrl = `${ARIFLEXLABS_API}?uid=${playerId}&region=${region.toLowerCase()}`
      
      const ariflexResponse = await fetch(ariflexUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      })
      
      if (ariflexResponse.ok) {
        const ariflexData = await ariflexResponse.json()
        
        // Format the callback data structure
        const playerData = {
          basic_info: {
            id: playerId,
            name: ariflexData.AccountInfo?.AccountName || ariflexData.captainBasicInfo?.nickname || "Unknown Player",
            level: ariflexData.AccountInfo?.AccountLevel || ariflexData.captainBasicInfo?.level || null,
            likes: ariflexData.AccountInfo?.AccountLikes || ariflexData.captainBasicInfo?.liked || null,
            server: ariflexData.AccountInfo?.AccountRegion || ariflexData.captainBasicInfo?.region || region.toUpperCase(),
            bio: ariflexData.socialinfo?.AccountSignature || null,
            account_created: ariflexData.AccountInfo?.AccountCreateTime
              ? new Date(Number(ariflexData.AccountInfo.AccountCreateTime) * 1000).toISOString().split("T")[0]
              : null,
            language: ariflexData.socialinfo?.AccountLanguage?.replace("Language_", "") || null,
            preferred_mode: ariflexData.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || null,
            credit_score: ariflexData.creditScoreInfo?.creditScore || null,
            last_login: ariflexData.AccountInfo?.AccountLastLogin
              ? new Date(Number(ariflexData.AccountInfo.AccountLastLogin) * 1000).toISOString().split("T")[0]
              : null,
            equipped_weapon: ariflexData.AccountInfo?.EquippedWeapon || ariflexData.captainBasicInfo?.EquippedWeapon || [],
            release_version: ariflexData.AccountInfo?.ReleaseVersion || ariflexData.captainBasicInfo?.releaseVersion || null,
            rank: {
              br: {
                current: ariflexData.AccountInfo?.BrRankPoint || ariflexData.captainBasicInfo?.rankingPoints || null,
                max_rank: ariflexData.AccountInfo?.BrMaxRank || ariflexData.captainBasicInfo?.maxRank || null,
                show: ariflexData.AccountInfo?.ShowBrRank || ariflexData.captainBasicInfo?.showBrRank || false,
              },
              cs: {
                current: ariflexData.AccountInfo?.CsRankPoint || ariflexData.captainBasicInfo?.csRankingPoints || null,
                max_rank: ariflexData.AccountInfo?.CsMaxRank || ariflexData.captainBasicInfo?.csMaxRank || null,
                show: ariflexData.AccountInfo?.ShowCsRank || ariflexData.captainBasicInfo?.showCsRank || false,
              },
            },
          },
          Guild: ariflexData.GuildInfo
            ? {
                name: ariflexData.GuildInfo.GuildName || null,
                id: ariflexData.GuildInfo.GuildID || null,
                level: ariflexData.GuildInfo.GuildLevel || null,
                members_count: ariflexData.GuildInfo.GuildMember || null,
                capacity: ariflexData.GuildInfo.GuildCapacity || null,
                leader: {
                  id: ariflexData.GuildInfo.GuildOwner || null,
                  name: null,
                  level: null,
                },
              }
            : null,
          animal: ariflexData.petInfo
            ? {
                name: "Pet",
                id: ariflexData.petInfo.id || null,
                level: ariflexData.petInfo.level || null,
                exp: ariflexData.petInfo.exp || null,
                is_selected: ariflexData.petInfo.isSelected || false,
                skin_id: ariflexData.petInfo.skinId || null,
                selected_skill_id: ariflexData.petInfo.selectedSkillId || null,
              }
            : null,
          outfit: ariflexData.AccountProfileInfo?.EquippedOutfit || [],
          skills: ariflexData.AccountProfileInfo?.EquippedSkills || [],
          social_info: {
            signature: ariflexData.socialinfo?.AccountSignature || null,
            language: ariflexData.socialinfo?.AccountLanguage?.replace("Language_", "") || null,
            preferred_mode: ariflexData.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || null,
          },
        }
        
        return NextResponse.json({
          status: "success",
          message: "Player information retrieved successfully (ariflexlabs fallback)",
          data: playerData,
          credits: ariflexData.credits || ariflexData._credits || "Credits: @ariflexlabs",
          timestamp: new Date().toISOString(),
        })
      }
    } catch (ariflexError) {
      console.error("Ariflexlabs fallback error:", ariflexError)
    }

    // Try fallback to shop2game.com API if both main APIs fail
    try {
      const playerId = request.nextUrl.searchParams.get("id")
      if (!playerId) throw new Error("Player ID is required")

      const playerInfoResponse = await fetch("https://shop2game.com/api/auth/player_id_login", {
        method: "POST",
        headers: {
          "Accept-Language": "en-US,en;q=0.9",
          Connection: "keep-alive",
          Origin: "https://shop2game.com",
          Referer: "https://shop2game.com/app/100067/idlogin",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 11; Redmi Note 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          app_id: 100067,
          login_id: playerId,
          app_server_id: 0,
        }),
      })

      if (playerInfoResponse.ok) {
        const playerData = await playerInfoResponse.json()

        return NextResponse.json({
          status: "success",
          message: "Basic player information retrieved (shop2game fallback)",
          data: {
            basic_info: {
              id: playerId,
              name: playerData.nickname || `Player ${playerId.substring(0, 4)}...`,
              level: playerData.level || null,
              server: playerData.region || "Unknown",
              likes: null,
              release_version: null,
              last_login: null,
              account_created: null,
              credit_score: null,
              rank: {
                br: { current: null, max_rank: null, show: false },
                cs: { current: null, max_rank: null, show: false },
              },
            },
            Guild: playerData.guild_name
              ? {
                  name: playerData.guild_name,
                  id: playerData.guild_id || "",
                  level: null,
                  members_count: null,
                  capacity: null,
                  leader: null,
                }
              : null,
            social_info: null,
            animal: null,
            outfit: [],
            skills: [],
          },
          credits: "Data provided by shop2game.com (limited information)",
          timestamp: new Date().toISOString(),
        })
      }
    } catch (fallbackError) {
      console.error("Shop2game fallback error:", fallbackError)
    }

    return NextResponse.json(
      {
        status: "error",
        message: `An unexpected error occurred: ${error.message}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the callback data from request body
    const callbackData = await request.json();
    
    // Transform the callback data to our expected format
    const playerData = {
      basic_info: {
        id: callbackData.captainBasicInfo?.accountId || "Unknown ID",
        name: callbackData.AccountInfo?.AccountName || callbackData.captainBasicInfo?.nickname || "Unknown Player",
        level: callbackData.AccountInfo?.AccountLevel || callbackData.captainBasicInfo?.level || null,
        likes: callbackData.AccountInfo?.AccountLikes || callbackData.captainBasicInfo?.liked || null,
        server: callbackData.AccountInfo?.AccountRegion || callbackData.captainBasicInfo?.region || "IND",
        bio: callbackData.socialinfo?.AccountSignature || null,
        account_created: callbackData.AccountInfo?.AccountCreateTime || callbackData.captainBasicInfo?.createAt
          ? new Date(Number(callbackData.AccountInfo?.AccountCreateTime || callbackData.captainBasicInfo?.createAt) * 1000).toISOString().split("T")[0]
          : null,
        last_login: callbackData.AccountInfo?.AccountLastLogin || callbackData.captainBasicInfo?.lastLoginAt
          ? new Date(Number(callbackData.AccountInfo?.AccountLastLogin || callbackData.captainBasicInfo?.lastLoginAt) * 1000).toISOString().split("T")[0]
          : null,
        language: callbackData.socialinfo?.AccountLanguage?.replace("Language_", "") || null,
        preferred_mode: callbackData.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || null,
        credit_score: callbackData.creditScoreInfo?.creditScore || null,
        rank: {
          br: {
            current: callbackData.AccountInfo?.BrRankPoint || callbackData.captainBasicInfo?.rankingPoints || null,
            max_rank: callbackData.AccountInfo?.BrMaxRank || callbackData.captainBasicInfo?.maxRank || null,
            show: callbackData.AccountInfo?.ShowBrRank || callbackData.captainBasicInfo?.showBrRank || false,
          },
          cs: {
            current: callbackData.AccountInfo?.CsRankPoint || callbackData.captainBasicInfo?.csRankingPoints || null,
            max_rank: callbackData.AccountInfo?.CsMaxRank || callbackData.captainBasicInfo?.csMaxRank || null,
            show: callbackData.AccountInfo?.ShowCsRank || callbackData.captainBasicInfo?.showCsRank || false,
          },
        },
        equipped_weapon: callbackData.AccountInfo?.EquippedWeapon || callbackData.captainBasicInfo?.EquippedWeapon || [],
        title: callbackData.AccountInfo?.Title || callbackData.captainBasicInfo?.title || null,
        avatar_id: callbackData.AccountInfo?.AccountAvatarId || callbackData.captainBasicInfo?.headPic || null,
        banner_id: callbackData.AccountInfo?.AccountBannerId || callbackData.captainBasicInfo?.bannerId || null,
        badge_id: callbackData.AccountInfo?.AccountBPID || callbackData.captainBasicInfo?.badgeId || null,
        badge_count: callbackData.AccountInfo?.AccountBPBadges || callbackData.captainBasicInfo?.badgeCnt || null,
        season_id: callbackData.AccountInfo?.AccountSeasonId || callbackData.captainBasicInfo?.seasonId || null,
        release_version: callbackData.AccountInfo?.ReleaseVersion || callbackData.captainBasicInfo?.releaseVersion || null,
      },
      Guild: callbackData.GuildInfo
        ? {
            name: callbackData.GuildInfo.GuildName || null,
            id: callbackData.GuildInfo.GuildID || null,
            level: callbackData.GuildInfo.GuildLevel || null,
            members_count: callbackData.GuildInfo.GuildMember || null,
            capacity: callbackData.GuildInfo.GuildCapacity || null,
            leader: {
              id: callbackData.GuildInfo.GuildOwner || null,
              name: null, 
              level: null,
            },
          }
        : null,
      animal: callbackData.petInfo
        ? {
            name: "Pet",
            id: callbackData.petInfo.id || null,
            level: callbackData.petInfo.level || null,
            exp: callbackData.petInfo.exp || null,
            is_selected: callbackData.petInfo.isSelected || false,
            skin_id: callbackData.petInfo.skinId || null,
            selected_skill_id: callbackData.petInfo.selectedSkillId || null,
          }
        : null,
      outfit: callbackData.AccountProfileInfo?.EquippedOutfit || [],
      skills: callbackData.AccountProfileInfo?.EquippedSkills || [],
      social_info: {
        signature: callbackData.socialinfo?.AccountSignature || null,
        language: callbackData.socialinfo?.AccountLanguage?.replace("Language_", "") || null,
        preferred_mode: callbackData.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || null,
      },
      credits: callbackData.credits || callbackData._credits || "Credits: @ariflexlabs Developer @Uncle_chips",
    };

    return NextResponse.json({
      status: "success",
      message: "Player information processed successfully from callback data",
      data: playerData,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error processing callback data:", error);
    return NextResponse.json(
      {
        status: "error",
        message: `Failed to process callback data: ${error.message}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
