import got from "got";

export async function post(req, res, next) {
  console.log(req.body)
  let author
  if (req.body.author) {
    author = req.body.author.split(',').map(name => {
      return {
        type: "Person",
        name: name.trim()
      }
    })
  }
  const body = {
    type: 'Publication',
    author,
    name: req.body.name
  }
  console.log(JSON.stringify(body))
  if (typeof req.body !== "string") {
    req.body = JSON.stringify(req.body);
  }
  if (req.user && req.user.profile) {
    try {
      const response = await got.post(`${process.env.API_SERVER}publications`, {
        headers: {
          "content-type": "application/ld+json",
          Authorization: `Bearer ${req.user.token}`
        },
        body: JSON.stringify(body)
      }).json();
      return res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.json(err.body);
    }
  }
}