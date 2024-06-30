

document.addEventListener('DOMContentLoaded', function () {
    const resultsContainer = document.getElementById('resultsContainer');
    const hotelDetailsModal = new bootstrap.Modal(document.getElementById('hotelDetailsModal'));
    const hotelDetailsContent = document.getElementById('hotelDetailsContent');

    let hotels = [];

    async function fetchHotels() {
        try {
            const response = await fetch('https://blueskybooking.onrender.com/hotel/hotels/');
            if (!response.ok) throw new Error('Failed to fetch hotels data');
            hotels = await response.json();
            displayResult(hotels);
        } catch (error) {
            resultsContainer.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    function displayResult(filteredHotels) {
        resultsContainer.innerHTML = '';

        if (filteredHotels.length === 0) {
            resultsContainer.innerHTML = '<div class="alert alert-warning">No hotels found.</div>';
            return;
        }

        filteredHotels.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'col-lg-4 col-md-6 wow fadeInUp';
            hotelCard.setAttribute('data-wow-delay', '0.1s');
            const truncatedDescription = truncateText(hotel.description, 150);
            const truncatedAddress = truncateText(hotel.address, 45);

            hotelCard.innerHTML = `
               <div class="room-item shadow rounded overflow-hidden">
                    <div class="position-relative">
                        <img class="card-img-top" src="${hotel.photo}" alt="${hotel.name}">
                        <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">$${hotel.price_per_night}/Night</small>
                    </div>
                    <div class="p-4 mt-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h5 class="mb-0">${hotel.name}</h5>
                            <div class="ps-2">
                                ${generateStars(5)} <!-- Assuming all hotels have 5 stars for now -->
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <small class="border-end me-3 pe-3"><i class="fa fa-bed text-primary me-2"></i>Available rooms: ${hotel.available_room}</small>
                            <small class="border-end me-3 pe-3"><i class="fa fa-bed text-primary me-2"></i>1 Bed</small>
                            <small><i class="fa fa-wifi text-primary me-2"></i>Wifi Free</small>
                        </div>
                        <small>${truncatedAddress}</small>
                        <p class="text-body mb-3">${truncatedDescription}</p>
                        <p class="card-text"><small class="text-muted">${hotel.district_name}</small></p>
                        <div class="d-flex justify-content-between">
                            <a class="btn btn-sm btn-primary rounded py-2 px-4 view-detail-button" href="#" data-hotel-id="${hotel.id}">View Detail</a>
                                <a class="btn btn-sm btn-dark rounded py-2 px-4 book-now-button" href="#" data-hotel-id="${hotel.id}">Book Now</a>
                        </div>
                    </div>
                </div>
            `;

            resultsContainer.appendChild(hotelCard);
        });

        //  "View Detail" and "Book Now" buttons
        document.querySelectorAll('.view-detail-button').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const hotelId = this.getAttribute('data-hotel-id');
                console.log(`View Detail clicked for hotel ID: ${hotelId}`);
                showHotelDetails(hotelId);
            });
        });

        // "Book Now" buttons
        const bookNowButtons = document.querySelectorAll('.book-now-button');
        bookNowButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const hotelId = button.getAttribute('data-hotel-id');
                console.log(`Book Now clicked for hotel ID: ${hotelId}`);
                handleBooking(hotelId);
            });
        });
    }

    function generateStars(rating) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(`<small class="fa fa-star ${i < rating ? 'text-primary' : ''}"></small>`);
        }
        return stars.join('');
    }

    function truncateText(text, length) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    function showHotelDetails(hotelId) {
        const hotel = hotels.find(h => h.id == hotelId);
        if (hotel) {
            hotelDetailsContent.innerHTML = `
                 <div class="row">
                <div class="col-md-6">
                    <img class="img-fluid rounded" src="${hotel.photo}" alt="${hotel.name}">
                </div>
                <div class="col-md-6">
                    <h4>${hotel.name}</h4>
                    <p><strong>Address:</strong> ${hotel.address}</p>
                    <p><strong>Description:</strong> ${hotel.description}</p>
                    <p><strong>Price per night:</strong> ${hotel.price_per_night}</p>
                    <p><strong>Available rooms:</strong> ${hotel.available_room}</p>
                    <p><strong>District:</strong> ${hotel.district_name}</p>
                </div>
            </div>
            `;
            console.log(`Showing details for hotel ID: ${hotelId}`);
            hotelDetailsModal.show();
        } else {
            console.error(`Hotel not found for ID: ${hotelId}`);
        }
    }
    
    function isLoggedIn() {
        return !!localStorage.getItem('user_id');
    }

    function handleBooking(hotelId) {
        if (isLoggedIn()) {
            const bookingUrl = `hotel_booking.html?hotelId=${hotelId}`;
            console.log(`Redirecting to: ${bookingUrl}`);
            window.location.href = bookingUrl;
        } else {
            const loginUrl = 'login.html';
            console.log(`Redirecting to: ${loginUrl}`);
            window.location.href = loginUrl;
        }
    }

    fetchHotels();
});
