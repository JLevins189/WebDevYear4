const userRepoContentDiv = document.getElementById("userRepoContent");
const usernameSearchForm = document.getElementById("usernameSearch");
const avatarPic = document.getElementById("avatarPic");
const nameOfUser = document.getElementById("nameOfUser");
const username = document.getElementById("username");
const email = document.getElementById("emailOfUser");
const locationOfUser = document.getElementById("locationOfUser");
const numberOfGists = document.getElementById("numberOfGists");
const repoNameElementPrefix = "nameOfRepo";
const repoDescriptionElementPrefix = "descriptionOfRepo";

searchUser("JLevins189");

usernameSearchForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let formInput = new FormData(usernameSearchForm);
    let usernameToSearch = formInput.get("usernameInput");
    searchUser(usernameToSearch)
 });

 function searchUser(username)  {
    fetch('https://api.github.com/users/' + username)
    .then(response => response.json())
    .then(json => fillDOM(json))
    .then(json1 => getRepoData(json1.repos_url))
 }

 function fillDOM(profileJson)  {
    avatarPic.src = profileJson.avatar_url;
    nameOfUser.innerHTML = profileJson.name;
    username.innerHTML = profileJson.login;  //correct case guaranteed vs input
    email.innerHTML = profileJson.email;
    locationOfUser.innerHTML = profileJson.location;
    numberOfGists.innerHTML = profileJson.public_gists;
    return profileJson;
    // nameOfUser.innerHTML = json.name;
    // nameOfUser.innerHTML = json.name;
    // nameOfUser.innerHTML = json.name;
    // nameOfUser.innerHTML = json.name;
    // nameOfUser.innerHTML = json.name;
    // nameOfUser.innerHTML = json.name;
 }

 function getRepoData(repoUrl) {
    console.log(repoUrl);
    fetch(repoUrl)
    .then(response => response.json())
    .then(json => json.map(array=> ({
        name: array.name,
        description: array.description
    })))
    .then(repoArray => fillRepo(repoArray))
 }

 function fillRepo(repoJson)  {
    if(repoJson.length <= 5)  {
        repoJson.forEach(function (currentRepo, index) {
            let currentRepoNameElement = document.getElementById(repoNameElementPrefix + (index + 1));
            currentRepoNameElement.innerHTML = currentRepo.name;
            let currentRepoDescriptionElement = document.getElementById(repoDescriptionElementPrefix + (index + 1));
            currentRepoDescriptionElement.innerHTML = currentRepo.description;
        });
    }
    else {
        repoJson.forEach(function (currentRepo, index) {
            if(index <5)  {
                console.log(index);

                let currentRepoNameElement = document.getElementById(repoNameElementPrefix + (index + 1));
                currentRepoNameElement.innerHTML = currentRepo.name;
                let currentRepoDescriptionElement = document.getElementById(repoDescriptionElementPrefix + (index + 1));
                currentRepoDescriptionElement.innerHTML = currentRepo.description;
            }
            else  {
                // <hr>
                // <h3 id="nameOfRepoHeading3">Name: </h3><p id="nameOfRepo3">Fake Name</p><br><br>
                // <h3 id="descriptionOfRepoHeading3">Description: </h3><p id="descriptionOfRepo3">Fake Name</p>


                let hrElement = document.createElement("hr");
                let nameHeader = document.createElement("h3");
                let descriptionHeader = document.createElement("h3");
                let nameTextElement = document.createElement("p");
                let descriptionTextElement = document.createElement("p");
                nameHeader.innerHTML = "Name: ";
                descriptionHeader.innerHTML = "Description: ";
                let nameTextNode = document.createTextNode(currentRepo.name);
                let descriptionTextNode = document.createTextNode(currentRepo.description);

                nameTextElement.appendChild(nameTextNode);
                descriptionTextElement.appendChild(descriptionTextNode);
                userRepoContentDiv.appendChild(hrElement);
                userRepoContentDiv.appendChild(nameHeader);
                userRepoContentDiv.appendChild(nameTextElement);
                userRepoContentDiv.appendChild(descriptionHeader);
                userRepoContentDiv.appendChild(descriptionTextElement);
            }



        });

    }



 }


 //todo null checks on attributes