let UserName = '';
document.addEventListener('DOMContentLoaded', async function () {
    const authButtons = document.getElementById('auth-buttons');
    const token = localStorage.getItem('token');
    const userId = parseInt(localStorage.getItem('user_id'));
    // console.log(userId);
    if (token) {
        try {
            const response = await fetch('https://blueskybooking.onrender.com/user/account/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user account data');
            }
            const userData = await response.json();

            if (userData.length === 0) {
                throw new Error('No user account data found');
            }

            // Find the account that matches the userId from local storage
            const accountIndex = userData.findIndex(account => account.account_no === userId);

            if (accountIndex === -1) {
                throw new Error('No matching user account found');
            }

            const account = userData[accountIndex];
            UserName= account.username;
            console.log(UserName);

        } catch (error) {
            console.error('Error fetching user account data:', error);

        }
    } else {
        console.error('No token found');
    }
});

