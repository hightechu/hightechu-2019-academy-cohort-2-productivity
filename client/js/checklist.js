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
                document.getElementById(i).innerText = response[0].task_name;
                document.getElementById(i).insertAdjacentHTML("afterbegin", '<input type="checkbox" id="'+response[0].id+'" class="boxes">');
                console.log(document.getElementById(i).innerHTML);
        }
    }

    APIajax("tasks?filter=" + encodeURI(filter), "GET", fn);
}

for (const i of Array(24).keys()) {
    if(i < 10)
        i_time = "0" + i
    else
        i_time = i
    getTaskAJAX("{\"where\":{\"task_st\":\""+ i_time +":00\"}}", i)
}

function calculate () {
    var score = 0;
    var num = 0;
    var x = 0;
    var y = 3;
    
    console.log(document.getElementsByClassName("boxes"));
    var boxes = document.getElementsByClassName("boxes");
    var checked = 0;
    for (var i = 0, length = boxes.length; i<length; i++) {
        if(boxes[i].checked === true) {
            checked++;
        }
    }



    alert(Math.round((checked/boxes.length)*100) + "%");

}