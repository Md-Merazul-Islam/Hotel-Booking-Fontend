

document.addEventListener('DOMContentLoaded', function () {

    const authButtons = document.getElementById('auth-buttons');
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    if (isAuthenticated) {
        try {
            const response = await fetch(`https://blueskybooking.onrender.com/user/account/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch account data. Status ${response.status}`);
            }
            const accountData = await response.json();
            let userBalance = '0.00';

            if (accountData.length > 0) {
                userBalance = accountData[0].balance;
            }

            authButtons.innerHTML = `
            <div class="d-flex justify-content-end align-items-center">
                <div class="balance pe-3">$0.00</div>
                <div class="btn-group dropstart">
                    <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="./img/user.png" class="r-img" alt="My profile">
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="balance.html">
                            <img src="./img/credit-cards.png" class="r-img" alt="Balance"> $0.00
                        </a></li>
                        <li><a class="dropdown-item" href="profile.html">
                            <img src="./img/user.png" class="r-img" alt="Profile"> Profile
                        </a></li>
                        <li><a class="dropdown-item" href="deposit.html">
                            <img src="./img/add-wallet.png" class="r-img" alt="Deposit"> Deposit
                        </a></li>
                        <li><a class="dropdown-item" href="#" onclick="handleLogout()">
                            <img src="./img/logout.png" class="r-img" alt="Logout"> Logout
                        </a></li>
                    </ul>
                </div>
            </div>
        `;
        }
        catch (error) {
            console.error('Error fetching account data:', error);
            authButtons.innerHTML = `
                <div>
                    <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
                    <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
                </div>
            `;
        }

    }
    else {
        authButtons.innerHTML = `
            <div>
            <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
            <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
                </div>
        `;
    }
});