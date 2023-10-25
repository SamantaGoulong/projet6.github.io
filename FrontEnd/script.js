// On fetch sur l'url
fetch("http://localhost:5678/api/works")
  // On transforme les data en Json
  .then((res) => res.json())
  // On peut utiliser les data
  .then((projetHtml) => {
    // regarder ce qu'on reçoit pour bien cibler l'objet
   createHtml(projetHtml)
  })
 
  // Gestion d'erreur IMPORTANT
  .catch((error) => {
    // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
    return error;
    // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
  });


//Création de la fonction "createHtml" avec pour parametre "projetHtml"
function createHtml(projetHtml) {
//selection de la balise ".gallery"
  let gallery = document.querySelector(".gallery")
//creation d'une boucle pour recupérer les données de l'API
  for (let index = 0; index < projetHtml.length; index++) { 
//création de la balise "figure" + filiation
    const figureElement = document.createElement("figure");
    figureElement.classList.add("figureContainer")
    figureElement.setAttribute("data-id", projetHtml[index].categoryId)
        gallery.appendChild(figureElement)
//création de la balise "img" + source + filiation
    const imageElement = document.createElement("img");
    imageElement.src = projetHtml[index].imageUrl;
    //console.log(imageElement);
        figureElement.appendChild(imageElement)
//création de la balise "figcaption" + texte + filiation
    const textElement = document.createElement("figcaption"); 
    textElement.textContent = projetHtml[index].title;
    // console.log(textElement);
        figureElement.appendChild(textElement)
  }
}

fetch("http://localhost:5678/api/categories")
.then((res) => res.json())
  .then((buttonHtml) => {
   createButton(buttonHtml)
  })
  .catch((error) => {
    return error;
  });



    
function createButton(buttonHtml) {
  let buttons = document.querySelector(".buttons");

  for (let i = 0; i < buttonHtml.length; i++) {
    let buttonFilter = document.createElement("button");
    buttonFilter.classList.add("filtre");
    buttonFilter.textContent = buttonHtml[i].name;

    
buttonFilter.addEventListener('click', function () {
         
  let buttonDataId = buttonHtml[i].id;
console.log(buttonDataId);

  let figures = document.getElementsByClassName("figureContainer");
  const figureTab = Array.from(figures);

  for (let ind = 0; ind < figureTab.length; ind++) {
   
    if (buttonDataId == figureTab[ind].dataset.id) {
      figureTab[ind].style.display = "block";

    } else {
      figureTab[ind].style.display = "none";
    }
    
  }
});
 buttons.appendChild(buttonFilter);
}
  }

 





