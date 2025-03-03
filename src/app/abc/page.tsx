"use server";
import { JSDOM } from "jsdom";

// Fetch headlines with their corresponding article URLs
async function fetchHeadlines(): Promise<{ text: string; url: string }[]> {
  try {
    const response = await fetch("https://abcnews.go.com/");
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const html = await response.text();
    // Set base URL in JSDOM to resolve relative URLs
    const dom = new JSDOM(html, { url: "https://abcnews.go.com/" });
    const doc = dom.window.document;

    // Select headline elements with the specified classes
    const headlinesH3 = doc.querySelectorAll(
      "h3.PFoxV.eBpQD.rcQBv.bQtjQ.lQUdN.GpQCA.mAkiF.FvMyr.WvoqU.nPLLM.tuAKv.ZfQkn.GdxUi"
    );
    const headlinesH2 = doc.querySelectorAll(
      "h2.PFoxV.eBpQD.rcQBv.bQtjQ.lQUdN.GpQCA.mAkiF.FvMyr.WvoqU.nPLLM.tuAKv.ZfQkn.GdxUi"
    );

    // Map headlines to objects with text and URL, filtering out invalid entries
    const headlines = [...headlinesH3, ...headlinesH2]
      .map((h) => {
        const anchor = h.closest("a"); // Find the parent anchor tag
        const url = anchor ? anchor.href : ""; // Get the absolute URL
        return { text: h.textContent || "", url };
      })
      .filter((item) => item.text && item.url); // Ensure both text and URL exist

    return headlines;
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return [];
  }
}

// Server component to render the headlines with clickable links
export default async function ABCPage() {
  const headlines = await fetchHeadlines();

  return (
    <div>
      <h1>Headlines</h1>
      <ul>
        {headlines.map((item, index) => (
          <li key={index}>
            {/* Use item.url for the href and item.text for the link text */}
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
