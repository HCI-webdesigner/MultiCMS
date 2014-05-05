/**
 * Created by shara on 2014/4/28.
 */

window.onload = function () {
    document.getElementById("root").onclick = appendNode;
    document.getElementsByClassName("name")[0].onkeyup = treeKeyup;
    document.getElementById("submit").onclick = submitContentDiv;
    projects = new Array();
    contentStructure = new Array();
    index = 0;
    editFunctions = [{
            "title": "添加下级目录"
    },
        /*{
            "title": "修改内容结构"
    },*/
        {
            "title": "删除该目录"
    }];

    dataType = ["int", "varchar", "date", "folat", "double"];

}
function appendNode() {  //创建新目录节点
    console.log(this); //this为输入框后面的添加按钮或元素（div）
    var parent = this.parentElement;
    if (this.id == "root") {
        var num = index;
        var projectName = this.previousElementSibling.value;
    } else {
        var num = this.id.substr(4);
        var parentName = this.previousElementSibling.value;
        var projectName = this.getElementsByTagName("input")[0].value;
        /*if(this.parentElement.className == "doc"){
        this.removeChild(this.getElementsByTagName("a")[1]); //当节点不是绝对子类时，
        removeContentStructure(parentName, num); //不能添加结构内容，如果之前添加了，则需要删除
        }*/
   	}
    console.log(projectName);

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

    var a = new Array();
    for (var i = 0; i < 2; i++) {
        a[i] = document.createElement("a");
        div.appendChild(a[i]);
        a[i].title = editFunctions[i].title;
    }

    a[0].onclick = newNode;
    /*a[1].onclick = function () {
        editContentStructure.bind(null, event, this.parentElement.previousElementSibling.value, num)();
    }*/
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



    if (this.id == "root") {
        var h4 = document.createElement("h4");
        h4.innerHTML = projectName;
        document.getElementsByTagName("ul")[0].insertBefore(h4, li);

        projects[index] = {
            "name": projectName,
            "children": []
        };
        index++;
        console.log("root:   " + projects[index]);
    } else {
        var node = {
            "name": projectName,
            "children": []
        };
        traversalJson(projects[num], parentName, node, "add");
        console.log(projects[num]);
    }
    resizeWindow(false);
    }
