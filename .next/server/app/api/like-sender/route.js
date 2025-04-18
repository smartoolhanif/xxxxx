/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/like-sender/route";
exports.ids = ["app/api/like-sender/route"];
exports.modules = {

/***/ "(rsc)/./app/api/like-sender/route.ts":
/*!**************************************!*\
  !*** ./app/api/like-sender/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n// API endpoint for sending likes\nconst LIKE_API = \"https://myapihanif.vercel.app/like\";\nasync function GET(request) {\n    try {\n        const searchParams = request.nextUrl.searchParams;\n        const uid = searchParams.get(\"uid\");\n        const serverName = searchParams.get(\"server_name\") || \"ind\" // Default to IND if not specified\n        ;\n        if (!uid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                status: \"error\",\n                message: \"Player UID is required\",\n                timestamp: new Date().toISOString()\n            }, {\n                status: 400\n            });\n        }\n        // Construct the API URL with the player ID and region\n        const apiUrl = `${LIKE_API}?uid=${uid}&server_name=${serverName.toLowerCase()}`;\n        console.log(\"Sending likes to:\", apiUrl);\n        const response = await fetch(apiUrl, {\n            headers: {\n                Accept: \"application/json\",\n                \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\"\n            }\n        });\n        if (!response.ok) {\n            throw new Error(`API request failed with status code: ${response.status}`);\n        }\n        const data = await response.json();\n        console.log(\"API response received:\", data);\n        // Format the response data\n        const formattedData = {\n            status: data.status === 1 ? \"success\" : \"error\",\n            nickname: data.PlayerNickname || \"Unknown Player\",\n            uid: data.UID || uid,\n            likesSent: data.LikesGivenByAPI || 0,\n            likesBefore: data.LikesbeforeCommand || 0,\n            likesAfter: data.LikesafterCommand || 0\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            status: \"success\",\n            message: \"Likes sent successfully\",\n            data: formattedData,\n            timestamp: new Date().toISOString()\n        });\n    } catch (error) {\n        console.error(\"Error sending likes:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            status: \"error\",\n            message: `Failed to send likes: ${error.message}`,\n            timestamp: new Date().toISOString()\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xpa2Utc2VuZGVyL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTREO0FBRTVELGlDQUFpQztBQUNqQyxNQUFNQyxXQUFXO0FBRVYsZUFBZUMsSUFBSUMsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU1DLGVBQWVELFFBQVFFLE9BQU8sQ0FBQ0QsWUFBWTtRQUNqRCxNQUFNRSxNQUFNRixhQUFhRyxHQUFHLENBQUM7UUFDN0IsTUFBTUMsYUFBYUosYUFBYUcsR0FBRyxDQUFDLGtCQUFrQixNQUFNLGtDQUFrQzs7UUFFOUYsSUFBSSxDQUFDRCxLQUFLO1lBQ1IsT0FBT04scURBQVlBLENBQUNTLElBQUksQ0FDdEI7Z0JBQ0VDLFFBQVE7Z0JBQ1JDLFNBQVM7Z0JBQ1RDLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztZQUNuQyxHQUNBO2dCQUFFSixRQUFRO1lBQUk7UUFFbEI7UUFFQSxzREFBc0Q7UUFDdEQsTUFBTUssU0FBUyxHQUFHZCxTQUFTLEtBQUssRUFBRUssSUFBSSxhQUFhLEVBQUVFLFdBQVdRLFdBQVcsSUFBSTtRQUUvRUMsUUFBUUMsR0FBRyxDQUFDLHFCQUFxQkg7UUFFakMsTUFBTUksV0FBVyxNQUFNQyxNQUFNTCxRQUFRO1lBQ25DTSxTQUFTO2dCQUNQQyxRQUFRO2dCQUNSLGNBQ0U7WUFDSjtRQUNGO1FBRUEsSUFBSSxDQUFDSCxTQUFTSSxFQUFFLEVBQUU7WUFDaEIsTUFBTSxJQUFJQyxNQUFNLENBQUMscUNBQXFDLEVBQUVMLFNBQVNULE1BQU0sRUFBRTtRQUMzRTtRQUVBLE1BQU1lLE9BQU8sTUFBTU4sU0FBU1YsSUFBSTtRQUNoQ1EsUUFBUUMsR0FBRyxDQUFDLDBCQUEwQk87UUFFdEMsMkJBQTJCO1FBQzNCLE1BQU1DLGdCQUFnQjtZQUNwQmhCLFFBQVFlLEtBQUtmLE1BQU0sS0FBSyxJQUFJLFlBQVk7WUFDeENpQixVQUFVRixLQUFLRyxjQUFjLElBQUk7WUFDakN0QixLQUFLbUIsS0FBS0ksR0FBRyxJQUFJdkI7WUFDakJ3QixXQUFXTCxLQUFLTSxlQUFlLElBQUk7WUFDbkNDLGFBQWFQLEtBQUtRLGtCQUFrQixJQUFJO1lBQ3hDQyxZQUFZVCxLQUFLVSxpQkFBaUIsSUFBSTtRQUN4QztRQUVBLE9BQU9uQyxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQ3ZCQyxRQUFRO1lBQ1JDLFNBQVM7WUFDVGMsTUFBTUM7WUFDTmQsV0FBVyxJQUFJQyxPQUFPQyxXQUFXO1FBQ25DO0lBQ0YsRUFBRSxPQUFPc0IsT0FBWTtRQUNuQm5CLFFBQVFtQixLQUFLLENBQUMsd0JBQXdCQTtRQUV0QyxPQUFPcEMscURBQVlBLENBQUNTLElBQUksQ0FDdEI7WUFDRUMsUUFBUTtZQUNSQyxTQUFTLENBQUMsc0JBQXNCLEVBQUV5QixNQUFNekIsT0FBTyxFQUFFO1lBQ2pEQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7UUFDbkMsR0FDQTtZQUFFSixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxIYW5pZlxcRGVza3RvcFxcRnJlZSBGaXJlIFRvb2xzXFxhcHBcXGFwaVxcbGlrZS1zZW5kZXJcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcblxyXG4vLyBBUEkgZW5kcG9pbnQgZm9yIHNlbmRpbmcgbGlrZXNcclxuY29uc3QgTElLRV9BUEkgPSBcImh0dHBzOi8vbXlhcGloYW5pZi52ZXJjZWwuYXBwL2xpa2VcIlxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSByZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zXHJcbiAgICBjb25zdCB1aWQgPSBzZWFyY2hQYXJhbXMuZ2V0KFwidWlkXCIpXHJcbiAgICBjb25zdCBzZXJ2ZXJOYW1lID0gc2VhcmNoUGFyYW1zLmdldChcInNlcnZlcl9uYW1lXCIpIHx8IFwiaW5kXCIgLy8gRGVmYXVsdCB0byBJTkQgaWYgbm90IHNwZWNpZmllZFxyXG5cclxuICAgIGlmICghdWlkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcclxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGxheWVyIFVJRCBpcyByZXF1aXJlZFwiLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnN0cnVjdCB0aGUgQVBJIFVSTCB3aXRoIHRoZSBwbGF5ZXIgSUQgYW5kIHJlZ2lvblxyXG4gICAgY29uc3QgYXBpVXJsID0gYCR7TElLRV9BUEl9P3VpZD0ke3VpZH0mc2VydmVyX25hbWU9JHtzZXJ2ZXJOYW1lLnRvTG93ZXJDYXNlKCl9YFxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyBsaWtlcyB0bzpcIiwgYXBpVXJsKVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiVXNlci1BZ2VudFwiOlxyXG4gICAgICAgICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIwLjAuMC4wIFNhZmFyaS81MzcuMzZcIixcclxuICAgICAgfSxcclxuICAgIH0pXHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSByZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlOiAke3Jlc3BvbnNlLnN0YXR1c31gKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgIGNvbnNvbGUubG9nKFwiQVBJIHJlc3BvbnNlIHJlY2VpdmVkOlwiLCBkYXRhKVxyXG5cclxuICAgIC8vIEZvcm1hdCB0aGUgcmVzcG9uc2UgZGF0YVxyXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IHtcclxuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyA9PT0gMSA/IFwic3VjY2Vzc1wiIDogXCJlcnJvclwiLFxyXG4gICAgICBuaWNrbmFtZTogZGF0YS5QbGF5ZXJOaWNrbmFtZSB8fCBcIlVua25vd24gUGxheWVyXCIsXHJcbiAgICAgIHVpZDogZGF0YS5VSUQgfHwgdWlkLFxyXG4gICAgICBsaWtlc1NlbnQ6IGRhdGEuTGlrZXNHaXZlbkJ5QVBJIHx8IDAsXHJcbiAgICAgIGxpa2VzQmVmb3JlOiBkYXRhLkxpa2VzYmVmb3JlQ29tbWFuZCB8fCAwLFxyXG4gICAgICBsaWtlc0FmdGVyOiBkYXRhLkxpa2VzYWZ0ZXJDb21tYW5kIHx8IDAsXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcclxuICAgICAgbWVzc2FnZTogXCJMaWtlcyBzZW50IHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiBmb3JtYXR0ZWREYXRhLFxyXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlbmRpbmcgbGlrZXM6XCIsIGVycm9yKVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAge1xyXG4gICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxyXG4gICAgICAgIG1lc3NhZ2U6IGBGYWlsZWQgdG8gc2VuZCBsaWtlczogJHtlcnJvci5tZXNzYWdlfWAsXHJcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiTElLRV9BUEkiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwibmV4dFVybCIsInVpZCIsImdldCIsInNlcnZlck5hbWUiLCJqc29uIiwic3RhdHVzIiwibWVzc2FnZSIsInRpbWVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImFwaVVybCIsInRvTG93ZXJDYXNlIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZmV0Y2giLCJoZWFkZXJzIiwiQWNjZXB0Iiwib2siLCJFcnJvciIsImRhdGEiLCJmb3JtYXR0ZWREYXRhIiwibmlja25hbWUiLCJQbGF5ZXJOaWNrbmFtZSIsIlVJRCIsImxpa2VzU2VudCIsIkxpa2VzR2l2ZW5CeUFQSSIsImxpa2VzQmVmb3JlIiwiTGlrZXNiZWZvcmVDb21tYW5kIiwibGlrZXNBZnRlciIsIkxpa2VzYWZ0ZXJDb21tYW5kIiwiZXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/like-sender/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flike-sender%2Froute&page=%2Fapi%2Flike-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flike-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flike-sender%2Froute&page=%2Fapi%2Flike-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flike-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Hanif_Desktop_Free_Fire_Tools_app_api_like_sender_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/like-sender/route.ts */ \"(rsc)/./app/api/like-sender/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/like-sender/route\",\n        pathname: \"/api/like-sender\",\n        filename: \"route\",\n        bundlePath: \"app/api/like-sender/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Hanif\\\\Desktop\\\\Free Fire Tools\\\\app\\\\api\\\\like-sender\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Hanif_Desktop_Free_Fire_Tools_app_api_like_sender_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsaWtlLXNlbmRlciUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbGlrZS1zZW5kZXIlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZsaWtlLXNlbmRlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIYW5pZiU1Q0Rlc2t0b3AlNUNGcmVlJTIwRmlyZSUyMFRvb2xzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNIYW5pZiU1Q0Rlc2t0b3AlNUNGcmVlJTIwRmlyZSUyMFRvb2xzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMyQjtBQUN4RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcSGFuaWZcXFxcRGVza3RvcFxcXFxGcmVlIEZpcmUgVG9vbHNcXFxcYXBwXFxcXGFwaVxcXFxsaWtlLXNlbmRlclxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbGlrZS1zZW5kZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9saWtlLXNlbmRlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbGlrZS1zZW5kZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxIYW5pZlxcXFxEZXNrdG9wXFxcXEZyZWUgRmlyZSBUb29sc1xcXFxhcHBcXFxcYXBpXFxcXGxpa2Utc2VuZGVyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flike-sender%2Froute&page=%2Fapi%2Flike-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flike-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flike-sender%2Froute&page=%2Fapi%2Flike-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flike-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();