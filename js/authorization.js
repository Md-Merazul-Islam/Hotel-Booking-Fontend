document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await registerUser();
});

async function registerUser() {
    // Get form data
    const formData = {
        username: document.getElementById('username').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirm_password: document.getElementById('confirm_password').value
    };

    try {
        // Send POST request to the registration API
        const response = await fetch('https://blueskybooking.onrender.com/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            // Get the error message from the response body
            const errorData = await response.json();
            throw new Error(errorData.detail || 'An error occurred during registration');
        }

        // Handle the response
        const responseData = await response.json();
        alert('Registration successful! Please login.');
        // Optionally redirect to another page or clear the form
        window.location.href = 'login.html';

    } catch (error) {
        // Display error message
        const errorContainer = document.getElementById('error-container');
        errorContainer.textContent = error.message;
        errorContainer.style.display = 'block';
    }
}





// ------------login ------------------
const handleLogin = ((event)=>{
    event.preventDefault();
    const username = getValue('username');
    const password = getValue('password');

    fetch("https://blueskybooking.onrender.com/user/login/",{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({username,password})
    })
    .then((res)=>{
       if (!res.ok){
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then((data)=>{
        console.log(data);
        if (data.success){
            localStorage.setItem("token",data.token);
            window.location.href = 'index.html';
        }
        else {
            console.error("Login failed. Token not received.");
            document.getElementById('error').innerText = data.message || 'Login failed. Please try again.';
        }
    })
    .catch((error)=>{
        console.error("Error during login:", error);
        document.getElementById('error').innerText = 'Login failed. Please try again.';
    });

});

const getValue =(id)=>{
    const value = document.getElementById(id).value;
    return value;
}
const loginForm = document.getElementById('login-form');
if (loginForm){
    loginForm.addEventListener('submit',handleLogin);
}