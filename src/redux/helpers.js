export const createURL = (symbols, endpoint, parameters) => {
    return `/stock/${Array.isArray(symbols) ? symbols.join(',') : symbols}/${endpoint}/${parameters ? parameters : ''}`
}

export const fetchData = async (url, callback, error, fetching) => {
    try {
        fetching(true)
        const result = await fetch(url).then(res => res.json());
        callback(result);
    } catch (e) {
        error();
    } finally {
        fetching(false);
    }
}
