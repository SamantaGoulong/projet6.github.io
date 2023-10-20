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
        gallery.appendChild(figureElement)
//création de la balise "img" + source + filiation
    const imageElement = document.createElement("img");
    imageElement.src = projetHtml[index].imageUrl;
    console.log(imageElement);
        figureElement.appendChild(imageElement)
//création de la balise "figcaption" + texte + filiation
    const textElement = document.createElement("figcaption"); 
    textElement.innerText = projetHtml[index].title;
    console.log(textElement);
        figureElement.appendChild(textElement)
  }
}











