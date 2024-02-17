const watchListDiv = document.getElementById("watchlist")
let moviesArr = []
if(localStorage.getItem("moviesArr")){
    moviesArr = JSON.parse(localStorage.getItem("moviesArr"))
}
if(moviesArr.length > 0){
    let htmlContainer = ``
    for(let movie of moviesArr){
        htmlContainer+=`
        <div class="movie">
            <img src="${movie.poster}">
            <div class="details">
                <h2>${movie.name}</h2>
                <i class="fa-solid fa-circle-minus"
                data-id = "${movie.id}"
                data-remove = "remove"
                ></i>
                <p>${movie.date}</p>
                <p>${movie.description}</p>
            </div>
        </div>
        `
    }
    watchListDiv.innerHTML = htmlContainer
}
document.addEventListener('click',(e)=>{
    if(e.target.dataset.remove == "remove"){
        const movieToBeRemoved = e.target.parentElement.parentElement


        moviesArr = moviesArr.filter(movie => movie.id != e.target.dataset.id)
        

        localStorage.setItem("moviesArr",JSON.stringify(moviesArr))

        watchListDiv.removeChild(movieToBeRemoved)
        if(moviesArr.length == 0){
            watchListDiv.innerHTML = `
    <div class="empty">
        <i class="fa fa-film" aria-hidden="true"></i>
        <p>There is nothing here yet</p>
    </div>
    `
        }
    }
})