

const token = localStorage.getItem('token');
console.log('Token:', token); 

if (!token) {
    throw new Error('Token is missing. Please log in again.');
}

const response = await fetch('https://blueskybooking.onrender.com/hotel/book-hotel/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bookingData)
});

if (!response.ok) {
    if (response.status === 403) {
        throw new Error('Authorization failed. Check your token.');
    } else {
        throw new Error('Failed to book hotel');
    }
}

const bookingResponse = await response.json();
displayBookingResult(bookingResponse);



document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('hotelId');
    const hotelNameElement = document.getElementById('hotelName');
    const hotelDetailsElement = document.getElementById('hotelDetails');
    const bookingForm = document.getElementById('bookingForm');
    const bookingResult = document.getElementById('bookingResult');

    // Fetch hotel details
    async function fetchHotelDetails() {
        try {
            const response = await fetch(`https://blueskybooking.onrender.com/hotel/hotels/${hotelId}`);
            if (!response.ok) throw new Error('Failed to fetch hotel details');
            const hotel = await response.json();
            displayHotelDetails(hotel);
        } catch (error) {
            hotelDetailsElement.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    // Display hotel details
    function displayHotelDetails(hotel) {
        hotelNameElement.textContent = hotel.name;
        hotelDetailsElement.innerHTML = `
            <img class="img-fluid" src="${hotel.photo}" alt="${hotel.name}">
            <p><strong>Address:</strong> ${hotel.address}</p>
            <p><strong>Description:</strong> ${hotel.description}</p>
            <p><strong>Price per night:</strong> $${hotel.price_per_night}</p>
            <p><strong>Available rooms:</strong> ${hotel.available_room}</p>
            <p><strong>District:</strong> ${hotel.district_name}</p>
        `;
    }

    // Book the hotel
    async function bookHotel(bookingData) {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Debugging line
            if (!token) throw new Error('Token is missing. Please log in again.');

            const response = await fetch('https://blueskybooking.onrender.com/hotel/book-hotel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Authorization failed. Check your token.');
                } else {
                    throw new Error('Failed to book hotel');
                }
            }

            const bookingResponse = await response.json();
            displayBookingResult(bookingResponse);
        } catch (error) {
            bookingResult.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
        }
    }

    // Display booking result
    function displayBookingResult(data) {
        bookingResult.innerHTML = `<div class="alert alert-success">
            Booking successful! Confirmation number: ${data.confirmation_number}
        </div>`;
    }

    // Handle form submission
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;
        const numberOfRooms = parseInt(document.getElementById('number_of_rooms').value);

        const userId = localStorage.getItem('user_id');
        const bookingData = {
            user: userId,
            hotel: hotelId,
            start_date: startDate,
            end_date: endDate,
            number_of_rooms: numberOfRooms
        };

        console.log('Booking data:', bookingData);

        bookHotel(bookingData);
    });

    // Fetch and display hotel details on page load
    fetchHotelDetails();
});
