const searchBarEl = document.getElementById("search-bar")
const submitBtnEl = document.getElementById("submit-search")
const searchResult = document.getElementById("movieSearch")
let moviesArr = []

submitBtnEl.addEventListener('click',async()=>{
    const response = await fetch(`https://www.omdbapi.com/?s=${searchBarEl.value}&apikey=8b94b2b`)
    const data = await response.json()
    let fetching = ''
    let movieData = ''
    let movieHtml = ``
    if(data.Response == "True"){
        for(let movies of data.Search){
            fetching = await fetch(`https://www.omdbapi.com/?i=${movies.imdbID}&apikey=8b94b2b`)
            movieData = await fetching.json()
            movieHtml+= `
            <div class="movie">
                <img src="${movieData.Poster}">
                <div class="details">
                    <h2>${movieData.Title}</h2>
                    <i class="fa-solid fa-circle-plus" 
                    data-id = "${movieData.imdbID}"
                    data-add="add"></i>
                    <p>${movieData.Released}</p>
                    <p>${movieData.Plot}</p>
                </div>
            </div>
                
            `
            searchResult.innerHTML = movieHtml
        }
        
    } else if (data.Response == "False") {
        searchResult.innerHTML = `
            <p class="movie-fetch-failed">Movie not found</p>
        `
    }
    
})
document.addEventListener('click',(e)=>{
    if(e.target.dataset.add == "add"){
        let mainElement = e.target.parentElement.parentElement.children
        let detailsEl = mainElement[1].children
        let movieObj = {
            poster:mainElement[0].src,
            name:detailsEl[0].textContent,
            date:detailsEl[2].textContent,
            description:detailsEl[3].textContent,
            id:e.target.dataset.id
        }
        const movieExists = moviesArr.find(movie => movie.id == movieObj.id)
        if(!movieExists){
            moviesArr.push(movieObj)
            localStorage.setItem("moviesArr",JSON.stringify(moviesArr))
        }
    }
})
if(localStorage.getItem("moviesArr")){
    let placeHoldarr = JSON.parse(localStorage.getItem("moviesArr"))
    const movieExists = moviesArr.find(movie => movie.id == movieObj.id)
    moviesArr = JSON.parse(localStorage.getItem("moviesArr"))
}
