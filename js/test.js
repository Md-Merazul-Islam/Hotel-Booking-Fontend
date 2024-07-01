const userId = localStorage.getItem('user_id');
let USER_ID ;

fetch('https://blueskybooking.onrender.com/user/account/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        
    }
})
.then(response => response.json())
.then(data => {
    const matchingAccount = data.find(account => account.account_no == userId);

    if (matchingAccount) {
        console.log('Matching account details:');
        console.log('ID:', matchingAccount.id);
        console.log('Username:', matchingAccount.username);
   
        USER_ID=  matchingAccount.id;
        alert(USER_ID)
    } else {
        console.log('No matching account found for user_id:', userId);
    }
})
.catch(error => {
    console.error('Error fetching user accounts:', error);
});
