const fetchUserDetails = async () => {
    try {
        const resAccount = await fetch('https://blueskybooking.onrender.com/user/account/');
        const userAccounts = await resAccount.json();

        const resAllUsers = await fetch('https://blueskybooking.onrender.com/user/allUser/');
        const allUsers = await resAllUsers.json();

        const mergedUsers = userAccounts.map(account => ({
            ...account,
            ...allUsers.find(user => user.username === account.username)
        }));

        // Show all data in table format
        const tableBody = document.getElementById('userTableBody');
        mergedUsers.forEach((user, index) => {
            const profileImage = user.profile_image ? user.profile_image : './img/user.png';
            const row = document.createElement('tr');
            row.setAttribute('data-id', user.id);
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${profileImage}" alt="profile Photo" style="max-width: 30px; max-height: 30px;"></td>
                <td>${user.username}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td>${user.account_no}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
};



// Function to delete a user
const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`https://blueskybooking.onrender.com/user/account/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) {
            throw new Error('Failed to delete user');
        }
        const deletedRow = document.querySelector(`tr[data-id="${userId}"]`);
        if (deletedRow) {
            deletedRow.remove();
        }
        Swal.fire({
            icon: 'success',
            title: 'User deleted successfully',
        });
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to delete user',
            text: error.message,
        });
    }
};


fetchUserDetails();