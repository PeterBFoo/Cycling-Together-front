var bycicleService = {
    getBycicle: async function (bycicleId) {
        return fetch("http://localhost:3000/bycicles/get/" + bycicleId, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            })
        });
    }
}