


// function handleLogout() {
//     const token = localStorage.getItem('token');

//     fetch('https://blueskybooking.onrender.com/user/logout/', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Token ${token}`,
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         // Clear local storage
//         localStorage.removeItem('token');
//         localStorage.removeItem('user_id');

//         Swal.fire({
//             icon: 'success',
//             title: 'Logout Successful',
//             text: 'You have been logged out successfully.',
//             confirmButtonColor: '#007bff'
//         }).then(() => {
//             window.location.href = 'login.html';
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);

//         Swal.fire({
//             icon: 'error',
//             title: 'Logout Failed',
//             text: 'An error occurred during logout. Please try again.',
//             confirmButtonColor: '#007bff'
//         });
//     });
// }












function handleLogout() {
    const token = localStorage.getItem('token');

    fetch('https://blueskybooking.onrender.com/user/logout/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
      
        return response.json();
    })
    .then(data => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: 'You have been logged out successfully.',
            confirmButtonColor: '#007bff'
        }).then(() => {
            window.location.href = 'login.html';
        });
    })
    .catch(error => {
        console.error('Error:', error);

        Swal.fire({
            icon: 'error',
            title: 'Logout Failed',
            text: 'An error occurred during logout. Please try again.',
            confirmButtonColor: '#007bff'
        });
    });
}
