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


    // if authenticated login, logout handler 
    document.addEventListener('DOMContentLoaded',function(){
        const authButtons = document.getElementById('auth-buttons');
        const isAuthenticated = Boolean(localStorage.getItem('authToken'));
        if (isAuthenticated){
            authButtons.innerHTML=`
                          
                            <div class="d-flex justify-content-end align-items-center">
                                <div class="balance pe-3">$0.00</div>
                                <div class="btn-group dropstart pe-4">
                                    <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="./img/user.png" class="r-img" alt="My profile">
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="balance.html">
                                            <img src="./img/credit-cards.png" class="r-img" alt="Balance"> $0.00
                                        </a></li>
                                        <li><a class="dropdown-item" href="profile.html">
                                            <img src="./img/user.png" class="r-img" alt="My profile"> Profile
                                        </a></li>
                                        <li><a class="dropdown-item" href="deposit.html">
                                            <img src="./img/add-wallet.png" class="r-img" alt="Deposit"> Deposit
                                        </a></li>
                                        <li><a class="dropdown-item" href="#" onclick="logout()">
                                            <img src="./img/logout.png" class="r-img" alt="Logout"> Logout
                                        </a></li>
                                    </ul>
                                </div>
                            </div>

            `;
        }
        function logout(){
            localStorage.removeItem('authToken');
            window.location.href ='index.html'
        }
    });

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

