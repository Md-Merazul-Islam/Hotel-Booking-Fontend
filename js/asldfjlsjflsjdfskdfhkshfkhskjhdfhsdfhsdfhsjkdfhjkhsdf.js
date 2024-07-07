<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            color: #333;
        }

        p {
            font-size: 16px;
            color: #555;
        }

        img {
            display: block;
            margin: 0 auto 20px;
            border-radius: 50%;
        }

        button, input[type="submit"] {
            display: block;
            width: 100%;
            padding: 10px;
            margin-top: 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover, input[type="submit"]:hover {
            background-color: #0056b3;
        }

        form {
            margin-top: 20px;
        }

        label {
            display: block;
            margin: 10px 0 5px;
            font-weight: bold;
        }

        input[type="text"], input[type="email"], input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .hidden {
            display: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div id="user-details">
            <h2>User Profile</h2>
            <img id="profile_image" src="" alt="Profile Image" width="100" height="100">
            <p><strong>Username:</strong> <span id="username"></span></p>
            <p><strong>First Name:</strong> <span id="first_name"></span></p>
            <p><strong>Last Name:</strong> <span id="last_name"></span></p>
            <p><strong>Email:</strong> <span id="email"></span></p>
            <p><strong>Account No:</strong> <span id="account_no"></span></p>
            <p><strong>Balance:</strong> <span id="balance"></span></p>
            <button id="edit-profile-btn">Edit Profile</button>
        </div>

        <div id="edit-profile" class="hidden">
            <h2>Edit Profile</h2>
            <form id="edit-profile-form">
                <label for="edit-username">Username:</label>
                <input type="text" id="edit-username" name="username">
                <label for="edit-first_name">First Name:</label>
                <input type="text" id="edit-first_name" name="first_name">
                <label for="edit-last_name">Last Name:</label>
                <input type="text" id="edit-last_name" name="last_name">
                <label for="edit-email">Email:</label>
                <input type="email" id="edit-email" name="email">
                <label for="edit-profile_image">Profile Image:</label>
                <input type="file" id="edit-profile_image" name="profile_image">
                <input type="submit" value="Update Profile">
            </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            if (!token) {
                alert('No authentication token found. Please log in.');
                return;
            }

            // Fetch current user details
            $.ajax({
                url: 'https://blueskybooking.onrender.com/user/update/',
                type: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                success: function (data) {
                    $('#username').text(data.username);
                    $('#first_name').text(data.first_name);
                    $('#last_name').text(data.last_name);
                    $('#email').text(data.email);
                    $('#account_no').text(data.account_no);
                    $('#balance').text(data.balance);
                    $('#profile_image').attr('src', data.profile_image || 'path/to/default/image.jpg');
                },
                error: function (error) {
                    console.error('Error fetching user details:', error);
                }
            });

            // Show edit form on button click
            $('#edit-profile-btn').click(function () {
                $('#user-details').addClass('hidden');
                $('#edit-profile').removeClass('hidden');
                $('#edit-username').val($('#username').text());
                $('#edit-first_name').val($('#first_name').text());
                $('#edit-last_name').val($('#last_name').text());
                $('#edit-email').val($('#email').text());
            });

            // Handle form submission
            $('#edit-profile-form').submit(function (e) {
                e.preventDefault();

                var formData = new FormData(this);
                $.ajax({
                    url: 'https://blueskybooking.onrender.com/user/update/',
                    type: 'PATCH',
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        alert('Profile updated successfully!');
                        location.reload();
                    },
                    error: function (error) {
                        console.error('Error updating profile:', error);
                        alert('Failed to update profile');
                    }
                });
            });
        });
    </script>
</body>

</html>
