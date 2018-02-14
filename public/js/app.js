const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=0fbfdc5da44844d99135106210fd0395`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  // const article = data.response.docs[0];
  // const title = article.headline.main;
  // const snippet = article.snippet;
  const response = data.response;
  // console.log(response);

  for (let i = 0; i < 5; i++) {
    const article = data.response.docs[i];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'articleClass';
    responseContainer.appendChild(li);
    li.innerText = snippet;
    responseContainer.appendChild(li);
  }
}