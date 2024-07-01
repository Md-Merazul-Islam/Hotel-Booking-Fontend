document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hotel_id = urlParams.get('hotelId');
    const reviewContainer = document.getElementById('reviews-container');
    const addedReviews = new Set(); // Track added reviews to avoid duplicates

    // Fetch the reviews from the API
    fetch(`https://blueskybooking.onrender.com/hotel/review_add/?hotel_id=${hotel_id}`)
        .then(res => res.json())
        .then(reviews => {
            if (reviews.length === 0) {
                // If no reviews, show a "No reviews" message
                const noReviewsMessage = document.createElement('div');
                noReviewsMessage.className = 'no-reviews-message text-center';
                noReviewsMessage.innerHTML = `
                    <p class="py-5">No reviews for this hotel yet. Be the first to review!</p>
                `;
                reviewContainer.appendChild(noReviewsMessage);
            } else {
                reviews.forEach(review => {
                    // Check if the review ID is already added
                    if (!addedReviews.has(review.id)) {
                        addedReviews.add(review.id); // Add the review ID to the set

                        const reviewCard = document.createElement('div');
                        const tr_body = truncateText(review.body, 110);

                        reviewCard.innerHTML = `
                            <div class="testimonial-item shadow text-center rounded pb-4">
                                <div class="testimonial-comment bg-light rounded p-4">
                                    <h3>${review.hotel.name}</h3>
                                    <p class="text-center mb-5">${tr_body}</p>
                                </div>
                                <div class="testimonial-img p-1">
                                    <img src="img/user.png" class="img-fluid rounded-circle" alt="Image">
                                </div>
                                <div style="margin-top: -35px;">
                                    <h5 class="mb-0">${review.user}</h5>
                                    <p class="mb-0">Created on: ${new Date(review.created).toLocaleDateString()}</p>
                                    <div class="d-flex justify-content-center">
                                        ${review.rating}
                                    </div>
                                </div>
                            </div>
                        `;
                        reviewContainer.appendChild(reviewCard);
                    }
                });

                // Initialize the carousel only if there are reviews
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
            }
        })
        .catch(error => {
            console.error('Error fetching the reviews:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message text-center';
            errorMessage.innerHTML = `
                <p class="py-5">Unable to load reviews at the moment. Please try again later.</p>
            `;
            reviewContainer.appendChild(errorMessage);
        });
});

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}
