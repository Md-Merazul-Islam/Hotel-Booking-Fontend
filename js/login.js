
// Function to handle login
const handleLogin = (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const errorContainer = document.getElementById('error-container');
    errorContainer.style.display = 'none';
    errorContainer.classList.remove('text-success', 'text-danger');

    fetch("https://blueskybooking.onrender.com/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            displayError('Login failed. Please check your username and password.');
            throw new Error('Login failed.');
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            displaySuccess('Login successful.');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000); // Redirect after 2 seconds
        } else {
            displayError('Login failed. Please check your username and password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayError('An error occurred during login. Please try again.');
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
