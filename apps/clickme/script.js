function init() {
    setCountText(0);
    document.getElementById("button").addEventListener("click", onButtonClick);
}

function getCountNumber() {
    return parseInt(document.getElementById("count").innerHTML);
}

function setCountText(text) {
    document.getElementById("count").innerHTML = text;
}

function onButtonClick() {
    setCountText(getCountNumber() + 1);
}

init();
