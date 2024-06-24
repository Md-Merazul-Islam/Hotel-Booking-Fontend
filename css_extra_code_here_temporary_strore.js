



document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('categorySelect');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('resultsContainer');

    let hotels = [];

    async function fetchHotels() {
        try {
            const response = await fetch('https://blueskybooking.onrender.com/hotel/hotels/');
            if (!response.ok) throw new Error('Failed to fetch hotels data');
            hotels = await response.json();
            populateCategories();
            displayResult(hotels);
        } catch (error) {
            resultsContainer.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    // Populate district dropdown
    function populateCategories() {
        const districts = [...new Set(hotels.map(hotel => hotel.district_name))];
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            categorySelect.appendChild(option);
        });
    }

    // Display filtered hotels
    function displayResult(filteredHotels) {
        resultsContainer.innerHTML = ''; // Clear previous content

        if (filteredHotels.length === 0) {
            resultsContainer.innerHTML = '<div class="alert alert-warning">No hotels found.</div>';
            return;
        }

        filteredHotels.forEach(hotel => {
            // Create the main hotel card container
            const hotelCard = document.createElement('div');
            hotelCard.className = 'packages-item'; // Set the class name

            // Set the inner HTML for the hotel card
            hotelCard.innerHTML = `
                <div class="room-item shadow rounded overflow-hidden">
                    <div class="position-relative">
                        <img class="img-fluid" src="${hotel.photo}" alt="${hotel.name}">
                        <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">${hotel.price_per_night}/Night</small>
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
                            <small class="border-end me-3 pe-3"><i class="fa fa-bath text-primary me-2"></i>1 Bath</small>
                            <small><i class="fa fa-wifi text-primary me-2"></i>Wifi Free</small>
                        </div>
                        <p>Address: ${hotel.address}</p>
                        <p class="text-body mb-3">${hotel.description}</p>
                        <p class="card-text"><small class="text-muted">${hotel.district_name}</small></p>
                        <div class="d-flex justify-content-between">
                            <a class="btn btn-sm btn-primary rounded py-2 px-4" href="#">View Detail</a>
                            <a class="btn btn-sm btn-dark rounded py-2 px-4" href="#">Book Now</a>
                        </div>
                    </div>
                </div>
            `;

            // Append the hotel card to the results container
            resultsContainer.appendChild(hotelCard);
        });

        // Initialize Owl Carousel after updating content
        $('.packages-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    // Filter hotels based on search criteria
    function filterHotels() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedDistrict = categorySelect.value.trim();
        const filteredHotels = hotels.filter(hotel => {
            const matchesName = hotel.name.toLowerCase().includes(searchTerm);
            const matchesDistrict = selectedDistrict ? hotel.district_name === selectedDistrict : true;
            return matchesName && matchesDistrict;
        });
        displayResult(filteredHotels);
    }

    // Event listeners
    searchButton.addEventListener('click', filterHotels);
    searchInput.addEventListener('input', filterHotels); // For live filtering

    // Fetch hotels on page load
    fetchHotels();
});

\













