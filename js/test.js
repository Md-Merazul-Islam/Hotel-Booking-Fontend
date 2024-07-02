let UserName = '';
let UserId = null;

async function fetchUserData() {
    const token = localStorage.getItem('token');
    const storedUserId = parseInt(localStorage.getItem('user_id'));
    if (token && storedUserId) {
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

            // Find the account that matches the userId from local storage
            const account = userData.find(account => account.account_no === storedUserId);

            if (!account) {
                throw new Error('No matching user account found');
            }

            UserName = account.username;
            UserId = account.account_no;

        } catch (error) {
            console.error('Error fetching user account data:', error);
        }
    } else {
        console.error('No token or user_id found');
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await fetchUserData(); // Fetch user data before proceeding

    const reviewContainer = document.getElementById('reviews-container');
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'owl-carousel testimonial-carousel';
    reviewContainer.innerHTML = '';

    // Fetch and display reviews
    fetch('https://blueskybooking.onrender.com/hotel/reviews/')
        .then(res => res.json())
        .then(reviews => {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = '';

                const truncatedBody = truncateText(review.body, 110);

                reviewCard.innerHTML = `
                    <div class="testimonial-item shadow text-center rounded pb-4 mb-2 mt-2">
                        <div class="testimonial-comment bg-light rounded p-4">
                            <div class="review-container-for-name-and-button">
                                <div>
                                    <h6>${review.hotel.name}</h6>
                                </div>
                                ${UserId === review.user ? `
                                    <div class="review-actions-for-button">
                                        <button class="edit-btn-rv" onclick="editReview(${review.id})"></button>
                                        <button class="delete-btn-rv" onclick="deleteReview(${review.id})"></button>
                                    </div>` : ''}
                            </div>
                            <p class="text-center mb-5">${truncatedBody}</p>
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

            // Initialize OwlCarousel after appending reviews
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

function editReview(reviewId) {
    fetch(`https://blueskybooking.onrender.com/hotel/review_add/${reviewId}/`)
        .then(res => res.json())
        .then(review => {
            document.getElementById('reviewBody').value = review.body;
            document.getElementById('reviewRating').value = review.rating;
            document.getElementById('reviewId').value = review.id;

            $('#editReviewModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching the review:', error);
        });
}

// Update review
document.getElementById('editReviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const reviewId = document.getElementById('reviewId').value;
    const updatedBody = document.getElementById('reviewBody').value;
    const updatedRating = document.getElementById('reviewRating').value;

    fetch(`https://blueskybooking.onrender.com/hotel/review_add/${reviewId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            body: updatedBody,
            rating: updatedRating
        })
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Review updated',
                text: 'You have successfully updated your review!',
                confirmButtonColor: '#007bff'
            });
            console.log('Review updated:', data);
            $('#editReviewModal').modal('hide');
            location.reload(); // Reload the page to see the updated review
        })
        .catch(error => {
            console.error('Error updating review:', error);
        });
});

// Delete review
function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        fetch(`https://blueskybooking.onrender.com/hotel/review_add/${reviewId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                console.log('Review deleted');
                document.querySelector(`button[onclick="deleteReview(${reviewId})"]`).closest('.testimonial-item').remove();
            })
            .catch(error => {
                console.error('Error deleting review', error);
            });
    }
}