import fs from "fs";
import showdown from "showdown";
import parseMD from "parse-md";
import {parse as parseHTML} from "node-html-parser";
import slugify from "slugify";

buildHtmlFromGitHubRepo();

async function getMdFilesFromGitHubRepo(owner: string, repo: string): Promise<string[]> {
    // TODO : Now just gets the root directory, should get recursively
    // TODO : Should filter and only get *.md files

    const rootDirectoryApiResponse: GitHubAPIResponse[] = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/`)
        .then((d) => d.json());

    const fileContentsList: string[] = [];

    // Use traditional for instead of foreach because need to await each iteration
    for (const apiFileResponse of rootDirectoryApiResponse) {
        const contents = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs/${apiFileResponse.sha}`)
            .then((d) => d.json())
            .then((d) => Buffer.from(d.content, "base64").toString());

        fileContentsList.push(contents);
    }

    return fileContentsList;
}

async function buildHtmlFromGitHubRepo () {
    const fileContentsList = await getMdFilesFromGitHubRepo("gjtiquia", "blog");
    console.log(fileContentsList);
    buildHtmlFromFileList(fileContentsList);
}

function buildHtmlFromDirectory () {
    const BLOG_DIRECTORY = "blog-repo";

    const fileContentsList: string[] = [];

    fs.readdirSync(BLOG_DIRECTORY).forEach((file) => {
        const markdownFile = fs.readFileSync(`${BLOG_DIRECTORY}/${file}`, {encoding: "utf8"});
        fileContentsList.push(markdownFile);
    });

    buildHtmlFromFileList(fileContentsList);
}

function buildHtmlFromFileList (markdownFileContentList: Array<string>) {
    const HTML_TEMPLATE_PATH = "src/blog-template.html";
    const OUTPUT_DIRECTORY = "public/blog";

    fs.rmSync(OUTPUT_DIRECTORY, {recursive: true, force: true});
    fs.mkdirSync(OUTPUT_DIRECTORY, {recursive: true});

    markdownFileContentList.forEach((markdownFile) => {
        buildHtml(markdownFile, HTML_TEMPLATE_PATH, OUTPUT_DIRECTORY);
    });
}

function buildHtml (
    markdownFileContents: string,
    htmlTemplatePath: string,
    outputDirectory: string,
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
    else console.error("buildHtml: No element with id 'blog-contents-container'!");

    const slugTitle = slugify(markdownMetadata.title, {lower: true});

    const dir = `${outputDirectory}/${slugTitle}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    fs.writeFileSync(`${dir}/index.html`, htmlObject.toString(), {
        flag: "wx", // flag to create if doesnt exist
    });
}

interface MarkdownMetadata {
    title: string;
    description: string;
}

interface GitHubAPIResponse {
    name: string;
    path: string;
    sha: string;
    size: string;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: GitHubAPIResponseLinks;
}

interface GitHubAPIResponseLinks {
    self: string;
    git: string;
    html: string;
}
