
var searchInputEl = document.querySelector('#searchbar');

var imdbTitleBox = document.querySelector('#titlebox');

function imdbSearch(callback) {
    var locQueryUrl = 'http://www.omdbapi.com/?apikey='

    locQueryUrl = locQueryUrl + apiKey + '&t=' + searchInputEl;

    fetch(locQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (imdbData) {

            console.log(imdbData);
            if (imdbData.length > 0) {
                var movie = imdbData[0];
                var title = movie.Title;
                var metascore = movie.Metascore;
                var imdbRating = movie.imdbRating;

                imdbTitleBox.textContent = title;

                console.log(title);
                console.log(metascore);
                console.log(imdbRating);
            } else {
                console.log('No results found');
            }
        })
}

function wikiSearch() {
    var locQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=&srlimit=1&srsearch='

    locQueryUrl = locQueryUrl + imdbTitleBox.textContent;



}





// apiKey = 871cc0dc
