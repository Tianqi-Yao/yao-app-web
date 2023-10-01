"use client";
import { useState } from "react";
import { logger } from "@/app/lib/utils/logger";
import { fetchWebScreenshotAndInfo } from "./lib/client/fetchWebScreenshotAndInfo";

export default function FetchWebTool() {
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [mainElement, setMainElement] = useState<string>("h3.gs_rt[ontouchstart='gs_evt_dsp(event)']");
  const [imgURL, setImgURL] = useState<string>("");
  const [messages, setMessages] = useState<any>({});

  const handleFetchClick = async () => {
    logger.debug("show variables", { websiteURL, mainElement });
    // 根据网站URL和主要元素，获取网站截图和主要元素的文本
    const data = await fetchWebScreenshotAndInfo(
      websiteURL,
      mainElement
    );
    logger.debug("show fetched data",data);
    setImgURL(data.data.screenshotPath);
    setMessages(data.data.elementInfo);
  };

  return (
    <main className="p-2 min-h-screen flex flex-col">
      <h1>Fetch Web Tool</h1>
      <img
        src={imgURL ? imgURL : "/screenshots/fetchwebtool.png"}
        alt="Fetch Web Tool"
        className="w-1/2"
      />
      <label htmlFor="url-input" className="flex flex-col gap-2">
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
      <label htmlFor="main-element-input" className="flex flex-col gap-2">
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
      <button className="border p-2" onClick={handleFetchClick}>
        Fetch
      </button>
      {messages && (
        <div className="flex flex-col gap-2">
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
    </main>
  );
}
