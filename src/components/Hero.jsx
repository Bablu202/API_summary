import React from "react";
import { FcMindMap } from "react-icons/fc";
export default function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <FcMindMap className="w-10 text-5xl object-contain" />
        <button
          type="button"
          onClick={() => {
            console.log("Hero button 01");
          }}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarirze Articles with
        <br className="max-md:hidden" />
        <span className="orange_gradient">Open AI</span>
      </h1>
      <h2 className="desc">
        Simplify your raeding with Summarize, with an open-source AI article
        Summariazer that transforms articles into clear and conclusive text
        format
      </h2>
    </header>
  );
}
