const form = document.querySelector("#searchForm");
const searchTerm = document.querySelector("#searchText");
const mainDiv = document.querySelector("#image-div");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const config = { params: { q: searchTerm.value } }
    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        makeImages(res.data);
        searchTerm.value = "";
    } catch (error) {
        console.log("Error:", error);
        showError("Connection Failed.");
    }

})

function showError(message) {
    const errorMessage = document.createElement("h2");
    errorMessage.classList.add("error-message");
    errorMessage.append(message);
    mainDiv.append(errorMessage);
}

const makeImages = (shows) => {
    removeImages();
    if (shows[0]) {
        for (result of shows) {
            if (result.show.image) {
                // create <img>
                const img = document.createElement("img");
                img.src = result.show.image.medium;
                img.classList.add("movieImage");
                // create <p> title
                const movieTitle = document.createElement("p");
                movieTitle.classList.add("movie-title");
                movieTitle.append(result.show.name);
                //create result div <div>
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("result-div");
                // append elements
                resultDiv.append(img);
                resultDiv.append(movieTitle);
                mainDiv.append(resultDiv);
            }
        }
    } else {
        showError("No Results Found.");
    }
}

function removeImages() {
    const allResultDivs = document.querySelectorAll(".result-div");
    const errorMsg = document.querySelector(".error-message");
    if (errorMsg) {
        errorMsg.remove();
    }
    if (allResultDivs[0]) {
        for (result of allResultDivs) {
            result.remove();
        }
    }
}