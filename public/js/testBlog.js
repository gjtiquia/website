"use strict";
// showdown is from the Showdown CDN script
const converter = new showdown.Converter();
const text = "# hello, markdown!";
const html = converter.makeHtml(text);
console.log(html);
const blogContentsContainer = document.getElementById(
    "blog-contents-container"
);
if (blogContentsContainer != null) {
    blogContentsContainer.innerHTML = html;
}
