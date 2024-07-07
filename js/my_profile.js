document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
        alert('No authentication token found. Please log in.');
        return;
    }

    // Fetch current user details
    fetch('https://blueskybooking.onrender.com/user/update/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').textContent = data.username;
        document.getElementById('first_name').textContent = data.first_name;
        document.getElementById('last_name').textContent = data.last_name;
        document.getElementById('email').textContent = data.email;
        document.getElementById('account_no').textContent = data.account_no;
        document.getElementById('balance').textContent = data.balance;
        document.getElementById('profile_image').src = data.profile_image || 'path/to/default/image.jpg';
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });

    // Show edit modal on button click
    document.getElementById('editProfileBtn').addEventListener('click', function () {
        $('#editProfileModal').modal('show');
        document.getElementById('edit-username').value = document.getElementById('username').textContent;
        document.getElementById('edit-first_name').value = document.getElementById('first_name').textContent;
        document.getElementById('edit-last_name').value = document.getElementById('last_name').textContent;
        document.getElementById('edit-email').value = document.getElementById('email').textContent;
    });

    // Handle form submission
    document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('https://blueskybooking.onrender.com/user/update/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            $('#editProfileModal').modal('hide');
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated Successfully',
            }).then(() => {
                window.location.reload();
            });
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Profile Update Failed',
                text: error.message,
                confirmButtonColor: '#007bff'
            });
            alert('Failed to update profile');
        });
    });
});



