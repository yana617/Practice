window.myFetch = (function () {
    return {
        serverRequest: function (method, url, data) {
            return fetch(url, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: method,
            }).then((response) => {
                if (response.ok)
                    return response.status !== 204 ? response.json() : response;
                else
                    throw new Error(response.statusText);
            });
        },
        serverSendFile: function(method, url, data){
            return fetch(url, {
                body: data,
                method: method
            }).then((response)=>{
                if (response.ok)
                    return response;
                else
                    throw new Error(response.statusText);
            });
        }
    }
})();