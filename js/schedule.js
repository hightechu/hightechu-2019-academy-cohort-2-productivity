function addTaskAJAX() {
    var location = "http://localhost:3000/api/tasks";
    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function() {
        //A new XMLHttpRequest object starts in state 0
        if (http_request.readyState == 1  ) {
            console.log("Successfully called .open()");
        }
        if (http_request.readyState == 2  ) {
            console.log("Successfully called .send()");
        }
        if (http_request.readyState == 3  ) {
            console.log("The content is starting to come from the server");
        }
        if (http_request.readyState == 4  ) {
            console.log("All the content from the server has been downloaded");
            var response = JSON.parse(http_request.responseText);
            if('error' in response) {
                alert(response.error.message);
            }
            else {
                alert("Task created");
            }
        }
    }

    var jsonObj = new Object();
    jsonObj.name = document.getElementById("task_name").value;
    jsonObj.start_time = document.getElementById("task_st").value;
    jsonObj.end_time = document.getElementById("task_et").value;
    postData = JSON.stringify(jsonObj);
    http_request.open("POST", location, true);
    http_request.setRequestHeader("Content-type", "application/json");
    http_request.send(postData);
}

function getTaskAJAX(filter, i) {
    var location = "http://localhost:3000/api/tasks" + "?filter=" + encodeURI(filter);

    var http_request = new XMLHttpRequest();

    http_request.onreadystatechange = function() {
        if (http_request.readyState == 4  ) {
            var response = JSON.parse(http_request.responseText);
            if('error' in response) {
                alert(response.error.message);
            }
            else {
                document.getElementById(i).innerText = response[0].name
            }
        }
    }
    http_request.open("GET", location, true);
    http_request.send();
}

function calculate() {
    console.log("Tested");
    
}

for (const i of Array(24).keys()) {
    if(i < 10)
        i_time = "0" + i
    else
        i_time = i
    getTaskAJAX("{\"where\":{\"start_time\":\""+ i_time +":00\"}}", i)
}