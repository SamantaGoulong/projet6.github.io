let action = document.getElementById("action");
let emailHtml = document.getElementById("email");
let password = document.getElementById("password");
let connexion = document.getElementById("connexion");
let messageErreur = document.getElementById("error");

function createLogin() {
  action.addEventListener("submit", function (event) {
    // console.log("toto");
    event.preventDefault();
// console.log("tata");
    const mail = emailHtml.value;
    //  console.log(mail);
    const pass = password.value;
//console.log(pass);

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "email": mail,
        "password": pass
      })
    })
      .then((response) =>  {
    if (!response.ok) {
      throw new Error(messageErreur.style.display = "block");
    }
    return response.json(); // Convertit la réponse JSON en objet JavaScript
      })
      .then(data => {
         if (!data.token) {
        // //  console.log(data.token);
         messageErreur.style.display = "block";
        }
        else {
        window.localStorage.setItem("Token", data.token);
        // // //     console.log(data.token);
         window.location.href = "/FrontEnd/index.html";
        }
      })
      .catch((error) => {
        //console.error(error);
      });
  });
}
createLogin();

