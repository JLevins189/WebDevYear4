//array of images
let colours = [
    "blue", "green", "red", "yellow", "pink", "white", "black", "purple", "teal"
];

const gerrardYeCourseSoundUrl = "https://www.myinstants.com/media/sounds/gerrard-eeeeeeeahhh-course.mp3";
var sound = new Audio(gerrardYeCourseSoundUrl);

//change colours of headers to random colour onclick
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].addEventListener('click',function() { 
        headers[i].style.color = colours[Math.floor(Math.random() * colours.length)];
    },false)
}
//random text colours for paragraphs
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    const randomColour = Math.floor(Math.random() * colours.length)
    p[i].style.color = colours[randomColour];
}

//play gerrard sound effect on every click on window
window.addEventListener('click', function(){
    sound.play();
})

