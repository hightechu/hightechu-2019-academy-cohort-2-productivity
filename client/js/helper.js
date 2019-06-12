/**
 * @param {String} cname Name of the cookie to set
 * @param {String} cvalue Value of the cookie to set
 * @param {String} ms Cookie's TTL (Time To Live) in milliseconds (ms)
 */
function setCookie(cname, cvalue, ms) {
    var d = new Date();
    d.setTime(d.getTime() + (ms * 1000));
    var expires = "expires="+ d.toUTCString();
    console.log(expires);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * @param {String} cname Name of the cookie to get
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


/**
 * @param {String} url Url endpoint to load
 */
function loadDoc(url) {
  replaceDoc = function (response, status) {
    if (status == 200) {
      var newDoc = document.open("text/html", "replace");
      newDoc.write(response);
      newDoc.close();
    }
  }

  APIajax(url, "GET", replaceDoc, null, false, false);
}


/**
 * @param {String} endpoint Rest API endpoint
 * @param {String} method Protocol to call the endpoint
 * @param {function} fn Function to call on server response
 * @param {Object} obj Data object to send in request
 * @param {boolean} parse Parse the response to JS object
 * @param {boolean} callapi Call an api endpoint
 */
function APIajax(endpoint, method, fn, obj=null, parse=true, callapi=true) {
  var location = "";
  if (callapi) {
    location = "{0}/api/{1}".format(document.location.origin, endpoint);
  }
  else {
    location = "{0}/{1}".format(document.location.origin, endpoint)
  }

  var http_request = new XMLHttpRequest();

  http_request.onreadystatechange = function() {
    //A new XMLHttpRequest object starts in state 0
    if (this.readyState == 1) {
      console.log("Opening connection to server");
      return;
    }
    if (this.readyState == 2) {
      console.log("Sending request to server");
      return;
    }
    if (this.readyState == 3) {
      console.log("Waiting for server response");
      return;
    }
    if (this.readyState == 4) {
      console.log("Server successfully responded");
      var response = "";
      if (parse) {
        response = JSON.parse(this.responseText);
      }
      else {
        response = this.responseText;
      }
      fn(response, this.status)
      return;
    }
    console.log("Failure");
  }

  http_request.open(method, location, true);
  http_request.setRequestHeader("Content-type", "application/json");
  auth = getCookie("userAuth");
  if(auth) {
      http_request.setRequestHeader('Authorization', auth);
  }
  if (obj) {
    postData = JSON.stringify(obj);
    http_request.send(postData);
  }
  else {
    http_request.send();
  }
}


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}