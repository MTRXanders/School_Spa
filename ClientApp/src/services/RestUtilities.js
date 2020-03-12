
export default  class  RestUtilities {

    constructor() {
    }
    get(url) {
        console.log("GET", url)
        return this.request('GET', url);
    }
    post(url, data) {
        console.log("POST", url, data)
        return this.request('POST', url, data);

    }
    put(url, data) {
        console.log("PUT", url, data)
        return this.request('PUT', url, data);
    }
    delete(url) {
        console.log("DELETE", url)
        return this.request('DELETE', url);
    }
    async request(method, url, data) {
        let isBadRequest,
            body = data,
            headers = new Headers();
        headers.set("Accept", "application/json");

        if (data) {
            if (typeof data === "object") {
                headers.set("Content-Type", "application/json");

                body = JSON.stringify(data);
            } else {
                headers.set('Content-Type', 'application/x-www-form-urlencoded')
            }
        }

        return await fetch(url, {
            method: method,
            headers: headers,
            body: body,
            credentials: 'include'
        }).then((response) => {
            //  console.log(response)
            if (!response.ok) {
                throw Error(response.statusText);
            }
            if (response.status === 401) {
                this.AuthService.removeToken();
                window.location.replace(`/?expired=1`);
            }
            isBadRequest = response.status === 400;
          
            let responseContentType = response.headers.get("content-type")
            if (responseContentType && responseContentType.indexOf("application/json") !== 1) {
                return response.json();
            } else {
                return response.text()
            }
        }).catch(responseContent => {
            let response = {
                is_error: isBadRequest,
                error_content: isBadRequest,
                content: isBadRequest ? null : responseContent
            }
            //  console.log(response);
            return response;
        })


    }
}
