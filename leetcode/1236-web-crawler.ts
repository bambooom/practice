// https://leetcode.com/problems/web-crawler
// Given a url startUrl and an interface HtmlParser, implement a web crawler to crawl all links that are under the same hostname as startUrl.
// Return all urls obtained by your web crawler in any order.
// Your crawler should:
// - Start from the page: startUrl
// - Call HtmlParser.getUrls(url) to get all urls from a webpage of given url.
// - Do not crawl the same link twice.
// - Explore only the links that are under the same hostname as startUrl.

// As shown in the example url above, the hostname is example.org. For simplicity sake, you may assume all urls use http protocol without any port specified.
// For example, the urls http://leetcode.com/problems and http://leetcode.com/contest are under the same hostname, while urls http://example.org/test and http://example.com/abc are not under the same hostname.

/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * class HtmlParser {
 *      getUrls(url: string): string[] {}
 * }
 */

// Below are two examples explaining the functionality of the problem, for custom testing purposes you'll have three variables urls, edges and startUrl.
// Notice that you will only have access to startUrl in your code, while urls and edges are not directly accessible to you in code.
// Note: Consider the same URL with the trailing slash "/" as a different URL. For example, "http://news.yahoo.com", and "http://news.yahoo.com/" are different urls.

// Example1:
// Input:
// urls = [
//   "http://news.yahoo.com",
//   "http://news.yahoo.com/news",
//   "http://news.yahoo.com/news/topics/",
//   "http://news.google.com",
//   "http://news.yahoo.com/us"
// ]
// edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
// startUrl = "http://news.yahoo.com/news/topics/"
// Output: [
//   "http://news.yahoo.com",
//   "http://news.yahoo.com/news",
//   "http://news.yahoo.com/news/topics/",
//   "http://news.yahoo.com/us"
// ]

// Example2:
// Input:
// urls = [
//   "http://news.yahoo.com",
//   "http://news.yahoo.com/news",
//   "http://news.yahoo.com/news/topics/",
//   "http://news.google.com"
// ]
// edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
// startUrl = "http://news.google.com"
// Output: ["http://news.google.com"]
// Explanation: The startUrl links to all other pages that do not share the same hostname.

// 没太明白 edges 是什么

interface HtmlParser {
  getUrls(url: string): string[];
}

// https://leetcode.com/problems/web-crawler/solutions/700623/javascript-dfs-bfs-solutions/?envType=study-plan-v2&envId=premium-algo-100

// DFS solution:
function crawl(startUrl: string, htmlParser: HtmlParser): string[] {
  const getHostname = (url: string) => url.split('/')[2];
  const hostname = getHostname(startUrl);

  const dfs = (urlList: string[], seen: Set<string>) => {
    for (const url of urlList) {
      if (!seen.has(url) && url.includes(hostname)) {
        seen.add(url);
        dfs(htmlParser.getUrls(url), seen);
      }
    }

    return [...seen.values()];
  };

  return dfs(htmlParser.getUrls(startUrl), new Set([startUrl]));
}

// BFS solution
function crawl2(startUrl: string, htmlParser: HtmlParser): string[] {
  const getHostname = (url: string) => url.split('/')[2];
  const hostname = getHostname(startUrl);
  const queue: string[] = [startUrl];
  const seen: Set<string> = new Set([startUrl]);

  while (queue.length) {
    const curr = queue.shift()!;
    for (const url of htmlParser.getUrls(curr)) {
      if (!seen.has(url) && getHostname(url).includes(hostname)) {
        seen.add(url);
        queue.push(url);
      }
    }
  }

  return [...seen.values()];
}
