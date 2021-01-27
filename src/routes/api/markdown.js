const TurndownService = require('turndown')
const turndownService = new TurndownService()
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
  breaks: true,
  linkify: true
});

// Prefix with user id and with random id.
export async function post(req, res, next) {
  const text = req.is("text/markdown");
  const html = req.is("html")
  const body = req.body.toString()
  let content = ""
  if (req.user.profile && req.user.profile.id) {
    if (text) {
      content = md.render(body)
    } else if (html) {
      content = turndownService.turndown(body)
    } else {
      return res.sendStatus(415)
    }
    res.json({text: !text, html: !html, content  });
  }
}
