let btnl = document.querySelector(".btnl");

function salin1() {
  let teks = document.querySelector("#teksc1").innerText;
  navigator.clipboard.writeText(teks);
}


function salin2() {
  let teks = document.querySelector("#teksc2").innerText;
  navigator.clipboard.writeText(teks);
}


function salin3() {
  let teks = document.querySelector("#teksc3").innerText;
  navigator.clipboard.writeText(teks);
}