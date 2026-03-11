/*===================================================
    Template Scripts
====================================================*/
(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function () {
        $('body').addClass('loaded');
    });

    $(document).ready(function () {

        var html = $('html');

        // Responsive Classes
        function responsiveClasses() {
            var body = $("body");
            if ($(window).width() < 992) {
                body.removeClass("viewport-lg");
                body.addClass("viewport-sm");
            } else {
                body.removeClass("viewport-sm");
                body.addClass("viewport-lg");
            }
        }

        // Window Resize
        $(window).on("resize", function () {
            responsiveClasses();
        }).resize();

        // Sticky Header
        function stickyHeader() {
            var mainHeader = $(".main-header"),
                headerClone = mainHeader.clone();
            mainHeader.after('<div class="sticky-header"></div>');
            $(".sticky-header").html(headerClone);

            var headerSelector = document.querySelector(".sticky-header"),
                triggerPoint = mainHeader.height(),
                yOffset = 0;

            $(window).on("scroll", function () {
                yOffset = $(window).scrollTop();
                if (yOffset >= triggerPoint) {
                    $(".sticky-header").addClass("sticky-fixed-top");
                } else {
                    $(".sticky-header").removeClass("sticky-fixed-top");
                }
            });
        }

        if ($(window).width() > 992) {
            stickyHeader();
        }

        // Mobile Menu
        function mobileMenu() {
            $("header.main-header").after('<div class="mobile-navigation-menu"><button id="mobile-menu-close"><i class="la la-close"></i></button></div>');
            var menuWrapper = $("header.main-header .header-menu-wrap .nav-menu").clone();
            $('.mobile-navigation-menu #mobile-menu-close').after(menuWrapper);

            $("#mobile-menu-close, .mobile-menu-icon").on("click", function () {
                $(".mobile-menu-icon").toggleClass("menu-open");
                $(".mobile-navigation-menu").toggleClass("open-mobile-menu");
            });

            $(".mobile-navigation-menu ul li:has(ul)").each(function () {
                $(this).append('<span class="dropdown-plus"></span>');
                $(this).addClass("dropdown_menu");
            });

            $(".mobile-navigation-menu .dropdown-plus").on("click", function () {
                $(this).prev("ul").slideToggle(300);
                $(this).toggleClass("dropdown-open");
                $(".mobile-navigation-menu ul li:has(ul)").toggleClass("dropdown-open");
            });

            $(".mobile-navigation-menu .dropdown_menu a").append("<span></span>");
        }

        mobileMenu();

        // Popup Search Box
        $(function () {
            $("#popup-search-box").removeClass("toggled");
            $("body").removeClass("open-search-box");
            $(".dl-search-icon").on("click", function (e) {
                e.stopPropagation();
                $("body").toggleClass("open-search-box");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });
            $(document).on(
                "click",
                ".search-close, #searchbox-overlay",
                function (e) {
                    e.preventDefault();
                    $("body.open-search-box").removeClass("open-search-box");
                }
            );
        });

        // Do Slider Animation
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationDuration = $this.data('duration');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                    'animation-duration': $animationDuration
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        // Main Slider
        var mainSlider;
        var sliderOptions = {
            speed: 1000,
            autoplay: true,
            mousewheel: false,
            loop: true,
            effect: 'fade',
             pagination: {
                el: ".slider-pagination",
                clickable: true,
            },
            navigation: false,
        };

        sliderOptions.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find('[data-animation]');
                doAnimations(animatingElements);
            },
            resize: function () {
                this.update();
            }
        };

        mainSlider = new Swiper('.main-slider', sliderOptions);

        //Running Animated Text
        const scrollers = document.querySelectorAll(".scroller");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }

        //Project Carousel
        var swiperProject = new Swiper(".project-carousel", {
            slidesPerView: 3,
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: {
                el: ".project-carousel .carousel-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev'
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 1
                }
            }
        });

        //Testimonial Carousel
        var testiThumbActive = $('.testi-thumb-active .testi-thumb-img');
        var testiThumb = [];
        $('.testimonial-carousel .swiper-slide').each(function (i, item) {
            testiThumb.push($(item).data('thumb'));
        });

        // Project images per testimonial (for the 3 small circles)
        var projectThumbImages = [
            'assets/img/project 1/638725726_122102506377265842_7639280331058260489_n.jpg',
            'assets/img/project 2/640076061_122102029647265842_4980090804679205735_n.jpg',
            'assets/img/project 3/641471454_122102677869265842_4239151838560980879_n.jpg'
        ];

        // All project images pool for random large circle display
        var allProjectImages = [
            'assets/img/project 1/638725726_122102506377265842_7639280331058260489_n.jpg',
            'assets/img/project 1/639419498_122102506359265842_6530702516491603497_n.jpg',
            'assets/img/project 2/638323918_122102029713265842_7454231584399311908_n.jpg',
            'assets/img/project 2/638563809_122102029767265842_8643888364461941513_n.jpg',
            'assets/img/project 2/639705461_122102029563265842_8797096318167209666_n.jpg',
            'assets/img/project 2/640076061_122102029647265842_4980090804679205735_n.jpg',
            'assets/img/project 2/636772481_122102029611265842_2104418771663440571_n.jpg',
            'assets/img/project 3/640119001_122102677839265842_8155284073814382183_n.jpg',
            'assets/img/project 3/641471454_122102677869265842_4239151838560980879_n.jpg'
        ];
        var lastRandomIndex = -1;
        function getRandomProjectImage() {
            var idx;
            do { idx = Math.floor(Math.random() * allProjectImages.length); } while (idx === lastRandomIndex);
            lastRandomIndex = idx;
            return allProjectImages[idx];
        }

        var testimonialCarousel = new Swiper('.testimonial-carousel', {
            autoplay: true,
            loop: true,
            // If we need pagination
            pagination: {
                el: '.testi-custom-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    var img = projectThumbImages[index] || testiThumb[index] || '';
                    return '<span class="' + className + '" style="background-image: url(\'' + img + '\')"></span>';
                },
            },

            // Navigation arrows
            navigation: {
                nextEl: '.test-nav-wrap .swiper-next',
                prevEl: '.test-nav-wrap .swiper-prev',
            },
            on: {
                init: function () {
                    testiThumbActive.css('background-image', 'url("' + getRandomProjectImage() + '")');
                },
                slideChangeTransitionStart: function () {
                    testiThumbActive.css('background-image', 'url("' + getRandomProjectImage() + '")');
                },
                resize: function () {
                    this.update();
                }
            },

        });

        //Review Carousel
        var swiperProject = new Swiper(".review-carousel", {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: {
                el: ".review-carousel .carousel-pagination",
                clickable: true,
            },
            navigation: false,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 2,
                    slidesPerGroup: 1
                }
            }
        });

        //Sponsor Carousel
        var swiperSponsor = new Swiper(".sponsor-carousel", {
            slidesPerView: "5",
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            speed: 700,
            pagination: {
                el: ".sponsor-carousel .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 0
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 1
                }
            }
        });

        // Accordion
        $('.faq-accordion .accordion-item').on('click', function () {
            $(".faq-accordion .accordion-item.active").removeClass("active");
            if (!$('.faq-accordion .accordion-item').hasClass('active')) {
                $(this).addClass("active");
            }
            return false;
        });

        // Funfact Counter
        $('.counter-item').waypoint(
            function () {
                var odo = $(".counter-item .odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
                offset: "80%",
                triggerOnce: true
            }
        );

        // Wow JS Active
        new WOW().init();

        // Nice Select Active
        $('select').not('.native-select').niceSelect();

        // Current Year
        var currentYear = new Date().getFullYear();
        $('#currentYear').append(currentYear);

        // Scrool To Top
        var scrollTop = $("#scroll-top");
        $(window).on('scroll', function () {
            var topPos = $(this).scrollTop();
            if (topPos > 100) {
                $('#scrollup').removeClass('hide');
                $('#scrollup').addClass('show');

            } else {
                $('#scrollup').removeClass('show');
                $('#scrollup').addClass('hide');
            }
        });

        $(scrollTop).on("click", function () {
            $('html, body').animate({
                scrollTop: 0
            }, 100);
            return false;
        });

        // Custom Cursor
        function customCursor() {
            $('body').append('<div class="dl-cursor"></div>');
            var cursor = $('.dl-cursor'),
                projectView = $('.project-view');

            $(window).on('mousemove', function (e) {
                cursor.css({
                    'transform': 'translate(' + (e.clientX - 5) + 'px,' + (e.clientY - 5) + 'px)',
                    'visibility': 'inherit'
                });
            });

            $(window).on('mouseout', function () {
                cursor.css('visibility', 'hidden');
            });
            projectView.each(function () {
                $(this).on('mouseleave', function () {
                    cursor.removeClass('expand');
                });
                $(this).on('mouseover', function () {
                    cursor.addClass('expand');
                });
            });
        }

        if ($('body').hasClass('viewport-lg')) {
            customCursor();
        }

        // Venobox Active
        $('.venobox').venobox({
            bgcolor: 'transparent',
            spinner: 'spinner-pulse',
            numeration: true,
            infinigall: true
        });

    });

})(jQuery);
