import fs from "fs";
import showdown from "showdown";
import parseMD from "parse-md";

const mdFileContents = fs.readFileSync(
    "public/blog/test-blog/test-blog.md",
    "utf-8"
);

const { metadata, content } = parseMD(mdFileContents);

const converter = new showdown.Converter();
const convertedHtml = converter.makeHtml(content);
fs.writeFileSync("public/blog/test-blog/test-blog.html", convertedHtml);

console.log(metadata);
