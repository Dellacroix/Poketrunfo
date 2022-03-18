

//Forma de criar -> var nome = criaCarta(nome,numero,urlImagem,ataque,defesa,velocidade,ataquesp,defesasp)
//Construtor de cartas
function criaCarta(paramNome,paramNum,url,paramAtk,paramDef,paramSpd,paramAtksp,paramDefsp){
    return{
        nome: paramNome,
        numero: paramNum,
        imagem: url,
        ataque: paramAtk,
        defesa: paramDef,
        velocidade: paramSpd,
        ataqueEspecial: paramAtksp,
        defesaEspecial: paramDefsp
    }
};

var deckJogador1 = [];
var deckJogador2 = [];
var deckMaquina = [];
var maoJogador = [];
var maoMaquina = [];
var cartaAtivaJogador;
var cartaAtivaMaquina;
var reserva = [];
var empt = false;
var control = document.getElementById("console");
var reset = document.getElementById("reset");
var btn0 = document.getElementById("new-game");  // botao novo jogo
var btn1 = document.getElementById("new-round"); // botao puxar carta
var btn2 = document.getElementById("continuar"); // botao continuar
btn1.style.visibility = "hidden";
btn2.style.visibility = "hidden";
var atributoJogador = 0;
var atributoMaquina = 0;


