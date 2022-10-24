//part 1
let response = fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => json.filter(PostTitlesFilter))
  .then(filteredList => filteredList.map(({title}) => ({title})))
  .then(filteredListTitles => console.log(filteredListTitles))

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
  /*per array element
  .then(json => json.map(body=> ({
    map: body.body.split(" ").reduce((acc, currentValue) => {  
      return ({ ...acc, [currentValue]: (acc[currentValue] || 0) + 1 })
    },[])
  })))*/

  /* For the whole array */
  .then(json => json.reduce((acc, currentValue) => {
    // console.log(acc)
      return acc.concat(currentValue.body.split(" "))
    },[]))


  .then(json => json.reduce((acc, currentValue) => {
      return ({ ...acc, [currentValue]: (acc[currentValue] || 0) + 1 })
    },[])
  )
  .then(a => console.log(a))