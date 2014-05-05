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

function createCoverDiv(){
    var cover = document.createElement("div");
    cover.className = "cover-div";
    window.parent.document.getElementsByTagName("body")[0].appendChild(cover);
	return cover;
}
function colseContentDiv () {
        //this.parentElement.style.display = "none";
        this.parentElement.parentElement.style.display = "none";
    }
function createColseDivButton(){
    var colse = document.createElement("a");
       colse.className = "edit-content-div-colse";
       colse.onclick = colseContentDiv;
	return colse;
}
function createLoadingMessage(message, cover){
    var div = document.createElement("div");
    div.className = "tip";

    var tip = document.createElement("p");
    tip.innerHTML = message;
    var dot = document.createElement("span");
    dot.innerHTML = "......";
    
    div.appendChild(tip);
    div.appendChild(dot);
    cover.appendChild(div);
    
    return dot;
}
function loading(width, tip){
    var beginWidth = tip.offsetWidth;
    console.log(beginWidth);
    console.log(tip.offsetWidth);
    var temp = setInterval(function(){
        if(tip.offsetWidth < width){
            tip.style.width = tip.offsetWidth + 6 + "px";
        }else{
    	tip.style.width = beginWidth + "px";
        }
    }, 500);
    return temp;
}