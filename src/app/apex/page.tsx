"use client";
import LanguageSelector from "@/components/LanguageSelector";
import React, { createContext, useState } from "react";
import useSWR from "swr";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
type LangContextType = [string, React.Dispatch<React.SetStateAction<string>>];
export const LangContext = createContext<LangContextType>(["en", () => {}]);

const Page: React.FC = () => {
  const [lang, setLang] = useState<string>("en");
  const { data, error } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    (url: string | URL | Request) => fetch(url).then((res) => res.json())
  );

  if (error) return <div> Failed to load </div>;
  if (!data) return <div> Loading ... </div>;
  console.log(data);
  return (
    <>
      <LangContext.Provider value={[lang, setLang]}>
        <LanguageSelector />
      </LangContext.Provider>
      <div>
        <h1>{lang}</h1>
      </div>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
};

export default Page;
