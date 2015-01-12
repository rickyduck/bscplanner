jQuery( document ).ready(function( $ ) {
    //AJAX POST LOOP LOAD
    $( "#post-navbar .cat-item a" ).click(function(event) {
    event.preventDefault();
    
    var link = $(this).attr("href");
    var cat = $(this).html();    
    
       
        
    $(".post-loop").load(link+ ' .post-loop > *', function() 
    {
        $(".loop_title small").html(" "+cat);
    });
});
    
    //AJAX POST PAGINATION
    $( ".load-more a" ).live("click",function(event) 
    {
        event.preventDefault();
        var link = $(this).attr("href");
        $(this).html("loading...")
        $.get(link,function(data) {
        var posts = $(data).find('.post-loop > *');
       // If the #posts element is at the top level of the data,
       //    you'll need to use .filter() instead.
       // var posts = $(data).filter('#posts');
        $('#morePosts').replaceWith(posts);
});
    })
    
//    
    
    //Carousel Swipe
     $(".carousel").swiperight(function() {  
    		  $(this).carousel('prev');  
	    		});  
		   $(".carousel").swipeleft(function() {  
		      $(this).carousel('next');  
	   });
    
    //TOOGLE SEARCH FIELD
    $(".menu-item-search").click(function(event)
        {
            if($(event.target).is("#s")){ event.preventDefault();}
            else if(!$(".menu-item-search").hasClass("search-expanded") && $(".menu-item-search").css("width") =="80px")
            {
                event.preventDefault();
                $(".menu-item-search").toggleClass("search-expanded");
                !$("#searchform #s").focus();
            }
            else if
            ( !$("#searchform #s").val()) 
            {
                event.preventDefault();
                $(".menu-item-search").toggleClass("search-expanded")
            }
            
        })
    
    //ADD iframe loading animation
    $('.ia-jsfiddle-embed').before('<div class="loadingAnimation text-center"><i class="fa fa-cog fa-5x fa-spin"></i><p>loading...</p></div>')
    $('iframe').one('load', function(){
     $(".loadingAnimation").remove();
    })
    
   //FANCYBOX
		jQuery("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").fancybox({beforeShow: function(){$(document.getElementsByTagName( 'html' )[0]).addClass("fancybox-lock")},helpers : {title : null,overlay: {locked: true}}});
		
		jQuery("a[href*='watch?']").live("click",function(event) 
		{
			event.preventDefault();
			
			$.fancybox({
		 fitToView: false,
    width: '90%',
    height: '90%',
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    helpers: {
        overlay: {
            locked: false
        }
    }});
		});
    
    //BACKGROUND IMG FOR TAGS ARCHIVE
    
    //SCROLL UP
    $("#scrollUp").click(function(event){
        event.preventDefault();
        window.scrollTo(0, 0);
        
    });
    
    //SECURITY QUESTION ON NEWSLETTER
    $(".newsletter-submit").click(
        function(event){
            
            if($('#sq').val() == 9)
            {
                
            }
            else
            {
                event.preventDefault();
                $('#securityQuestion').modal('toggle');
            };
            
            $('#sq').val(0);
    });
    
   $("#securitySubmit").click(
        function(event){
            
            if($('#sq').val() == 9)
            {
                $( ".newsletter-submit" ).trigger( "click" );
            }
            else
            {
                 $('#sq').val("wrong");
            };
            
        })
    
    
    
} );
