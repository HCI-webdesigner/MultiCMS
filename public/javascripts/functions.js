/**
 * Created by shara on 2014/4/24.
 */
function createRequest() {
    if (window.XMLHttpRequest) {
        var req = new XMLHttpRequest();
    }else{
        var req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return req;
}

function resizeWindow(inMain) {
    if(inMain){
        var height = window.frames["mainContent"].document.getElementsByTagName("html")[0].scrollHeight;
        var sidebar = document.getElementsByClassName("sidebar")[0];
        var sidebarHeight = sidebar.getElementsByTagName("ul")[0].offsetHeight + 57;
        document.getElementById("mainContent").style.height = height + "px";
    }else{
        var height = document.getElementsByTagName("html")[0].scrollHeight;
        var sidebar = window.parent.document.getElementsByClassName("sidebar")[0];
        window.parent.document.getElementById("mainContent").style.height = height + "px";
    }
    if (height < 600) {
       sidebar.style.height = sidebarHeight + "px";
        window.parent.document.getElementById("mainContent").style.height = 600 + "px";
    } else{
        sidebar.style.height = height + "px";
    }
}

function nextPage(id){
    window.parent.document.getElementById("mainContent").src = "../../Views/templates/" + id + ".html";
}