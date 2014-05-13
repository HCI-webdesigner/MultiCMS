/**
 * Created by shara on 2014/4/28.
 */

window.onload = function () {
    var tree = new Tree();
    document.getElementById("tree").childNodes[0].innerHTML = "项目名称：" + window.parent.projectName;
    document.getElementById("root").onclick = function(){tree.createTree.bind(tree, this)()};
    document.getElementsByClassName("name")[0].onkeyup = function(){treeKeyup.bind(this, event, tree)();}
    document.getElementById("submit").onclick = submitContentDiv;
    //document.getElementById("submit").onclick = nextPage.bind(null, "addContentStructure");
    projects = new Array();
    index = 0;
}

function treeKeyup(e, tree) { //创建目录树的输入框回车即可出发创建函数
    var keyCode = e.keyCode;
    if (keyCode == 13 || keyCode == 108)
        tree.createTree.bind(tree, this.nextElementSibling)();
}

function newNode(tree) { //弹出创建新子节点的输入框
    var div = this.nextElementSibling;
    if (div.tagName == "DIV") {
        if (div.style.display == "none") {
            div.style.display = "";
            //          $(this).contents().animate({height:"136px",opacity: "1"},600);
        } else {
            div.style.display = "none";
            //           $(this).contents().animate({height:"0px",opacity: "0"},600);
        }
    } else {
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
        name.onkeyup = function (e, tree) {
            var keyCode = e.keyCode;
            if (keyCode == 13 || keyCode == 108) {
                tree.createTree.bind(tree, this.parentElement.parentElement)();
                this.value = "";
                this.parentElement.style.display = "none";
            }

        };
        button.onclick = function (event, tree) {
            this.parentElement.style.display = "none";
            tree.createTree.bind(tree,button.parentElement.parentElement)();
            this.previousElementSibling.value = "";
        }
    }
    document.activeElement = div.childNodes[0];
}

function editName() { //修改节点的名称 同时会修改Json的内容， 修改h4标题的内容
    var num = this.nextElementSibling.id.substr(4);
    var project = projects[num];
    traversalJson(project, this.name, this.value, "edit");
    this.name = this.value;
    console.log(projects[num]);

    for (var x in contentStructure[num]) {
        if (contentStructure[num][x].nodeName == this.name)
            contentStructure[num][x].nodeName = this.value;
    }
    if (this.parentElement.previousElementSibling.tagName == "H4") {
        this.parentElement.previousElementSibling.innerHTML = this.value;
    }
    console.log(contentStructure);
}

function removeNode() { //删除节点， 这个需要删除节点的内容，修改json， 修改内容结构
    var li = this.parentElement.parentElement;
    var ul = li.parentElement;
    var num = this.parentElement.id.substr(4);
    var parent = ul.previousElementSibling.previousElementSibling.value;
    if (li.previousElementSibling != undefined && li.previousElementSibling.tagName == "H4") {
        projects.splice(num, 1);
        ul.removeChild(li.previousElementSibling);
        ul.removeChild(li);
        index--;
    } else {

        traversalJson(projects[num][0], parent, li.childNodes[0].value, "delete")
        if (ul.childElementCount == 1) {
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
    [{"name": value, "children": [{"name": value, "children":[]}]},
    ]]
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

function submitContent(event, div) { //发送请求提交该树Json和内容结构Json
    console.log(div);
    var cover = div.parentElement;
    div.style.display = "none";

    var message = "正在提交内容";
    var dot = createLoadingMessage(message, cover);
    var temp = loading(36, dot);

    var req = createRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) { //添加成功后返回ok给我
            if (req.responseText == "true") {
                var p = div.getElementsByTagName("p")[0];
                p.className = "submit-success";
                p.innerHTML = "提交成功！<br />正在自动跳转到下一步";

                setTimeout(function () {
                    clearInterval(temp);
                    cover.parentElement.removeChild(cover);
                    nextPage.bind(null, "addContentStructure")();
                }, 1000);

            } else {
                clearInterval(temp);
                cover.getElementsByClassName("tip")[0].removeChild(cover.getElementsByClassName("tip")[0].childNodes[1]);
                var p = div.getElementsByTagName("p")[0];
                p.className = "submit-error";
                p.innerHTML = "提交失败！";
                setTimeout(function () {
                    cover.removeChild(cover.getElementsByClassName("tip")[0]);
                    cover.style.display = "none";
                }, 1000);
            }
        }
    }
    req.open("POST", "../../../main/createSort/", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send('treeJson=' + JSON.stringify(projects));

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
    } else {
        window.parent.document.getElementsByClassName("cover-div")[0].style.display = "block";
    }
}


