const imdbApi = '871cc0dc';
const youtubeApi = 'AIzaSyAHvcBl8WthZkECx9RMvPLuU6tU3c7I0XM';

var searchBarInput = document.querySelector('#searchBar');
var imdbTitleBox = document.querySelector('#titlebox');
var imdbInfoBox = document.querySelector('#imdbInfo');

function imdbSearch(searchInput) {
    var locQueryUrl = 'http://www.omdbapi.com/?';

    console.log(searchInput)

    locQueryUrl = locQueryUrl + 'apikey=' + imdbApi + '&t=' + searchInput;

    fetch(locQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (imdbData) {
            

            console.log(imdbData)

            var title = imdbData.Title;
            var array = [title, imdbData.Plot, imdbData.Director, imdbData.Actors, imdbData.Year, imdbData.BoxOffice, imdbData.Ratings[1]];

            youtubeSearch(title);
            printImdb(array);
        })
}

function youtubeSearch (movieTitle) {
    var trailer = movieTitle + ' trailer';
    var youtubeUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
    youtubeUrl = youtubeUrl + trailer + '&maxResults=1&key=' + youtubeApi;

    fetch(youtubeUrl)
        .then(function (response) {
            console.log(response)
            return response.json();

        })
        .then(function (video) {
            console.log(video)

            var videoId = video.items[0].id.videoId;
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + videoId;
            iframe.width = '640';
            iframe.height = '360';

            var trailerVideo = document.getElementById('video');
            trailerVideo.innerHTML = '';
            trailerVideo.appendChild(iframe);

        })
}

function printImdb(data) {
    var divBox = document.createElement('div');
    var titleEl = document.createElement('h1');
    var plotEl = document.createElement('p');
    var directorActorEl = document.createElement('p');
    var releaseEl = document.createElement('p');
    var ratingsEl = document.createElement('p');

    console.log(data)

    titleEl.innerHTML = data[0];
    plotEl.innerHTML = data[1];
    directorActorEl.innerHTML = 'Directed by ' + data[2] + ', the cast consists of ' + data[3];
    releaseEl.innerHTML = 'This was released in ' + data[4] + ' and made ' + data[5] + ' in box office release.';
    ratingsEl.innerHTML = data[6].Source + ' rated this ' + data[6].Value;

    divBox.append(titleEl, plotEl, directorActorEl, releaseEl, ratingsEl);

    imdbInfoBox.innerHTML = '';
    imdbInfoBox.append(divBox);
}


function searchSubmit(event) {
    event.preventDefault();


    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('Input movie title!');
        return;
    }
    console.log(searchInputVal)
    imdbSearch(searchInputVal);
}

searchBarInput.addEventListener('submit', searchSubmit);



// <<<<<<< javascript
 
// =======
// // apiKey = 871cc0dc
// >>>>>>> main
