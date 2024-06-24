// booking.js

document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');
    
    // Event listener for booking form submission
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const hotelId = document.getElementById('hotelId').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const numberOfRooms = document.getElementById('numberOfRooms').value;

        const bookingData = {
            hotel_id: hotelId,
            start_date: startDate,
            end_date: endDate,
            number_of_rooms: numberOfRooms
            // Add other necessary fields as per your API requirements
        };

        bookHotel(bookingData);
    });

    // Function to book a hotel
    async function bookHotel(bookingData) {
        try {
            const response = await fetch('https://blueskybooking.onrender.com/hotel/book-hotel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            if (!response.ok) {
                throw new Error('Failed to book hotel');
            }
            const data = await response.json();
            console.log('Booking response:', data);
            alert('Booking confirmed! Check your email for details.');
            // Optionally handle success response (e.g., show confirmation message)
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to book hotel. Please try again.');
            // Optionally handle error (e.g., show error message to user)
        }
    }
});
