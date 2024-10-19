// User is staff, proceed with loading the admin page
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id'); 

    if (!token || !userId) {
        window.location.href = "index.html"; 
        return;
    }

    async function checkIsStaff() {
        try {
            const response = await fetch('https://hotel-booking-website-backend.vercel.app/user/is_users_staff/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const users = await response.json();

            const user = users.find(user => user.id === parseInt(userId));

            if (!user || !user.is_staff) {
                window.location.href = "index.html"; 
            } else {

                console.log('Welcome to the admin page');
            }
        } catch (error) {
            console.error('Error:', error);
            window.location.href = "index.html"; 
        }
    }

    checkIsStaff();
});



document.addEventListener('DOMContentLoaded',()=>{
    const url = 'https://hotel-booking-website-backend.vercel.app/hotel/hotels/';
    fetch(url)
    .then(res =>res.json())
    .then(data=>{
     display(data);
    })
    .catch(error=console.error('Error fetching data : ',error));
    function display(hotels){
     const TotalHotel = hotels.length;
     const TotalAvailableRoom  = hotels.reduce((sum,hotel)=>sum+hotel.available_room, 0) ;
     document.getElementById('total-hotels').textContent= TotalHotel;
     document.getElementById('total-available-rooms').textContent = TotalAvailableRoom;
    }
 })
 document.addEventListener('DOMContentLoaded',()=>{
    const url = 'https://hotel-booking-website-backend.vercel.app/user/allUser/';
    fetch(url)
    .then(res =>res.json())
    .then(data=>{
     display(data);
    })
    .catch(error=console.error('Error fetching data : ',error));
    function display(clients){
     const TotalClient = clients.length +1000;
    ;
     document.getElementById('total-clients').textContent= TotalClient;
    
    }
 })

 


//  for total booked list 
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
            const response = await fetch('https://hotel-booking-website-backend.vercel.app/hotel/bookings/');
            const data = await response.json();
            data.sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at));
            let totalBookedRooms = 0;
            data.forEach(booking => {
            const row = document.createElement('tr');
            totalBookedRooms += booking.number_of_rooms;
            document.getElementById('total-booked-room').textContent=  totalBookedRooms;
            });

        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }

    fetchBookings();
});