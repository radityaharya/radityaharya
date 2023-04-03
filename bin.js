#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";    
import { Octokit } from "@octokit/core";

async function latestGithubProjects() {
    const repos = [];
    const octokit = new Octokit({});
    const response = await octokit.request("GET /users/{username}/repos", {
        username: "radityaharya",
        per_page: 5,
        sort: "updated",
    });
    response.data.forEach((repo) => {
        repos.push({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            owner: repo.owner.login,
        });
    })
    return repos;
}

const data = {
    name: chalk.bold.green("Raditya Harya"),
    handle: chalk.white("@radityaharya"),
    work: chalk.white("Information Systems Student at Bina Nusantara University"),
    github: chalk.blue("https://github.com/") + chalk.green("radityaharya"),
    linkedin: chalk.blue("https://linkedin.com/in/") + chalk.green("radityaharya"),
    email: chalk.blue("mailto:contact@radityaharya.com"),
    spotify: chalk.blue("https://open.spotify.com/user/") + chalk.green("radityaharya"),
    web: chalk.blue("https://radityaharya.com"),
};

const me = boxen(
    [
        `${data.name}/${data.handle}`,
        ``,
        `${data.work}`,
        ``,
        `${data.github}`,
        `${data.linkedin}`,
        `${data.email}`,
        `${data.spotify}`,
        `${data.web}`,
        ``,
        `${chalk.italic("feel free to contact me!")}`,
    ].join("\n"),
    {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
        textAlignment: "left",
    }
);

const githubBox = (owner, name, description, url) => {
    return boxen(
        [
            `${chalk.green(owner)}/${chalk.bold.green(name)}`,
            ``,
            `${description}`,
            ``,
            `${chalk.blue(url)}`,
        ].join("\n"),
        {
            padding: 1,
            margin: 0,
            borderStyle: "round",
            borderColor: "green",
            textAlignment: "left",
        }
    );
};

const githubBoxes = [];

latestGithubProjects().then((repos) => {
    repos.forEach((repo) => {
        githubBoxes.push(githubBox(repo.owner, repo.name, repo.description, repo.url));
    });
});

const actions = [
    {
        name: "Open my Github",
        value: () => {
            open("https://github.com/radityaharya");

        },
    },
    {
        name: "Open my LinkedIn",
        value: () => {
            open("https://linkedin.com/in/radityaharya");
        },
    },
    {
        name: "Visit my Website",
        value: () => {
            open("https://radityaharya.com");
        },
    },
    {
        name: "Send me an email",
        value: () => {
            open("mailto:contact@radityaharya.com");
        },
    },
    {
        name: "Latest Github Projects",
        value: () => {
            clear();
            console.log("Here are my latest Github projects:");
            githubBoxes.forEach((box) => {
                console.log(box);
            }
            );
        }
    },
    {
        name: "Quit",
        value: () => {
            console.log("Thanks for visiting!");
        },
    },
];

const run = async () => {
    clear();
    console.log(me);
    const prompt = inquirer.createPromptModule();
    const { action } = await prompt({
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: actions,
    });
    action();
}

run();

