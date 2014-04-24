$(document).ready(function() {
    $("div.sidebar li").hover(
        function () {
            $(this).find("a").css("color", "#fff");
            $(this).find("span").stop().animate({
                width: "100%",
                opacity: "1"
            }, 600, function () {
                // Animation complete.
                // Show Navigation
            });
        }, function () {
            $(this).find("a").css("color", "#555");
            $(this).find("span").stop().animate({
                width: "0%",
                opacity: "0"
            }, 600, function () {
                // Animation complete.
                // Show Navigation
            })
        }
    );

    for(var i = 0; i < $("div.sidebar").find("a").length; i ++){
        var obj = $("div.sidebar").find("a")[i];
        if(obj.id != ""){
           obj.onclick = function(){
               $("#mainContent")[0].src = $(this).attr("id") + ".html";
           };
        }
    }

    $(window).scroll(function(){
        //alert($(window).scrollTop());
        if($(window).scrollTop() >= 85){
            $("div.sidebar").css("top" , 0);
            $("div.sidebar").css("position", "fixed");
        }else if($(window).scrollTop() <= 85){
            $("div.sidebar").css("position", "relative");
        }
    });

    $("#mainContent").load(function(){
        var height = window.frames["mainContent"].document.getElementsByTagName("html")[0].scrollHeight;
        $(this).css("height", height);
        if(height < $("div.sidebar ul").offsetHeight){
            $("div.sidebar").css("height", height);
        }else{
            $("div.sidebar").css("height", $("div.sidebar ul").offsetHeight);
        }
    });
});