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
  logger.debug("show res", res);
  if (!res.ok) {
    logger.error("fetchWebScreenshotAndInfo res not ok", res);
    throw new Error(`API call error: fetchWebScreenshotAndInfo res not ok.`);
  }
  const data = await res.json();
  logger.debug("show res.json() data", data);
  const {screenshotPath, elementInfo} = data.data;
  return {screenshotPath, elementInfo};
}

export {
  fetchWebScreenshotAndInfo
};
