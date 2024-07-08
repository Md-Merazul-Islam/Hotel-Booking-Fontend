// display booked info 
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token'); 

    if (!token) {
        window.location.href="login.html";
        return;
    }
    const tableBody = document.getElementById('bookings-table-body');

    async function fetchBookings() {
        try {
            const response = await fetch('https://blueskybooking.onrender.com/hotel/bookings/');
            const data = await response.json();
            data.sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at));
            data.forEach(booking => {
            const row = document.createElement('tr');

                row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.hotel.name}</td>
            <td>${booking.hotel.address}</td>
            <td>${booking.hotel.district_name}</td>
            <td><img src="${booking.hotel.photo}" alt="Hotel Photo" width="100"></td>
            <td>${booking.hotel.price_per_night}</td>
            <td>${booking.hotel.available_room}</td>
            <td>${booking.start_date}</td>
            <td>${booking.end_date}</td>
            <td>${booking.number_of_rooms}</td>
            <td>${new Date(booking.booked_at).toLocaleString()}</td>
            <td>${booking.user}</td>
        `;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }

    fetchBookings();
});