
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
            const response = await fetch('https://blueskybooking.onrender.com/user/is_users_staff/', {
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





// show districtName
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token'); 

    if (!token) {
        window.location.href="login.html";
        return;
    }
    const apiUrl = 'https://blueskybooking.onrender.com/hotel/districts/';
    const tableBody = document.querySelector('#hotelTable tbody');

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}` 
            }
        });

        if (response.ok) {
            const data = await response.json();

           
            data.forEach(hotel => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const slugCell = document.createElement('td');

                nameCell.textContent = hotel.district_name; 
                slugCell.textContent = hotel.slug;

                row.appendChild(nameCell);
                row.appendChild(slugCell);
                tableBody.appendChild(row);
            });
        } else {
            console.error('Failed to fetch data from the API');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});



// add new district by modal 
document.getElementById("submitDistrict").addEventListener("click", async function(event) {
    event.preventDefault();

    const districtName = document.getElementById("districtName").value;
    const feedback = document.getElementById("feedback");
    const url = 'https://blueskybooking.onrender.com/hotel/districts/';

    const data = {
        district_name: districtName,
        slug: districtName.toLowerCase().replace(/\s+/g, '-')
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            feedback.textContent = `Successfully added district: ${result.district_name}`;
            feedback.className = 'feedback text-success';
        } else {
            const responseData = await response.json();
            if (response.status === 409) {
                feedback.textContent = `Error: District '${districtName}' already exists.`;
            } else {
                feedback.textContent = 'Failed to add district check already existed!';
            }
            feedback.className = 'feedback text-danger';
        }
    } catch (error) {
        feedback.textContent = `Error: ${error.message}`;
        feedback.className = 'feedback text-danger';
    }


    setTimeout(function() {
        addDistrictModal.hide();
    }, 2000); 
});
