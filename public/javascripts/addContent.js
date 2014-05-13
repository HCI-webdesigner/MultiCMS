/**
 * Created by shara on 2014/4/28.
 */
window.onload = function() {
	document.getElementById("projectName").onblur = function() {
		if (this.value != "") {
			this.nextElementSibling.nextElementSibling.className = "correct";
			this.nextElementSibling.nextElementSibling.disabled = false;
		} else {
			this.nextElementSibling.nextElementSibling.className = "";
			this.nextElementSibling.nextElementSibling.disabled = true;
		}
	};
	document.getElementById("projectName").onkeyup = function(e) {
		var keyCode = e.keyCode;
		if (keyCode == 13 || keyCode == 108) submitProject();
	};	
    document.getElementById("submit").onclick = nextPage.bind(null, "createTree");
// document.getElementById("submit").onclick = submitProject;

}
function submitProject() {
	var cover = createCoverDiv();
	var message = "正在生成项目";
	var dot = createLoadingMessage(message, cover);
	var temp = loading(36, dot);

	var req = createRequest();
	req.onreadystatechange = function() {
		message = cover.childNodes[0].childNodes[0];
		if (req.readyState == 4 && req.status == 200) {
			if (req.responseText == "true") {
				message.className = "createSuccess";
				message.innerHTML = "创建成功，正在自动跳转到下一步";
				message.style.width = 450 + "px";
				setTimeout(function() {
					clearInterval(temp);
					cover.parentElement.removeChild(cover);
					window.parent.projectName = document.getElementById("projectName").value;
					nextPage.bind(null, "createTree")();
				},
				2000);
			} else {
				clearInterval(temp);
				message.className = "createFail";
				message.innerHTML = "创建失败，请重试";
				message.style.width = 350 + "px";
				setTimeout(function() {
					cover.parentElement.removeChild(cover);
				},
				2000);
			}
		}
	}

	req.open("POST", "../../../main/createProject/", true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send('projectName=' + document.getElementById("projectName").value);
}

