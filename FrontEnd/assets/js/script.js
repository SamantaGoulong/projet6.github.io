function getData(url) {
    return (
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                return data
            })
            // Gestion d'erreur IMPORTANT
            .catch((error) => {
                return error
            })
    )
}

//Création de la fonction "createHtml" avec pour parametre "projetHtml"
function createHtml(projetHtml) {
    //selection de la balise ".gallery"
    let gallery = document.querySelector('.gallery')
    //creation d'une boucle pour recupérer les données de l'API
    for (let index = 0; index < projetHtml.length; index++) {
        //création de la balise "figure" + filiation
        const figureElement = document.createElement('figure')
        figureElement.classList.add('figureContainer')
        figureElement.setAttribute('data-id', projetHtml[index].categoryId)
        figureElement.setAttribute('photo-id', projetHtml[index].id)
        gallery.appendChild(figureElement)
        //création de la balise "img" + source + filiation
        const imageElement = document.createElement('img')
        imageElement.src = projetHtml[index].imageUrl
        //console.log(imageElement);
        figureElement.appendChild(imageElement)
        //création de la balise "figcaption" + texte + filiation
        const textElement = document.createElement('figcaption')
        textElement.textContent = projetHtml[index].title
        // console.log(textElement);
        figureElement.appendChild(textElement)
    }
}

function createButton(buttonHtml) {
    // Sélection de l'élément HTML avec la classe ".buttons"
    let buttons = document.querySelector('.buttons')
    //boucle for pour parcourir less données des boutons
    for (let i = 0; i < buttonHtml.length; i++) {
        // Création d'un élément bouton pour chaque donnée de bouton
        let buttonFilter = document.createElement('button')
        // Ajout de la classe "filtre" au bouton
        buttonFilter.classList.add('filtre')
        buttonFilter.textContent = buttonHtml[i].name

        // Ajout d'un gestionnaire d'événements au clic sur le bouton
        buttonFilter.addEventListener('click', function () {
            // Récupération de l'identifiant de données du bouton
            let buttonDataId = buttonHtml[i].id
            // Récupération de tous les éléments avec la classe "figureContainer"
            let figures = document.getElementsByClassName('figureContainer')
            // Conversion en tableau
            const figureTab = Array.from(figures)

            // boucle pour parcourir chaque élément "figureContainer"
            for (let ind = 0; ind < figureTab.length; ind++) {
                // Vérification si l'id de données du bouton correspond à celui de l'élément
                if (buttonDataId == figureTab[ind].dataset.id) {
                    // Affichage de l'élément s'il correspond au filtre
                    figureTab[ind].style.display = 'block'
                } else {
                    // Masquage de l'élément s'il ne correspond pas au filtre
                    figureTab[ind].style.display = 'none'
                }
            }
        })
        // debut suppression des boutons filtres en cas de token
        if (token) {
            // Masquage du bouton si un token est présent
            buttonFilter.style.display = 'none'
        }
        // fin suppression des boutons filtres en cas de token
        // Ajout du bouton à l'élément avec la classe ".buttons"
        buttons.appendChild(buttonFilter)
    }
}

//creation contenu et affichage modale
async function createGalleryModal(projetGalleryModal) {
    let galleryModal = document.querySelector('.gallery-modal')

    for (let index = 0; index < projetGalleryModal.length; index++) {
        const galleryElement = document.createElement('figure')
        galleryElement.classList.add('photoModal')
        galleryElement.setAttribute('data-id', projetGalleryModal[index].id)
        galleryModal.appendChild(galleryElement)

        const imageModal = document.createElement('img')
        imageModal.src = projetGalleryModal[index].imageUrl
        imageModal.setAttribute('image-id', projetGalleryModal[index].id)
        galleryElement.appendChild(imageModal)

        const btnTrash = document.createElement('button')
        btnTrash.classList.add('trash')
        galleryElement.appendChild(btnTrash)

        const iconeTrash = document.createElement('i')
        iconeTrash.classList.add('fa-solid')
        iconeTrash.classList.add('fa-trash-can')
        btnTrash.appendChild(iconeTrash)

        btnTrash.addEventListener('click', function (e) {
            e.preventDefault()
            const figureToDelete = document.querySelector(
                `.figureContainer[data-id="${projetGalleryModal[index].categoryId}"]`
            )

            deleteData(`http://localhost:5678/api/works/${projetGalleryModal[index].id}`).then(
                (result) => {
                    if (result) {
                        figureToDelete.remove()
                        galleryElement.remove()
                    }
                }
            )
        })
    }

    const modal = document.querySelector('.modal')
    const boutonAjouter = document.createElement('button')
    boutonAjouter.classList.add('filtre')
    boutonAjouter.setAttribute('id', 'btn-ajouter')
    boutonAjouter.innerHTML = 'Ajouter une photo'
    modal.appendChild(boutonAjouter)

    // debut activation bouton ajouter
    const modal1 = document.querySelector('.modal1')
    const modal2 = document.querySelector('.modal2')

    boutonAjouter.addEventListener('click', function () {
        modal1.style.display = 'none'
        boutonAjouter.style.display = 'none'
        modal2.style.display = 'block'
        valider.style.display = 'block'
    })
    // fin activation bouton ajouter

    // debut activation bouton retour
    const arrow = document.querySelector('.arrow')
    const valider = document.getElementById('valider')
    arrow.addEventListener('click', function () {
        modal2.style.display = 'none'
        valider.style.display = 'none'
        modal1.style.display = 'block'
        boutonAjouter.style.display = 'block'
    })
    // fin activation bouton retour
}

