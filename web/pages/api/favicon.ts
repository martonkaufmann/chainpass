import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

type Data = {
    url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | null>) {
    let domain = req.query.domain;

    if (domain === undefined) {
        return res.status(404);
    }

    if (Array.isArray(domain)) {
        domain = domain[0];
    }

    if (false === domain.startsWith("http")) {
        domain = `http://${domain}`;
    }

    const url = new URL(domain);
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    let $icons = $('link[rel="apple-touch-icon"]');

    if ($icons.length === 0) {
        $icons = $('link[rel="icon"]');
    }

    if ($icons.length === 0) {
        return res.status(404).send(null);
    }

    let iconURL = $icons.last().attr("href");

    if (iconURL === undefined) {
        return res.status(404).send(null);
    }

    if (false === iconURL.includes(url.hostname)) {
        if (iconURL.startsWith("/")) {
            iconURL = `${url.host}${iconURL}`;
        } else {
            iconURL = `${url.host}/${iconURL}`;
        }

        iconURL = `https://${iconURL}`;
    }

    res.status(200).json({ url: iconURL });
}
