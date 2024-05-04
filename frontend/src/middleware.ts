import { DEFAULT_COUNTRY } from "@/constants/countries"
import { type Region } from "@medusajs/medusa"
import { notFound } from "next/navigation"
import { type NextRequest, NextResponse } from "next/server"

const regionMapCache = {
  regionMap: new Map<string, Region>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const res = await fetch(`https://codexn.net/store/regions`, {
      next: {
        revalidate: 3600,
        tags: ["regions"],
      },
    })

    if (!res.ok) {
      notFound()
    }

    const regions = (await res.json()) as Region[]

    if (!regions.length) {
      notFound()
    }

    // Create a map of country codes to regions.
    regions.forEach((region: Region) => {
      region.countries.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2, region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, Region | number>,
) {
  try {
    let countryCode: string | undefined
    const countryCodeCookie = request.cookies.get("x-country-code")

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (countryCodeCookie && regionMap.has(countryCodeCookie.value)) {
      countryCode = countryCodeCookie.value
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_COUNTRY)) {
      countryCode = DEFAULT_COUNTRY
    } else if (regionMap.keys().next().value) {
      countryCode = String(regionMap.keys().next().value)
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?",
      )
    }
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()
  try {
    const regionMap = await getRegionMap()

    const countryCode = regionMap && (await getCountryCode(request, regionMap))

    let urlHasCountryCode = true

    if (
      !request.nextUrl.pathname.split("/")[1]?.includes(String(countryCode))
    ) {
      urlHasCountryCode = false
    }

    if (!countryCode) {
      urlHasCountryCode = false
    }

    if (urlHasCountryCode) {
      return NextResponse.next()
    }

    const redirectPath =
      request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

    const queryString = request.nextUrl.search ? request.nextUrl.search : ""

    let redirectUrl = request.nextUrl.href

    response = NextResponse.redirect(redirectUrl, 307)

    if (!urlHasCountryCode && countryCode) {
      redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
      response = NextResponse.redirect(`${redirectUrl}`, 307)
    }
  } catch (e: unknown) {
    console.log(e)
  } finally {
    return response
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
}
