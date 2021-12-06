(function ($) {
    "use strict";
    /*------------------------------------------------------------------
    [Table of contents]
    -------------------------------------------------------------------*/
    /*
    0. preloader
    1. header search wrap 
    2. navigation
    3. select langauge
    4. count down
    5. how work video
    6. chart
    7. Side Offset cart menu open
    8. back to top
    9. client logo slider
    10. partciles dot on background
    11. wow init

     */
 
         /*==========================================================
				0. preloader close button	
	======================================================================*/
         $(window).on('load', function () {
            $('#preloader').addClass('loaded');
         });

            // preloader close
            $('.cencel-preloader').on('click', function (e) {
            e.preventDefault();
            if (!($('#preloader').hasClass('loaded'))) {
                $('#preloader').addClass('loaded');
            }
        })

   /*==========================================================
     header search wrap
     ======================================================================*/
         
    if ($(".search-wrap").length > 0) {
        var todg = true;
        $(".searchIcon").on("click", function (e) {
            e.preventDefault();
            if (todg) {
                $(".search-wrap").fadeIn("slow");
                todg = false;
            } else {
                $(".search-wrap").fadeOut("slow");
                todg = true;
            }
        });

        $(document).on('mouseup', function (e) {
            var container = $(".search-inner");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".search-wrap").fadeOut("slow");
                todg = true;
            }

        });
    }
  

    /*==========================================================
     navigation
     ======================================================================*/
    if ($("#navigation1").length > 0) {
        $("#navigation1").navigation({
            effect: "fade",
            mobileBreakpoint: 992,
        });

 
        // menu scrolling

        if($('.scrolls').length > 0){
            $('.scrolls').on ('click',function () {
                $('html, body').animate({scrollTop: $(this.hash).offset().top -100}, 1000);
                return false;
            });
        }
    
    }



    /*==========================================================
     select lagnuage on popup
     ======================================================================*/

     if ($('.xs-modal-popup').length > 0) {
        $('.xs-modal-popup').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: false,
            mainClass: 'mfp-fade',
            callbacks:{
                beforeOpen: function() {
                    this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
                }
            }
        });
    }
    /*==========================================================
     counter down
   ======================================================================*/

    function xsCountDown() {
        var endTIme = new Date('2018-8-17');
        var nowTime = new Date();

        var timeLeft = endTIme - nowTime;
        var days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
        var hours = Math.floor((timeLeft / 1000 / 60 / 60) - (days * 24));
        var minuts = Math.floor((timeLeft / 1000 / 60) - (days * 24 * 60) - (hours * 60));
        var second = Math.floor((timeLeft / 1000) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minuts * 60));

        if (hours < "10") { hours = "0" + hours }
        if (minuts < "10") { minuts = "0" + minuts }
        if (second < "10") { second = "0" + second }

        $("#xs_days").html(days);
        $("#xs_hours").html(hours);
        $("#xs_minuts").html(minuts);
        $("#xs_second").html(second);
    }

    setInterval(function () {
        xsCountDown();

    }, 1000);

    /*==========================================================
             how work video
    ======================================================================*/
        $('.xs-video').magnificPopup({
            type: 'iframe',

        });


    /* ======================================================================
                          Chart 
    ======================================================================*/

    if ($('#myChart').length > 0) {
        var ctx = document.getElementById("myChart").getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Community", "Reserved Fund", "Advisor Team", "Sold Globaly"],
                datasets: [{
                    data: [10, 8, 12, 70],
                    backgroundColor: [
                        '#ae31d9',
                        '#f18b7e',
                        '#5db7fa',
                        '#26d7e5'
                    ],
                    borderColor: [
                        '#02014c',
                        '#02014c',
                        '#56a7f9',
                        '#56a7f9'
                    ],
                    borderWidth: 0,
                }]
            },
            options: {
                legend: {
                    display: false,
                }
            }
        });
    }

    /* Chart 2 */

    if ($('#myChartTwo').length > 0) {
        var ctxTwo = document.getElementById("myChartTwo").getContext('2d');
        var myChartTwo = new Chart(ctxTwo, {
            type: 'doughnut',
            data: {
                labels: ["Liquidity", "Development", "Marketing", "Holders", "Buy Back"],
                datasets: [{
                    data: [30,15,30,15,15],
                    backgroundColor: [
                        '#c13cbd',
                        '#4a8df8',
                        '#00ff7f',
                        '#ef7b7e',
                        '#ffebcd'
                    ],
                    borderColor: [
                        '#02014c',
                        '#02014c',
                        '#56a7f9',
                        '#ef7b7e'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                legend: {
                    display: false,
                }
            }
        });
    }

    /*==========================================================
           Side Offset cart menu open
        ======================================================================*/
    if ($('.offset-side-bar').length > 0) {
        $('.offset-side-bar').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.cart-group').addClass('isActive');
        });
    }
    if ($('.close-side-widget').length > 0) {
        $('.close-side-widget').on('click', function (e) {
            e.preventDefault();
            $('.cart-group').removeClass('isActive');
        });
    }
    if ($('.navSidebar-button').length > 0) {
        $('.navSidebar-button').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.info-group').addClass('isActive');
        });
    }
    if ($('.close-side-widget').length > 0) {
        $('.close-side-widget').on('click', function (e) {
            e.preventDefault();
            $('.info-group').removeClass('isActive');
        });
    }
    $('body').on('click', function (e) {
        $('.info-group').removeClass('isActive');
        $('.cart-group').removeClass('isActive');
    });
    $('.xs-sidebar-widget').on('click', function (e) {
        e.stopPropagation();
    });


    /*==========================================================
         back to top
======================================================================*/

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 4000) {
            $(".BackTo").fadeIn('slow');
        }
        else {
            $(".BackTo").fadeOut('slow');
        }

    });

    $("body, html").on("click", ".BackTo", function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    if ( $(window).width() > 767 ) {
        $(".BackTo").css('display', 'none');
    }

    /*==========================================================
           client logo slider
  ======================================================================*/
    if ($('#client-slider').length > 0) {
        var bannerSlider = $("#client-slider");
        bannerSlider.owlCarousel({
            items: 5,
            mouseDrag: true,
            touchDrag: true,
            dots: true,
            loop: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2,
                },
                // breakpoint from 480 up
                480: {
                    items: 2,
                },
                // breakpoint from 768 up
                768: {
                    items: 4,
                },
                991: {
                    items: 5,
                }
            }
        });
    }

    /*==========================================================
            particles dot on background
  ======================================================================*/
  $(window).on("load", function() {
    $("#particles-js").length && particlesJS("particles-js", {
        particles: {
            number: {
                value: 28
            },
            color: {
                value: ["#0182cc", "#00befa", "#0182cc"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 1,
                random: !1,
                anim: {
                    enable: !1
                }
            },
            size: {
                value: 3,
                random: !0,
                anim: {
                    enable: !1
                }
            },
            line_linked: {
                enable: !1
            },
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !0,
                straight: !1,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !1
                },
                onclick: {
                    enable: !1
                },
                resize: !0
            }
        },
        retina_detect: !0
    })
});


	/*=============================================================
			wow animation init
	=========================================================================*/
	$(function(){
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true,
			scrollContainer: null,
		});
		wow.init();
    });
    

 	/*=============================================================
			fixed header
	=========================================================================*/
    $(window).on('scroll', function () {
        /**Fixed header**/
        
            if ($(window).scrollTop() > 100) {
                $('.header').addClass('fixed-header animated fadeInDown');
            } else {
                $('.header').removeClass('fixed-header animated fadeInDown');
            }

            if ($(window).width() < 991) {
                $('.header').removeClass('fixed-header animated fadeInDown');
            }
        
    });



})(jQuery);