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
            UserName = account.username;
            console.log(UserName);

        } catch (error) {
            console.error('Error fetching user account data:', error);

        }
    } else {
        console.error('No token found');
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const reviewContainer = document.getElementById('reviews-container');
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'owl-carousel testimonial-carousel';
    reviewContainer.innerHTML = '';

    // Fetch the reviews from the API
    fetch('https://blueskybooking.onrender.com/hotel/reviews/')
        .then(res => res.json())
        .then(reviews => {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = '';
                const tr_body = truncateText(review.body, 110);


                reviewCard.innerHTML = `
                    <div class="testimonial-item shadow text-center rounded pb-4 mb-2 mt-2">
                    <div class="testimonial-comment bg-light rounded p-4">

                        <div class="review-container-for-name-and-button">
                            <div>
                                <h6>${review.hotel.name}</h6>
                            </div>
                            ${UserName === review.user ? `
                                <div class="review-actions-for-button">
                                    <button class="edit-btn-rv" onclick="editReview(${review.id})"></button>
                                    <button class="delete-btn-rv" onclick="deleteReview(${review.id})"></button>
                                </div>
                                
                                `: ''}
                        </div>          
                                
                        <p class="text-center mb-5">${tr_body}</p>
                        </div>
                        <div class="testimonial-img p-1">
                            <img src="img/user.png" class="img-fluid rounded-circle" alt="Image">
                        </div>
                        <div style="margin-top: -35px;">
                           <h5 class="mb-0">${review.user ? review.user : "Anonymous User"}</h5>
                            <p class="mb-0">Created on: ${new Date(review.created).toLocaleDateString()}</p>
                            <div class="d-flex justify-content-center">
                                ${review.rating}
                            </div>
                        </div>
                    </div>
                `;
                carouselContainer.appendChild(reviewCard);
            });
            reviewContainer.appendChild(carouselContainer);


            $('.testimonial-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the reviews:', error);
        });
});



function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

