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
        {
            "title": "修改内容结构"
    },
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
        if(this.parentElement.className == "doc"){
        this.removeChild(this.getElementsByTagName("a")[1]); //当节点不是绝对子类时，
        removeContentStructure(parentName, num); //不能添加结构内容，如果之前添加了，则需要删除
        }
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
    for (var i = 0; i < 3; i++) {
        a[i] = document.createElement("a");
        div.appendChild(a[i]);
        a[i].title = editFunctions[i].title;
    }

    a[0].onclick = newNode;
    a[1].onclick = function () {
        editContentStructure.bind(null, event, this.parentElement.previousElementSibling.value, num)();
    }
    a[2].onclick = removeNode;

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
function traversalJson(project, parent, node, operation) {  //遍历树目录的Json， project:遍历的节点名称， parent：需要插入的父节点， node：需要插入或修改、删除的节点， operation:CRUD操作
    var x;
    console.log(project.name);
    if (project.name == parent) {
        switch (arguments[3]) {
        case "add":
            project.children.push(node);
            break;
        case "delete":
            project.children.remove(node);
            break;
        case "edit":
            project.name = node; //parent为需要修改的节点name，node为改后的字符串
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

function editContentStructure(event, nodeName, num) {  //弹出添加内容结构的div
    var editDiv = window.parent.document.getElementsByClassName("edit-content-div")[0];
    if(editDiv != undefined){
    	editDiv.parentElement.style.display = "block";
    }
    else {
       var cover = document.createElement("div");
       cover.className = "cover-div";

       var div = document.createElement("div");
       div.className = "edit-content-div";
       cover.appendChild(div);
       cover.style.height = window.scrollHeight + "px";

       var colse = document.createElement("a");
       colse.className = "edit-content-div-colse";
       colse.onclick = colseContentDiv;
       div.appendChild(colse);
       var ul = document.createElement("ul");
       ul.className = "edit-content-input";
       var li = new Array();
       for (var i = 0; i < 5; i++) {
           li[i] = document.createElement("li");
           ul.appendChild(li[i]);
       }
       var name = document.createElement("input");
       name.type = "text";
       name.placeholder = "字段名";
       name.onblur = checkAdd;
       var i = document.createElement("i");
       i.className = "must";
       li[0].appendChild(name);
       li[0].appendChild(i);

       ///////////////////////////////////////
        var type = createSelect();
       var i = document.createElement("i");
       i.className = "must";
       li[1].appendChild(type);
       li[1].appendChild(i);

    var length = document.createElement("input");
    length.type = "text";
    length.placeholder = "长度";
    li[2].appendChild(length);

    var addition = document.createElement("input");
    addition.type = "text";
    addition.placeholder = "附加内容";
    li[3].appendChild(addition);

    var button = document.createElement("input");
    button.type = "button";
    button.disabled = true;
    button.value = "添加";
    button.onclick = function (event, nodeName, num) { //添加列表的内容到内容结构json里, nodeName , num有问题
        console.log(nodeName);
        var ul = this.parentElement.parentElement;
        var div = ul.parentElement;
        var items = ul.getElementsByTagName("li");
        var content = {
            "nodeName": nodeName,
            "name": items[0].childNodes[0].value,
            "type": items[1].childNodes[0].value,
            "length": items[2].childNodes[0].value,
            "extend": items[3].childNodes[0].value
        };
        if (contentStructure[num] == undefined) {
            contentStructure[num] = new Array();
        }

        contentStructure[num].push(content);

        var table = div.getElementsByClassName("content-list")[0];
        var h5 = div.getElementsByTagName("h5")[0];
        h5.innerHTML = nodeName;
        if (table.getElementsByTagName("th").length == 0) {
            var tr = document.createElement("tr");
            table.appendChild(tr);
            var th = new Array();
            for (var i = 0; i < 4; i++) {
                th[i] = document.createElement("th");
                tr.appendChild(th[i]);
            }

            th[0].innerHTML = "id";
            th[1].innerHTML = "type";
            th[2].innerHTML = "length";
            th[3].innerHTML = "extend";
        }
        var tr = document.createElement("tr");
        table.appendChild(tr);
        var td = new Array();
        for (var i = 0; i < 4; i++) {
            td[i] = document.createElement("td");
            if(i == 1){
                var value = createSelect();
            }else{
                var value = document.createElement("input");
            value.type = "text";
            }
            value.value = items[i].childNodes[0].value;
            value.disabled = true;
                td[i].appendChild(value);
            tr.appendChild(td[i]);
        }
        var a = new Array();
        for(var i = 0 ; i < 3; i++){
            a[i] = document.createElement("a");
            tr.appendChild(a[i]);
        }
        a[0].title = "修改内容";
        a[0].onclick = function(){
            this.parentElement.className = "edit-content-input-able";
            var input = this.parentElement.getElementsByTagName("input");
            for(var i = 0 ; i < input.length; i++){
        	input[i].disabled = false;
            }
            var select = this.parentElement.getElementsByTagName("select")[0];
            select.disabled = false;
        };
        
        a[1].title = "修改完成";
        a[1].onclick = function(){};
        
        a[2].title = "删除该内容";
        a[2].onclick = function(){};
        
        console.log(div.offsetHeight);
        div.style.height = parseFloat(div.offsetHeight) + parseFloat(33) + "px";
        console.log("after   " + div.offsetHeight);
        if((div.offsetHeight + div.offsetTop) >= div.parentElement.offsetHeight){
            div.parentElement.style.height = div.offsetHeight + div.offsetTop + "px";
        }
    };
    li[4].appendChild(button);
    div.appendChild(ul);

    var h5 = document.createElement("h5");
    h5.innerHTML = nodeName + "的结构内容：";
    div.appendChild(h5);

    var table = document.createElement("table");
    table.className = "content-list";
    div.appendChild(table);

    var submit = document.createElement("input");
    submit.type = "button";
    submit.className = "correct";
    submit.value = "完成";
    submit.onclick = colseContentDiv;
    div.appendChild(submit);

    window.parent.document.getElementsByTagName("body")[0].appendChild(cover);
    }
}

function removeNode() {  //删除节点， 这个需要删除节点的内容，修改json， 修改内容结构
    console.log("removeNode");
}

function checkAdd() { //检查添加内容结构的列表是否将必填项都填好了
    var ul = window.parent.document.getElementsByClassName("edit-content-input")[0];
    console.log(ul.getElementsByTagName("input")[0].value);
    console.log(ul);
    console.log(ul.getElementsByTagName("option")[0].selected);
    if (ul.getElementsByTagName("input")[0].value != '' && !ul.getElementsByTagName("option")[0].selected) {
        console.log("correct");
        ul.lastElementChild.childNodes[0].className = "correct";
        ul.lastElementChild.childNodes[0].disabled = false;
    } else {
        console.log("erro");
        ul.lastElementChild.childNodes[0].className = "";
        ul.lastElementChild.childNodes[0].disabled = true;
    }
}

function removeContentStructure(deleteName, num){  //删除内容结构的某一项 ,deleteName即为删除的nodeName
    for(var x in contentStructure[num]){
        console.log(contentStructure[num][x]);
        if(contentStructure[num][x].nodeName == deleteName){
            contentStructure[num].splice(x, 1);
        }
    }
    console.log(contentStructure);
}

function submitContent(event, div) {  //发送请求提交该树Json和内容结构Json
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
    
    
    console.log(div);
    if (div.getElementsByTagName("input")[0].innerHTML == "提交") {
        var req = createRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) { //添加成功后返回ok给我
                if (req.responseText == "ok") {
                    var p = div.getElementsByTagName("p")[0];
                    p.className = "submit-success";
                    p.innerHTML = "提交成功！";

                    var button = div.getElementsByTagName("input");
                    button[0].value = "下一步";
                    div.removeChild(button[1]);
                } else {
                    var p = div.getElementsByTagName("p")[0];
                    p.className = "submit-error";
                    p.innerHTML = "提交失败！";

                    var button = div.getElementsByTagName("input");
                    div.removeChild(button[0]);
                }
            }
            req.open("post", "url?treeJson=" + projects + "&conentStructureJson=" + contentStructure, false);
            req.send();
        }
    }else{
        div.style.display = "none";
        nextPage("addUsers");
    }
}

function submitContentDiv() {  //弹出提交的div
    var div = document.createElement("div");
    div.className = "submit-content";

    var p = document.createElement("p");
    p.innerHTML = "提交这些目录?";
    p.className = "submit-warning";
    div.appendChild(p);

    var submit = document.createElement("input");
    div.appendChild(submit);
    submit.type = "button";
    submit.value = "提交";
    submit.onclick = submitContent.bind(submit, event, submit.parentElement);

    var cancel = document.createElement("input");
    cancel.type = "button";
    cancel.value = "取消";
    cancel.onclick = function () {
        this.parentElement.style.display = "none";
    };
    div.appendChild(cancel);
    document.getElementsByTagName("body")[0].appendChild(div);
}
function colseContentDiv () {
        //this.parentElement.style.display = "none";
        this.parentElement.parentElement.style.display = "none";
    }

function createSelect(){
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