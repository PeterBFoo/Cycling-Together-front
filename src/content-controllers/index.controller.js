var contentController = {
    load() {
        this.availabilities = [];
        this.pagination = 3;
        this.currentPage = 1;
        this.maxPage = 0;
        this.availableFilters = ["category"];

        document.querySelector(".header-container").innerHTML = headerComponent.fillTemplateDefault();

        availabilityService.getAvailability().then((response) => {
            if (!response.ok) {
                this.noAvailability();
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            this.maxPage = Math.ceil(data.length / this.pagination);

            if (this.areFiltersOn()) {
                let paramNames = utils.getParamNames(this.availableFilters);
                paramNames.forEach((param) => {
                    data = this.filterData(data, param, utils.getUrlParam(param));

                    if (data.length <= this.pagination) {
                        document.querySelector(".pagination").style.visibility = "hidden";
                    } else {
                        this.noResults();
                    }
                    document.querySelector("#filters").innerHTML += `<button class="effect" onclick="contentController.removeFilters()">Remove filters</button>`;
                })
            }

            data.forEach((availability) => {
                this.availabilities.push(availability);
            });

            let cards = cardComponent.fillTemplate(this.availabilities.slice(0, this.pagination));

            cards.forEach((card) => {
                document.querySelector(".content").innerHTML += card;
            });
            document.querySelector("#pageIndicator").innerHTML = this.currentPage + "/" + this.maxPage;

        }).catch((error) => {
            console.log(error);
        });
    },

    filterData(data, filteredProperty, filterValue) {
        let dataNames = data.length > 0 ? Object.getOwnPropertyNames(data[0].bycicle) : [];

        for (let i = 0; i < dataNames.length; i++) {
            if (dataNames[i] == filteredProperty) {
                return data.filter((availability) => availability.bycicle[filteredProperty] === filterValue);
            }
        };
    },

    areFiltersOn() {
        for (let i = 0; i < this.availableFilters.length; i++) {
            if (utils.getUrlParam(this.availableFilters[i])) {
                return true;
            }
        }
        return false;
    },

    nextPage() {
        this.currentPage++;
        this.show(document.getElementById("previous"));
        this.hideIfLastPage(document.getElementById("next"));

        document.querySelector(".content").innerHTML = "";
        document.querySelector("#pageIndicator").innerHTML = this.currentPage + "/" + this.maxPage;

        let cards = cardComponent.fillTemplate(
            this.availabilities.slice((this.currentPage - 1) * this.pagination, this.currentPage * this.pagination)
        );
        cards.forEach((card) => {
            document.querySelector(".content").innerHTML += card;
        });
    },

    previousPage() {
        this.currentPage--;
        this.hideIfFirstPage(document.getElementById("previous"));
        this.show(document.getElementById("next"));

        document.querySelector(".content").innerHTML = "";
        document.querySelector("#pageIndicator").innerHTML = this.currentPage + "/" + this.maxPage;

        let cards = cardComponent.fillTemplate(
            this.availabilities.slice((this.currentPage - 1) * this.pagination, this.currentPage * this.pagination)
        );
        cards.forEach((card) => {
            document.querySelector(".content").innerHTML += card;
        });
    },

    removeFilters() {
        window.location.href = "./index.html";
    },

    noAvailability() {
        document.querySelector(".content").innerHTML = `<h1 class="availabilityNotFound" >Sorry, we are not able to show you the availabilities at the moment. Please try again later.</h1>`;
        document.querySelector(".pagination").innerHTML = "";
    },

    noResults() {
        document.querySelector(".content").innerHTML = `<h1 class="availabilityNotFound" >Sorry, we are not able to find any availability that matches your filters. Please try again with different filters.</h1>`;
        document.querySelector(".pagination").innerHTML = "";
    },

    hideIfFirstPage(element) {
        if (this.currentPage == 1) {
            element.style.visibility = "hidden";
        }
    },

    hideIfLastPage(element) {
        if (this.currentPage == this.maxPage) {
            element.style.visibility = "hidden";
        }
    },

    hide(element) {
        element.style.visibility = "hidden";
    },

    show(element) {
        element.style.visibility = "visible";
    }
}