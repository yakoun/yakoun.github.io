async function GET() {
  const baseUrl = "https://electrodev.fr";
  const pages = [
    "",
    "/a-propos",
    "/projets",
    "/contact"
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/2001/XMLSchema-instance"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`).join("")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
export {
  GET
};
