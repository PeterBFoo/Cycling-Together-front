var contentController = {
    load() {
        document.querySelector("#bookingDetails").addEventListener("DOMSubtreeModified", () => {
            document.getElementById("error").innerHTML = "";
            if (document.getElementById("bookingDetails").innerHTML.length <= 0) {
                document.getElementById("bookingSearcher").hidden = false;
                document.getElementById("navigation").className = "hidden";
            } else {
                document.getElementById("bookingSearcher").hidden = true;
                document.getElementById("navigation").className = "navigation";
            }
        });
    },

    cancelBooking() {
        let bookingId = document.getElementById("bookingId").value;
        bookingService.cancelBooking(bookingId)
            .then((response) => {
                if (response.status == 404) {
                    document.getElementById("error").innerHTML = "Booking not found";
                    return false;
                } else if (response.status == 500) {
                    document.getElementById("error").innerHTML = "Something went wrong, please contact the administrator or wait for the error to be fixed";
                    return false;
                }
                return response.json();
            })
            .then(booking => {
                document.getElementById("cancelBooking").hidden = true;
                let bookingDetailsContainer = document.getElementById("bookingDetails");
                bookingDetailsContainer.innerHTML = `
                    <h2>Booking details</h2>
                    <p>Your booking with ID <strong>${booking.publicId}</strong> is canceled. Thank you so much, dear customer</p>
                `;
            })
            .catch((error) => {
                console.log(error);
            });
    },

    showSearcher() {
        document.getElementById("bookingDetails").innerHTML = "";
        document.getElementById("bookingSearcher").hidden = false;
        document.getElementById("navigation").hidden = true;
    },

    searchBooking() {
        let bookingId = document.getElementById("bookingId").value;

        if (bookingId.length != 8) {
            document.getElementById("error").innerHTML = "Please, enter a valid booking ID, it must have 8 characters";
            return;
        }

        bookingService.getBooking(bookingId)
            .then((response) => {
                if (response.status == 404) {
                    document.getElementById("error").innerHTML = "Booking not found";
                    return false;
                } else if (response.status == 500) {
                    document.getElementById("error").innerHTML = "Something went wrong, please contact the administrator or wait for the error to be fixed";
                    return false;
                }
                return response.json();
            })
            .then(booking => {
                if (!booking) {
                    return;
                } else {
                    this.printBookingDetails(booking);
                }
            })
            .catch(error => {
                console.log(error);
                alert("There was an error searching your booking, please try again later.");
            });
    },

    printBookingDetails(booking) {
        let bookingDetailsContainer = document.getElementById("bookingDetails");
        if (!booking.canceled) {
            document.getElementById("navigation").hidden = false;
            document.getElementById("cancelBooking").hidden = false;
            let startDate = new Date(booking.startDate);
            let endDate = new Date(booking.endDate);

            bookingDetailsContainer.innerHTML = `
                    <h2>Booking details</h2>
                    <p><strong>Name</strong>: ${booking.name}</p>
                    <p><strong>Surname</strong>: ${booking.surname}</p>
                `;

            if (booking.email) {
                bookingDetailsContainer.innerHTML += `<p><strong>Email</strong>: ${booking.email}</p>`;
            }

            if (booking.phoneNumber) {
                bookingDetailsContainer.innerHTML += `<p><strong>Phone</strong>: ${booking.phoneNumber}</p>`;
            }

            bookingDetailsContainer.innerHTML += `
                    <p><strong>Start date</strong>: ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}</p>
                    <p><strong>End date</strong>: ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}</p>
                    <p><strong>Price</strong>: ${booking.total.toFixed(2)}€</p>
                `;

            if (booking.isActive) {
                bookingDetailsContainer.innerHTML += `<p><strong>Active</strong>: Yes</p>`;
            } else {
                bookingDetailsContainer.innerHTML += `<p><strong>Active</strong>: No</p>`;
            }

            bookingDetailsContainer.innerHTML += `
                <div class="littleDivider"></div>
                <h2>Bycicle details</h2>
                <p><strong>Model</strong>: ${booking.bycicle.model}</p>
                <p><strong>Brand</strong>: ${booking.bycicle.brand}</p>
                <p><strong>Price per day</strong>: ${booking.bycicle.price.toFixed(2)}€</p>
                <div class="littleDivider"></div>
                <h2>Official store</h2>
                <p><strong>Name</strong>: ${booking.store.storeName}</p>
                <p><strong>Address</strong>: ${booking.store.address}</p>
                <p><strong>Phone</strong>: ${booking.store.phoneNumber}</p>
                <p><strong>Email</strong>: ${booking.store.email}</p>
                `;
        } else {
            document.getElementById("cancelBooking").hidden = true;
            document.getElementById("printButton").hidden = true;
            bookingDetailsContainer.innerHTML = `
                    <h2>Booking details</h2>
                    <p>Your booking with ID <strong>${booking.publicId}</strong> is canceled. Thank you so much, dear customer</p>
                `;
        }
    }
}