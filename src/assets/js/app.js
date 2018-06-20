$(document).foundation();

$(document).ready(function() {
    $('.card_like').click(function() {
    	$(this).toggleClass('lukas');
    	$(this).children('.i-like').toggleClass('i-like-fill');
    });
	
    $('.carousel').owlCarousel({
	    loop:false,
        margin:30,
        nav:true,
        navText: ['<i class="i-back"></i>','<i class="i-next"></i>'],
	    responsive:{
	        0:{
				items:1,
				dots: false,
				nav: false
	        },
	        640:{
	            items:2
	        },
	        1000:{
	            items:4
	        }
	    }
	});

    
    if ($(window).width() < '1024'){
        $('.carousel-caralog').owlCarousel({
            loop:false,
            margin:30,
            nav:true,
            navText: ['<i class="i-back"></i>','<i class="i-next"></i>'],
            responsive:{
                0:{
                    items:1,
                    dots: false,
                    nav: false
                },
                640:{
                    items:2
                },
                1024:{
                    items:4
                }
            }
        });
    }

    $('.file_remove').click(function(event) {
    	$(this).next('.file_img').attr('src', '');
    	$(this).parents('.file_upload').removeClass('is-active');
	});
	
	$('a[href^="#"]').click(function(){var t=$(this).attr("href");return $("html, body").animate({scrollTop:$(t).offset().top},1250),!1})
})

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.file_img-1').attr('src', e.target.result);
            $('.file_img-1').parents('.file_upload').addClass('is-active');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

function readURL2(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.file_img-2').attr('src', e.target.result);
            $('.file_img-2').parents('.file_upload').addClass('is-active');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}


function readURL3(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.file_img-3').attr('src', e.target.result);
            $('.file_img-3').parents('.file_upload').addClass('is-active');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}


function readURL4(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.file_img-4').attr('src', e.target.result);
            $('.file_img-4').parents('.file_upload').addClass('is-active');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}