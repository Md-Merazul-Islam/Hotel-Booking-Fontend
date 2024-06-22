function handleLogout() {
    const token = localStorage.getItem('token');

    fetch('https://blueskybooking.onrender.com/user/logout/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            "content-type": "application/json",
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            // Clear local storage
            console.log(data);
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_account');

            // Optionally display a message or alert
            alert('You have been logged out successfully.');

            // Redirect to login page or homepage
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during logout. Please try again.');
        });
}


// const handleLogout = () => {
//     // alert()
//     const token = localStorage.getItem("token");
//     fetch("https://blueskybooking.onrender.com/user/logout/", {
//         method: "GET",
//         authorization: `Token ${token}`,
//         headers: { "content-type": "application/json" },
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         localStorage.removeItem('token')
//         localStorage.removeItem('user_id')
//         localStorage.removeItem('user_account')
//         alert("Logged Out Successfully")
//         window.location.href = "login.html";
//     })
// }