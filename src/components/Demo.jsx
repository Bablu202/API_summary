import React, { useEffect, useState } from "react";
import { AiOutlineCopy, AiOutlineLink } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FcCheckmark, FcSearch } from "react-icons/fc";

import { useLazyGetSummaryQuery } from "../services/article";
export default function Demo() {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllAtticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copy, setCopy] = useState("");
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllAtticles(articlesFromLocalStorage);
    }
  }, []);
  const handleCopy = (copyURL) => {
    setCopy(copyURL);
    navigator.clipboard.writeText(copyURL);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];
      if (updatedAllArticles.length > 5) updatedAllArticles.pop();
      setArticle(newArticle);
      setAllAtticles(updatedAllArticles);
      console.log(newArticle.summary);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  return (
    <section className=" mt-16 w-full max-w-xl">
      {/*Search Input here*/}

      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <AiOutlineLink className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter a blog url"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input"
          />
          <button
            type="submit"
            className="submit_btn
             peer-focus:border-gray-700
             peer-focus:text-gray-700"
          >
            <FcSearch className="react-icon" />
          </button>
        </form>
        {/*Browser URL history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <AiOutlineCopy
                onClick={() => {
                  handleCopy(item.url);
                }}
              />
              <p className="flex-1 font-satoshi text-blue-400 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* AI results*/}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <BiLoaderCircle />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Na, There is some API fetch error going on..
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
