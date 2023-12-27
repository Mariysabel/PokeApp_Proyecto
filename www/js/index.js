//obtener objetos por sus id's
const final = document.getElementById('final');
const contenedor = document.getElementById('contenedor');
let btnjugar = document.getElementById('jugar');
let parrafo = document.getElementById('nombre');
let imagen = document.getElementById('pokemon');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let lf = document.getElementById('btnv');
let point = document.getElementById('btnp');
let totalpuntos = document.getElementById('total_puntos');
let puntosfinales = document.getElementById('mostrar');
const paudio = document.getElementById('audio');
const naudio = document.getElementById('noaudio');
const points = document.getElementById('points');
const game = document.getElementById('game');

//Crea un objeto de audio que reproduce el archivo "tema/theme2.mp3".
var audio = new Audio('tema/theme2.mp3');

// Evento al hacer clic en el botón "mostrar puntos"
puntosfinales.addEventListener('click', imprimirResultado);

// Agregar eventos a los botones
btn1.addEventListener('click', verificar_ganar)
btn2.addEventListener('click', verificar_ganar)
btn3.addEventListener('click', verificar_ganar)

// Llamada a la función "juego" al hacer clic en el botón "jugar"
btnjugar.addEventListener('click', juego)


//función para generar números aleatorios
function aleatorio(){
    return Math.floor(Math.random() * 1000) + 1;
} 

var vida = 10;
lf.innerHTML = '<img src="https://i.pinimg.com/originals/a1/3c/87/a13c87e49707db03fab67c1b54c306d9.png" alt="" width="40%">' + vida;
var puntos = 0;
point.innerHTML = '<img src="https://i.pinimg.com/originals/d7/be/39/d7be39fdb9d77e2547134166903f4c89.png" alt=""  width="40%">' + puntos;

var correcto = 0
var in1 = 0
var in2 = 0

//Objetos pokemones
let poke1 = ""
let poke2 = ""
let poke3 = ""
let btncorercto = 0
let nombrecorrecto = ""

// Función para enviar solicitud y obtener información del pokemon
function enviar() {
    let nombre;
    const urlbase = "https://pokeapi.co/api/v2/pokemon/";
    
    // Llamada a la API para obtener información del pokemon correcto
    fetch(urlbase + correcto)
      .then(res => res.json())
      .then(data => {
        contenedor_imagen = data.sprites.other.home.front_default;
  
        if (contenedor_imagen == null) {
          // La imagen es nula, generar otro número aleatorio y realizar otra solicitud
          correcto = aleatorio();
          enviar();
        } else {
          imagen.src = data.sprites.other.home.front_default;
          nombre = data.name;
          nombrecorrecto = nombre;
          console.log(nombre);
  
          // Asigna el nombre del pokemon correcto a un botón específico
          if (1 == btncorercto) {
            btn1.innerText = nombre;
          } else if (2 == btncorercto) {
            btn2.innerText = nombre;
          } else if (3 == btncorercto) {
            btn3.innerText = nombre;
          }
        }
      })
      .catch(e => console.log(new Error(e)));
  

    // Llamada a la API para obtener información del segundo pokemon
    fetch(urlbase+in1)
    .then( res => res.json())
    .then(data => {
        nombre =  data.name;
        console.log("el segundo:"+nombre)

        // Asigna el nombre del segundo pokemon a un botón específico
        if( 1 == btncorercto ){
            btn2.innerText = nombre
        }
        else if( 2 ==  btncorercto ){
            btn1.innerText = nombre
        }
        else if( 3 == btncorercto ){
            btn2.innerText = nombre
        }
       
        
    })
    .catch( e => console.log( new Error( e ) ) )

    // Llamada a la API para obtener información del tercer pokemon
    fetch(urlbase+in2)
    .then( res => res.json())
    .then(data => {
        nombre =  data.name;
        console.log("el tercero:"+nombre)

        // Asigna el nombre del tercer pokemon a un botón específico
        if( 1 == btncorercto ){
            btn3.innerText = nombre
        }
        else if( 2 ==  btncorercto ){
            btn3.innerText = nombre  
        }
        else if( 3 == btncorercto ){
           
            btn1.innerText = nombre
        }
    })
    .catch( e => console.log( new Error( e ) ) )
}

// Función para iniciar el juego
function juego(){
    points.style.display = "block";
    game.style.display = "block";
    final.style.display = "none";
    contenedor.style.display = "block";
    naudio.style.display = "block";
    paudio.style.display = "none";
    parrafo.innerText =  "";
    imagen.style.filter = 'brightness(0%)';

   // Generación de números aleatorios para los pokemones
     correcto = aleatorio();
     in1 = aleatorio();
     in2 = aleatorio();

    // Verificación de igualdad entre los números generados
    while(correcto == in1){
        in1 = aleatorio();
    }
    while(correcto == in2 || in2 == in1){
        in2 = aleatorio();
    }

    //realizando orden aleatorio de botones
    btncorercto = Math.floor(Math.random() * 3) + 1;

    //Traemos la info de los pokemones
    enviar()
            
}

// Función para cuando el jugador gana
function gana(){
    //aparecer imagen
    puntos++;
    point.innerHTML = '<img src="https://i.pinimg.com/originals/d7/be/39/d7be39fdb9d77e2547134166903f4c89.png" alt=""  width="40%">' + puntos;
    imagen.style.filter = 'brightness(100%)';

    // Obtener el nombre del pokemon correcto y mostrarlo
    const urlbase = "https://pokeapi.co/api/v2/pokemon/"
    fetch(urlbase+correcto)
    .then( res => res.json())
    .then(data => {
        parrafo.innerText = data.name;
        
    })
    .catch( e => console.log( new Error( e ) ) )
    // Reiniciar el juego después de un intervalo de tiemp
    setTimeout(function() {
        juego();
      }, 2000);
}

// Función para cuando el jugador pierde
function pierde() {
    vida--;
    lf.innerHTML = '<img src="https://i.pinimg.com/originals/a1/3c/87/a13c87e49707db03fab67c1b54c306d9.png" alt="" width="40%">' + vida;

    if (vida <= 0) {
        contenedor.style.display = "none";
        final.style.display = "block";
        console.log( "GANASTE CON " + puntos + " PUNTOS!!!! :)" )
    }
    console.log(vida);
}

//Reproduce un audio en bucle.
function PlayAudio() {
    paudio.style.display = "none";
    naudio.style.display = "block";
    audio.loop = true;
    audio.play();
}

//Detiene la reproducción del audio
function noAudio() {
    naudio.style.display = "none";
    paudio.style.display = "block";
    audio.pause();
}

// Función para imprimir el resultado del juego
function imprimirResultado(){
    console.log("lograste obtener: <br>" + puntos + '<br> pokemones')
    totalpuntos.innerHTML= "lograste obtener: <br>" + puntos + '<br> pokemones';
}

// Función para verificar si el jugador ha seleccionado el botón correcto
function verificar_ganar(){
    console.log( this.innerText )
    console.log( nombrecorrecto )
    if( this.innerText == nombrecorrecto ){
        console.log("gana")
        gana()
    }else{
        console.log("pierde")
        pierde()
    }
        
}