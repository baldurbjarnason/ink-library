import got from "got";

export async function post(req, res, next) {
  let author
  if (req.body.author) {
    author = req.body.author.split(',').map(name => {
      return {
        type: "Person",
        name: name.trim()
      }
    })
  }
  const type = req.body.pubType || 'Publication'
  let links
  if (req.body.newURL) {
    links = [{
      rel: "alternate",
      url: req.body.newURL
    }]
  }
  const body = {
    type,
    author,
    links,
    name: req.body.name
  }
  console.log(req.body)
  if (req.user && req.user.profile) {
    try {
      const response = await got.post(`${process.env.API_SERVER}publications`, {
        headers: {
          "content-type": "application/ld+json",
          Authorization: `Bearer ${req.user.token}`
        },
        body: JSON.stringify(body)
      }).json();
      // Check workspace, if there is one, add
      if (req.body.addWorkspace !== 'all') {
        await got.put(`${response.id}tags/${req.body.addWorkspace}`, {
          headers: {
            "content-type": "application/ld+json",
            Authorization: `Bearer ${req.user.token}`
          }
        }).json();
      }
      return res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.json(err.body);
    }
  }
}