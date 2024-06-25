// document.addEventListener('DOMContentLoaded', () => {
//     const reviewsContainer = document.getElementById('reviews-container');

//     // Fetch the reviews from the API
//     fetch('https://blueskybooking.onrender.com/hotel/reviews/')
//         .then(response => response.json())
//         .then(reviews => {
//             reviews.forEach(review => {
//                 const reviewCard = document.createElement('div');
//                 reviewCard.classList.add('testimonial-item');

//                 // Create the review content
//         //         reviewCard.innerHTML = `
//         //     <h3>${review.hotel_name}</h3>
//         //     <p>${review.body}</p>
//         //     <div class="rating">${review.rating}</div>
//         //     <div class="meta">
//         //         <span>Reviewed by: ${review.user_name}</span>
//         //         <span>Created on: ${new Date(review.created).toLocaleDateString()}</span>
//         //     </div>
//         // `;

//         reviewCard.innerHTML = `
             
//             // <div class="testimonial-item text-center rounded pb-4">
//             <div class="testimonial-comment bg-light rounded p-4">
//             <h3>${review.hotel_name}</h3>
//                     <p class="text-center mb-5">${review.body}</p>
//                 </div>
//                 <div class="testimonial-img p-1">
//                     <img src="img/testimonial-1.jpg" class="img-fluid rounded-circle" alt="Image">
//                 </div>
//                 <div style="margin-top: -35px;">
//                     <h5 class="mb-0">${review.user_name}</h5>
//                     <p class="mb-0">Created on: ${new Date(review.created).toLocaleDateString()}</p>
//                     <div class="d-flex justify-content-center">
//                         ${review.rating}
//                     </div>
//                 </div>
//             // </div>
         
//         `;

//                 // Append the card to the container
//                 reviewsContainer.appendChild(reviewCard);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching the reviews:', error);
//         });
// });



document.addEventListener('DOMContentLoaded', () => {
    const reviewContainer = document.getElementById('reviews-container');
    const carouselContainer = document.createElement('div');
    // carouselContainer.className = 'owl-carousel packages-carousel';
    carouselContainer.className = 'owl-carousel testimonial-carousel';
    reviewContainer.innerHTML = ''; // Clear any existing content in the review container

    // Fetch the reviews from the API
    fetch('https://blueskybooking.onrender.com/hotel/reviews/')
        .then(res => res.json())
        .then(reviews => {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = '';
                const tr_body = truncateText(review.body, 110);
         

                reviewCard.innerHTML = `
                    <div class="testimonial-item shadow text-center rounded pb-4">
                    <div class="testimonial-comment bg-light rounded p-4">
                        <h3>${review.hotel_name}</h3>
                            <p class="text-center mb-5">${tr_body}</p>
                        </div>
                        <div class="testimonial-img p-1">
                            <img src="img/user.png" class="img-fluid rounded-circle" alt="Image">
                        </div>
                        <div style="margin-top: -35px;">
                            <h5 class="mb-0">${review.user_name}</h5>
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

            // Initialize Owl Carousel after appending the review cards
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
