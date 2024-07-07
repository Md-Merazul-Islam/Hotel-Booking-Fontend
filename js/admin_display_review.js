document.addEventListener('DOMContentLoaded', fetchReviews);

async function fetchReviews() {
    try {
        const response = await fetch('https://blueskybooking.onrender.com/hotel/reviews/');
        const reviews = await response.json();

        const tableBody = document.getElementById('reviewTableBody');
        reviews.forEach((review, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${review.hotel.name}</td>
                <td>${review.hotel.address}</td>
                <td>${review.rating}</td>
                <td>${review.user}</td>
                <td>${review.body}</td>
                <td>${new Date(review.created).toLocaleString()}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteReview(${review.id}, this)">Delete</button></td>
          
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}







async function deleteReview(reviewId, button) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://blueskybooking.onrender.com/hotel/review_add/${reviewId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete review');
        }
        
        const row = button.closest('tr');
        row.remove();
        Swal.fire({
            icon: 'success',
            title: 'Review deleted successfully',
        });
        console.log('Review deleted successfully');
    } catch (error) {
        console.error('Error deleting review:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed to delete review',
            text: error.message,
        });
    }
}