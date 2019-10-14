export const createURL = (symbols, endpoint, parameters) => {
    return `/stock/${Array.isArray(symbols) ? symbols.join(',') : symbols}/${endpoint}/${parameters ? parameters : ''}`
}

export const fetchData = async (url, callback, error, fetching) => {
    try {
        fetching(true);
        const response = await fetch(url);
        if(response.ok) {
            callback(await response.json());
            error(false);
        }
        else throw new Error(`fetching ${url.split('/')[3]} data for ${url.split('/')[2]} unsuccessful`)
    } catch (e) {
        error(e);
    } finally {
        fetching(false);
    }
}

export const getExpirationDate = (range) => {
    let date = new Date();
    if (range !== '1d') {
        const shouldAddDay = date.getUTCHours() >= 14 && date.getUTCMinutes() >= 30;
        date.setUTCDate(date.getUTCDate() + Number(shouldAddDay));
        date.setUTCHours(14, 30, 0, 0)
    } else {
        date.setUTCMinutes(date.getUTCMinutes() + 1);
    }

    return date;
}