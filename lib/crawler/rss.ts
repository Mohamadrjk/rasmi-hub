import { prisma } from "@/lib/db";
import Parser from "rss-parser";

const parser = new Parser();

export async function crawlAllRSSFeeds() {
  const sources = await prisma.crawledSource.findMany({
    where: { isActive: true, type: "rss" },
    include: { company: true },
  });

  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source.url);

      for (const item of feed.items) {
        const exists = await prisma.news.findFirst({
          where: { sourceUrl: item.link || "" },
        });

        if (exists) continue; // جلوگری از تکراری

        await prisma.news.create({
          data: {
            title: item.title || "بدون عنوان",
            content: item.content || item.contentSnippet || "",
            summary: item.contentSnippet || null,
            sourceUrl: item.link || "",
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            crawledAt: new Date(),
            sourceType: "rss",
            tags: [],
            isPinned: false,
            company: { connect: { id: source.companyId } },
          },
        });
      }
    } catch (err) {
      console.error("❌ Error crawling:", source.url, err);
    }
  }

  console.log("✅ RSS Crawl Complete");
}
