'use stirct';
const fetch = global.window ? require('fetch-jsonp') : require('isomorphic-fetch');

function loadCharacters() {
  return fetch('https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Characters_created_by_Stan_Lee&cmlimit=100&format=json')
    .then(res => res.json())
    .then(res => res.query.categorymembers);
}

function getPage(pageId) {
  return fetch('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=' + pageId)
    .then(res => res.json())
    .then(res => res.query.pages[pageId]);
}

module.exports = {
  loadCharacters,
  getPage
};
