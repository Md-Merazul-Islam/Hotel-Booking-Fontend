

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://blueskybooking.onrender.com/hotel/hotels/')
        .then(response => response.json())
        .then(data => {
            const hotelSelect = document.getElementById('hotel_select');

            data.forEach(hotel => {
                const option = document.createElement('option');
                option.value = hotel.id;
                option.textContent = hotel.name;
                hotelSelect.appendChild(option);
            });

            // Handle hotel selection
            hotelSelect.addEventListener('change', function () {
                const selectedHotelId = hotelSelect.value;
                if (selectedHotelId) {
                    fetch(`https://blueskybooking.onrender.com/hotel/hotels/${selectedHotelId}`)
                        .then(res => res.json())
                        .then(data => {
                            document.getElementById('booking-title').textContent = `Booking for: ${data.name}`;
                        })
                        .catch(error => {
                            console.error('Error fetching hotel name:', error);
                            document.getElementById('booking-title').textContent = 'Error loading hotel information.';
                        });
                } else {
                    document.getElementById('booking-title').textContent = 'Book a Hotel';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching hotel list:', error);
            document.getElementById('booking-title').textContent = 'Error loading hotel list. Please try again later.';
        });
});

const handelOfBook = (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
        Swal.fire({
            icon: 'error',
            title: 'User not logged in',
            text: 'User ID not found in localStorage. Please log in.',
        });
        window.location.href = 'login.html';
        return;
    }

    const hotel_id = document.getElementById('hotel_select').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const number_of_rooms = document.getElementById('number_of_rooms').value;

    if (!hotel_id) {
        Swal.fire({
            icon: 'error',
            title: 'No hotel selected',
            text: 'Please select a hotel to book.',
        });
        return;
    }

    const formData = {
        hotel_id: parseInt(hotel_id),
        start_date: start_date,
        end_date: end_date,
        number_of_rooms: parseInt(number_of_rooms),
        user_id: parseInt(user_id)
    };

    fetch('https://blueskybooking.onrender.com/hotel/book/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(JSON.stringify(errorData));
                });
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Booking Successful',
                text: 'Hotel booked successfully!',
            });
            console.log(data);
        })
        .catch(error => {
            // Parse the error message
            let errorMessage = 'Failed to book hotel.';
            try {
                const errorData = JSON.parse(error.message);
                if (errorData.error) {

                    errorMessage = errorData.error;
                } else {

                    errorMessage = Object.values(errorData).join(' ');
                }
            } catch (e) {
                console.error('Error parsing error message:', e);
            }

            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: errorMessage,
            });
            console.error('Error:', error);
        });
};
