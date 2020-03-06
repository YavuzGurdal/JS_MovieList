
// api key : 4124cef1

function showDetail(imdbID) {

    const url = `http://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=4124cef1`;
    // bu fonksiyonu imdb den ayrintilari almak icin kullandik

    fetch(url)
        .then( response => response.json()) // arrow function oldugu icin tırnakli parantez i kaldirdik.
        // burda süslü parantez kullanirsak return yazmaliyiz
        // bu data gelip gelmedigini kontrol icin ve datayi json a donusturmek icin kullaniyoruz.

        .then( data => { // data ile alakali islemler burda yapilir

            // console.log(data);

            $("#exampleModalCenterTitle").html(data.Title);
            
            //$("#filmPoster").attr('src',data.Poster); // attribute kullandik. bu asagidaki ile ayni
            $("#filmPoster").attr('src',(data.Poster == "N/A") ? 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80' : data.Poster); // attribute kullandik

            $('#genre').html(data.Genre);
            $('#releaseTime').html(data.Released);
            $('#country').html(data.Country);
            $('#lenguage').html(data.Language);
            $('#imdbRating').html(data.imdbRating);
            $('#runTime').html(data.Runtime);
            $('#director').html(data.Director);
            $('#actors').html(data.Actors);
            $('#plot').html(data.Plot);   

    })
    .catch( error => console.log(error)) // hata ile alakali islemler burda yapilir

}


function searchMovie() {

    //alert("Hi");

    let keyword;

    keyword = document.getElementById('keyword').value;

    const url = `http://www.omdbapi.com/?s=${keyword}&type=movie&apikey=4124cef1`;
    //alert(url);

    fetch(url)
        .then( response => response.json()) // arrow function oldugu icin tırnakli parantez i kaldirdik.
        // burda süslü parantez kullanirsak return yazmaliyiz

        .then( data => {

            $("#movieList").html(''); // bunu sayfayi temizlemek icin yaziyoruz

            console.log(data);

            data.Search.map((value, i) => { // bu kod buradaki fonksiyonu array'in uzunlugu kadar calistiriyor. bunu otomatik yapiyor. 
                                       // map() 'in ozelligi. value burda array'in uzunlugunu gosteriyor
                                       // i burda index numarasini gosteriyor

                // jquery ile append yaptik. jquery append kodu

               //$("#keyword").html();
               //document.getElementById("keyword").innerHTML="";
               document.getElementById("divContainer").style.display = "block";
               document.getElementById("favoriteContainer").style.display = "none";

                // <div class="col-12 col-md-6 col-lg-3">  col-lg-3 bu sayfa large boyutlarında oldugunda her div'in 3 bolme kaplamsını saglıyor. yani bir satıra 4 div sıgıyor

                $("#movieList").append(
                    `<div class="rowBox col-12 col-md-6 col-lg-3 px-1 pt-0 pb-4 mb-1">
                        <div id="divBox" class="card mt-3 border-primary" style="height: 580px; border-width: 3px;">
                            <img id="searchMoviePoster" style="height: 350px;" src="${(value.Poster == "N/A") ? 'https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80' : value.Poster}" class="card-img-top" alt="Poster>
                            <div class="card-body">
                                <h6 id="cardh" class="card-title my-1"><b>${value.Title}</b></h6>
                                <p class="card-text my-1"><b>Year : </b>${value.Year}</p>
                                <p class="card-text my-1"><b>imdbID : </b>${value.imdbID}</p>

                                <button type="button" onclick='showDetail("${value.imdbID}")' class="btn btn-primary my-1" data-toggle="modal" data-target="#exampleModalCenter">Details</button>

                                <button type="button" onclick='favorite("${value.imdbID}")' class="btn btn-primary my-1"><i class="far fa-heart"></i></button>
                            </div>
                        </div>
                    </div>`
                );

                // <i onclick='favorite(this)' class="far fa-heart"></i>

                // *****   onclick='showDetail("${value.imdbID}")'  ---> bu kisim onemli   *****
                // js backtik icinde parantezli fonksiyon cagırıyorsak yukaridaki gibi olmasi lazim

                // yukaridaki if kondişinın adi Ternary Operator

            });            

        })
        .catch( error => console.log(error))

}


function favorite(imdbID) {

    const url = `http://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=4124cef1`;

    fetch(url)
        .then( response => response.json()) // arrow function oldugu icin tırnakli parantez i kaldirdik.
        // burda süslü parantez kullanirsak return yazmaliyiz
        // bu data gelip gelmedigini kontrol icin ve datayi json a donusturmek icin kullaniyoruz.

        .then( data => { // data ile alakali islemler burda yapilir
            // console.log(data);

            alert("Movie added to your favorite list");

            // document.getElementById("favoriteContainer").style.display = "block";

            $("#favoriteMovieList").append(
                `<div id = "${data.imdbID}" class="rowBox col-12 col-md-6 col-lg-3 px-1 pt-0 pb-4 mb-1">
                    <div id="divBox"  class="card mt-3 border-primary" style="height: 580px; border-width: 3px;">
                        <img id="imgFavoritePoster" style="height: 350px;" src="${(data.Poster == "N/A") ? 'https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80' : data.Poster}" class="card-img-top" alt="Poster>
                        <div class="card-body">
                            <h6 id="cardFavoriteTitle" class="card-title my-1"><b>${data.Title}</b></h6>
                            <p id="cardFavoriteYear" class="card-text my-1"><b>Year : </b>${data.Year}</p>
                            <p id="cardFavoriteimdbID" class="card-text my-1"><b>imdbID : </b>${data.imdbID}</p>   
                            <button type="button" onclick='showDetail("${data.imdbID}")' class="btn btn-primary my-1" data-toggle="modal" data-target="#exampleModalCenter">Details</button>  
                             
                            <button type="button" onclick='removeFavoriteList("${data.imdbID}")' class="btn btn-primary my-1"><i class="fas fa-trash align-self-end"></i></button>                      
                        </div>
                    </div>
                </div>`
            );
            
    })
    .catch( error => console.log(error)) // hata ile alakali islemler burda yapilir

}

// showMovieList function
function showMovieList() {
    document.getElementById("favoriteContainer").style.display = "block";
    document.getElementById("divContainer").style.display = "none";
}

// remove function
function removeFavoriteList(e) {

    $(`#${e}`).remove();  
}


// arama yaparken enter tusunun calismasi icin
//$('#keyword').keyup(function) is the shorthand of $('#keyword').on("keyup", function)
$('#keyword').on("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      searchMovie();
    }
});
