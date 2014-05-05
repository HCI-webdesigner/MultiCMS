function editContentStructure(event, nodeName, num) {  //弹出添加内容结构的div
    var editDiv = window.parent.document.getElementsByClassName("edit-content-div")[0];
    if(editDiv != undefined){
    	editDiv.parentElement.style.display = "block";
        editDiv.childNodes[1].childNodes[3].onclick.call(null, nodeName, num);
    }
    else {
       var cover = document.createElement("div");
       cover.className = "cover-div";

       var div = document.createElement("div");
       div.className = "edit-content-div";
       cover.appendChild(div);
       cover.style.height = window.scrollHeight + "px";

       var colse = createColseDivButton();
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
    button.onclick = ///////////////////
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

function addContentStructure(event, nodeName, num) { //添加列表的内容到内容结构json里, nodeName , num有问题
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
        if (i == 1) {
            var value = createSelect();
        } else {
            var value = document.createElement("input");
            value.type = "text";
        }
        value.value = items[i].childNodes[0].value;
        value.disabled = true;
        td[i].appendChild(value);
        tr.appendChild(td[i]);
    }
    var a = new Array();
    for (var i = 0; i < 3; i++) {
        a[i] = document.createElement("a");
        tr.appendChild(a[i]);
    }
    a[0].title = "修改内容";
    a[0].onclick = function () {
        this.parentElement.className = "edit-content-input-able";
        var input = this.parentElement.getElementsByTagName("input");
        for (var i = 0; i < input.length; i++) {
            input[i].disabled = false;
        }
        var select = this.parentElement.getElementsByTagName("select")[0];
        select.disabled = false;
    };

    a[1].title = "修改完成";
    a[1].onclick = function () {};

    a[2].title = "删除该内容";
    a[2].onclick = function () {};

    console.log(div.offsetHeight);
    div.style.height = parseFloat(div.offsetHeight) + parseFloat(33) + "px";
    console.log("after   " + div.offsetHeight);
    if ((div.offsetHeight + div.offsetTop) >= div.parentElement.offsetHeight) {
        div.parentElement.style.height = div.offsetHeight + div.offsetTop + "px";
    }
}