import fs from "fs";
import showdown from "showdown";
import parseMD from "parse-md";
import { parse as parseHTML } from "node-html-parser";
import slugify from "slugify";

const HTML_TEMPLATE_PATH = "src/blog-template.html";
const BLOG_DIRECTORY = "blog-repo";
const OUTPUT_DIRECTORY = "public/blog";

fs.rmSync(OUTPUT_DIRECTORY, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
fs.readdirSync(BLOG_DIRECTORY).forEach((file) => {
    console.log("Converting", file, "into HTML...");

    const markdownFile = fs.readFileSync(BLOG_DIRECTORY + "/" + file, {
        encoding: "utf8"
    });
    buildHtml(markdownFile, HTML_TEMPLATE_PATH, OUTPUT_DIRECTORY);
});

function buildHtml(
    markdownFileContents: string,
    htmlTemplatePath: string,
    outputDirectory: string
) {
    const markdownObject = parseMD(markdownFileContents);
    const markdownMetadata = markdownObject.metadata as MarkdownMetadata;
    const markdownContents = markdownObject.content;

    const converter = new showdown.Converter();
    const markdownContentHtml = converter.makeHtml(markdownContents);

    const blogTemplateHtml = fs.readFileSync(htmlTemplatePath, "utf-8");
    const htmlObject = parseHTML(blogTemplateHtml);

    const titleElement = htmlObject.getElementById("title");
    if (titleElement != null) titleElement.innerHTML = markdownMetadata.title;
    else console.error("buildHtml: No element with id 'title'!");

    const blogTitle = htmlObject.getElementById("blog-title");
    if (blogTitle != null) blogTitle.innerHTML = markdownMetadata.title;
    else console.error("buildHtml: No element with id 'blogTitle'");

    const container = htmlObject.getElementById("blog-contents-container");
    if (container != null) container.innerHTML = markdownContentHtml;
    else
        console.error(
            "buildHtml: No element with id 'blog-contents-container'!"
        );

    const slugTitle = slugify(markdownMetadata.title, {
        lower: true
    });

    const dir = `${outputDirectory}/${slugTitle}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(`${dir}/index.html`, htmlObject.toString(), {
        flag: "wx" // flag to create if doesnt exist
    });
}

interface MarkdownMetadata {
    title: string;
    description: string;
}
