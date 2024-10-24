// User is staff, proceed with loading the admin page
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const isStaff = localStorage.getItem('is_staff'); 
    
    if (!token || !userId || !isStaff || isStaff === 'false') {
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




document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "login.html";
        return;
    }
    const apiUrl = 'https://hotel-booking-website-backend.vercel.app/hotel/hotels/';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const hotels = await response.json();
        hotels.sort((a, b) => a.id - b.id);
        const tableBody = document.querySelector('#hotelTable tbody');

        hotels.forEach(hotel => {
            const row = document.createElement('tr');
            const truncatedDescription = truncateText(hotel.description, 50);
            const address = truncateText(hotel.address, 30);
            row.innerHTML = `
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td>${address}</td>
                <td>${hotel.district_name}</td>
                <td><img src="${hotel.photo}" alt="Hotel Photo" style="max-width: 100px; max-height: 100px;"></td>
                <td>${truncatedDescription}</td>
                <td>${hotel.price_per_night}</td>
                <td>${hotel.available_room}</td>
                <td>
                    <div class="d-flex gap-1">
                        <div><button class="btn btn-success" onclick="editHotel(${hotel.id})"><i class="fas fa-edit"></i></button></div>
                        <div><button class="btn btn-danger" onclick="deleteHotel(${hotel.id}, this)"><i class="fas fa-trash-alt"></i></button></div>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
});

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    } else {
        return text;
    }
}

function showAddHotelModal() {
    document.getElementById('hotelForm').reset();
    document.getElementById('modalTitle').innerText = 'Add Hotel';
    document.getElementById('submitBtn').innerText = 'Add Hotel';
    document.getElementById('hotelPhoto').required = true;
    document.getElementById('hotelModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('hotelModal').style.display = 'none';
}

// Add new hotel
document.addEventListener('DOMContentLoaded', () => {
    
    fetchDistricts();
    document.getElementById('hotelForm').addEventListener('submit', handleHotelFormSubmit);
});

async function handleHotelFormSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Authentication token is missing');
        return;
    }

    const form = document.getElementById('hotelForm');
    const imageFile = document.getElementById('hotelPhoto').files[0];
    
    const feedback = document.getElementById('hotelFeedback');
    const url = 'https://hotel-booking-website-backend.vercel.app/hotel/hotels/';
    
    try {
        // Upload the image to ImgBB and get the URL
        const imageUrl = await uploadImageToImgBB(imageFile);
        
        // Create FormData for hotel submission
        const formData = new FormData();
        formData.append('name', document.getElementById('hotelName').value);
        formData.append('address', document.getElementById('hotelAddress').value);
        formData.append('district', document.getElementById('hotelDistrict').value);
        formData.append('photo', imageUrl); // Use the image URL directly here
        formData.append('description', document.getElementById('hotelDescription').value);
        formData.append('price_per_night', document.getElementById('hotelPricePerNight').value);
        formData.append('available_room', document.getElementById('hotelAvailableRoom').value);
        
        // Make the POST request to your API
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            feedback.textContent = `Successfully added hotel: ${result.name}`;
            feedback.className = 'feedback text-success pb-3';
            form.reset();
            location.reload(); // Reload the page to see the new hotel
        } else {
            const responseData = await response.json();
            feedback.textContent = `Failed to add hotel: ${JSON.stringify(responseData)}`;
            feedback.className = 'feedback text-danger pb-3';
        }
    } catch (error) {
        feedback.textContent = `Error: ${error.message}`;
        feedback.className = 'feedback text-danger pb-3';
    }
}

// Function to upload image to ImgBB and return the image URL
async function uploadImageToImgBB(imageFile) {
    const imgBBAPIKey = 'ea67728858ffc5a28d530570bfc45b40'; 
    const formDataImage = new FormData();
    formDataImage.append('image', imageFile);

    const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`, {
        method: 'POST',
        body: formDataImage
    });

    if (!imgBBResponse.ok) {
        throw new Error('Failed to upload image to ImgBB');
    }

    const imgBBData = await imgBBResponse.json();
    return imgBBData.data.url;
}


