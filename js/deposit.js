const token = localStorage.getItem("token");
if (!token) {
    window.localStorage.href = "login.html";
}

const handleDeposit = (event) => {
    event.preventDefault();
    const amount = parseInt(document.getElementById('amount').value);
    const userId = parseInt(localStorage.getItem('user_id')) - 1;
    if (isNaN(amount) || isNaN(userId)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter a valid deposit amount.',
            confirmButtonColor: '#007bff'
        });
        return;
    }
    fetch('https://blueskybooking.onrender.com/user/deposit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            amount: amount,
            account: userId
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Deposit failed.Please try again.');
            }
            return res.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Deposit Successful',
                text: `You have successfully deposited $${amount}`,
                confirmButtonColor: '#007bff'
            })
            .then(() => {
                window.location.href = "index.html";
            });

        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Deposit Failed',
                text: error.message,
                confirmButtonColor: '#007bff'
            });
        });
}