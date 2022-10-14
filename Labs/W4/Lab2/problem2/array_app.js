//part 1
let response = fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => json.filter(PostTitlesFilter))
  .then(filteredList => filteredList.map(({title}) => ({title})))
  // .then(filteredListTitles => console.log(filteredListTitles))

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
  .then(json => json.map(body=> ({
    word: body.body.split(" "),
    fre: body.body.split(" ")
  })))
//   .then(bodyList1 => bodyList1.reduce((words, amount) => {
//     words[amount.body] = words[amount.body] + 1 || 1;
//   }))
  .then(filteredListTitles => console.log( filteredListTitles[0].word.reduce((acc, currentValue) => {
    console.log(acc);
    return [...acc, currentValue];
    // console.log(rec);
    // console.log(acc[rec]);

    // return ({ ...acc, [rec]: (acc[rec] || 0) + 1 })
  },[])))

//get word
//map(word, reduce(word))


// let array[a] = b;
// array[b] = c;
// var myArray = [];
// myArray["foo"] = "bar"; //works
// console.log(myArray["foo"]) //print "bar"
// myArray["z"] = "baz" //crash with a "RangeError: Invalid array length"
// console.log(myArray["z"])