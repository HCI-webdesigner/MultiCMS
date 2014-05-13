var test = [[{
	"name": "111",
	"id": "1",
	"children": [{
		"name": "1ch",
		"id": "2",
		"children": []
	},

	{
		"name": "2ch",
		"id": "3",
		"children": [{
			"name": "2ch",
			"id": "30",
			"children": []
		}]
	}]
}

], [{
	"name": "222",
	"id": "20",
	"children": [{
		"name": "1ch",
		"id": "5",
		"children": []
	},

	{
		"name": "2ch",
		"id": "6",
		"children": []
	}]
}

]];

contentstructure = null;
window.onload = function() {
	//reciveStructure();
	createTree(test);
	dataType = ["int", "varchar", "date", "folat", "double"];
    document.getElementById("submit").onclick = nextPage.bind(null, "addUser");
}
function reciveStructure() {
    /************huaquan**********/
	var req = createRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var treeJson = req.responseText;
			createTree(treeJson);
		}
	};
	req.open("POST", "../../../main/createSort/", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send();
}

function createTree(treeJson) {
	for (var i = 0; i < treeJson.length; i++) {
		var nodes = treeJson[i];
		for (var j = 0; j < nodes.length; j++) {
			var node = nodes[j];
			var parent = {
				"id": "begin"
			};
			travelTreeJson(node, parent);

		}
	}
}

function travelTreeJson(node, parent) {
	var x = 0;
	appendNewNode(node, parent, node.children.length != 0);
	if (node.children.length != 0) {
		for (var x in node.children) {
			travelTreeJson(node.children[x], node);
		}
	}
}

function appendNewNode(node, parent, hasChild) {
	var li = document.createElement("li");
	li.id = node.id;
	var label = document.createElement("label");
	label.innerHTML = node.name;
	li.appendChild(label);

	if (hasChild) {
		li.className = "folder";
	} else {
		li.className = "doc";
		var a = document.createElement("a");
		a.title = "修改内容结构";
		a.onclick = function() {
            editContentStructure.bind(this, event,
                    this.previousSibling.innerHTML, this.parentElement.id)();
		}
		li.appendChild(a);
	}

	var parentnode = document.getElementById(parent.id);

	if (parentnode.childElementCount < 2) {
		var ul = document.createElement("ul");
		ul.appendChild(li);
		parentnode.appendChild(ul);
	} else {
		parentnode.getElementsByTagName("ul")[0].appendChild(li);
	}
	if (parent.id == "begin") {
		var h4 = document.createElement("h4");
		h4.innerHTML = node.name;
		ul.insertBefore(h4, li);
	}
}

