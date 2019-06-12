function addTaskAJAX() {
    fn = function(response, status) {
        if('error' in response) {
            alert(response.error.message);
        }
        else {
            alert("Task created");
        }
    }

    var jsonObj = new Object();
    jsonObj.task_name = document.getElementById("task_name").value;
    jsonObj.task_st = document.getElementById("task_st").value;
    jsonObj.task_et = document.getElementById("task_et").value;
    
    APIajax("tasks", "POST", fn, jsonObj);
}

function getTaskAJAX(filter, i) {
    fn = function(response, status) {
        if('error' in response) {
            alert(response.error.message);
        }
        else {
            console.log(response[0]);
                document.getElementById(i).innerText = response[0].task_name;
        }
    }
    APIajax("tasks?filter=" + encodeURI(filter), "GET", fn);
}

function calculate() {
    console.log("Tested");  
}

function deleteAllTasks(){
    fn = function(response, status) {
        if('error' in response) {
            alert(response.error.message);
        }
        else {
            for(const task of response) {
                deleteTask(task.id);
            }
        }
    }
    
    APIajax("tasks", "GET", fn);
}

function deleteTask(id) {
    fn = function(response, status) {
        if('error' in response) {
            alert(response.error.message);
        }
        else {
            console.log("Deleted task " + id.toString());
        }
    }

    APIajax("tasks"+ id.toString(), "DELETE", fn);
}

for (const i of Array(24).keys()) {
    if(i < 10)
        i_time = "0" + i
    else
        i_time = i
    getTaskAJAX("{\"where\":{\"task_st\":\""+ i_time +":00\"}}", i)
}

