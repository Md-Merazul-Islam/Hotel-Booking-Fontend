document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("categorySelect");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultsContainer = document.getElementById("resultsContainer");
  const hotelDetailsModal = new bootstrap.Modal(
    document.getElementById("hotelDetailsModal")
  );
  const hotelDetailsContent = document.getElementById("hotelDetailsContent");

  let hotels = [];
  let districts = [];

  async function fetchHotels() {
    try {
      const response = await fetch(
        "https://hotel-booking-website-backend.vercel.app/hotel/hotels/"
      );
      const data = await response.json();
      console.log(data);
      hotels = Array.isArray(data) ? data : data.hotels || data.results || [];
      displayResult(hotels);
    } catch (error) {
      resultsContainer.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
  }

  // Fetch districts from the provided API
  async function fetchDistricts() {
    try {
      const response = await fetch(
        "https://hotel-booking-website-backend.vercel.app/hotel/districts/"
      );
      const data = await response.json();
      districts = data;
      populateCategories();
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  }

  // Populate district dropdown with fetched districts
  function populateCategories() {
    categorySelect.innerHTML = '<option value="">All Districts</option>';
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.district_name;
      option.textContent = district.district_name;
      categorySelect.appendChild(option);
    });
  }

  // Display filtered hotels
  function displayResult(filteredHotels) {
    resultsContainer.innerHTML = "";

    if (filteredHotels.length === 0) {
      resultsContainer.innerHTML = `<div class="alert alert-warning text-center">  <a id="seeMoreButton" class="" onclick="window.location.href='room.html';">
                      To find your hotel click see more 
                    </a> </div>`;
      return;
    }

    const carouselContainer = document.createElement("div");
    carouselContainer.className = "owl-carousel packages-carousel";

    filteredHotels.forEach((hotel) => {
      const hotelCard = document.createElement("div");
      hotelCard.className = "packages-item";
      const truncatedDescription = truncateText(hotel.description, 150);
      const truncatedAddress = truncateText(hotel.address, 45);

      hotelCard.innerHTML = `
        <div class="card-container">
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
        </div>
        `;

      carouselContainer.appendChild(hotelCard);
    });

    resultsContainer.appendChild(carouselContainer);

    // Initialize the carousel
    $(carouselContainer).owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });

    // View details
    const viewDetailButtons = document.querySelectorAll(".view-detail-button");
    viewDetailButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const hotelId = button.getAttribute("data-hotel-id");
        fetchHotelDetails(hotelId);
      });
    });

    // Book now
    const bookNowButtons = document.querySelectorAll(".book-now-button");
    bookNowButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const hotelId = button.getAttribute("data-hotel-id");
        handleBooking(hotelId);
      });
    });
  }

  // Fetch and display hotel details
  async function fetchHotelDetails(hotelId) {
    try {
      const response = await fetch(
        `https://hotel-booking-website-backend.vercel.app/hotel/hotels/${hotelId}/`
      );
      if (!response.ok) throw new Error("Failed to fetch hotel details");
      const hotel = await response.json();
      populateHotelDetails(hotel);
    } catch (error) {
      hotelDetailsContent.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
      hotelDetailsModal.show();
    }
  }

  // Populate hotel details in the modal
  function populateHotelDetails(hotel) {
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
    hotelDetailsModal.show();
  }

  function isLoggedIn() {
    return localStorage.getItem("token") !== null;
  }

  // Handle booking based on login status
  function handleBooking(hotelId) {
    console.log("Hotel ID:", hotelId); // Check if the correct hotel ID is being passed
    if (isLoggedIn()) {
      console.log("User is logged in. Redirecting to booking page...");
      window.location.href = `hotel_booking.html?hotelId=${hotelId}`;
    } else {
      console.log("User is not logged in. Redirecting to login page...");
      window.location.href = "login.html";
    }
  }

  // Filter hotels based on search criteria
  function filterHotels() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedDistrict = categorySelect.value.trim();

    const filteredHotels = hotels.filter((hotel) => {
      const matchesName = hotel.name.toLowerCase().includes(searchTerm);
      const matchesDistrict = selectedDistrict
        ? hotel.district_name === selectedDistrict
        : true;
      return matchesName && matchesDistrict;
    });

    console.log("Filtered Hotels:", filteredHotels);
    displayResult(filteredHotels);
  }

  // Event listeners
  searchButton.addEventListener("click", filterHotels);
  searchInput.addEventListener("input", filterHotels);

  fetchHotels();
  fetchDistricts();
});

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
