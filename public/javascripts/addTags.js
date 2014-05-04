var tags = [
{"name" : "root", "father": "", "children" : [{"name" : "Web"},{"name" : "后台"},{"name" : "程序开发"}]},
{"name" : "Web", "father": "root", "children" : [{"name" : "javascript"},{"name" : "html"},{"name" : "css"}]},
{"name" : "后台", "father": "root", "children" : [{"name" : "JSP"},{"name" : "Servlet"}]},
{"name" : "程序开发", "father": "root", "children" : [{"name" : "报表/图标"},{"name" : "模块引擎"},{"name" : "模板引擎"}, {"name": "网络工具包"}]},
{"name" : "javascript", "father": "Web", "children" : []},
{"name" : "html", "father": "Web", "children" : []},
{"name" : "css", "father": "Web", "children" : []},
{"name" : "JSP", "father": "后台", "children" : []},
{"name" : "Servlet", "father": "后台", "children" : []},
{"name" : "报表/图标制作", "father": "程序开发", "children" : []},
{"name" : "模块引擎", "father": "程序开发", "children" : []},
{"name" : "模板引擎作", "father": "程序开发", "children" : []},
{"name" : "网络工具包", "father": "程序开发", "children" : []}];

var children = [{"name" : "前端"},{"name" : "后台"},{"name" : "程序开发"}];
var children1 = [{"name" : "报表/图标"},{"name" : "模块引擎"},{"name" : "模板引擎"}, {"name": "网络工具包"}];


var current = new json(null, null);
window.onload = function(){
    appendOptions(children);  //自己测试用
//    initSelect();
    document.getElementsByTagName("select")[0].onchange = addSelect;
    document.getElementsByClassName("submit")[0].onclick = sendMessage;
}



function json(father, name){
    this.father = father;
    this.name = name;
}
function initSelect(){
    appendOptions(getChildren("root"));
}

function addSelect(){
    var index = this.selectedIndex;
    current.father = this[index];
//    appendOptions(getChildren(current.father.value));  //获取到请求的children数组后，添加select的option
//    appendOptions(children1);  //自己测试用

}


/**********华泉注意*************/
function sendMessage(){
    console.log("sendmessage");
    console.log(current.father);
    if(current.father.value == "" || current.father == null){
        if(current.father.parentElement.parentElement.tagName == "DIV" || current.father == null){
            var finalFather = "root";
        }else{
            console.log(current.father);
            var index = current.father.parentElement.previousElementSibling.selectedIndex;
            var finalFather = current.father.parentElement.previousElementSibling[index].value;
            console.log(index);
            console.log(current.father.parentElement.previousElementSibling);
        }
    }
    current.name = document.getElementById("tagName").value;
    var finalFather = current.father.value;
    console.log("finalFather:  " + finalFather);

    var req = createRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            console.log("send message success");
            alert("tijiaochenggong");
            appendSideBar(false, finalFather, current.name);
        }
    }
    req.open("post", "../../public/test.php?father=" +
        finalFather + "&name=" + current.name, false);  //这是添加按钮点击后发送请求，
    req.send();   // 会将创建的标签的father和它的name发送给服务器,然后你可以创建一个name的新标签，children为空
}

function appendOptions(obj) {
    if(obj.length == 0){
        return ;
    }
    var div = document.getElementById("tagsSelection");
    if(div.childElementCount > 1) {
        while (div.lastElementChild != current.father.parentElement) {
            div.removeChild(div.lastElementChild);
        }
    }

    var select = document.createElement("select");
    select.onchange = addSelect;
    var option = document.createElement("option");   //创建每个select的第一个空option
    option.innerHTML = "";
    option.value = "";
    select.appendChild(option);
    for (var i = 0; i < obj.length; i++) {
        var option = document.createElement("option");
        option.value = obj[i].name;
        option.innerHTML = obj[i].name;
        select.appendChild(option);
    }
    div.appendChild(select);
}
