<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Add Hotel</title>
    <!-- Include Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <!-- Button to Open the Modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addHotelModal">
        Add Hotel
    </button>

    <!-- The Modal -->
    <div class="modal fade" id="addHotelModal" tabindex="-1" role="dialog" aria-labelledby="addHotelModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h5 class="modal-title" id="addHotelModalLabel">Add Hotel</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- Modal Body -->
                <div class="modal-body">
                    <form id="hotelForm" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="hotelName">Hotel Name</label>
                            <input type="text" class="form-control" id="hotelName" placeholder="Enter hotel name"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="hotelAddress">Hotel Address</label>
                            <input type="text" class="form-control" id="hotelAddress" placeholder="Enter hotel address"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="hotelDistrict">Hotel District</label>
                            <select class="form-control" id="hotelDistrict" required></select>
                        </div>
                        <div class="form-group">
                            <label for="hotelPhoto">Hotel Photo</label>
                            <input type="file" class="form-control" id="hotelPhoto" accept="image/*" required>
                        </div>
                        <div class="form-group">
                            <label for="hotelDescription">Hotel Description</label>
                            <textarea class="form-control" id="hotelDescription" rows="3"
                                placeholder="Enter hotel description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="hotelPricePerNight">Price Per Night</label>
                            <input type="number" class="form-control" id="hotelPricePerNight"
                                placeholder="Enter price per night" required>
                        </div>
                        <div class="form-group">
                            <label for="hotelAvailableRoom">Available Room</label>
                            <input type="number" class="form-control" id="hotelAvailableRoom"
                                placeholder="Enter available rooms" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="submitHotel">Add Hotel</button>
                    </form>
                    <div id="hotelFeedback" class="mt-3"></div>
                </div>
                <!-- Modal Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Include Bootstrap JS and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Script for handling form submission and fetching districts -->
    <script>
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

            // Collect all form data including file input
            formData.append('name', document.getElementById('hotelName').value);
            formData.append('address', document.getElementById('hotelAddress').value);
            formData.append('district', document.getElementById('hotelDistrict').value);
            formData.append('photo', document.getElementById('hotelPhoto').files[0]); // File input
            formData.append('description', document.getElementById('hotelDescription').value);
            formData.append('price_per_night', document.getElementById('hotelPricePerNight').value);
            formData.append('available_room', document.getElementById('hotelAvailableRoom').value);

            // Log formData entries to check what's being sent
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
                        // Note: 'Content-Type' header is omitted to let the browser set it to 'multipart/form-data' with the correct boundary.
                    },
                    body: formData // Send FormData object with the request
                });

                if (response.ok) {
                    const result = await response.json();
                    feedback.textContent = `Successfully added hotel: ${result.name}`;
                    feedback.className = 'feedback text-success';
                    form.reset(); // Clear the form fields
                } else {
                    const responseData = await response.json();
                    console.log(responseData); // Log the server's response for debugging
                    feedback.textContent = `Failed to add hotel: ${JSON.stringify(responseData)}`;
                    feedback.className = 'feedback text-danger';
                }
            } catch (error) {
                feedback.textContent = `Error: ${error.message}`;
                feedback.className = 'feedback text-danger';
            }

            // Hide the modal after a short delay
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
                    option.value = district.id; // Use district ID for the option value
                    option.textContent = district.district_name;
                    districtSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        }

    </script>
</body>

</html>