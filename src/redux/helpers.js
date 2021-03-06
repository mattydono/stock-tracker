export const createURL = (symbols, endpoint, parameters) => {
    return `/stock/${Array.isArray(symbols) ? symbols.join(',') : symbols}/${endpoint}/${parameters ? parameters : ''}`
}

export const fetchData = async (url, callback, error, fetching) => {
    try {
        fetching(true)
        const response = await fetch(url);
        if(response.ok) {
            callback(await response.json());
            error(false);
        }
        else throw new Error(`fetching ${url.split('/')[3]} data unsuccessful`)
    } catch (e) {
        error(e);
    } finally {
        fetching(false);
    }
}
