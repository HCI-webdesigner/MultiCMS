/**
 * Created by shara on 2014/4/28.
 */

window.onload = function(){
    document.getElementById("projectName").onblur = function () {
        if (this.value != "") {
            this.nextElementSibling.nextElementSibling.className = "correct";
            this.nextElementSibling.nextElementSibling.disabled = false;
        } else {
            this.nextElementSibling.nextElementSibling.className = "";
            this.nextElementSibling.nextElementSibling.disabled = true;
        }
    };

    document.getElementById("projectName").onkeyup = function (e) {
        var keyCode = e.keyCode;
        if (keyCode == 13 || keyCode == 108)
            submitProject();
    };

    document.getElementById("submit").onclick = submitProject;
}

function submitProject() {
    var cover = document.createElement("div");
    cover.className = "cover-div";
    window.parent.document.getElementsByTagName("body")[0].appendChild(cover);

    var message = "正在生成项目";
    var dot = createLoadingMessage(message, cover);
    var temp = loading(36, dot);

    var req = createRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            if (req.responseText == "true") {
                var cover = window.parent.document.getElementsByClassName("cover-div")[0];
                cover.childNodes[0].childNodes[0].className = "createSuccess";
                cover.childNodes[0].childNodes[0].innerHTML = "创建成功，正在自动跳转到下一步";
                cover.childNodes[0].childNodes[0].style.width = 450 + "px";
                setTimeout(function () {
                    clearInterval(temp);
                    cover.parentElement.removeChild(cover);
                    nextPage.bind(null, "createTree")();
                }, 3000);
            } else {
                clearInterval(temp);
                var cover = window.parent.document.getElementsByClassName("cover-div")[0];
                cover.childNodes[0].childNodes[0].className = "createFail";
                cover.childNodes[0].childNodes[0].innerHTML = "创建失败，请重试";
                cover.childNodes[0].childNodes[0].style.width = 350 + "px";
                setTimeout(function () {
                    cover.parentElement.removeChild(cover);
                }, 3000);
            }
        }

    }
    req.open("POST", "../../../main/createProject/", true);
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send('projectName='+document.getElementById("projectName").value);
}