class API {
    post(path, body = null, config = null) {
        return this.exec("post", path, body, config);
    }

    get(path, config = null) {
        return this.exec("get", path, null, config);
    }

    exec(method, path, body = null, config = {}) {
        const headers = {};
        // Check upload type
        if (body && typeof body == "object" && !(body instanceof FormData)) {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
        }

        // Execute fetch
        return fetch(`/api/${path}`, {
            body,
            method,
            ...config,
            headers
        }).then(async res => {
            if (res.status >= 400) {
                let payload = { message: await res.text() };
                try {
                    payload = JSON.parse(payload.message);
                } catch (e) { }

                throw { status: res.status, statusText: res.statusText, ...payload };
            }

            // Parse json
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (err) {
                return text;
            }
        });
    }
}

export default new API();
