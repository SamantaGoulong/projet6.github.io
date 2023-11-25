function getData(url) {
  // return permet de retourner le résultat vers la ligne 7
  return (
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
        
      })
      // Gestion d'erreur IMPORTANT
      .catch((error) => {
        // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
        return error;
        // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
      })
  );
}

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
        figureElement.setAttribute("photo-id", projetHtml[index].id)
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


function createButton(buttonHtml) {
  let buttons = document.querySelector(".buttons");

  for (let i = 0; i < buttonHtml.length; i++) {
    let buttonFilter = document.createElement("button");
    buttonFilter.classList.add("filtre");
    buttonFilter.textContent = buttonHtml[i].name;

    
buttonFilter.addEventListener('click', function () {
         
  let buttonDataId = buttonHtml[i].id;
//console.log(buttonDataId);

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
  // debut suppression des boutons filtres en cas de token
     if (token) {
 buttonFilter.style.display = "none";   
    }
// fin suppression des boutons filtres en cas de token
    
    buttons.appendChild(buttonFilter);
}
}  


//creation contenu et affichage modale
 async function createGalleryModal(projetGalleryModal) {
  
  let galleryModal = document.querySelector(".gallery-modal")

  for (let index = 0; index < projetGalleryModal.length; index++) {
    
    const galleryElement = document.createElement("figure")
    galleryElement.classList.add("photoModal")
    galleryElement.setAttribute("data-id", projetGalleryModal[index].id);

      galleryModal.appendChild(galleryElement)

    const imageModal = document.createElement("img")
      imageModal.src = projetGalleryModal[index].imageUrl;
      imageModal.setAttribute("image-id", projetGalleryModal[index].id)
      galleryElement.appendChild(imageModal)

    const btnTrash = document.createElement("button")
      btnTrash.classList.add("trash")
      galleryElement.appendChild(btnTrash)

    const iconeTrash = document.createElement("i")
      iconeTrash.classList.add("fa-solid")
      iconeTrash.classList.add("fa-trash-can")
    btnTrash.appendChild(iconeTrash)
    
    btnTrash.addEventListener("click", function (e) {
      e.preventDefault();
      const figureToDelete = document.querySelector(`.figureContainer[data-id="${projetGalleryModal[index].categoryId}"]`);

      deleteData(`http://localhost:5678/api/works/${projetGalleryModal[index].id}`).then((result) => {
        console.log(result);
        if (result) {
          figureToDelete.remove();
          galleryElement.remove();
        }
      });
       
    
    })
  
  }

    const modal = document.querySelector(".modal")
    const boutonAjouter = document.createElement("button")
      boutonAjouter.classList.add("filtre")
      boutonAjouter.setAttribute("id", "btn-ajouter")
      boutonAjouter.innerHTML = "Ajouter une photo"
      modal.appendChild(boutonAjouter)
  
   // debut activation bouton ajouter
   const modal1 = document.querySelector(".modal1")
   const modal2 = document.querySelector(".modal2")
   
   boutonAjouter.addEventListener("click", function () {
     modal1.style.display = "none";
     boutonAjouter.style.display = "none";
     modal2.style.display = "block";
     valider.style.display = "block";
})
   // fin activation bouton ajouter


   // debut activation bouton retour
   const arrow = document.querySelector(".arrow");
   const valider = document.getElementById("valider")
     arrow.addEventListener("click", function () {
       modal2.style.display = "none";
       valider.style.display = "none";
       modal1.style.display = "block";
       boutonAjouter.style.display = "block";
})
   // fin activation bouton retour
   
}
// fin creation et affichage modale

function createOptionModal(projetOptionModal) {
  
const optgroup = document.getElementById("optgroup")
 
  for (let c = 0; c < projetOptionModal.length; c++) {
    const option = document.createElement("option");
    //  console.log(option);
    option.setAttribute("value", projetOptionModal[c].name);
    option.innerHTML = projetOptionModal[c].name;
    optgroup.appendChild(option);
    
  }
}



  
async function homePage() {
  works = await getData("http://localhost:5678/api/works");
  category = await getData("http://localhost:5678/api/categories");
  createButton(category);
  createHtml(works);
  createGalleryModal(works);
  createOptionModal(category);
 
}  
homePage();



function deleteData(url) {
  
  return (
    fetch(url,
      {
        method: 'DELETE',
        headers: { 
          'Content-type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("Token")}`,
            
        },
      }) 
      .then((res) => res)
      .then((data) => {
        console.log(data);
        if (data.status != 204) {
          return false
          
        }
        return true
        // return data;
       
      })
      // Gestion d'erreur IMPORTANT
      .catch((error) => {
        console.log(error);
        // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
        return error;
        // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
      })
  );
}






//filtre TOUS
  let tous = document.getElementById("tous");
//console.log(tous);

tous.addEventListener('click', function () {
 
  let figures = document.querySelectorAll("figure");
  //console.log(figures);

  for (let a = 0; a < figures.length; a++) {
     figures[a].style.display = "block";
  }
})


// debut deco/reco login logout
let token = localStorage.getItem("Token");
//console.log(token);

let login = document.getElementById("log")
//console.log(login)

if (token) {
  login.innerHTML = "logout"
}

login.addEventListener('click', function () { 
 localStorage.removeItem("Token");
   //console.log('Token supprimé avec succès.');
});
// fin deco/reco login logout

//debut affichage bouton modifier
let boutonModifier = document.querySelector(".modal-btn")
if (!token) {
  boutonModifier.style.display = "none";
}
// fin affichage bouton modifier



// debut suppression bouton TOUS si token
let btnTous = document.querySelector(".filtre")
  //console.log(btnTous);
  if (token) {
    btnTous.style.display = "none";
  }
// fin suppression bouton TOUS token



// pour le modale
const modalContainer = document.querySelector(".modal-container");
// console.log(modalContainer);
const modalTriggers = document.querySelectorAll(".modal-trigger");
// console.log(modalTriggers);
modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
  modalContainer.classList.toggle("active")
};

// DEBUT telechargement img dans modale
const telecharger = document.getElementById("telecharger")
const telechargementVide = document.querySelector(".telechargementVide");
const photo = document.querySelector(".photo");


telecharger.addEventListener('change', function (e) {
  const selectedFiles = e.target.files;
  if (selectedFiles.length > 0) {

    const image = document.createElement("img");
    image.src = URL.createObjectURL(selectedFiles[0]);
    photo.appendChild(image);
    telechargementVide.style.display = "none";
    photo.style.display = "flex";
  }
});

//FIN telechargement img dans modale