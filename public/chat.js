const socket = io();

//We load the username from the previous webpage:
const params = new URLSearchParams(window.location.search);
let userName = "Anonymous";
if(params.has("uname") && params.get("uname") !== "") userName = params.get("uname");

//Send the username to the server:
socket.on("connect", () => {
        socket.emit("chat:newUser",{username: userName, socketid: socket.id});
});

let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('chatOutputBox');
let userList = document.getElementById('userList');

btn.addEventListener("click", () => {
    socket.emit("chat:message", {
        username: userName,
        message: message.value
    });
    message.value = "";
});

//Enter keypress
message.addEventListener("keyup", function onEvent(e) {
    if (e.key === "Enter") {
        socket.emit("chat:message", {
        username: userName,
        message: message.value
    });
    message.value = "";
    }
});

socket.on("chat:message", function (data){
    output.innerHTML += "<p><strong>"+data.username+":</strong> "+data.message+"</p>";
    output.scrollTop = output.scrollHeight;
});

function updateUserList(userDict){
    //First we delete all usernames in the list:
    while (userList.lastChild) {
        userList.removeChild(userList.lastChild);
    }
    //Then we add all the users to the list with their ids:
    let keys = Object.keys(userDict);
    keys.forEach((key, index) => {
        userList.innerHTML += '<p id="'+key+'"><strong>'+userDict[key]+"</strong></p>";
    });
};

socket.on("chat:newUser", function(data){
    updateUserList(data);
});
socket.on("chat:offline", function(data){
    updateUserList(data);
});