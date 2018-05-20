window.myFetch = {
    serverRequest(method, url, data) {
        return fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Set-Cookie': 'true',
            },
            credentials: 'include',
            method,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error();
        });
    },
    serverSendFile(method, url, data) {
        return fetch(url, {
            body: data,
            method,
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                return response;
            }
            throw new Error(response.statusText);
        });
    },
};
