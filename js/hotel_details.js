// Show the spinner initially
document.getElementById("spinner").style.display = "flex";

// Get hotel ID from URL
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get("id");

if (!hotelId) {
  console.error("Hotel ID not found in URL");
  // Hide the spinner and show an error message
  document.getElementById("spinner").style.display = "none";
  document.getElementById("content").innerHTML = "<p>Hotel ID not found.</p>";
} else {
  const apiURL = `https://hotel-booking-website-backend.vercel.app/hotel/hotels/${hotelId}/`;

  async function fetchHotelData() {
    try {
      const response = await fetch(apiURL);

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const hotel = await response.json(); 

      // Inject hotel data into HTML
      document.getElementById("hotelImage").src =
        hotel.photo || "default-image.jpg";
      document.getElementById("hotelName").innerText = hotel.name || "N/A";
      document.getElementById("hotelAddress").innerText =
        hotel.address || "N/A";
      document.getElementById("hotelPrice").innerText = `$${
        hotel.price_per_night || "0.00"
      }`;
      document.getElementById("hotelDescription").innerText =
        hotel.description || "No description available.";

      // Check hotel availability
      if (hotel.available_room > 0) {
        document.getElementById("hotelAvailability").innerText = "In stock";
        document
          .getElementById("hotelAvailability")
          .classList.add("text-success");
      } else {
        document.getElementById("hotelAvailability").innerText = "Out of stock";
        document
          .getElementById("hotelAvailability")
          .classList.remove("text-success");
        document
          .getElementById("hotelAvailability")
          .classList.add("text-danger");
      }

      // Hide the spinner and show content
      document.getElementById("spinner").style.display = "none";
      document.getElementById("content").style.display = "block";
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      // Hide the spinner and show an error message
      document.getElementById("spinner").style.display = "none";
      document.getElementById(
        "content"
      ).innerHTML = `<p>Error loading hotel data: ${error.message}</p>`;
    }
  }

  // Call the function to fetch and display hotel data
  fetchHotelData();
}

// Function to change the main hotel image when clicking a thumbnail
function changeImage(thumbnail) {
  const mainImage = document.getElementById("hotelImage");
  mainImage.src = thumbnail.src;
}

// recommended hotel

const similarHotelsContainer = document.getElementById("similarItems");

const apiURL = "https://hotel-booking-website-backend.vercel.app/hotel/hotels/";

async function fetchHotels() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const hotels = data.results; // Get the list of hotels

    displayHotels(hotels); // Display the hotels
  } catch (error) {
    console.error("Error fetching hotel data:", error);
  }
}

// Function to generate and display hotel images, names, prices, and View Details button
function displayHotels(hotels) {
  let html = ""; // To hold the generated HTML

  hotels.forEach((hotel) => {
    html += `
      <div class="d-flex mb-3">
        <a href="#" class="me-3">
          <img
            src="${hotel.photo}"
            alt="${hotel.name}"
            style="min-width: 96px; height: 96px"
            class="img-md img-thumbnail"
            data-hotel-id="${hotel.id}"
          />
        </a>
        <div class="info">
          <a href="#" class="nav-link mb-1 view-detail-button" data-hotel-id="${hotel.id}">
            <strong>${hotel.name}</strong>
          </a>
          <p class="text-dark">Price: $${parseFloat(hotel.price_per_night).toFixed(2)}</p>
        </div>
      </div>
    `;
  });
  

  // Inject the HTML into the similar items container
  similarHotelsContainer.innerHTML = html;

  // Add event listeners to all "View Details" buttons
  addViewDetailListeners();
}

// Function to add event listeners for "View Details" buttons
function addViewDetailListeners() {
  // Get all "View Detail" buttons
  const viewDetailButtons = document.querySelectorAll(".view-detail-button");
  viewDetailButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const hotelId = this.getAttribute("data-hotel-id");
      window.location.href = `/hotel_details.html?id=${hotelId}`; 
    });
  });
}

// Call the function to fetch and display the hotels
fetchHotels();