function createOptionModal(projetOptionModal) {
    const optgroup = document.getElementById('optgroup')

    for (let c = 0; c < projetOptionModal.length; c++) {
        const option = document.createElement('option')

        option.setAttribute('value', projetOptionModal[c].id)
        option.innerHTML = projetOptionModal[c].name
        optgroup.appendChild(option)
    }
}

async function homePage() {
    works = await getData('http://localhost:5678/api/works')
    category = await getData('http://localhost:5678/api/categories')
    createButton(category)
    createHtml(works)
    createGalleryModal(works)
    createOptionModal(category)
}
homePage()

function deleteData(url) {
    return (
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then((res) => res)
            .then((data) => {
                console.log(data)
                if (data.status != 204) {
                    return false
                }
                return true
            })
            // Gestion d'erreur IMPORTANT
            .catch((error) => {
                console.log(error)

                return error
            })
    )
}

//filtre TOUS
let tous = document.getElementById('tous')

tous.addEventListener('click', function () {
    let figures = document.querySelectorAll('figure')

    for (let a = 0; a < figures.length; a++) {
        figures[a].style.display = 'block'
    }
})

// debut deco/reco login logout
let token = localStorage.getItem('Token')
let login = document.getElementById('log')

if (token) {
    login.innerHTML = 'logout'
}

login.addEventListener('click', function () {
    localStorage.removeItem('Token')
})
// fin deco/reco login logout

//debut affichage bouton modifier
let boutonModifier = document.querySelector('.modal-btn')
if (!token) {
    boutonModifier.style.display = 'none'
}
// fin affichage bouton modifier

// debut suppression bouton TOUS si token
let btnTous = document.querySelector('.filtre')

if (token) {
    btnTous.style.display = 'none'
}
// fin suppression bouton TOUS token

// pour le modale ouverture et fermeture
const modalContainer = document.querySelector('.modal-container')
// console.log(modalContainer);
const modalTriggers = document.querySelectorAll('.modal-trigger')
// console.log(modalTriggers);
modalTriggers.forEach((trigger) => trigger.addEventListener('click', toggleModal))

function toggleModal() {
    modalContainer.classList.toggle('active')
}

// DEBUT telechargement img dans modale

const telecharger = document.getElementById('telecharger')
const telechargementVide = document.querySelector('.telechargementVide')
const photo = document.querySelector('.photo')

telecharger.addEventListener('change', function (e) {
    const selectedFiles = e.target.files

    if (selectedFiles.length > 0) {
        const file = selectedFiles[0]

        // Display the selected image
        const image = document.createElement('img')
        image.src = URL.createObjectURL(file)
        photo.appendChild(image)
        telechargementVide.style.display = 'none'
        photo.style.display = 'flex'
    }
})
//FIN telechargement img dans modale

//DEBUT activation bouton valider
const btnValider = document.querySelector('#valider')
btnValider.addEventListener('click', function (e) {
    e.preventDefault()

    const titre = document.querySelector('#titre')
    const telecharger = document.querySelector('#telecharger')
    const categorie = document.querySelector('#categorie')
    const test = document.querySelector('.champs')

    if (titre.value == '' || telecharger.files.length === 0 || categorie.value == '') {
        test.style.display = 'flex'

        return false
    }

    if (titre.value && telecharger.files[0] && categorie.value) {
        btnValider.style.backgroundColor = '#1D6154'
        uploadImage()
    }
})
//FIN activation bouton valider

// DEBUT envoie de la photo à la base de données
function uploadImage() {
    const formData = new FormData()
    formData.append('title', document.querySelector('#titre').value)

    const fileInput = document.querySelector('#telecharger')
    if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0])
        console.log('image', fileInput.files[0])
    }

    const selectedCategory = document.querySelector('#categorie')
    formData.append('category', selectedCategory.value)
    console.log('category', selectedCategory.value)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            // Remove the Content-Type header to let the browser set it automatically
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            Accept: 'application/json'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the server if needed
            console.log(data)
        })
        .catch((error) => {
            console.error(error)
        })
}
//FIN envoie de la photo à la base de données
