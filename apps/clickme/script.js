"use strict";
function init() {
    setCountText("0");
    addOnClickEventListener();
}
function addOnClickEventListener() {
    const button = document.getElementById("button");
    if (button != null)
        button.addEventListener("click", onButtonClick);
}
function getCountNumber() {
    const countElement = document.getElementById("count");
    if (countElement != null)
        return parseInt(countElement.innerHTML);
    console.error("script.getCountNumber(): countElement null!");
    return -1;
}
function setCountText(text) {
    const countElement = document.getElementById("count");
    if (countElement != null)
        countElement.innerHTML = text;
    else
        console.error("script.setCountText(): countElement null!");
}
function onButtonClick() {
    setCountText((getCountNumber() + 1).toString());
}
init();
