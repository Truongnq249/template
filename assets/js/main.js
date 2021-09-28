(function($) {
    window.onload = function() {
        $(document).ready(function() {
            shadowHeader();
            menuMobile();
            searchMobile()
            changeQuantityInput();
            productSidebar();
            scrollToCenterNavTab();
            resizeFlickity();
            slideRangePrice();
            cartView();
            $('[data-bs-toggle="tooltip"]').tooltip();
            categoryNewsMobile();
            focusInputAnimation();
            checkoutAction()
            if ($(".js-select2").length) {
                $(".js-select2").select2();
            }
            toggleSingleProductContent()
            productParamModalCarousel()
        });
    };
})(jQuery);

// Only show menu mobile and cart quickview on document ready
$(document).ready(function() {
        $('.cart-quickview').show();
        $('.menu-mobile').show();
    })
    // Header shadows
function shadowHeader() {
    $(window).scroll(function() {
        if (window.pageYOffset > 100) {
            $('.header').addClass('header-shadow');
        } else {
            $('.header').removeClass('header-shadow');
        };
    })
}
// Menu mobile
function menuMobile() {
    $(".header__bars").click(function() {
        $(".overlay").addClass("overlay-active");
        $(".menu-mobile").addClass("menu-mobile-active");
    });
    $(".overlay").click(function() {
        $(".overlay").removeClass("overlay-active");
        $(".menu-mobile").removeClass("menu-mobile-active");
        $(".box-search_header").removeClass("active");
        $('.cart-quickview').removeClass('active');
        $('.product__sidebar').removeClass('active');
        $('.search__mobile').removeClass('active');

    });
    $(".menu-mobile-close").click(function() {
        $(".overlay").removeClass("overlay-active");
        $(".menu-mobile").removeClass("menu-mobile-active");
    });
    $('.menu-mobile').show();
    $(".menu-mobile ul li.menu-item-has-children>ul").before(`<span class="li-plus"></span>`);
    $(".menu-mobile ul li.current-menu-parent.menu-item-has-children .li-plus").addClass("clicked");
    if ($(".li-plus").length) {
        $(".li-plus").click(function(e) {
            if ($(this).hasClass("clicked")) {
                $(this).removeClass("clicked").next("ul").slideUp(500);
            } else {
                $(this).addClass("clicked").next("ul").slideDown(500);
            }
        });
    }

}

// Search Mobile
function searchMobile() {
    $('.icon__search-mb').click(function() {
        $('.search__mobile').addClass('active');
        $('.overlay').addClass('overlay-active');
        $('.search__mobile form input').trigger('focus');
    })
    $('.search__mobile-close').click(function() {
        $('.search__mobile').removeClass('active');
        $('.overlay').removeClass('overlay-active');
    })
}
// Change input quantity
function changeQuantityInput() {
    jQuery('.quantity').each(function() {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.plus'),
            btnDown = spinner.find('.minus'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= 100) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });
}
// Cart quickview
function cartView() {
    $('.open-cart-qv').click(function() {
        $('.cart-quickview').addClass('active');
        $(".overlay").addClass("overlay-active");
    });
    $('.cart-quickview__close').click(function() {
        $('.cart-quickview').removeClass('active');
        $(".overlay").removeClass("overlay-active");
    });
}
// Resize Flickity
function resizeFlickity() {
    $('.home-product__tab').on('shown.bs.tab', function(event) {
        $('.home-product-carousel').flickity('resize');
    });

    $('.product-quickview-modal').on('shown.bs.modal', function(event) {
        $('.quickview__gallery').flickity('resize');
    });

    $('.param-modal').on('shown.bs.modal', function(event) {
        $('.param-modal__carousel .carousel').flickity('resize');
    });
}
// Scroll to center nav
function scrollToCenterNavTab() {
    $(".home-product__tab li").on("click", function() {
        $(".home-product__tab li").removeClass("center");
        $(this).addClass("center");
        $(this).parent().scrollCenter(".center", 300);
    });
    jQuery.fn.scrollCenter = function(elem, speed) {
        var active = jQuery(this).find(elem); // find the active element
        var activeWidth = active.width() / 2; // get active width center
        var pos = active.position().left + activeWidth; //get left position of active li + center position
        var elpos = jQuery(this).scrollLeft(); // get current scroll position
        var elW = jQuery(this).width(); //get div width
        pos = pos + elpos - elW / 2; // for center position if you want adjust then change this
        jQuery(this).animate({
            scrollLeft: pos
        }, speed == undefined ? 1000 : speed);
        return this;
    };

    jQuery.fn.scrollCenterORI = function(elem, speed) {
        jQuery(this).animate({
            scrollLeft: jQuery(this).scrollLeft() - jQuery(this).offset().left + jQuery(elem).offset().left
        }, speed == undefined ? 1000 : speed);
        return this;
    };
}

