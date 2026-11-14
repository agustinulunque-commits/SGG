// Usuarios de prueba
const users = [
    { username: "admin", password: "1234" },
    { username: "usuario", password: "abcd" }
];

const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const themeSwitch = document.getElementById("themeSwitch");

// Validación de login
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const userFound = users.find(user =>
        user.username === username &&
        user.password === password
    );

    if (userFound) {
        localStorage.setItem("usuarioActivo", username);
        message.textContent = "A iniciado sesion con exito";
        message.className = "ok";
    } else {
        message.textContent = "Usuario o contraseña incorrectos";
        message.className = "error";
    }
});

// Cambio de tema
function aplicarTema(oscuro) {
    document.body.classList.toggle("dark", oscuro);
    themeSwitch.setAttribute("aria-pressed", String(oscuro));
}

themeSwitch.addEventListener("click", function () {
    const oscuro = !document.body.classList.contains("dark");
    aplicarTema(oscuro);
    localStorage.setItem("tema", oscuro);
});

// Mantener tema seleccionado
aplicarTema(localStorage.getItem("tema") === "true");
