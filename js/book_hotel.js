const handleBook = (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
        Swal.fire({
            icon: 'error',
            title: 'User not logged in',
            text: 'User ID not found in localStorage. Please log in.',
        });
        return;
    }

    const hotel_id = document.getElementById('hotel_id').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const number_of_rooms = document.getElementById('number_of_rooms').value;

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
            throw new Error(`Failed to book hotel. Status: ${response.status}`);
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
        Swal.fire({
            icon: 'error',
            title: 'Booking Failed',
            text: error.message.startsWith('Failed to fetch') 
                  ? 'Failed to fetch. Network error occurred.' 
                  : `Failed to book hotel. Error: ${error.message}`,
        });
        console.error('Error:', error);
    });
};