import { NextResponse } from "next/server";
import { operatingGrabSiteInfo } from "@/app/(pages)/fetchwebtool/lib/server/operatingGrabSiteInfo";

export async function POST(req: Request) {
  try {
    const { websiteURL, mainElement } = await req.json();
    const { screenshotPath, elementInfo } = await operatingGrabSiteInfo(
      websiteURL,
      mainElement
    );
    return NextResponse.json(
      {
        message: "fetch website info success",
        data: {
          screenshotPath,
          elementInfo,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "fetch screenshot error", error},
      { status: 500 }
    );
  }
}
