const errorDiv = document.getElementById("error");
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

searchUser("JLevins189");  //default landing to my GitHub to not have empty screen

usernameSearchForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    clearPreviousData();  //reset data fields
    let formInput = new FormData(usernameSearchForm);
    let usernameToSearch = formInput.get("usernameInput");
    searchUser(usernameToSearch)
 });

 function searchUser(username)  {
    fetch('https://api.github.com/users/' + username)
    .then((response) => {
        if(response.ok) {
            return response.json()
        }
        throw new Error("Username Not found")
    })
    .then(json => fillDOM(json))
    .then(json1 => getRepoData(json1.repos_url))
    .catch(() => {
        errorDiv.style.display = "flex";
    });  //show error when user not found
 }

 function fillDOM(profileJson)  {
    avatarPic.src = profileJson.avatar_url;
    setElement(nameOfUser, profileJson.name);
    setElement(username, profileJson.login)  //correct case guaranteed vs input
    setElement(email, profileJson.email);
    setElement(locationOfUser, profileJson.location);
    setElement(numberOfGists, profileJson.public_gists);
    return profileJson;  //to reuse for repo data
 }

 function getRepoData(repoUrl) {
    fetch(repoUrl)
    .then(response => response.json())
    .then(json => json.map(array=> ({
        name: array.name,
        description: array.description
    })))
    .then(repoArray => fillRepo(repoArray))
 }

 function fillRepo(repoJson)  {
    repoJson.forEach(function (currentRepo, index) {
        //if there are no elements for this iteration -> make one
        let currentRepoNameElement = document.getElementById(repoNameElementPrefix + (index + 1)) ?? document.createElement('p');
        let currentRepoDescriptionElement = document.getElementById(repoDescriptionElementPrefix + (index + 1)) ?? document.createElement('p');
        setElement(currentRepoNameElement, currentRepo.name)
        setElement(currentRepoDescriptionElement ,currentRepo.description);

        if(index >=5)  {
            userRepoContentDiv.style.overflow = "auto";  //scrollable if over 5 repos
            //Dynamically create sections into new div after 5th repo
            let newDiv = document.createElement("div");
            newDiv.className = "userRepo";
            let hrElement = document.createElement("hr");  
            let nameHeader = document.createElement("h3");
            let descriptionHeader = document.createElement("h3");

            setElement(nameHeader, "Name: ");
            setElement(descriptionHeader, "Description: ");

            //set ids for easy reset and readability on HTML
            currentRepoNameElement.id = repoNameElementPrefix + index;
            currentRepoDescriptionElement.id = repoDescriptionElementPrefix + index;

            //append elements to scrollable div
            newDiv.appendChild(hrElement);
            newDiv.appendChild(nameHeader);
            newDiv.appendChild(currentRepoNameElement);
            newDiv.appendChild(descriptionHeader);
            newDiv.appendChild(currentRepoDescriptionElement);
            userRepoContentDiv.appendChild(newDiv);
        }
    });
 }

 function setElement(element, value)  {  //with null validation
    if(value || value === 0)  {  //0 is marked as false otherwise
        let errorTextNode = document.createTextNode(value);
        element.style = "";  //red style from nulls stays after change otherwise
        element.appendChild(errorTextNode);
    }
    else {
        let errorTextNode = document.createTextNode("This information could not be found or is blank");
        element.style.color = "red";
        element.appendChild(errorTextNode);
    }
 }

 function clearPreviousData()  {
    errorDiv.style.display = "none";     //clear error
    avatarPic.src = "";     //clear picture

    //clear repos down to default 5
    let userReposCollelction = document.getElementsByClassName("userRepo");
    let userRepoNodes = Array.from(userReposCollelction);
    let elementsToRemove = userRepoNodes.slice(5);  //any elements after 5th should be removed
    elementsToRemove.forEach(element => element.parentElement.removeChild(element))

    //clear paragraph content
    let paragraphs = document.getElementsByTagName('p');
    for (let element of paragraphs) {
        element.innerHTML = "";
    }
    userRepoContentDiv.style.overflow = "";  //remove scroll ability of user repos
 }




