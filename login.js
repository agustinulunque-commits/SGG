// Usuarios de prueba
const users = [
    {
        username: "admin",
        password: "1234"
    },
    {
        username: "usuario",
        password: "abcd"
    }
];


const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const themeSwitch = document.getElementById("themeSwitch");


// Validación de login
form.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    const userFound = users.find(user =>
        user.username === username &&
        user.password === password
    );


    if(userFound){

        localStorage.setItem(
            "usuarioActivo",
            username
        );

        message.textContent = 
            "Inicio de sesión correcto";

    } else {

        message.textContent =
            "Usuario o contraseña incorrectos";
    }

});


// Cambio de tema
themeSwitch.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "tema",
        document.body.classList.contains("dark")
    );

});


// Mantener tema seleccionado
if(localStorage.getItem("tema") === "true"){
    document.body.classList.add("dark");
}