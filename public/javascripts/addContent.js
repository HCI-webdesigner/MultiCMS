/**
 * Created by shara on 2014/4/28.
 */

window.onload = function(){
    document.getElementById("projectName").onchange = checkName;
    document.getElementById("submit").onclick = nextPage.bind(null, "createTree");
}

function checkName(){
    var req = createRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            var projectName = document.getElementById("projectName");
            var button = document.getElementById("submit");
            if (!req.responseText) {
                projectName.className = "error";
                projectName.onfocus.className = "error";
                var span = document.createElement("span");
                span.innerHTML = "该项目已存在";
                span.color = "red";
                projectName.insertAfter(span);
            }else{
                projectName.className = "";
                projectName.onfocus.className = "";
                var span = document.getElementsByClassName("span")[0];
                document.getElementsByClassName("content")[0].removeChild(span);
                button.disabled = false;
                button.className = "submit";
                project[0] = new Directory(projectName);

            }
        }
    }
    req.open("get", "项目的名称并检查是否存在，返回true/false给我?projectName="
        + document.getElementById("projectName").value, false);
    req.send();
}

