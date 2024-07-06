
// Function to handle login
const handleLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch("https://blueskybooking.onrender.com/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed. Please check your username and password.');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                // Check if the user is staff
                fetch('https://blueskybooking.onrender.com/user/is_users_staff/')
                    .then(response => response.json())
                    .then(users => {
                        const user = users.find(user => user.username === username);
                        if (user && user.is_staff) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Login Successful',
                                text: 'Welcome Admin!',
                                confirmButtonColor: '#007bff'
                            }).then(() => {
                                setTimeout(() => {
                                    window.location.href = 'admin_dashboard.html';
                                }, 1000);
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Login Successful',
                                text: 'Welcome to user account logged in!',
                                confirmButtonColor: '#007bff'
                            }).then(() => {
                                setTimeout(() => {
                                    window.location.href = 'index.html';
                                }, 1000);
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching staff data:', error);
                        displayError('An error occurred while checking user role.');
                    });
            } else {
                throw new Error('Login failed. Please check your username and password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayError(error.message || 'An error occurred during login. Please try again.');
        });
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

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', handleLogin);
