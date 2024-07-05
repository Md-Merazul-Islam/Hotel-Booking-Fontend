async function login(username, password) {
    try {
        const res = await fetch('https://blueskybooking.onrender.com/user/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            if (data.is_staff) {
                localStorage.setItem('admin_token', data.access);
                window.location.href = 'dashboard.html';
            } else {
                console.log('Login failed: ', data);
                alert(data.detail || 'Login failed');
            }
        } else {
            console.error('Login error: ', data);
            alert(data.detail || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
}
