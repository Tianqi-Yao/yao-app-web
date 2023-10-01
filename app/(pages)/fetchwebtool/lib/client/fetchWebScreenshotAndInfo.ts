import { logger } from "@/app/lib/utils/logger";

async function fetchWebScreenshotAndInfo(websiteURL: string, mainElement: string) {
  const res = await fetch("/api/fetchwebtool", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      websiteURL,
      mainElement,
    }),
  });
  const data = await res.json();
  logger.debug("show res.json() data", data);
  return data;
}

export {
  fetchWebScreenshotAndInfo
};
