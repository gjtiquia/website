import fs from "fs";
import showdown from "showdown";
import parseMD from "parse-md";
import { parse as parseHTML } from "node-html-parser";
import slugify from "slugify";
// buildHtmlFromGitHubRepo();
console.log("TypeScript is working!");
async function recursivelyGetMdFilesFromGitHubRepo(owner, repo, path, fileContentsList) {
    const directoryApiResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
        .then(d => {
        if (d.status != 200) {
            // Require authentication token to exceed 60 requests per hour per IP to up to 5,000 requests per hour user
            console.error(`buildHtml.recursivelyGetMdFilesFromGitHubRepo(): status code: ${d.status}! Returning empty array...`);
            return [];
        }
        return d.json();
    });
    // Traditional for loop is used instead of forEach because need to await each iteration
    for (const apiResponse of directoryApiResponse) {
        if (apiResponse.type == "dir") {
            await recursivelyGetMdFilesFromGitHubRepo(owner, repo, apiResponse.path, fileContentsList);
        }
        else if (apiResponse.type == "file") {
            // Ensure it is a *.md file
            const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.md)$");
            if (!regex.test(apiResponse.name))
                continue;
            const contents = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${apiResponse.sha}`)
                .then((d) => d.json())
                .then((d) => Buffer.from(d.content, "base64").toString());
            fileContentsList.push(contents);
        }
    }
}
async function getMdFilesFromGitHubRepo(owner, repo) {
    // TODO : Should filter and only get *.md files
    const fileContentsList = [];
    await recursivelyGetMdFilesFromGitHubRepo(owner, repo, "", fileContentsList);
    return fileContentsList;
}
async function buildHtmlFromGitHubRepo() {
    const fileContentsList = await getMdFilesFromGitHubRepo("gjtiquia", "blog");
    buildHtmlFromFileList(fileContentsList);
}
function buildHtmlFromFileList(markdownFileContentList) {
    const HTML_TEMPLATE_PATH = "src/blog-template.html";
    const OUTPUT_DIRECTORY = "public/blog";
    fs.rmSync(OUTPUT_DIRECTORY, { recursive: true, force: true });
    fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
    markdownFileContentList.forEach((markdownFile) => {
        buildHtml(markdownFile, HTML_TEMPLATE_PATH, OUTPUT_DIRECTORY);
    });
}
function buildHtml(markdownFileContents, htmlTemplatePath, outputDirectory) {
    const markdownObject = parseMD(markdownFileContents);
    const markdownMetadata = markdownObject.metadata;
    const markdownContents = markdownObject.content;
    const converter = new showdown.Converter();
    const markdownContentHtml = converter.makeHtml(markdownContents);
    const blogTemplateHtml = fs.readFileSync(htmlTemplatePath, "utf-8");
    const htmlObject = parseHTML(blogTemplateHtml);
    const titleElement = htmlObject.getElementById("title");
    if (titleElement != null)
        titleElement.innerHTML = markdownMetadata.title;
    else
        console.error("buildHtml: No element with id 'title'!");
    const blogTitle = htmlObject.getElementById("blog-title");
    if (blogTitle != null)
        blogTitle.innerHTML = markdownMetadata.title;
    else
        console.error("buildHtml: No element with id 'blogTitle'");
    const container = htmlObject.getElementById("blog-contents-container");
    if (container != null)
        container.innerHTML = markdownContentHtml;
    else
        console.error("buildHtml: No element with id 'blog-contents-container'!");
    const slugTitle = slugify(markdownMetadata.title, { lower: true });
    const dir = `${outputDirectory}/${slugTitle}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(`${dir}/index.html`, htmlObject.toString(), {
        flag: "wx", // flag to create if doesnt exist
    });
}
