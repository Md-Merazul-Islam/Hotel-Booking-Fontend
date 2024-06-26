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

    // Display filtered hotels
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
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
                                <small class="fa fa-star text-primary"></small>
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

        // Attach event listeners for "View Detail" and "Book Now" buttons
        document.querySelectorAll('.view-detail-button').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const hotelId = this.getAttribute('data-hotel-id');
                showHotelDetails(hotelId);
            });
        });

        document.querySelectorAll('.book-now-button').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const hotelId = this.getAttribute('data-hotel-id');
                bookHotel(hotelId);
            });
        });
    }

    // Generate star rating HTML
    function generateStars(rating) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(`<small class="fa fa-star ${i < rating ? 'text-primary' : ''}"></small>`);
        }
        return stars.join('');
    }

    // Truncate text to a specified length
    function truncateText(text, length) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    // Show hotel details in modal
    function showHotelDetails(hotelId) {
        const hotel = hotels.find(h => h.id === hotelId);
        if (hotel) {
            hotelDetailsContent.innerHTML = `
                <h5>${hotel.name}</h5>
                <p>${hotel.description}</p>
                <p><strong>Price:</strong> $${hotel.price_per_night}/Night</p>
                <p><strong>Address:</strong> ${hotel.address}</p>
                <p><strong>District:</strong> ${hotel.district_name}</p>
            `;
            hotelDetailsModal.show();
        }
    }

    // Handle hotel booking
    function bookHotel(hotelId) {
        // Implement your booking logic here
        alert(`Book hotel with ID: ${hotelId}`);
    }

    // Fetch hotels data on page load
    fetchHotels();
});

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}
