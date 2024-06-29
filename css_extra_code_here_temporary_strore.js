<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Hotel</title>
</head>

<body>
    <h1>Book a Hotel</h1>
    <form method="POST" id="bookingForm">
        <label for="hotel_id">Hotel ID:</label>
        <input type="number" id="hotel_id" required>
        <br>
        <label for="start_date">Start Date:</label>
        <input type="date" id="start_date" required>
        <br>
        <label for="end_date">End Date:</label>
        <input type="date" id="end_date" required>
        <br>
        <label for="number_of_rooms">Number of Rooms:</label>
        <input type="number" id="number_of_rooms" required>
        <br>
        <button type="submit" onclick="handleBook(event)">Book Hotel</button>
    </form>

    <script>
        const handleBook = (event) => {
            event.preventDefault();

            const user_id = localStorage.getItem('user_id');
            if (!user_id) {
                alert('User ID not found in localStorage. Please log in.');
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
                alert('Hotel booked successfully!');
                console.log(data);
            })
            .catch(error => {
                if (error.message.startsWith('Failed to fetch')) {
                    alert(`Failed to fetch. Network error occurred.`);
                } else {
                    alert(`Failed to book hotel. Error: ${error.message}`);
                }
                console.error('Error:', error);
            });
        };
    </script>
</body>

</html>
