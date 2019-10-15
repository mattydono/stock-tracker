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
        else throw new Error(`Failed to fetch ${url.split('/')[3]} data`)
    } catch (e) {
        error(e);
    } finally {
        fetching(false);
    }
}

export const getExpirationDate = () => {
    let date = new Date();
    const shouldAddDay = date.getUTCHours() >= 14 && date.getUTCMinutes() >= 30;
    date.setUTCDate(date.getUTCDate() + Number(shouldAddDay));
    date.setUTCHours(14, 30, 0, 0)
    return date;
}