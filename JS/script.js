let PALABRAS = ["JAVA","PYTHON","SQL","CSS","HTML","AJAX","CANVAS","REACT","ANGULAR","MONGODB","RUST","SCRUM","HARDWARE","SOFTWARE","MALWARE","LAPTOP","GOLANG","SERVIDOR"];
const btnLetras = document.querySelectorAll("#Abecedario button"); 
let parrafo = document.getElementById("contenedor-palabra-adivinar");
let aciertos = 0;
let fallos = 0;
let palabraAdivinar = "";


//Funcion para obtener una palabra aleatoria dentro de mi arreglo PALABRAS
const palabraRandom = ()=>{
    let palabraRandom = PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
    palabraAdivinar = palabraRandom;
}

//Funcion que me guarda nuevas palabras dentro del arreglo
const guardarPalabra = ()=>{
    let caja = document.getElementById("cajaPalabra").value;

    if(caja === "") return alert("No has ingresado ninguna palabra!");

    if(PALABRAS.includes(caja)){

        return alert(`La palabra ${caja} ya esta en el juego!`);
    }
    else{
        PALABRAS.push(caja.toUpperCase());
        localStorage.setItem("palabras", JSON.stringify(PALABRAS));
        alert("Palabra guardada!")
        location.href ="juego.html";
    }   
};


//Funcion mostrar guiones de cada letra
const guiones = ()=>{
    for (let i = 0; i < palabraAdivinar.length; i++) {
        const span = document.createElement("span");
        parrafo.appendChild(span);
    }
}

//Funcion que me permite interactuar con los botones de las letras cuando le doy click
const BotonesLetrasEvento =()=>{
    for (let i = 0; i < btnLetras.length; i++) {
        btnLetras[i].addEventListener("click",clickBotonAbecedario);
    }
}


//Funcion que me devuelve el valor del boton cuando le doy click sobre el
const clickBotonAbecedario = (event)=>{
    const guionesLetras = document.querySelectorAll("#contenedor-palabra-adivinar span");
    const boton = event.target;
    boton.disabled = true;
    const letra = boton.innerHTML;
    const palabra = palabraAdivinar.toUpperCase();

    let letraCorrecta = false;
    for (let i = 0; i < palabra.length; i++) {
        if(letra === palabra[i]){
            guionesLetras[i].innerHTML = letra;
            aciertos++;
            letraCorrecta = true;
        } 
    }

    if(letraCorrecta === false){
        fallos++;
        const rutaImagen =`./Imagenes/img${fallos}.png`;
        const imagen = document.getElementById("dibujo-ahorcado");
        imagen.src = rutaImagen;
    }

    if(fallos === 7){
        juegoTerminado();
        alert(`Perdiste!! la palabra era ${palabraAdivinar}`);
    }
    else if(aciertos === palabraAdivinar.length){
        alert("Ganaste!!!")
        juegoTerminado();
    }
}

//Funcion para terminar el juego 

const juegoTerminado = ()=>{
    for (let i = 0; i < btnLetras.length; i++) {
        btnLetras[i].disabled = true;
    }
    btn.disabled = false;
    setTimeout(() => {
        location.reload();    
    }, 3000);
}

//Funcion iniciar juego
const iniciar = ()=>{
    palabraRandom();
    guiones();
    BotonesLetrasEvento();
    aciertos = 0;
    fallos = 0;
    btn.disabled = true;
    for (let i = 0; i < btnLetras.length; i++) {
        btnLetras[i].disabled = false;
    }    
}


let btn =  document.getElementById("btnNuevoJuego");
btn.addEventListener("click", iniciar);


//Mostrar una ventana emergente