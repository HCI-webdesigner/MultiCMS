/**
 * Created by shara on 2014/4/24.
 */
function initSideBar(){
    var div = document.getElementsByClassName("sidebar")[0];
    var ul = div.getElementsByTagName("ul")[0];
    var children = getChildren("root");
    appendSideBar(children);
    for(var i = 0; i < children.length; i++){
        var child = getChildren(children[i].name);
    }

}

function appendSideBar(inMain, father, name){ //inMain： true时，window为当前窗口，false即为iframe里， father： 字符串， name： 字符串
    console.log("father: append    " +  father);
    var li = document.createElement("li");
    var a = document.createElement("a");
    var span = document.createElement("span");
    a.innerHTML = name;
    span.className = "hover";
    li.appendChild(a);
    li.appendChild(span);
    if(inMain){
        var all = document.getElementsByClassName("sidebar")[0].getElementsByTagName("li");
    }else{
        var all = window.parent.document.getElementsByClassName("sidebar")[0].getElementsByTagName("li");
    }
    for(var i = 0; i < all.length; i++){
        console.log(all[i].firstElementChild.innerHTML);
        if(all[i].firstElementChild.innerHTML == father){
            console.log(all[i]);
            father = all[i];
        }
    }
    console.log(father);
    if (father.lastElementChild == undefined || father.lastElementChild.tagName != "UL") {
        var ul = document.createElement("ul");
        ul.className = "sub-menu";
        ul.appendChild(li);
        father.appendChild(ul);
    } else {
        var ul = father.lastElementChild;
        ul.appendChild(li);
    }
}

function createRequest() {
    if (window.XMLHttpRequest) {
        var req = new XMLHttpRequest();
    }else{
        var req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return req;
}

/**********华泉注意***************/
function getChildren(name){
    req = createRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            console.log(req.responseText);
            return req.responseText;
//           //请求返回name的children  json数组回来作为appendOptions的参数；这个json格式：[{"name": "value"}]
        }
    }
    req.open("get", "../../public/test.php?name=" + "name", true);
    req.send();
}
