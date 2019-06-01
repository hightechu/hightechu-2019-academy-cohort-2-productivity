//save signin infomation
//saveSignin variables

var emailId = "";
var username = "";
var password = "";
var confirmPassword = "";
document.cookie = "";



function saveSignin(){

    emailId = document.getElementById("Email").value;
    username = document.getElementById("signinUsername").value;
    password = document.getElementById("Password").value;
    confirmPassword = document.getElementById("ConfirmPassword").value;

    var regex = /^(\w+@)([a-z]+)(\.)([a-z]{1,5})$/;
    var checkEmail = regex.test(emailId);

    if (checkEmail && (password == confirmPassword)) {
        alert("Signup successful");
    }
    
}

function checkConfirmPassword(){
    var password = document.getElementById("Password").value;
    var confirmPassword = document.getElementById("ConfirmPassword").value;
        

    if(password == confirmPassword) {
        document.getElementById("ConfirmPassword").style.backgroundColor = '';
    }
    else {
        document.getElementById("ConfirmPassword").style.backgroundColor = 'tomato';
        document.getElementById("ConfirmPassword").value = null;
        document.getElementById("ConfirmPassword").placeholder = "The passwords do not match";
    }
}

function checkEmailAddress() {
    var emailId = document.getElementById("Email").value;
    var regex = /^(\w+@)([a-z]+)(\.)([a-z]{1,5})$/;

    var checkEmail = regex.test(emailId);

    if(checkEmail) {
        document.getElementById("Email").style.backgroundColor = '';
    }
    else {
        document.getElementById("Email").style.backgroundColor = 'tomato';
    }
}


//check login
function login(){
    
    //login variables
    var loginName = document.getElementById("Email/Username").value;
    var loginPassword = document.getElementById("loginPassword").value;

    if((loginName == username || loginName == emailId) && (loginPassword == password || loginPassword == confirmPassword)) {
        alert("logged in");
    }
    
    else{

        alert("invalid login");
    }

}