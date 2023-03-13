var contentController = {
    load() {
        !this.checkIfHasDesiredParams() ? this.redirectToErrorPage() : null;

        document.querySelector(".header-container").innerHTML = headerComponent.fillTemplateDefault();
        let bycicleId = utils.getUrlParam("bycicleId");

        bycicleService
            .getBycicle(bycicleId)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let bycicle = data;
                bycicle.storeId = utils.getUrlParam("storeId");
                let bycicleCard = bycicleComponent.fillTemplate(bycicle);
                document.querySelector(".content").innerHTML = bycicleCard;
            })
            .catch((error) => {
                this.bycicleError(error);
            });
    },

    bycicleError(error) {
        document.querySelector(".content").innerHTML = `<h1 class="availabilityNotFound" >Sorry, we are not able to show you the bycicle at the moment. Please try again later.</h1>`;
        console.log(error);
    },

    redirectToErrorPage() {
        window.location.href = "/error/errorPage.html";
    },

    checkIfHasDesiredParams() {
        let paramNames = utils.getParamNames(["bycicleId", "storeId"]);
        return paramNames.length === 2;
    }

}