async function fetchDistricts() {
    try {
        const response = await fetch('https://hotel-booking-website-backend.vercel.app/hotel/districts/');
        const districts = await response.json();

        const districtSelect = document.getElementById('hotelDistrict');
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.id;
            option.textContent = district.district_name;
            districtSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching districts:', error);
    }
}

async function deleteHotel(hotelId, button) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`https://hotel-booking-website-backend.vercel.app/hotel/hotels/${hotelId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete hotel');
        }

        const row = button.closest('tr');
        row.parentNode.removeChild(row);
        Swal.fire({
            icon: 'success',
            title: 'Hotel deleted successfully',
        });
        console.log('Hotel deleted successfully');
    } catch (error) {
        console.error('Error deleting hotel:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to delete hotel',
            text: error.message,
        });
    }
}


async function editHotel(hotelId) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "login.html"; 
        return;
    }

    try {
        
        const response = await fetch(`https://hotel-booking-website-backend.vercel.app/hotel/hotels/${hotelId}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch hotel details');
        }

        const hotel = await response.json();
     
        document.getElementById('hotelName').value = hotel.name;
        document.getElementById('hotelAddress').value = hotel.address;
        document.getElementById('hotelDistrict').value = hotel.district;
        document.getElementById('hotelDescription').value = hotel.description;
        document.getElementById('hotelPricePerNight').value = hotel.price_per_night;
        document.getElementById('hotelAvailableRoom').value = hotel.available_room;

    
        document.getElementById('modalTitle').innerText = 'Edit Hotel';
        document.getElementById('submitBtn').innerText = 'Update Hotel';
        document.getElementById('hotelPhoto').required = false;
        document.getElementById('hotelModal').style.display = 'block';

       
        const form = document.getElementById('hotelForm');
        form.removeEventListener('submit', handleHotelFormSubmit);
        

        form.addEventListener('submit', async function updateHotelFormSubmit(event) {
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', document.getElementById('hotelName').value);
            formData.append('address', document.getElementById('hotelAddress').value);
            formData.append('district', document.getElementById('hotelDistrict').value);
            formData.append('description', document.getElementById('hotelDescription').value);
            formData.append('price_per_night', document.getElementById('hotelPricePerNight').value);
            formData.append('available_room', document.getElementById('hotelAvailableRoom').value);

            const hotelFeedback = document.getElementById('hotelFeedback');
            hotelFeedback.innerHTML = ''; 

       
            const imageFile = document.getElementById('hotelPhoto').files[0];
            if (imageFile) {
              
                const imgBBAPIKey = 'ea67728858ffc5a28d530570bfc45b40'; 
                const formDataImage = new FormData();
                formDataImage.append('image', imageFile);

                try {
                    const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`, {
                        method: 'POST',
                        body: formDataImage,
                    });

                    if (!imgBBResponse.ok) {
                        throw new Error('Failed to upload image to ImgBB');
                    }

                    const imgBBData = await imgBBResponse.json();
                    const imageUrl = imgBBData.data.url; 

                    
                    formData.append('photo', imageUrl);
                } catch (error) {
                    hotelFeedback.innerHTML = '<p class="text-danger">Error uploading image: ' + error.message + '</p>';
                    return; 
                }
            }

           
            try {
                const updateResponse = await fetch(`https://hotel-booking-website-backend.vercel.app/hotel/hotels/${hotelId}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                    body: formData
                });

                if (updateResponse.ok) {
                    const result = await updateResponse.json();
                    document.getElementById('hotelModal').style.display = 'none'; 
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully updated hotel',
                        confirmButtonColor: '#007bff'
                    }).then(() => {
                        form.reset(); 
                        window.location.reload();
                    });
                } else {
                    const responseData = await updateResponse.json();
                    hotelFeedback.innerHTML = '<p class="text-danger">Failed to update hotel: ' + JSON.stringify(responseData) + '</p>';
                }
            } catch (error) {
                hotelFeedback.innerHTML = '<p class="text-danger">Error updating hotel: ' + error.message + '</p>';
            }
        });
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to fetch hotel details',
            text: error.message,
        });
    }
}
