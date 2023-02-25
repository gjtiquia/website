"use strict";
const container = document.getElementById("blog-contents-container");
if (container != null) {
    fetch("./test-blog.html")
        .then((response) => response.text())
        .then((text) => (container.innerHTML = text));
}
