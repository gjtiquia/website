import fs from "fs";
import showdown from "showdown";
import parseMD from "parse-md";
import { parse as parseHTML } from "node-html-parser";
import slugify from "slugify";

interface MarkdownMetadata {
    title: string;
    description: string;
}

function buildHtml() {
    const markdownFile = fs.readFileSync("blog-repo/test-blog.md", "utf-8");

    const markdownObject = parseMD(markdownFile);
    const markdownMetadata = markdownObject.metadata as MarkdownMetadata;
    const markdownContents = markdownObject.content;

    const converter = new showdown.Converter();
    const convertedHtml = converter.makeHtml(markdownContents);

    const blogTemplateHtml = fs.readFileSync("src/blog-template.html", "utf-8");
    const htmlObject = parseHTML(blogTemplateHtml);

    const titleElement = htmlObject.getElementById("title");
    if (titleElement != null) titleElement.innerHTML = markdownMetadata.title;

    const container = htmlObject.getElementById("blog-contents-container");
    if (container != null) container.innerHTML = convertedHtml;

    const slugTitle = slugify(markdownMetadata.title, {
        lower: true
    });

    const dir = `public/blog/${slugTitle}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(`${dir}/index.html`, htmlObject.toString(), {
        flag: "wx" // flag to create if doesnt exist
    });
}

buildHtml();
