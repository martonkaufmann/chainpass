import { useEffect, useState } from "react";

const useCache = (cacheName: string) => {
    const [cache, setCache] = useState<Cache | undefined>(undefined);

    useEffect(() => {
        caches.open(cacheName).then((cache) => setCache(cache));
    }, []);

    const add = async (url: URL) => {
        const response = await fetch(url);

        cache?.put(url, response);

        return response;
    };

    const get = async (url: URL) => {
        return await cache?.match(url);
    };

    const cached = async (url: URL) => {
        let response = await cache?.match(url);

        if (response === undefined) {
            response = await fetch(url);

            cache?.put(url, response);
        }

        return response;
    };

    return { add, get, cached };
};

export { useCache };
