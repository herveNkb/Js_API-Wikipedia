const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  if (input.value === "") {
    errorMsg.textContent = "Attention, veuillez indiquer une recherche !";
  } else {
    errorMsg.textContent = "";
    // Le loader apparaît lorsqu'une recherche est lancée
    loader.style.display = "flex";
    // Remet à zéro le contenu de la card lors d'une nouvelle recherche
    resultsDisplay.textContent = "";
    // Si pas de message d'erreur, on fait la requête API
    wikiApiCall(input.value);
  }
}

// async = asynchrone -> permet d'attendre le résultat de l'API lors de la requête
// avant de créer les cards.
async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );

    // Intercepte et affiche le message d'erreur, en cas d'erreur réseau,
    // au cas où le "status" est différent de 200
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    createCards(data.query.search);
  } catch (error) {
    // Si plus de connexion internet, le message d'erreur s'affiche et le loader est enlevé
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createCards(data) {
  if (!data.length) {
    errorMsg.textContent = "Aïe, aucun résultat ! ! !";
    loader.style.display = "none";
    return;
  }
  data.forEach((el) => {
    // Chaque "el" est un objet
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
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
    `;
    // Rajoute un enfant à "card"
    resultsDisplay.appendChild(card);
  });
    // Enlève le loader de la page, une fois la recherche effectuée
    loader.style.display ="none";
}
