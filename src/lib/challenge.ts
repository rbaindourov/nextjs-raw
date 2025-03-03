import { JSDOM } from "jsdom";

function stringReverse(input: string = "I love vast"): string {
  return input.split("").reverse().join("");
}
console.log(`stringReverse() =   ${stringReverse()}`);

function checkPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 4) === 0) return false;
  }
  return true;
}

console.log(`checkPrime(7) =   ${checkPrime(7)}`);
console.log(`checkPrime(6) =   ${checkPrime(6)}`);

//scrape headlines from abcnews.go.com, return a list of headlines
async function scrapeHeadlines() {
  const response = await fetch("https://abcnews.go.com/");
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const headlinesH3 = doc.querySelectorAll(
    "h3.PFoxV.eBpQD.rcQBv.bQtjQ.lQUdN.GpQCA.mAkiF.FvMyr.WvoqU.nPLLM.tuAKv.ZfQkn.GdxUi"
  );
  const headlinesH2 = doc.querySelectorAll(
    "h2.PFoxV.eBpQD.rcQBv.bQtjQ.lQUdN.GpQCA.mAkiF.FvMyr.WvoqU.nPLLM.tuAKv.ZfQkn.GdxUi"
  );

  return [...headlinesH3, ...headlinesH2].map((h) => h.textContent);
}

scrapeHeadlines().then((headlines) => console.log(headlines));
