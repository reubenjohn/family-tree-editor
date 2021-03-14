<h1 align="center">Family Tree Editor</h1>

<p align="center">
  <a href="#buildstatus">
    <img alt="build status" src="https://github.com/reubenjohn/family-tree-editor/workflows/Build/badge.svg">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
  </a>
</p>

<p align="center">
  <h3 align="center"><a href="https://reubenjohn.github.io/family-tree-editor">👾 Try it out now!</a></h3>
</p>

A minimalist family tree editor and viewer hosted on GitHub Pages.
It allows anyone without a technical background to create and host their family tree for free.   
It uses the [React D3 Tree library](https://github.com/bkrem/react-d3-tree) in order to generate a visual family tree from data that you input.

## Contents <!-- omit in toc -->
- [Setting up your own family tree](#setting-up-your-own-family-tree-one-time-setup)
- [Usage](#usage)
- [Development and Contributions](#development-and-contributions)

## Setting up your own family tree (one time setup)
1. Create a copy of this repository by clicking the 'Fork' button on the top right:  
![Fork](screenshots/Fork.png)
2. From your newly created repository, go to a file named 'data.json' by clicking the 'Go to file' button:  
![Go to file](screenshots/go_to_file.png)
Type `data.json`:  
![data.json](screenshots/data.json.png)
3. Edit the file:  
![edit](screenshots/edit.png)  
Let's start by also giving your family tree a `title` of your choosing:  
![Family Tree Title](screenshots/family_tree_title.png)  
4. Describe what your changed and click 'Commit changes':  
![Commit changes](screenshots/commit.png)
5. This will trigger your family tree website to get generated with your latest changes!
6. Switch to the 'Actions' tab to monitor its progress: ![Actions Tab](screenshots/actions_tab.png)
7. The final step is to enable your website by switching to the 'Settings' tab  
![Settings Tab](screenshots/settings_tab.png) 
 and change the source branch to 'gh-page'  which should have been generated after step 6 is completed (you may have to wait a few minutes before it shows the gh-pages option):
![GitHub Pages Settings](screenshots/github_pages_settings.png)
8. If it all goes well, you will be presented with the link to your site as shown in the screenshot above.
Make sure you keep note of it! **It may take a few minutes for the link to start working.**

## Usage
The family tree launches by default in view mode.
Click the thin gray banner to the left in order to switch to edit mode:  
![View Mode](screenshots/view_mode.png)
This exposes all the editing options  
![Edit Mode](screenshots/edit_mode.png)

## Development and Contributions
All the code for this website is open sourced and contributions are welcome!
If you would like to make contributions to the code, please follow the instructions below.
### Development Setup
To set up this project for local development, follow the steps below:

1. [Clone the repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
2. Install dependencies:
```bash
cd your-project-folder-name
npm i
```

> **Tip:** If you'd prefer to use your own app for development instead of the demo, simply run `npm link react-d3-tree` in your app's root folder instead of the demo's :)

### Hot reloading
Bring up the server using the below command, and changes you make will reflect live.
```bash
npm start
```
