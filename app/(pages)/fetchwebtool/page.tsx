"use client";
import { useState } from "react";
import { logger } from "@/app/lib/utils/logger";
import { fetchWebScreenshotAndInfo } from "./lib/client/fetchWebScreenshotAndInfo";

export default function FetchWebTool() {
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [mainElement, setMainElement] = useState<string>(
    "h3.gs_rt[ontouchstart='gs_evt_dsp(event)']"
  );
  const [imgURL, setImgURL] = useState<string>("");
  const [messages, setMessages] = useState<any>({});
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [warnning, setWarnning] = useState<string>("");
  const [imgVersion, setImgVersion] = useState<number>(0);

  const handleFetchClick = async () => {
    try {
      if (!websiteURL) {
        setWarnning("Please input website URL");
        return;
      } else {
        setWarnning("");
      }
      setIsLoading(true);
      logger.debug("show variables", { websiteURL, mainElement });
      // 根据网站URL和主要元素，获取网站截图和主要元素的文本
      const { screenshotPath, elementInfo } = await fetchWebScreenshotAndInfo(
        websiteURL,
        mainElement
      );
      logger.debug("show fetched data", screenshotPath, elementInfo);
      setImgURL(screenshotPath);
      setImgVersion(curr => curr + 1);
      setMessages(elementInfo);
      setIsLoading(false);
    } catch (e: any) {
      setWarnning(e.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="p-2 min-h-screen flex flex-col">
      <h1>Fetch Web Tool</h1>
      {warnning && <div className="text-red-500">{warnning}</div>}
      <label htmlFor="url-input" className="flex flex-col py-2">
        Website URL
      </label>
      <input
        id="url-input"
        type="text"
        className="border p-2"
        value={websiteURL}
        onChange={(e) => {
          setWebsiteURL(e.target.value);
        }}
      />
      <label htmlFor="main-element-input" className="flex flex-col py-2">
        Main Element
      </label>
      <input
        id="main-element-input"
        type="text"
        className="border p-2"
        value={mainElement}
        onChange={(e) => {
          setMainElement(e.target.value);
        }}
      />
      <button
        className="border py-2 my-4 w-20 bg-green-300 hover:bg-green-600 focus:ring-1"
        onClick={handleFetchClick}
        disabled={isloading}
      >
        {isloading ? "Loading..." : "Fetch"}
      </button>
      {messages && (
        <div className="flex flex-col py-2">
          {Object.keys(messages).map((key) => {
            return (
              <div key={key}>
                <div>{key}</div>
                <div>{messages[key]}</div>
              </div>
            );
          })}
        </div>
      )}
      <img
        src={imgURL ?`${imgURL}?v=${imgVersion}` : "/screenshots/fetchwebtool.png"}
        alt="Fetch Web Tool"
        className="w-4/5"
      />
    </main>
  );
}
