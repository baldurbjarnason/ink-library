import got from "got";
import {getLinkPreview} from "link-preview-js"

export async function get(req, res, next) {
    let url = req.query.url;
    if (!url.startsWith('http')) {
        url = `https://${url}`
    }
    getLinkPreview(url).then((result) => {
        res.json(result)
    }).catch(err => {
        return;
    })
}