function editContentStructure(event, nodeName, nodeId) { //弹出添加内容结构的div
	var editDiv = window.parent.document.getElementsByClassName("edit-content-div")[0];
	if (editDiv != undefined) {
		editDiv.parentElement.style.display = "block";

		var h5 = document.createElement("h5");
		h5.innerHTML = nodeName + "的结构内容：";
		editDiv.insertBefore(h5, editDiv.lastElementChild);

		var table = document.createElement("table");
		table.className = "content-list";
		table.id = nodeId;
		editDiv.insertBefore(table, editDiv.lastElementChild);
	}
	else {
		var cover = document.createElement("div");
		cover.className = "cover-div";

		var div = document.createElement("div");
		div.className = "edit-content-div";
		cover.appendChild(div);
		cover.style.height = window.scrollHeight + "px";

		var colse = createColseDivButton();
        colse.onclick = function(){
            this.parentElement.parentElement.style.display = "none";

            var colseParent = colse.parentElement;
            colseParent.removeChild(colseParent.getElementsByTagName("h5")[0]);
            colseParent.removeChild(colseParent.getElementsByTagName("table")[0]);

            var inputs = colseParent.getElementsByTagName("input");
            for(var i = 0; i < 3; i++){
                inputs[i].value = "";
            }
            colseParent.getElementsByTagName("select")[0].selectedIndex = 0;
            inputs[3].disabled = true;

            contentstructure = null;
        }
		div.appendChild(colse);
		var ul = document.createElement("ul");
		ul.className = "edit-content-input";

		var warning = document.createElement("i");
		warning.innerHTML = "*请勿输入中文";
		warning.className = "warning";
		div.appendChild(warning);

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
		length.onblur = checkAdd;
		li[2].appendChild(length);

		var addition = document.createElement("input");
		addition.type = "text";
		addition.placeholder = "附加内容";
		addition.onblur = checkAdd;
		li[3].appendChild(addition);

		var button = document.createElement("input");
		button.type = "button";
		button.disabled = true;
		button.value = "添加";
		button.onclick = function() {
			addContentStructure.bind(this, event, nodeName, nodeId)();
		};
		li[4].appendChild(button);
		div.appendChild(ul);

		var h5 = document.createElement("h5");
		h5.innerHTML = nodeName + "的结构内容：";
		div.appendChild(h5);

		var table = document.createElement("table");
		table.className = "content-list";
		table.id = nodeId;
		div.appendChild(table);

		var submit = document.createElement("input");
		submit.type = "button";
		submit.className = "correct";
		submit.value = "完成";
		submit.onclick = function() {
            var id = this.previousElementSibling.id;

			var cover = createCoverDiv();
			var message = "正在提交内容";
			var dot = createLoadingMessage(message, cover);
			var temp = loading(36, dot);
			var req = createRequest();

			//req.onreadystatechange = function() {
			//if (req.readyState == 4 && req.status == 200) {
			var p = cover.getElementsByTagName("p")[0];
			p.className = "submit-success";
			p.innerHTML = "提交成功！";
			p.parentElement.removeChild(p.nextElementSibling);
            contentstructure  = null;

			setTimeout(function() {
				clearInterval(temp);
				var covers = window.parent.document.getElementsByClassName("cover-div");
				var body = covers[0].parentElement;
				body.removeChild(covers[1]);
				body.removeChild(covers[0]);

                var node = document.getElementById(id);
                node.removeChild(node.childNodes[1]);
                node.className = "doc edited-structure";
                var p = document.createElement("p");
                p.innerHTML = "已添加内容结构";
                node.appendChild(p);
			},
			1000);

			//} /*else {*/
            /*clearInterval(temp);*/
            //var p = cover.getElementsByTagName("p")[0];
            //p.className = "submit-error";
            //p.innerHTML = "提交失败！";
			//p.parentElement.removeChild(p.nextElementSibling);
            //setTimeout(function() {
                //var coverParent = cover.parentElement;
            //},
            /*1000);
            //}
			/*};*/
			/***********************华泉**************/
			/*req.open("POST", "../../../main/createSort/", true);*/
			//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			/*req.send('contentstructure=' + contentstructure.stringify(projects));*/

		}
		div.appendChild(submit);

		window.parent.document.getElementsByTagName("body")[0].appendChild(cover);
	}
}
function checkAdd() { //检查添加内容结构的列表是否将必填项都填好了
	var ul = window.parent.document.getElementsByClassName("edit-content-input")[0];
	var li = ul.getElementsByTagName("input");
	if (li[0].value != '' && ! ul.getElementsByTagName("option")[0].selected) {
		for (var i = 0; i < 3; i++) {
			if (/.*[\u4e00-\u9fa5]+.*$/.test(li[i].value)) {
				ul.lastElementChild.childNodes[0].className = "";
				ul.lastElementChild.childNodes[0].disabled = true;
				return;
			}
		}
		ul.lastElementChild.childNodes[0].className = "correct";
		ul.lastElementChild.childNodes[0].disabled = false;
	} else {
		ul.lastElementChild.childNodes[0].className = "";
		ul.lastElementChild.childNodes[0].disabled = true;
	}
}
function addContentStructure(event, nodeName, nodeId) { //添加列表的内容到内容结构json里, nodeName 
	var ul = this.parentElement.parentElement;
	var div = ul.parentElement;
	var items = ul.getElementsByTagName("li");
	var content = {
		"nodeId": nodeId,
		"name": items[0].childNodes[0].value,
		"type": items[1].childNodes[0].value,
		"length": items[2].childNodes[0].value,
		"extend": items[3].childNodes[0].value
	};
    if(contentstructure == null){
        contentStructure = new Array();
    }
    contentStructure.push(content);
    console.log(contentstructure);

	var table = div.getElementsByClassName("content-list")[0];
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
	tr.id = table.getElementsByTagName("tr").length - 1;
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
	a[0].onclick = function() {
		this.parentElement.className = "edit-content-input-able";
		var input = this.parentElement.getElementsByTagName("input");
		for (var i = 0; i < input.length; i++) {
			input[i].disabled = false;
		}
		var select = this.parentElement.getElementsByTagName("select")[0];
		select.disabled = false;
	};

	a[1].title = "修改完成";
	a[1].onclick = function() {
		var parent = this.parentElement;
		parent.className = "";

		var items = parent.getElementsByTagName("input");
		for (var i = 0; i < items.length; i++) {
			items[i].disabled = true;
		}
		var select = this.parentElement.getElementsByTagName("select")[0];
		select.disabled = true;

		var content = {
			"nodeId": parent.parentElement.id,
			"name": items[0].value,
			"type": select.value,
			"length": items[1].value,
			"extend": items[2].value
		};
		var x = 0;
		for (x in contentStructure) {
			if (x == parent.id) {
				contentStructure.splice(x, 1, content);
			}
		}
		console.log(contentStructure);
	};

	a[2].title = "删除该内容";
	a[2].onclick = function() {
		var parent = this.parentElement;
		var table = parent.parentElement;
		var trs = table.getElementsByTagName("tr");
		contentStructure.splice(parent.id, 1);
		table.removeChild(parent);
		for (var i = parseInt(parent.id) + 1; i < trs.length; i++) {
			trs[i].id = trs[i].id - 1;
		}
		console.log(contentStructure);
	};

	div.style.height = parseFloat(div.offsetHeight) + parseFloat(33) + "px";
	if ((div.offsetHeight + div.offsetTop) >= div.parentElement.offsetHeight) {
		div.parentElement.style.height = div.offsetHeight + div.offsetTop + "px";
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

