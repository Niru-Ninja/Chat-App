let btn = document.getElementById("confirm");
let uname = document.getElementById("uname");

btn.addEventListener("click", () => {
    location.assign("chatRoom.html?uname=" + uname.value);
});

uname.addEventListener("keyup", function onEvent(e) {
    if (e.key === "Enter") location.assign("chatRoom.html?uname=" + uname.value);
});