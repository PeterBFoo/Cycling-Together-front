var contentController = {
    load() {
        !this.checkIfHasBookingId() ? this.redirectToErrorPage() : null;

        document.getElementById("fillableBookingIdText").innerHTML = `Your booking ID is: <strong>${utils.getUrlParam("bookingId")}</strong>, please keep it for future reference. You can consult your booking details in the "My Booking" section.`;
        document.getElementById("bookingDetails").innerHTML = "<p>Loading booking details...</p>";
        bookingService.getBooking(utils.getUrlParam("bookingId"))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(booking => {
                this.printBookingDetails(booking);
            });
    },

    printBookingDetails(booking) {
        let bookingDetailsContainer = document.getElementById("bookingDetails");
        if (!booking.canceled) {
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
                        <p><strong>Start date</strong>: ${startDate.toLocaleDateString()}</p>
                        <p><strong>End date</strong>: ${endDate.toLocaleDateString()}</p>
                        <p><strong>Price</strong>: ${booking.total.toFixed(2)}€</p>
                    `;
        } else {
            document.getElementById("cancelBooking").hidden = true;
            document.getElementById("printButton").hidden = true;
            bookingDetailsContainer.innerHTML = `
                        <h2>Booking details</h2>
                        <p>Your booking with ID <strong>${booking.publicId}</strong> is canceled. Thank you so much, dear customer</p>
                    `;
        }
    },

    cancelBooking() {
        bookingService.cancelBooking(utils.getUrlParam("bookingId"))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(booking => {
                window.location.reload();
            });
    },

    redirectToErrorPage() {
        window.location.href = "/error/errorPage.html";
    },

    checkIfHasBookingId() {
        return utils.getUrlParam("bookingId") != "";
    }
}