
let action = document.getElementById("action");
let emailHtml = document.getElementById("email");
let password = document.getElementById("password");
let connexion = document.getElementById("connexion");

function createLogin() {
  action.addEventListener("submit", function(event) {
    event.preventDefault();

    let mail = emailHtml.value;
    // console.log(mail);
    let pass = password.value;

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "email": mail,
        "password": pass
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message != null ) {
          alert("Identifiant incorrect");
          return
        } else {
          alert("Vous êtes connecté");
          localStorage.setItem("Token", data.token);
          console.log(localStorage);
          window.location.href ="/FrontEnd/index.html"
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

createLogin();