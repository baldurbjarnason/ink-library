/*import got from "got";
export async function get(req, res, next) {
    if (!req.user.profile) return res.sendStatus(401);
    try {
        const url = `${process.env.API_SERVER}${req.params.path.join("/")}`;
        const response = await got(url, {
            headers: {
                Authorization: `Bearer ${req.user.token}`
            }
        }).json();
        res.json(response);
    } catch (err) {
        if (err.response && err.response.statusCode) {
            res.status(err.response.statusCode);
            return res.json(JSON.parse(err.response.body));
        } else {
            res.status(500);
            return res.json(JSON.parse(err));
        }
    }
}

export const post = async function post(req, res, next) {
    if (!req.user.profile) return res.sendStatus(401);
    if (req.user && req.user.profile) {
        try {
            const response = await got
                .post(`${process.env.API_SERVER}${req.params.path.join("/")}`, {
                    headers: {
                        "content-type": "application/ld+json",
                        Authorization: `Bearer ${req.user.token}`
                    },
                    json: req.body
                })
                .json();
            return res.json(response);
        } catch (err) {
            console.error(err);
            res.status(err.response.statusCode);
            return res.json(JSON.parse(err.response.body));
        }
    }
};*/