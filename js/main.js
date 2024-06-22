(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();




    // Initiate the wowjs
    new WOW().init();


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });




    // packages carousel
    $(".packages-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });




    // Testimonial-carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });



})(jQuery);




// document.addEventListener('DOMContentLoaded', function() {
//     const authButtons = document.getElementById('auth-buttons');
//     const isAuthenticated = Boolean(localStorage.getItem('token'));
//     if (isAuthenticated) {
//         authButtons.innerHTML = `
//             <div class="d-flex justify-content-end align-items-center">
//                 <div class="balance pe-3">$0.00</div>
//                 <div class="btn-group dropstart">
//                     <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                         <img src="./img/user.png" class="r-img" alt="My profile">
//                     </button>
//                     <ul class="dropdown-menu">
//                         <li><a class="dropdown-item" href="balance.html">
//                             <img src="./img/credit-cards.png" class="r-img" alt="Balance"> $0.00
//                         </a></li>
//                         <li><a class="dropdown-item" href="profile.html">
//                             <img src="./img/user.png" class="r-img" alt="Profile"> Profile
//                         </a></li>
//                         <li><a class="dropdown-item" href="deposit.html">
//                             <img src="./img/add-wallet.png" class="r-img" alt="Deposit"> Deposit
//                         </a></li>
//                         <li><a class="dropdown-item" href="#" onclick="handleLogout()">
//                             <img src="./img/logout.png" class="r-img" alt="Logout"> Logout
//                         </a></li>
//                     </ul>
//                 </div>
//             </div>
//         `;
//     } else {
//         authButtons.innerHTML = `
//             <div>
//             <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
//             <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
//                 </div>
//         `;
//     }
// });









// document.addEventListener('DOMContentLoaded', async function() {
//     const authButtons = document.getElementById('auth-buttons');
//     const isAuthenticated = Boolean(localStorage.getItem('token'));

//     if (isAuthenticated) {
//         try {
//             // Fetch user account data
//             const response = await fetch('https://blueskybooking.onrender.com/user/account/', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch user data');
//             }

//             const userData = await response.json();

//             // Ensure balance is treated as a number
//             const balance = parseFloat(userData[0].balance.replace(',', '')); // Remove commas if present

//             // Update the UI with user-specific information
//             authButtons.innerHTML = `
//                 <div class="d-flex justify-content-end align-items-center">
//                     <div class="balance pe-3">$${balance.toFixed(2)}</div>
//                     <div class="btn-group dropstart">
//                         <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
//                             <img src="./img/user.png" class="r-img" alt="My profile">
//                         </button>
//                         <ul class="dropdown-menu">
//                             <li><a class="dropdown-item" href="balance.html">
//                                 <img src="./img/credit-cards.png" class="r-img" alt="Balance"> $${balance.toFixed(2)}
//                             </a></li>
//                             <li><a class="dropdown-item" href="profile.html">
//                                 <img src="./img/user.png" class="r-img" alt="Profile"> ${userData[0].username}
//                             </a></li>
//                             <li><a class="dropdown-item" href="deposit.html">
//                                 <img src="./img/add-wallet.png" class="r-img" alt="Deposit"> Deposit
//                             </a></li>
//                             <li><a class="dropdown-item" href="#" onclick="handleLogout()">
//                                 <img src="./img/logout.png" class="r-img" alt="Logout"> Logout
//                             </a></li>
//                         </ul>
//                     </div>
//                 </div>
//             `;
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             authButtons.innerHTML = `
//                 <div>
//                     <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
//                     <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
//                 </div>
//             `;
//         }
//     } else {
//         authButtons.innerHTML = `
//             <div>
//                 <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
//                 <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
//             </div>
//         `;
//     }
// });





document.addEventListener('DOMContentLoaded', async function () {
    const authButtons = document.getElementById('auth-buttons');
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    if (isAuthenticated) {
        try {
            const res = await fetch('https://blueskybooking.onrender.com/user/account/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user data ');
            }
            const userData = await res.json();
            const balance = parseFloat(userData[0].balance.replace(',', ''));

            authButtons.innerHTML = `
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="balance">$${balance.toFixed(2)}</div>
                                <div class=" dropstart">
                                    <button type="button" class="btn  " data-bs-toggle="dropdown" aria-expanded="false">
                                        <div>
                                        <div><img src="./img/user.png" class="r-img" alt="My profile"></div>
                                        <div><small class="small-test">${userData[0].username}</small></div>
                                        </div>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="balance.html">
                                            <img src="./img/credit-cards.png" class="r-img" alt="Balance"> $${balance.toFixed(2)}
                                        </a></li>
                                        <li><a class="dropdown-item" href="profile.html">
                                            <img src="./img/user.png" class="r-img" alt="Profile"> ${userData[0].username}
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
            console.error('Error fetching user data : ', error);
            authButtons.innerHTML = `
                            <div>
                                <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
                                <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
                            </div>
                        `;
        }
    } else {
        authButtons.innerHTML = `
                <div>
                    <a class="btn btn-light fw-semibold" href="register.html">Sign up</a>
                    <a class="btn btn-primary fw-semibold" href="login.html">Login</a>
                </div>
            `;
    }
});