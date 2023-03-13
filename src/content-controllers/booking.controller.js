var contentController = {
    load() {
        !this.checkIfHasDesiredParams() ? this.redirectToErrorPage() : null;

        this.validatorsChain = {
            validators: [
                this.validateRequest,
                this.checkDatesAreCorrect
            ],

            runValidators: function () {
                for (let i = 0; i < this.validators.length; i++) {
                    if (this.validators[i]() === false) {
                        return false;
                    }
                }
                return true;
            }
        };
        this.pricePerDay = undefined;

        let bycicleId = utils.getUrlParam("bycicleId");
        bycicleService.getBycicle(bycicleId).then((response) => {
            if (!response.ok) {
                this.error();
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        }).then((data) => {
            this.pricePerDay = data.price;
        }).catch((error) => {
            console.log(error);
        });

        document.querySelector(".header-container").innerHTML = headerComponent.fillTemplateDefault();
    },

    calculatePrice() {
        if (contentController.checkDatesAreCorrect()) {
            let startDate = document.getElementById("startDate").value;
            let endDate = document.getElementById("endDate").value;
            let price = document.getElementById("price");
            if (startDate === "" || endDate === "") {
                price.innerHTML = "";
            } else {
                let days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
                document.getElementById("price").innerHTML = `Total price: ${(days * contentController.pricePerDay).toFixed(2)} €`;
            }
        }
    },

    checkDatesAreCorrect() {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let valid = true;
        if (startDate === "" || endDate === "") {
            valid = false;
        } else if (startDate > endDate) {
            document.getElementById("error").innerHTML = "Start date must be before end date";
            valid = false;
        } else if (startDate === endDate) {
            document.getElementById("error").innerHTML = "Start date must be different from end date";
            valid = false;
        } else if (startDate < new Date().toISOString().split("T")[0]) {
            document.getElementById("error").innerHTML = "Start date must be after today";
            valid = false;
        } else if (endDate < new Date().toISOString().split("T")[0]) {
            document.getElementById("error").innerHTML = "End date must be after today";
            valid = false;
        } else {
            document.getElementById("error").innerHTML = "";
        }
        !valid ? document.getElementById("price").innerHTML = "" : null;
        return valid;
    },

    validateRequest() {
        let name = document.getElementById("name").value;
        let surname = document.getElementById("surname").value;
        let email = document.getElementById("email").value;
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        let values = [name, surname, email, startDate, endDate];
        for (let i = 0; i < values.length; i++) {
            if (values[i] == "") {
                document.getElementById("error").innerHTML = "Please fill all the compulsory fields";
                return false;
            }
        }

        return true;
    },

    createRequest() {
        let nValidators = this.validatorsChain.validators.length;
        for (let i = 0; i < nValidators; i++) {
            if (this.validatorsChain.runValidators() === false) {
                return;
            }
        }

        let newBooking = {
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phone").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            bycicleId: parseInt(utils.getUrlParam("bycicleId")),
            storeId: parseInt(utils.getUrlParam("storeId"))
        };

        this.createBooking(newBooking);
    },

    createBooking(booking) {
        bookingService.registerBooking(booking)
            .then((response) => {
                if (!response.ok) {
                    this.error();
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let booking = data;
                window.location = `./confirmation.html?bookingId=${booking.publicId}`;
            })
    },

    checkIfHasDesiredParams() {
        let paramNames = utils.getParamNames(["bycicleId", "storeId"]);
        return paramNames.length === 2;
    },

    error() {
        document.querySelector(".content").innerHTML = `<h1 class="availabilityNotFound" >Sorry, something went wrong in the creation of your booking. Please, contact to this email to reach to a solution cyclingtogether@help.com.</h1>`;
    },

    redirectToErrorPage() {
        window.location = "./error/errorPage.html";
    }
}