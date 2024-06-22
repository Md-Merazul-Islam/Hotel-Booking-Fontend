document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    await registerUser();
});

async function registerUser() {
    const errorContainer = document.getElementById('error-container');
    errorContainer.style.display = 'none';
    errorContainer.classList.remove('text-success', 'text-danger');

    // Get form data
    const formData = {
        username: document.getElementById('username').value.trim(),
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        confirm_password: document.getElementById('confirm_password').value.trim()
    };

    // Client-side validation
    if (!formData.username || !formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirm_password) {
        displayError('Please fill in all fields.');
        return;
    }

    if (formData.password !== formData.confirm_password) {
        displayError('Passwords do not match.');
        return;
    }

    try {
        // Fetch all users to check for existing username or email
        const usersResponse = await fetch('https://blueskybooking.onrender.com/user/allUser/');
        if (!usersResponse.ok) {
            throw new Error('Failed to fetch existing users');
        }
        const usersData = await usersResponse.json();

        // Check if username or email already exists
        const existingUsername = usersData.some(user => user.username === formData.username);
        const existingEmail = usersData.some(user => user.email === formData.email);

        if (existingUsername) {
            displayError('Username already exists.');
            return;
        }

        if (existingEmail) {
            displayError('Email already exists.');
            return;
        }

        //finally Proceed with registration if no duplicates are found
        const registrationResponse = await fetch('https://blueskybooking.onrender.com/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!registrationResponse.ok) {
            const errorData = await registrationResponse.json();
            throw new Error(errorData.detail || 'An error occurred during registration');
        }

        const responseData = await registrationResponse.json();
        displaySuccess('Registration successful! Redirecting to login page...');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } catch (error) {
        displayError(error.message);
    }
}

function displayError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.classList.add('text-danger');
    errorContainer.style.display = 'block';
}

function displaySuccess(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.classList.add('text-success');
    errorContainer.style.display = 'block';
}












// ------------login ------------------



// Function to handle login
// const handleLogin = (event) => {
//     event.preventDefault();
//     const username = document.getElementById('login-username').value;
//     const password = document.getElementById('login-password').value;

//     fetch("https://blueskybooking.onrender.com/user/login/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ username, password })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.token) {
//                 localStorage.setItem('token', data.token);
//                 localStorage.setItem('user_id', data.user_id); // Assuming data contains user_id
//                 alert('Login successful!');
//                 window.location.href = 'index.html';
//             } else {
//                 alert('Login failed. Please check your username and password.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred during login. Please try again.');
//         });
// }



// // Function to handle logout
// const handleLogout = () => {
//     const token = localStorage.getItem('token');

//     fetch("https://blueskybooking.onrender.com/user/logout/", {
//         method: "POST",
//         headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "application/json",
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Logout failed');
//             }
//             return response.json();
//         })
//         .then(data => {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user_id');
//             alert('You have been logged out successfully.');
//             window.location.href = 'login.html';
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred during logout. Please try again.');
//         });
// }
