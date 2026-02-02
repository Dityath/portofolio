import { XMLParser } from "fast-xml-parser";
import type { MediumPost } from "../types";

/**
 * Fetch Medium posts from RSS feed
 */
export async function getMediumPosts(username: string): Promise<MediumPost[]> {
  const rssUrl = `https://medium.com/feed/@${username}`;

  try {
    const response = await fetch(rssUrl);

    if (!response.ok) {
      console.error("Failed to fetch Medium RSS feed:", response.statusText);
      return [];
    }

    const xml = await response.text();

    // Parse XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });

    const result = parser.parse(xml);

    // Extract items from RSS feed
    const items = result?.rss?.channel?.item || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    // Map to MediumPost type
    const posts: MediumPost[] = itemsArray.map(
      (item: Record<string, unknown>) => ({
        title: item.title || "",
        link: item.link || "",
        pubDate: formatDate(item.pubDate),
        description: stripHtml(
          item["content:encoded"] || item.description || ""
        ),
        thumbnail: extractThumbnail(item["content:encoded"] || ""),
        categories: extractCategories(item.category),
        readTime: calculateReadTime(
          item["content:encoded"] || item.description || ""
        ),
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}

/**
 * Extract thumbnail image from HTML content
 */
function extractThumbnail(html: string): string | undefined {
  const match = html?.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : undefined;
}

/**
 * Extract categories from RSS item
 */
function extractCategories(category: unknown): string[] {
  if (!category) return [];
  if (Array.isArray(category)) return category;
  return [category];
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return (
    html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .substring(0, 200) + "..."
  );
}

/**
 * Format date string
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculate estimated read time
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = stripHtml(content);
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
