let array = fetch('https://jsonplaceholder.typicode.com/posts')
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

// todoList.map(({item_name, price})=>{ 

//     return {title};
  
//   });