function traversalJson(project, parent, node, operation) { //遍历树目录的Json， project:遍历的节点名称， parent：需要插入的父节点， node：需要插入或修改、删除的节点， operation:CRUD操作
    var x;
    console.log(project.name);
    if (project.name == parent) {
        switch (arguments[3]) {
        case "add":
            project.children.push(node);
            return true;
            break;
        case "delete":
            var j = 0;
            console.log(project.children);
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
        console.log(project.children);
        if (project.children[x].length != 0) {
            traversalJson(project.children[x], parent, node, operation);
        }
    }
}

function treeKeyup(e) { //创建目录树的输入框回车即可出发创建函数
    var keyCode = e.keyCode;
    if (keyCode == 13 || keyCode == 108)
        appendNode.bind(this.nextElementSibling)();
}

function newNode() {  //弹出创建新子节点的输入框
    if (this.nextElementSibling.tagName == "DIV") {
        if (this.nextElementSibling.style.display == "none") {
            this.nextElementSibling.style.display = "";
            //          $(this).contents().animate({height:"136px",opacity: "1"},600);
        } else {
            this.nextElementSibling.style.display = "none";
            //           $(this).contents().animate({height:"0px",opacity: "0"},600);
        }
    } else {
        console.log("in new node");
        var div = document.createElement("div");
        div.className = "get-name-div";
        var name = document.createElement("input");
        name.type = "text";
        name.placeholder = "输入节点名字";
        var button = document.createElement("input");
        button.type = "button";
        button.value = "添加";
        button.className = "correct";
        div.appendChild(name);
        div.appendChild(button);
        this.parentElement.insertBefore(div, this.nextElementSibling);
        name.onkeyup = function (e) {
            var keyCode = e.keyCode;
            if (keyCode == 13 || keyCode == 108) {
                appendNode.bind(this.parentElement.parentElement)();
                this.value = "";
                this.parentElement.style.display = "none";
            }

        };
        button.onclick = function () {
            this.parentElement.style.display = "none";
            appendNode.bind(button.parentElement.parentElement)();
            this.previousElementSibling.value = "";
        }
    }
}

function editName() {  //修改节点的名称 同时会修改Json的内容， 修改h4标题的内容
    var num = this.nextElementSibling.id.substr(4);
    var project = projects[num];
    traversalJson(project, this.name, this.value, "edit");
    this.name = this.value;
    console.log(projects[num]);
    
    for( var x in contentStructure[num]){
        if(contentStructure[num][x].nodeName == this.name)
            contentStructure[num][x].nodeName = this.value;
    }
    if(this.parentElement.previousElementSibling.tagName == "H4"){
        this.parentElement.previousElementSibling.innerHTML = this.value;
    }
    console.log(contentStructure);
}
function removeNode() { //删除节点， 这个需要删除节点的内容，修改json， 修改内容结构
    var li = this.parentElement.parentElement;
    var ul = li.parentElement;
    var num = this.parentElement.id.substr(4);
    var parent = ul.previousElementSibling.previousElementSibling.value;
    traversalJson(projects[num], parent, li.childNodes[0].value, "delete")
    if (li.previousElementSibling != undefined && li.previousElementSibling.tagName == "H4") {
        projects.splice(num, 1);
        ul.removeChild(li.previousElementSibling);
        ul.removeChild(li);
        index --;
    } else {
        if (ul.childNodes[0] == li) {
            ul.parentElement.className = "doc";
            ul.parentElement.removeChild(ul);
        } else {
            ul.removeChild(li);
        }
    }
    console.log(projects[num]);

}


    /************华泉注意*********************
    树的Json结构：
    projects[index] = [
    {"name": value, "children": [{"name": value, "children":[]}]},
    ]
    index代表那个根目录， 因为可以同时创建多个根目录
    
    内容结构Json：
    contentStructure = [
    [{
            "nodeName": nodeName,//这个name是值哪个节点发起的
            "name": value,
            "type": value,
            "length": value,
            "extend": value
        },
    {
            "nodeName": nodeName,
            "name": value,
            "type": value,
            "length": value,
            "extend": value
        }],
        [{
            "nodeName": nodeName,
            "name": value,
            "type": value,
            "length": value,
            "extend": value
        },
    {
            "nodeName": nodeName,
            "name": value,
            "type": value,
            "length": value,
            "extend": value
        }]
    ]
    contentStructure[index]的index对应着树目录的下标
    我的contentstructure添加时还有bug，但是那个bug不影响你存放数据的格式
    *****************/
    
function submitContent(event, div) {  //发送请求提交该树Json和内容结构Json
    console.log(div);


   // if (div.getElementsByTagName("input")[0].innerHTML == "提交") {
        var cover = div.parentElement;
        div.style.display = "none";

        var message = "正在提交内容";
        var dot = createLoadingMessage(message, cover);
        var temp = loading(36, dot);

        var req = createRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) { //添加成功后返回ok给我
                if (req.responseText == "ok") {
                    var p = div1.getElementsByTagName("p")[0];
                    p.className = "submit-success";
                    p.innerHTML = "提交成功！正在自动跳转到下一步";

                    setTimeout(function () {
                		clearInterval(temp);
                        window.parent.document.getElementsByTagName("body")[0].removeChild(window.parent.document.getElementsByClassName("cover-div")[0]);
                        nextPage.bind(null, addContentStructure)();
                    }, 1000);

                } else {
                clearInterval(temp);
                    cover.getElementsByClassName("tip")[0].removeChild(cover.getElementsByClassName("tip")[0].childNodes[1]);
                    var p = div1.getElementsByTagName("p")[0];
                    p.className = "submit-error";
                    p.innerHTML = "提交失败！";
                    setTimeout(function () {
                        cover.removeChild(cover.getElementsByClassName("tip")[0]);
                        cover.style.display = "none";
                    }, 1000);
                }
            }
            req.open("post", "url?treeJson=" + projects, true);
            req.send();
        }
 /*   } else {
        div.style.display = "none";
        nextPage("addUsers");
    }*/
    }
function submitContentDiv() { //弹出提交的div
    if (window.parent.document.getElementsByClassName("submit-div")[0] == undefined) {
        var cover = createCoverDiv();
        var div = document.createElement("div");
        div.className = "submit-content";
        cover.appendChild(div);

        var colse = createColseDivButton();
        div.appendChild(colse);
        var p = document.createElement("p");
        p.innerHTML = "提交这些目录?";
        p.className = "submit-warning";
        div.appendChild(p);

        var submit = document.createElement("input");
        div.appendChild(submit);
        submit.type = "button";
        submit.value = "提交";
        submit.className = "correct";
        submit.onclick = submitContent.bind(submit, event, submit.parentElement);

        var cancel = document.createElement("input");
        cancel.type = "button";
        cancel.value = "取消";
        cancel.className = "correct";
        cancel.onclick = colseContentDiv;
        div.appendChild(cancel);
    }else{
        window.parent.document.getElementsByClassName("cover-div")[0].style.display = "block";
    }
}

function createSelect() {
    var type = document.createElement("select");
    type.onblur = checkAdd;
    var options = new Array();
    options[0] = document.createElement("option");
    options[0].innerHTML = "数据类型";
    type.appendChild(options[0]);
    for (var i = 1; i < 5; i++) {
        options[i] = document.createElement("option");
        options[i].innerHTML = dataType[i];
        options[i].value = dataType[i];
        type.appendChild(options[i]);
    }
    return type;
}
