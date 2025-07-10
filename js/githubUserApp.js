 // select DOM elements
 const submitElement = document.querySelector(".submitBtn");
 const searchInput = document.querySelector(".searchInput");
 const clearElement = document.querySelector(".clear");
 const usersElement = document.getElementById("users");

 //base url
 const baseUrl = "https://api.github.com/search/users?q=";

 //submit to show search results
 submitElement.addEventListener("click", function (e) {
   e.preventDefault();
   if (searchInput.value) {
     usersElement.innerHTML = `<div class="loader"></div>`;
     showUsers(searchInput.value.trim());
   } else {
     showAndRemoveError(searchInput, "Please enter something");
     usersElement.innerHTML = "";
   }
 });

 //clear previous results
 usersElement.addEventListener("click", function (e) {
   if (e.target.className === "clear") {
     usersElement.innerHTML = "";
     localStorage.removeItem("searchVal");
     searchInput.value = "";
   }
 });

 // show And Remove Error
 function showAndRemoveError(searchInput, errorMessage) {
   const p = document.createElement("p");
   p.className = "error";
   p.innerText = errorMessage;
   searchInput.before(p);
   setTimeout(function () {
     p.remove();
   }, 1000);
 }

 // get users function
 const getUsers = async (valueToSearch) => {
   const response = await fetch(`${baseUrl}${valueToSearch}`);
   const users = await response.json();
   return users;
 };

 // show users in page
 const showUsers = async (searchValue) => {
   const users = await getUsers(searchValue);
   //we need "items" key of users object
   const allUsers = users["items"];
   usersElement.innerHTML = "";
   usersElement.append(clearElement);
   allUsers.forEach((user, i, arr) => {
     usersElement.innerHTML += `<li>
               <img src=${user["avatar_url"]}></img>
               <h3>${user["login"]}</h3>
               <a href='user-info.html?${user["login"]}'>More</a>
           </li>`;
   });
   saveToLocalStorage(searchValue);
 };

 //local storage part
 //save search value to local storage
 const saveToLocalStorage = (searchValue) => {
   localStorage.setItem("searchVal", JSON.stringify(searchValue));
 };

 //show results based on previous search value if exists
 const showPreviousSearchResult = () => {
   const searchValueFromStorage = localStorage.getItem("searchVal");
   if (searchValueFromStorage) {
     searchInput.value = JSON.parse(searchValueFromStorage);
     showUsers(JSON.parse(searchValueFromStorage));
   }
 };

 showPreviousSearchResult();