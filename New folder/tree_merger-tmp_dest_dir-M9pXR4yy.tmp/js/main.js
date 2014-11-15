$("menu.center button").on("click", function(){
	if($(this).attr("href")){
		window.location.href = $(this).attr("href");
	}
})
