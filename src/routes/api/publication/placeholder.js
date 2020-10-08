export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  res.set("Cache-Control", "max-age=31536000, immutable");
  res.json({ type: "loading", items: [], tags: [], keywords: [], replies: [] });
}
