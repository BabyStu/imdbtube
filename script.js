const imdbApi = '871cc0dc';
const youtubeApi = 'AIzaSyAHvcBl8WthZkECx9RMvPLuU6tU3c7I0XM';

var searchBarInput = document.querySelector('#searchBar');
var imdbTitleBox = document.querySelector('#titlebox');

function imdbSearch(searchInput) {
    var locQueryUrl = 'http://www.omdbapi.com/?';

    console.log(searchInput)

    locQueryUrl = locQueryUrl + 'apikey=' + imdbApi + '&t=' + searchInput;

    fetch(locQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (imdbData) {

            console.log(imdbData);


            var title = imdbData.Title;
            var metascore = imdbData.Metascore;
            var imdbRating = imdbData.imdbRating;

            console.log(title);
            console.log(metascore);
            console.log(imdbRating);

            youtubeSearch(title);
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
            var iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube.com/embed/" + videoId;
            iframe.width = "640";
            iframe.height = "360";

            var container = document.getElementById("videoContainer");
            container.innerHTML = "";
            container.appendChild(iframe);

        })
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



 