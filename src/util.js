export function debounce(func, wait) {
    let timeout;

    return function (...args) {
        const context = this;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

export function objectToHttpParams(obj, prefix = null) {
    if (!obj) {
        return "";
    }

    const list = [];
    for (let entry in obj) {
        if (obj.hasOwnProperty(entry)) {
            const p = prefix ? prefix + "_" + entry : entry;
            const e = obj[entry];
            list.push(e !== null && typeof e === "object" ? objectToHttpParams(e, p) : encodeURIComponent(p) + "=" + encodeURIComponent(e));
        }
    }

    return list.join("&");
}

export function uniqById(arr, track = new Set()) {
    return arr.filter(({ id }) => (track.has(id) ? false : track.add(id)));
}