//This global variable targets the profile information
const profileInfo = document.querySelector(".overview");
//This global variable points towards my GitHub username
const username = "Dani-Coder-A";
//This global variable targets the unordered list of repos
const repoList = document.querySelector(".repo-list"); 

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
    getRepoInfo()
};

//Create an Async Function to fetch the repos
const getRepoInfo = async function () {
    const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoInfo.json();
    //console.log(repoData);
    displayRepoInfo(repoData);
};

//Create a Function to display info about each repo
const displayRepoInfo = function (repos) {
    for(const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `
        <h3>${repo.name}</h3>
        `;
        repoList.append(li);
    }
};
