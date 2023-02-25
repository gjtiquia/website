import fs from "fs";
import showdown from "showdown";

const mdFileContents = fs.readFileSync("public/blog/test-blog/test-blog.md", "utf-8")
const converter = new showdown.Converter();
const convertedHtml = converter.makeHtml(mdFileContents);
fs.writeFileSync("public/blog/test-blog/test-blog.html", convertedHtml);