var baralho = [
  carta1 = criaCarta("Bulbasaur", "001", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", 10, 3, 5, 4, 4),
  carta2 = criaCarta("Charmander", "002", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png", 10, 3, 5, 4, 4),
  carta3 = criaCarta("Squirtle", "003", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png", 10, 3, 5, 4, 4),
  carta4 = criaCarta("Caterpie", "004", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png", 10, 3, 5, 4, 4),
  carta5 = criaCarta("Weedle", "005", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png", 3, 10, 5, 4, 4),
  carta6 = criaCarta("Pidgey", "006", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png", 3, 10, 5, 4, 4),
  carta7 = criaCarta("Rattata", "007", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png", 3, 10, 5, 4, 4),
  carta8 = criaCarta("Spearow", "008", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png", 3, 10, 5, 4, 4),
  carta9 = criaCarta("Ekans", "009", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png", 3, 3, 5, 4, 10),
  carta10 = criaCarta("Pikachu", "010","https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png", 3, 3, 10, 4, 4),
  carta11 = criaCarta("Sandshrew", "011", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png", 3, 3, 10, 4, 4),
  carta12 = criaCarta("Nidoran♀", "012", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png", 3, 3, 10, 4, 4),
  carta13 = criaCarta("Nidoran♂", "013", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/032.png", 3, 3, 10, 4, 4),
  carta14 = criaCarta("Clefairy", "014", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png", 3, 3, 5, 10, 4),
  carta15 = criaCarta("Vulpix", "015", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png", 3, 3, 5, 10, 4),
  carta16 = criaCarta("Jigglypuff", "016", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png", 3, 3, 5, 10, 4),
  carta17 = criaCarta("Zubat", "017", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png", 3, 3, 5, 4, 10),
  carta18 = criaCarta("Odish", "018", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png", 3, 3, 5, 4, 10),
  carta19 = criaCarta("Paras", "019", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/046.png", 3, 3, 5, 4, 10),
  carta20 = criaCarta("Venonat", "020","https://assets.pokemon.com/assets/cms2/img/pokedex/full/048.png", 3, 3, 5, 4, 10)
];
  esconderCartas();
//   Inicio de game, sortear cartas do deck
function sortearCarta() {
  while (baralho.length > 0) {
    var numSort = parseInt(Math.random() * baralho.length);
    maoJogador.push(baralho[numSort]);
    baralho.splice(numSort,1);
    numSort = parseInt(Math.random() * baralho.length);
    maoMaquina.push(baralho[numSort]);
    baralho.splice(numSort,1);
    document.getElementById("new-game").disabled = true;
    atualizarContador();
    inicio();
    btn1.style.visibility = "visible";
    btn0.style.visibility = "hidden";
  }
}
  
  //Nova rodada e selecionar carta do topo
function novaRodada(vez) {
  cartaAtivaJogador = maoJogador.shift();
  cartaAtivaMaquina = maoMaquina.shift();
  exibirCartaAtivaJogador();
  atualizarContador();
  escolherAtributo(vez);
  btn1.style.visibility = "hidden";
}
  
function exibirCartaAtivaJogador(){
  var img = document.getElementById("imagem");
  var dt = document.getElementById("detail");
  var atb = document.getElementById("atributos");
  // var imagem =      '<img src="' + cartaAtivaJogador.imagem + '" >';
  var tagHTML = "<h2>Atributos</h2><div id='opcoes' class='carta-status'>";
  var opcaoatk = "Ataque: " + cartaAtivaJogador.ataque + "<input class='atbbt' type='button' onclick='atribuir(1)' name='atributo' value=' '>" + "<br>";
  var opcaodef = "Defesa: " + cartaAtivaJogador.defesa + "<input class='atbbt' type='button' onclick='atribuir(2)' name='atributo' value=' '>" + "<br>";
  var opcaospatk = "Sp. Ataque: " + cartaAtivaJogador.ataqueEspecial + "<input class='atbbt' type='button' onclick='atribuir(3)' name='atributo' value=' '>" + "<br>";
  var opcaospdef = "Sp. Defesa: " + cartaAtivaJogador.defesaEspecial + "<input class='atbbt' type='button' onclick='atribuir(4)' name='atributo' value=' '>" + "<br>";
  var opcaospd = "Velocidade: " + cartaAtivaJogador.velocidade + "<input class='atbbt' type='button' onclick='atribuir(5)' name='atributo' value=' '>" + "<br>";
  var nome = `<p class="carta-subtitle">${cartaAtivaJogador.nome}</p><span class="num">${cartaAtivaJogador.numero}</span>` ;

  dt.innerHTML = nome;
  img.innerHTML = '<img src="' + cartaAtivaJogador.imagem + '" >';
  atb.innerHTML = tagHTML + opcaoatk + opcaodef + opcaospatk + opcaospdef + opcaospd + "</div>";
}
function exibirCartaAtivaMaquina(){
  var img = document.getElementById("imagem-maquina");
  var dt = document.getElementById("detail-maquina");
  var atb = document.getElementById("atributos-maquina");
  var tagHTML = "<h2>Atributos</h2><div id='opcoes' class='carta-status'>";
  var opcaoatk = "Ataque: " + cartaAtivaMaquina.ataque + "<br>";
  var opcaodef = "Defesa: " + cartaAtivaMaquina.defesa + "<br>";
  var opcaospatk = "Sp. Ataque: " + cartaAtivaMaquina.ataqueEspecial + "<br>";
  var opcaospdef = "Sp. Defesa: " + cartaAtivaMaquina.defesaEspecial + "<br>";
  var opcaospd = "Velocidade: " + cartaAtivaMaquina.velocidade + "<br>";
  var nome = `<p class="carta-subtitle">${cartaAtivaMaquina.nome}</p><span class="num">${cartaAtivaMaquina.numero}</span>` ;

  dt.innerHTML = nome;
  img.innerHTML = '<img src="' + cartaAtivaMaquina.imagem + '" >';
  atb.innerHTML = tagHTML + opcaoatk + opcaodef + opcaospatk + opcaospdef + opcaospd + "</div>";
}
function esconderCartaAtivaJogador(){
  var img = document.getElementById("imagem");
  var dt = document.getElementById("detail");
  var atb = document.getElementById("atributos");
  var tagHTML = "<h2>Atributos</h2><div id='opcoes' class='carta-status'>";  
  var nome = `<p class="carta-subtitle">Pokemon Trunfo</p><span class="num">000</span>` ;
  dt.innerHTML = nome;
  img.innerHTML = '<img src="https://freepikpsd.com/file/2019/10/pokemon-pokebola-png-4-Transparent-Images.png" >';
  atb.innerHTML = tagHTML + "</div>";
}
function esconderCartaAtivaMaquina(){
  var img = document.getElementById("imagem-maquina");
  var dt = document.getElementById("detail-maquina");
  var atb = document.getElementById("atributos-maquina");
  var tagHTML = "<h2>Atributos</h2><div id='opcoes' class='carta-status'>";
  var nome = `<p class="carta-subtitle">Pokemon Trunfo</p><span class="num">000</span>` ;
  dt.innerHTML = nome;
  img.innerHTML = '<img src="https://freepikpsd.com/file/2019/10/pokemon-pokebola-png-4-Transparent-Images.png" >';
  atb.innerHTML = tagHTML + "</div>";
}
function esconderCartas(){
  esconderCartaAtivaJogador();
  esconderCartaAtivaMaquina();
}
  
  //Escolha do atributo // aplicar o codigo de virada da moeda no CSS
function escolherAtributo(vez) {
  var atributoEscolhido;
  
  if (vez) {

  } else {
    atributoEscolhido = parseInt(Math.random() * 5);
    atribuir(atributoEscolhido);
  }
}
  
  //Comparação e definição do vencedor
function atribuir(atributo) {
  exibirCartaAtivaMaquina();
  btn2.style.visibility = "visible";

  switch(atributo){
    case 1:
      atributoJogador = cartaAtivaJogador.ataque;
      atributoMaquina = cartaAtivaMaquina.ataque;
      break;
    case 2:
      atributoJogador = cartaAtivaJogador.defesa;
      atributoMaquina = cartaAtivaMaquina.defesa;
      break;
    case 3:
      atributoJogador = cartaAtivaJogador.ataqueEspecial;
      atributoMaquina = cartaAtivaMaquina.ataqueEspecial;
      break;
    case 4:
      atributoJogador = cartaAtivaJogador.defesaEspecial;
      atributoMaquina = cartaAtivaMaquina.defesaEspecial;
      break;
    case 5:
      atributoJogador = cartaAtivaJogador.velocidade;
      atributoMaquina = cartaAtivaMaquina.velocidade;
      break;
    default:
      break;
  }
}

function comparar(){
  if(atributoJogador>atributoMaquina){
    resultadoRodada(1);
    rodadaWin();
    console.log("vitoria");
  }else if(atributoJogador<atributoMaquina){
    resultadoRodada(-1);
    rodadaLose();
    console.log("derrota");

  }else{
    resultadoRodada(0);
    rodadaDraw();
    console.log("empate");
  }
  btn2.style.visibility = "hidden"
}

    //adicionar ao vencedor
function resultadoRodada(resultado) {
  if(cartaAtivaJogador!=null){
    switch (resultado) {
      case 1:
        for(var i = reserva.length; i > 0; i--){
          maoJogador.push(reserva[i]);
        }
        maoJogador.push(cartaAtivaJogador);
        maoJogador.push(cartaAtivaMaquina);
  
        break;
      case -1:
        for(var i = reserva.length; i > 0; i--){
          maoMaquina.push(reserva[i]);
        }
        maoMaquina.push(cartaAtivaMaquina);
        maoMaquina.push(cartaAtivaJogador);
      
        break;
      case 0:
        reserva.push(cartaAtivaJogador);
        reserva.push(cartaAtivaMaquina);
        
        break;
      default:
        break;
    }
    cartaAtivaJogador = null;
    cartaAtivaMaquina = null;

    if(maoJogador.length == 0){
      gameOverL();
    }else if(maoMaquina.length ==0){
      gameOverW();

    }else{
    atualizarContador();
    } 
  }
  btn1.style.visibility = "visible"
}
    
function atualizarContador(){
  var countJ = document.getElementById("contador-jogador");
  var countM = document.getElementById("contador-maquina");

  countJ.innerHTML = '<span class="num">Cartas no deck:'+maoJogador.length+'</span>';
  countM.innerHTML = '<span class="num">Cartas no deck: '+maoMaquina.length+'</span>';
}
  
function syncDelay(milliseconds){
  var start = new Date().getTime();
  var end=0;
  while( (end-start) < milliseconds){
    end = new Date().getTime();
  }
}

function inicio(){
  control.innerHTML = "As cartas foram distribuídas!"
  }
function rodadaWin(){
  control.innerHTML = "Você venceu a rodada!"
  syncDelay(1000);
  esconderCartas();
}
function rodadaLose(){
  control.innerHTML = "Você perdeu a rodada!"
  syncDelay(1000);
  esconderCartas();
}
function rodadaDraw(){
  control.innerHTML = "Empate!"
  syncDelay(1000);
  esconderCartas();
}
function escolherAtributo(){
  control.innerHTML = "Escolha um atributo"
}
function gameOverW(){
  control.innerHTML = "Fim de jogo. Você ganhou!!"
  syncDelay(3000);
  esconderCartas();
  restart();

}
function gameOverL(){
  control.innerHTML = "Fim de jogo. Você perdeu!!"
  syncDelay(3000);
  esconderCartas();
restart();
}

function reiniciar(){
  baralho = [
    carta1 = criaCarta("Bulbasaur", "001", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", 10, 3, 5, 4, 4),
    carta2 = criaCarta("Charmander", "002", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png", 10, 3, 5, 4, 4),
    carta3 = criaCarta("Squirtle", "003", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png", 10, 3, 5, 4, 4),
    carta4 = criaCarta("Caterpie", "004", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png", 10, 3, 5, 4, 4),
    carta5 = criaCarta("Weedle", "005", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png", 3, 10, 5, 4, 4),
    carta6 = criaCarta("Pidgey", "006", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png", 3, 10, 5, 4, 4),
    carta7 = criaCarta("Rattata", "007", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png", 3, 10, 5, 4, 4),
    carta8 = criaCarta("Spearow", "008", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png", 3, 10, 5, 4, 4),
    carta9 = criaCarta("Ekans", "009", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png", 3, 3, 5, 4, 10),
    carta10 = criaCarta("Pikachu", "010","https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png", 3, 3, 10, 4, 4),
    carta11 = criaCarta("Sandshrew", "011", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png", 3, 3, 10, 4, 4),
    carta12 = criaCarta("Nidoran♀", "012", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png", 3, 3, 10, 4, 4),
    carta13 = criaCarta("Nidoran♂", "013", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/032.png", 3, 3, 10, 4, 4),
    carta14 = criaCarta("Clefairy", "014", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png", 3, 3, 5, 10, 4),
    carta15 = criaCarta("Vulpix", "015", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png", 3, 3, 5, 10, 4),
    carta16 = criaCarta("Jigglypuff", "016", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png", 3, 3, 5, 10, 4),
    carta17 = criaCarta("Zubat", "017", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png", 3, 3, 5, 4, 10),
    carta18 = criaCarta("Odish", "018", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png", 3, 3, 5, 4, 10),
    carta19 = criaCarta("Paras", "019", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/046.png", 3, 3, 5, 4, 10),
    carta20 = criaCarta("Venonat", "020","https://assets.pokemon.com/assets/cms2/img/pokedex/full/048.png", 3, 3, 5, 4, 10)
  ];
  maoJogador = [];
  maoMaquina = [];
  sortearCarta();
}

function restart() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

