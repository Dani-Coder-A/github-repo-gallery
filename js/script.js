//This global variable targets the profile information
const profileInfo = document.querySelector(".overview");
//This global variable points towards my GitHub username
const username = "Dani-Coder-A";
//This global variable targets the unordered list of repos
const repoList = document.querySelector(".repo-list"); 
//This global variable targets all the repos information (input and unordered list)
const allRepoInfo = document.querySelector(".repos");
//This global variable targets individual repo information (currently hidden)
const individualRepoInfo = document.querySelector(".repo-data");
//This global variable targets the Back to Repo Gallery button
const button = document.querySelector(".view-repos");
//This global variable targets the search input box 
const filterInput = document.querySelector(".filter-repos");

//Create an Async Function to fetch API JSON data
const getUserInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};

getUserInfo();

//Create a Function to fetch & display user information
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    profileInfo.append(div);
    gitRepos();
};

//Create an Async Function to fetch the repos
const gitRepos = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //console.log(repoData);
    displayRepos(repoData);
};

//Create a Function to display info about each repo
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for(const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `
        <h3>${repo.name}</h3>
        `;
        repoList.append(li);
    }
};

//Add a click event for the unordered repo list
repoList.addEventListener("click", function (e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getRepoInfo(repoName);
    }
});

//Create an Async Function to get specific repo info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    //Grab languages
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    //Add languages to empty array 
    const languages = [];
    for(const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

//Create a Function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    individualRepoInfo.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepoInfo.append(div);
    individualRepoInfo.classList.remove("hide");
    allRepoInfo.classList.add("hide");
    button.classList.remove("hide");
};

//Add a click event for the Back to Repo Gallery button
button.addEventListener("click", function () {
    allRepoInfo.classList.remove("hide");
    individualRepoInfo.classList.add("hide");
    button.classList.add("hide");
})

//Add an input event listener for the search input box
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for(const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if(repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
        }
        else {repo.classList.add("hide");}
    }
});