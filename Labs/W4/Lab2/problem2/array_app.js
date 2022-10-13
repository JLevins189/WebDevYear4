//part 1
let response = fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => json.filter(PostTitlesFilter))
  .then(filteredList => filteredList.map(({title}) => ({title})))
//   .then(filteredListTitles => console.log(filteredListTitles))

function PostTitlesFilter(response)  {
    return countWords(response.title) > 6;
}

function countWords(string) { 
    return string.split(" ").length;  //split string into words array and get its length
}

//part 2
let response2 = fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => json.map(({body}) => ({body})))
//   .then(bodyList1 => bodyList1.reduce((words, amount) => {
//     words[amount.body] = words[amount.body] + 1 || 1;
//   }))
//   .then(bodyList => console.log(bodyList))
//   .then(filteredListTitles => console.log(filteredListTitles))

//get word
//map(word, reduce(word))
