$(document).foundation();

$(document).ready(function() {
    $('.card_like').click(function() {
    	$(this).toggleClass('lukas');
    	$(this).children('.i-like').toggleClass('i-like-fill');
    });

    $('.owl-carousel').owlCarousel({
	    loop:false,
        margin:30,
        nav:true,
        navText: ['<i class="i-back"></i>','<i class="i-next"></i>'],
	    responsive:{
	        0:{
	            items:1
	        },
	        640:{
	            items:2
	        },
	        1000:{
	            items:4
	        }
	    }
	})
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

    $('.file_upload.is-active').click(function() {
    	$(this).find('.file_img').attr('src', '');
    	$(this).removeClass('is-active');
    });
}