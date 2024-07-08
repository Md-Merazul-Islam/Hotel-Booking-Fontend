

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "login.html";
        return;
    }
    const apiUrl = 'https://blueskybooking.onrender.com/hotel/hotels/';

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
    const formData = new FormData();

    formData.append('name', document.getElementById('hotelName').value);
    formData.append('address', document.getElementById('hotelAddress').value);
    formData.append('district', document.getElementById('hotelDistrict').value);
    formData.append('photo', document.getElementById('hotelPhoto').files[0]);
    formData.append('description', document.getElementById('hotelDescription').value);
    formData.append('price_per_night', document.getElementById('hotelPricePerNight').value);
    formData.append('available_room', document.getElementById('hotelAvailableRoom').value);

    const feedback = document.getElementById('hotelFeedback');
    const url = 'https://blueskybooking.onrender.com/hotel/hotels/';

    try {
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

async function fetchDistricts() {
    try {
        const response = await fetch('https://blueskybooking.onrender.com/hotel/districts/');
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
        const response = await fetch(`https://blueskybooking.onrender.com/hotel/hotels/${hotelId}/`, {
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
        const response = await fetch(`https://blueskybooking.onrender.com/hotel/hotels/${hotelId}/`);
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

        document.getElementById('hotelForm').removeEventListener('submit', handleHotelFormSubmit);
        document.getElementById('hotelForm').addEventListener('submit', async function updateHotelFormSubmit(event) {
            event.preventDefault();
            const form = document.getElementById('hotelForm');
            const formData = new FormData();
            formData.append('name', document.getElementById('hotelName').value);
            formData.append('address', document.getElementById('hotelAddress').value);
            formData.append('district', document.getElementById('hotelDistrict').value);
            if (document.getElementById('hotelPhoto').files[0]) {
                formData.append('photo', document.getElementById('hotelPhoto').files[0]);
            }
            formData.append('description', document.getElementById('hotelDescription').value);
            formData.append('price_per_night', document.getElementById('hotelPricePerNight').value);
            formData.append('available_room', document.getElementById('hotelAvailableRoom').value);

            try {
                const response = await fetch(`https://blueskybooking.onrender.com/hotel/hotels/${hotelId}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully updated hotel',

                        confirmButtonColor: '#007bff'
                    })
                        .then(() => {
                            form.reset();
                            document.getElementById('hotelModal').style.display = 'none';
                            window.location.reload()
                        });
                    // location.reload();
                } else {
                    const responseData = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to update hotel',
                        text: JSON.stringify(responseData),
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error updating hotel',
                    text: error.message,
                });
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

