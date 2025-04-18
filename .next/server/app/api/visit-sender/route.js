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
exports.id = "app/api/visit-sender/route";
exports.ids = ["app/api/visit-sender/route"];
exports.modules = {

/***/ "(rsc)/./app/api/visit-sender/route.ts":
/*!***************************************!*\
  !*** ./app/api/visit-sender/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n// API endpoint for sending visits\nconst VISIT_API = \"https://hanif-visit.vercel.app\";\nasync function GET(request) {\n    try {\n        const searchParams = request.nextUrl.searchParams;\n        const uid = searchParams.get(\"uid\");\n        const serverName = searchParams.get(\"server_name\") || \"bd\" // Only BD server is supported\n        ;\n        if (!uid) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                status: \"error\",\n                message: \"Player UID is required\",\n                timestamp: new Date().toISOString()\n            }, {\n                status: 400\n            });\n        }\n        // Only allow BD server for visits\n        if (serverName.toLowerCase() !== \"bd\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                status: \"error\",\n                message: \"Visit sender only supports Bangladesh (BD) server\",\n                timestamp: new Date().toISOString()\n            }, {\n                status: 400\n            });\n        }\n        // Construct the API URL with the player ID\n        const apiUrl = `${VISIT_API}/${uid}`;\n        console.log(\"Sending visits to:\", apiUrl);\n        const response = await fetch(apiUrl, {\n            headers: {\n                Accept: \"application/json\",\n                \"User-Agent\": \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\"\n            }\n        });\n        if (!response.ok) {\n            throw new Error(`API request failed with status code: ${response.status}`);\n        }\n        const data = await response.json();\n        console.log(\"API response received:\", data);\n        // Format the response data\n        const formattedData = {\n            success: data.success || false,\n            totalTimeTakes: data.total_time_takes || 0,\n            totalViewsSent: data.total_views_sent || 0,\n            uid: uid\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            status: \"success\",\n            message: \"Visits sent successfully\",\n            data: formattedData,\n            timestamp: new Date().toISOString()\n        });\n    } catch (error) {\n        console.error(\"Error sending visits:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            status: \"error\",\n            message: `Failed to send visits: ${error.message}`,\n            timestamp: new Date().toISOString()\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Zpc2l0LXNlbmRlci9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUE0RDtBQUU1RCxrQ0FBa0M7QUFDbEMsTUFBTUMsWUFBWTtBQUVYLGVBQWVDLElBQUlDLE9BQW9CO0lBQzVDLElBQUk7UUFDRixNQUFNQyxlQUFlRCxRQUFRRSxPQUFPLENBQUNELFlBQVk7UUFDakQsTUFBTUUsTUFBTUYsYUFBYUcsR0FBRyxDQUFDO1FBQzdCLE1BQU1DLGFBQWFKLGFBQWFHLEdBQUcsQ0FBQyxrQkFBa0IsS0FBSyw4QkFBOEI7O1FBRXpGLElBQUksQ0FBQ0QsS0FBSztZQUNSLE9BQU9OLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUNFQyxRQUFRO2dCQUNSQyxTQUFTO2dCQUNUQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7WUFDbkMsR0FDQTtnQkFBRUosUUFBUTtZQUFJO1FBRWxCO1FBRUEsa0NBQWtDO1FBQ2xDLElBQUlGLFdBQVdPLFdBQVcsT0FBTyxNQUFNO1lBQ3JDLE9BQU9mLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUNFQyxRQUFRO2dCQUNSQyxTQUFTO2dCQUNUQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7WUFDbkMsR0FDQTtnQkFBRUosUUFBUTtZQUFJO1FBRWxCO1FBRUEsMkNBQTJDO1FBQzNDLE1BQU1NLFNBQVMsR0FBR2YsVUFBVSxDQUFDLEVBQUVLLEtBQUs7UUFFcENXLFFBQVFDLEdBQUcsQ0FBQyxzQkFBc0JGO1FBRWxDLE1BQU1HLFdBQVcsTUFBTUMsTUFBTUosUUFBUTtZQUNuQ0ssU0FBUztnQkFDUEMsUUFBUTtnQkFDUixjQUNFO1lBQ0o7UUFDRjtRQUVBLElBQUksQ0FBQ0gsU0FBU0ksRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSUMsTUFBTSxDQUFDLHFDQUFxQyxFQUFFTCxTQUFTVCxNQUFNLEVBQUU7UUFDM0U7UUFFQSxNQUFNZSxPQUFPLE1BQU1OLFNBQVNWLElBQUk7UUFDaENRLFFBQVFDLEdBQUcsQ0FBQywwQkFBMEJPO1FBRXRDLDJCQUEyQjtRQUMzQixNQUFNQyxnQkFBZ0I7WUFDcEJDLFNBQVNGLEtBQUtFLE9BQU8sSUFBSTtZQUN6QkMsZ0JBQWdCSCxLQUFLSSxnQkFBZ0IsSUFBSTtZQUN6Q0MsZ0JBQWdCTCxLQUFLTSxnQkFBZ0IsSUFBSTtZQUN6Q3pCLEtBQUtBO1FBQ1A7UUFFQSxPQUFPTixxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQ3ZCQyxRQUFRO1lBQ1JDLFNBQVM7WUFDVGMsTUFBTUM7WUFDTmQsV0FBVyxJQUFJQyxPQUFPQyxXQUFXO1FBQ25DO0lBQ0YsRUFBRSxPQUFPa0IsT0FBWTtRQUNuQmYsUUFBUWUsS0FBSyxDQUFDLHlCQUF5QkE7UUFFdkMsT0FBT2hDLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO1lBQ0VDLFFBQVE7WUFDUkMsU0FBUyxDQUFDLHVCQUF1QixFQUFFcUIsTUFBTXJCLE9BQU8sRUFBRTtZQUNsREMsV0FBVyxJQUFJQyxPQUFPQyxXQUFXO1FBQ25DLEdBQ0E7WUFBRUosUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSGFuaWZcXERlc2t0b3BcXEZyZWUgRmlyZSBUb29sc1xcYXBwXFxhcGlcXHZpc2l0LXNlbmRlclxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcclxuXHJcbi8vIEFQSSBlbmRwb2ludCBmb3Igc2VuZGluZyB2aXNpdHNcclxuY29uc3QgVklTSVRfQVBJID0gXCJodHRwczovL2hhbmlmLXZpc2l0LnZlcmNlbC5hcHBcIlxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSByZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zXHJcbiAgICBjb25zdCB1aWQgPSBzZWFyY2hQYXJhbXMuZ2V0KFwidWlkXCIpXHJcbiAgICBjb25zdCBzZXJ2ZXJOYW1lID0gc2VhcmNoUGFyYW1zLmdldChcInNlcnZlcl9uYW1lXCIpIHx8IFwiYmRcIiAvLyBPbmx5IEJEIHNlcnZlciBpcyBzdXBwb3J0ZWRcclxuXHJcbiAgICBpZiAoIXVpZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3RhdHVzOiBcImVycm9yXCIsXHJcbiAgICAgICAgICBtZXNzYWdlOiBcIlBsYXllciBVSUQgaXMgcmVxdWlyZWRcIixcclxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IGFsbG93IEJEIHNlcnZlciBmb3IgdmlzaXRzXHJcbiAgICBpZiAoc2VydmVyTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcImJkXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0YXR1czogXCJlcnJvclwiLFxyXG4gICAgICAgICAgbWVzc2FnZTogXCJWaXNpdCBzZW5kZXIgb25seSBzdXBwb3J0cyBCYW5nbGFkZXNoIChCRCkgc2VydmVyXCIsXHJcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBBUEkgVVJMIHdpdGggdGhlIHBsYXllciBJRFxyXG4gICAgY29uc3QgYXBpVXJsID0gYCR7VklTSVRfQVBJfS8ke3VpZH1gXHJcblxyXG4gICAgY29uc29sZS5sb2coXCJTZW5kaW5nIHZpc2l0cyB0bzpcIiwgYXBpVXJsKVxyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpVXJsLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiVXNlci1BZ2VudFwiOlxyXG4gICAgICAgICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIwLjAuMC4wIFNhZmFyaS81MzcuMzZcIixcclxuICAgICAgfSxcclxuICAgIH0pXHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFQSSByZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlOiAke3Jlc3BvbnNlLnN0YXR1c31gKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgIGNvbnNvbGUubG9nKFwiQVBJIHJlc3BvbnNlIHJlY2VpdmVkOlwiLCBkYXRhKVxyXG5cclxuICAgIC8vIEZvcm1hdCB0aGUgcmVzcG9uc2UgZGF0YVxyXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IHtcclxuICAgICAgc3VjY2VzczogZGF0YS5zdWNjZXNzIHx8IGZhbHNlLFxyXG4gICAgICB0b3RhbFRpbWVUYWtlczogZGF0YS50b3RhbF90aW1lX3Rha2VzIHx8IDAsXHJcbiAgICAgIHRvdGFsVmlld3NTZW50OiBkYXRhLnRvdGFsX3ZpZXdzX3NlbnQgfHwgMCxcclxuICAgICAgdWlkOiB1aWRcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxyXG4gICAgICBtZXNzYWdlOiBcIlZpc2l0cyBzZW50IHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiBmb3JtYXR0ZWREYXRhLFxyXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlbmRpbmcgdmlzaXRzOlwiLCBlcnJvcilcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHtcclxuICAgICAgICBzdGF0dXM6IFwiZXJyb3JcIixcclxuICAgICAgICBtZXNzYWdlOiBgRmFpbGVkIHRvIHNlbmQgdmlzaXRzOiAke2Vycm9yLm1lc3NhZ2V9YCxcclxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJWSVNJVF9BUEkiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwibmV4dFVybCIsInVpZCIsImdldCIsInNlcnZlck5hbWUiLCJqc29uIiwic3RhdHVzIiwibWVzc2FnZSIsInRpbWVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInRvTG93ZXJDYXNlIiwiYXBpVXJsIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZmV0Y2giLCJoZWFkZXJzIiwiQWNjZXB0Iiwib2siLCJFcnJvciIsImRhdGEiLCJmb3JtYXR0ZWREYXRhIiwic3VjY2VzcyIsInRvdGFsVGltZVRha2VzIiwidG90YWxfdGltZV90YWtlcyIsInRvdGFsVmlld3NTZW50IiwidG90YWxfdmlld3Nfc2VudCIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/visit-sender/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fvisit-sender%2Froute&page=%2Fapi%2Fvisit-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvisit-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fvisit-sender%2Froute&page=%2Fapi%2Fvisit-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvisit-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Hanif_Desktop_Free_Fire_Tools_app_api_visit_sender_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/visit-sender/route.ts */ \"(rsc)/./app/api/visit-sender/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/visit-sender/route\",\n        pathname: \"/api/visit-sender\",\n        filename: \"route\",\n        bundlePath: \"app/api/visit-sender/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Hanif\\\\Desktop\\\\Free Fire Tools\\\\app\\\\api\\\\visit-sender\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Hanif_Desktop_Free_Fire_Tools_app_api_visit_sender_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ2aXNpdC1zZW5kZXIlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnZpc2l0LXNlbmRlciUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnZpc2l0LXNlbmRlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIYW5pZiU1Q0Rlc2t0b3AlNUNGcmVlJTIwRmlyZSUyMFRvb2xzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNIYW5pZiU1Q0Rlc2t0b3AlNUNGcmVlJTIwRmlyZSUyMFRvb2xzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcSGFuaWZcXFxcRGVza3RvcFxcXFxGcmVlIEZpcmUgVG9vbHNcXFxcYXBwXFxcXGFwaVxcXFx2aXNpdC1zZW5kZXJcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Zpc2l0LXNlbmRlci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Zpc2l0LXNlbmRlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdmlzaXQtc2VuZGVyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcSGFuaWZcXFxcRGVza3RvcFxcXFxGcmVlIEZpcmUgVG9vbHNcXFxcYXBwXFxcXGFwaVxcXFx2aXNpdC1zZW5kZXJcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fvisit-sender%2Froute&page=%2Fapi%2Fvisit-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvisit-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fvisit-sender%2Froute&page=%2Fapi%2Fvisit-sender%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fvisit-sender%2Froute.ts&appDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHanif%5CDesktop%5CFree%20Fire%20Tools&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();