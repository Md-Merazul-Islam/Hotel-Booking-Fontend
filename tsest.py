# Example data (as provided)
accounts = [
    {
        "id": 12,
        "username": "saim",
        "account_no": 13,
        "balance": "30000.00",
        "profile_image": "http://blueskybooking.onrender.com/media/account/images/pexels-photo-2379004.jpeg"
    },
    {
        "id": 13,
        "username": "antor",
        "account_no": 14,
        "balance": "0.00",
        "profile_image": "null"
    }
]

# Assuming user_id is stored in local storage and retrieved
user_id = 14  # Example user_id

# Function to find the index of the matching dictionary
def find_user_account_index(accounts, user_id):
    for index, account in enumerate(accounts):
        if account.get('account_no') == user_id:
            return index
    return None  # Return None if no match is found

# Find the index
index = find_user_account_index(accounts, user_id)

if index is not None:
    print(f"The index of the user with account_no {user_id} is {index}.")
else:
    print(f"No account found for user_id {user_id}.")
