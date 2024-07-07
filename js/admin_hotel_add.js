
// display all hotel information
document.addEventListener('DOMContentLoaded', async function () {
    const apiUrl = 'https://blueskybooking.onrender.com/hotel/hotels/';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const hotels = await response.json();
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
                <div><a class="btn btn-success" href="#"><i class="fas fa-edit"></i></a></div>
                <div><a class="btn btn-danger" href="#"><i class="fas fa-trash-alt"></i></a></div>
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


    for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

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
            feedback.className = 'feedback text-success  pb-3';
            form.reset(); 
        } else {
            const responseData = await response.json();
            console.log(responseData); 
            feedback.textContent = `Failed to add hotel: ${JSON.stringify(responseData)}`;
            feedback.className = 'feedback text-danger pb-3';
        }
    } catch (error) {
        feedback.textContent = `Error: ${error.message}`;
        feedback.className = 'feedback text-danger';
    }

  
    setTimeout(() => {
        $('#addHotelModal').modal('hide');
    }, 2000);
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
