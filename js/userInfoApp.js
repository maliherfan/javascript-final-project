 // select DOM elements
 const mainElement = document.querySelector("main-part");
 const bioElement = document.querySelector(".bio-part");
 const bioImgLocationElement = document.querySelector(".bio-img-location");
 const bioLoginWebElement = document.querySelector(".bio-login-website");
 const repositoriesElement = document.querySelector(".repositories");
 const countingInfoElement = document.querySelector(".user-counting-info");
 const hireableElement = document.querySelector(".hireable");
 const hireableIElement = hireableElement.querySelector("i");
 const href = window.location.href;
 const userName = href.split("?")?.at(1);

 //base urls
 const baseUrl1 = "https://api.github.com/users/";
 const repositoryUrl =
   "https://api.github.com/users/milad1450/repos?per_page=5&sort=created:asc";

 const updatedRepositoryUrl = [
   repositoryUrl.slice(0, 29),
   userName,
   repositoryUrl.slice(-34),
 ].join("");

 // get users function
 const getAndShowUser = async (userName) => {
   const response = await fetch(`${baseUrl1}${userName}`);
   const user = await response.json();

   if (user["hireable"]) {
     hireableIElement.className = "fa fa-check";
     hireableIElement.style.color = "green";
   } else {
     hireableIElement.className = "fa fa-close";
     hireableIElement.style.color = "red";
   }

   bioImgLocationElement.innerHTML = `
       <img src=${user["avatar_url"]}></img>
       <p>${user["name"]}</p>
       <p>${user["location"]}</p>`;
   bioLoginWebElement.innerHTML = `
       <h3>Bio:</h3>
       <p>${user["bio"]}</p>
       <a href="${user["html_url"]}">Visit Github Page</a>
       <p>Login:${user["login"]}</p>
       <p>Website:${user["blog"]}</p>`;

   countingInfoElement.innerHTML = `
       <li class="follower">Followers:${user["followers"]}</li>
       <li class="following">Following:${user["following"]}</li>
       <li class="public-repos">Public Repos:${user["public_repos"]}</li>
       <li class="public-gists">Public Gists:${user["public_gists"]}</li>
   `;
   getAndShowRepo();
 };

 const getAndShowRepo = async () => {
   const response = await fetch(`${updatedRepositoryUrl}`);
   const allRepos = await response.json();
   allRepos.forEach((repo) => {
     repositoriesElement.innerHTML += `<li><a href=${repo["html_url"]}>
           ${repo["name"]}
           </a></li>`;
   });
 };

 getAndShowUser(userName);