//Declaramos variables
const inputAmigo = document.getElementById("amigo");
const listaAmigos = [];
let amigosSinSortear = [];
const ulListaAmigos = document.getElementById("listaAmigos");
const ulResultado = document.getElementById("resultado");

// Función para agregar un amigo
function agregarAmigo() {
    let nombre = inputAmigo.value.trim();
    
    if (nombre === "") {
        alert("Debes ingresar un nombre.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya ha sido ingresado. Intenta con otro.");
        return;
    }

    listaAmigos.push(nombre);
    actualizarListaAmigos();
    inputAmigo.value = "";
    inputAmigo.focus();
}



// Función para actualizar la lista de amigos en pantalla
function actualizarListaAmigos() {
    ulListaAmigos.innerHTML = "";
    // Reiniciamos la lista de amigos sin sortear
    amigosSinSortear = [...listaAmigos]; 

    listaAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.setAttribute("data-nombre", amigo);
        ulListaAmigos.appendChild(li);
    });
}

// Función para sortear el amigo secreto
function sortearAmigo() {
    if (listaAmigos.length < 3) {
        alert("Necesitas al menos 3 amigos para sortear.");
        return;
    }

    if (amigosSinSortear.length === 0) {
        ulResultado.innerHTML = `<li><strong>¡Ya se sortearon todos los amigos!</strong></li>`;
        return;
    }
    // Borrar resultados anteriores
    ulResultado.innerHTML = ""; 

    // Elegir un amigo aleatorio de la lista de no sorteados
    const randomIndex = Math.floor(Math.random() * amigosSinSortear.length);
    // Lo eliminamos de la lista de pendientes
    const amigoSecreto = amigosSinSortear.splice(randomIndex, 1)[0]; 

    // Ocultar el nombre sorteado en la lista
    const elementosLista = document.querySelectorAll("#listaAmigos li");
    elementosLista.forEach(li => {
        if (li.getAttribute("data-nombre") === amigoSecreto) {
            // Ocultar el nombre en la lista
            li.style.visibility = "hidden"; 
        }
    });

    // Mostrar el resultado del sorteo
    ulResultado.innerHTML = `<li>El amigo secreto es: <strong>${amigoSecreto}</strong></li>`;
}

// Agregar un amigo al presionar Enter
inputAmigo.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

// Reiniciar el juego al presionar el botón
function reiniciarJuego() {
    // Vacía la lista de amigos
    listaAmigos.length = 0; 
    // Borra la lista en la interfaz
    ulListaAmigos.innerHTML = ""; 
    // Borra el resultado del sorteo
    ulResultado.innerHTML = ""; 
    // Limpia el campo de entrada
    inputAmigo.value = ""; 
    // Vuelve a enfocar en el input
    inputAmigo.focus(); 
}

