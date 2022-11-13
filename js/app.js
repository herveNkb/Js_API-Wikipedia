const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    if (input.value === "") {
        errorMsg.textContent = "Attention, veuillez indiquer une recherche !";
    } else {
        errorMsg.textContent = "";
        // Si pas de message d'erreur, on fait la requête API
        wikiApiCall(input.value);
    }
}

// async = asynchrone -> permet d'attendre le résultat de l'API lors de la requête
// avant de créer les cards.
async function wikiApiCall(searchInput) {
    const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    const data = await response.json();
    console.log(data);

    createCards(data.query.search);
}



function createCards(data) {
    if (!data.length) {
        errorMsg.textContent = "Aïe, aucun résultat ! ! !";
        return;
    }
    data.forEach(el => { // Chaque "el" est un objet
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        // Création de la card :
        const card = document.createElement("div");
        // Attribution de la classe CSS :
        card.className = "result-item";
        // Ajout du contenu interne dans la div, créée auparavant :
        card.innerHTML = ` 
      <h3 class="result-title">
        <a href=${url} target="_blank">${el.title}</a>
      </h3>
      <a href=${url} class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span>
      <br>
    `
        // Rajoute un enfant à "card"
        resultsDisplay.appendChild(card)
    })
}





