// Product Sidebar Menu
function productSidebar() {
    if ($('.product__sidebar-category .cat-parent').find('ul')) {
        $('.product__sidebar-category .cat-parent').find('ul').before('<span class="sidebar__item-toggle-btn justify-content-center align-items-center d-flex"></span')
    }
    $('.sidebar__item-toggle-btn').click(function() {
        $(this).toggleClass('clicked');
        $(this).next('ul').slideToggle();
    });

    $('.archive-product__filter-mobile').click(function() {
        $('.product__sidebar').addClass('active');
        $('.overlay').addClass('overlay-active');
    })
    $('.product__sidebar-close').click(function() {
        $('.product__sidebar').removeClass('active');
        $('.overlay').removeClass('overlay-active');
    })
}

// Slider Range Price
function slideRangePrice() {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });

    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));

    $('#amount').focusout(function() {
        var sliderVal = $(this).val();
        var splitSliderVal = sliderVal.replace(/\$/g, '').split('-');
        $("#slider-range").slider({
            values: [parseInt(splitSliderVal[0]), parseInt(splitSliderVal[1])]
        });
    });
};

function categoryNewsMobile() {
    if ($('.news__head-mobile').length) {
        $('.news__head-mobile').click(function() {
            $(this).parent().find('.list-inner').toggle(500);
            $(this).toggleClass('active');
        })
    }
}
//Thanh toán
function focusInputAnimation() {
    // Animation cho label input
    $('.input-has-animation input').on('focus', function() {
        $(this).next('label').addClass('moveUp');
    })

    $('.input-has-animation input').on('focusout', function() {
        if (!$(this).val()) $(this).next('label').removeClass('moveUp');
    })
    $('.input-has-animation textarea').on('focus', function() {
        $(this).next('label').addClass('moveUp');
    })

    $('.input-has-animation textarea').on('focusout', function() {
        if (!$(this).val()) $(this).next('label').removeClass('moveUp');
    })
}
//Single Product 2
function checkoutAction() {
    // Đóng mở thông báo khi chọn radio
    $('.checkout-info__method label').click(function() {
            $(this).next('.checkout-method-noti').show();
        })
        // Toggle thông tin giỏ hàng trên mobile
    if ($(window).width() < 1024) {
        $('.checkout-main__head').click(function() {
            $(this).toggleClass('clicked');
            $('.toggle-on-mobile').toggle();
        })
    }
}

//Single Product 2 
function toggleSingleProductContent() {
    $('.js--button-overlay').click(function() {
        $(this).parent().hide();
        $('.single-product2__body-left').addClass('active');
    })
    $('.single-product2__body-left').css('height', $('.single-product2__body-right').height())
}

// Single product 2
function productParamModalCarousel() {
    // external js: flickity.pkgd.js

    var $carousel = $('.param-modal__carousel-main').flickity();

    var $carouselNav = $('.param-modal__carousel-nav');
    var $carouselNavCells = $carouselNav.find('.carousel-cell');

    $carouselNav.on('click', '.carousel-cell', function(event) {
        var index = $(event.currentTarget).index();
        $carousel.flickity('select', index);
    });

    var flkty = $carousel.data('flickity');
    var navTop = $carouselNav.position().top;
    var navCellHeight = $carouselNavCells.height();
    var navHeight = $carouselNav.height();

    $carousel.on('select.flickity', function() {
        // set selected nav cell
        $carouselNav.find('.is-nav-selected').removeClass('is-nav-selected');
        var $selected = $carouselNavCells.eq(flkty.selectedIndex)
            .addClass('is-nav-selected');
        // scroll nav
        var scrollY = $selected.position().top +
            $carouselNav.scrollTop() - (navHeight + navCellHeight) / 2;
        $carouselNav.animate({
            scrollTop: scrollY
        });
    });

}