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
    var temp = setInterval(function(){
        if(tip.offsetWidth < width){
            tip.style.width = tip.offsetWidth + 6 + "px";
        }else{
    	tip.style.width = beginWidth + "px";
        }
    }, 500);
    return temp;
}

function Tree(){
    this.nodeFunctions = [{"title": "添加下级目录"},{"title": "删除该目录"}, {"titile" : "修改内容结构"}];
}

Tree.prototype.createTree = function (addBtn) { //创建新目录节点
    var parent = addBtn.parentElement;   //addBtn为输入框后面的添加按钮或元素（div）
    if (addBtn.id == "root") {
        var num = index;
        var projectName = addBtn.previousElementSibling.value;
    } else {
        var num = addBtn.id.substr(4);
        var parentName = addBtn.previousElementSibling.value;
        var projectName = addBtn.getElementsByTagName("input")[0].value;
    }

    var li = document.createElement("li");
    li.className = "doc";
    var div = document.createElement("div");
    var text = document.createElement("input");
    text.type = "text";
    text.className = "new-name";
    text.value = projectName;
    text.name = projectName;
    text.onchange = editName;
    div.id = "node" + num;
    div.className = "edit-div";
// 能修改树结构时，有增加节点和删除节点功能
    var a = new Array();
    for (var i = 0; i < 2; i++) {
        a[i] = document.createElement("a");
        a[i].title = this.nodeFunctions[i].title;
        div.appendChild(a[i]);
    }

    a[0].onclick = function(){newNode.bind(this, tree)();}
    a[1].onclick = removeNode;

    li.appendChild(text);
    li.appendChild(div);

    if (parent.lastElementChild == undefined || parent.lastElementChild.tagName != "UL") {
        var ul = document.createElement("ul");
        ul.appendChild(li);
        parent.className = "folder";
        parent.appendChild(ul);
    } else {
        var ul = parent.lastElementChild;
        ul.appendChild(li);
    }

    var node = {
        "name": projectName,
        "children": []
    };

    if (addBtn.id == "root") {
        var h4 = document.createElement("h4");
        h4.innerHTML = projectName;
        document.getElementsByTagName("ul")[0].insertBefore(h4, li);

        projects[index] = new Array();
        projects[index].push(node);
        index++;
        resizeWindow(false);
    } else {
        traversalJson(projects[num][0], parentName, node, "add");
    }
    resizeWindow(false);
};

Tree.prototype.reloadTree = function(node, parent){
    var li = document.createElement("li");
    var label = document.createElement("label");
    label.innerHTML = node.name;
    label.className = "";
    li.appendChild(label);

    var a = document.createElement("a");
    a.title = Tree.nodeFunctions[2].title;
    
};

function traversalJson(project, parent, node, operation) { //遍历树目录的Json， project:遍历的节点名称， parent：需要插入的父节点， node：需要插入或修改、删除的节点， operation:CRUD操作
    var x;
    if (project.name == parent) {
        switch (arguments[3]) {
        case "add":
            project.children.push(node);
            return true;
            break;
        case "delete":
            var j = 0;
            for (j in project.children) {
                if (project.children[j].name == node) {
                    project.children.splice(j, 1);
                    return true;
                }
            }
            break;
        case "edit":
            project.name = node; //parent为需要修改的节点name，node为改后的字符串
            return true;
            break;
        }
    }
    for (x in project.children) {
        if (project.children[x].length != 0) {
            traversalJson(project.children[x], parent, node, operation);
        }
    }
}

function Project(name){
    this.name = name    
}
