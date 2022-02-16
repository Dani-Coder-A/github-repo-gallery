//This global variable targets the profile information
const profileInfo = document.querySelector(".overview");
//This global variable points towards my GitHub username
const username = "Dani-Coder-A";

//Create an Async Function to fetch API JSON data
const getData = async function () {
const resp = await fetch (`https://api.github.com/users/${username}`);
const data = await resp.json();
console.log(data);
displayProfileInfo(data);
};

getData();

//Create a Function to fetch & display user information
const displayProfileInfo = function (data) {
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
};