let action = document.getElementById("action");
let emailHtml = document.getElementById("email");
let password = document.getElementById("password");
let connexion = document.getElementById("connexion");
let messageErreur = document.getElementById("error");

// Fonction pour gérer la connexion
function createLogin() {
  // Ajout d'un gestionnaire d'événements au formulaire lorsqu'il est soumis
  action.addEventListener("submit", function (event) {
   // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();
    // Récupération des valeurs saisies dans les champs email et mot de passe
    const mail = emailHtml.value;
    const pass = password.value;

// Envoi d'une requête POST au serveur avec les informations de connexion
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "email": mail,
        "password": pass
      })
    })
      .then((response) => {
        // Vérification de la réponse du serveur
    if (!response.ok) { // Si la réponse n'est pas OK (200)
      throw new Error(messageErreur.style.display = "block");// Affichage du message d'erreur
    }
    return response.json(); // Convertit la réponse JSON en objet JavaScript
      })
      .then(data => {
        // Traitement des données de réponse
         if (!data.token) { // Si aucune token n'est reçue dans la réponse
       
         messageErreur.style.display = "block";// Affichage du message d'erreur
        }
        else { // Si un token est reçu dans la réponse
        window.localStorage.setItem("Token", data.token); // Stockage du token dans le stockage local du navigateur
        
         window.location.href = "/FrontEnd/index.html"; // Redirection vers une autre page
        }
      })
      .catch((error) => {
        
      });
  });
}
createLogin();

