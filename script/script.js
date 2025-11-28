
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  const cartCount = document.getElementById("cartCount");
 let isimenu = document.querySelector(".isimenu"); 

function klikmenu(){
  isimenu.style.display = "block";
  overlay.style.display = "block";
    document.body.style.overflow = "hidden";
}



  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.classList.contains('btn1') || e.target.tagName === "INPUT") return;
      item.classList.toggle('selected');
      updateOutput();
    });
  });

  


// 🔍 fitur pencarian menu
let siv = document.querySelector(".siv");
siv.style.display = "none";
const inputCari = document.querySelector("#cariMenu");
inputCari.addEventListener("input", function() {
  const teks = inputCari.value.toLowerCase();
  const semuaItem = document.querySelectorAll(".item");

  let ditemukan = 0; // 🔹 hitung berapa item yang cocok

  semuaItem.forEach(item => {
    const nama = item.dataset.nama.toLowerCase();
    if (nama.includes(teks)) {
      item.style.display = "block";
      ditemukan++;
    } else {
      item.style.display = "none";
    }
  });

  // 🔹 jika tidak ada yang cocok, tampilkan pesan
  if (ditemukan === 0) {
    siv.style.display = "block";
    siv.textContent = "Tidak Ada Produk";
  } else {
    siv.style.display = "none";
  }
});


    const menuBtn = document.querySelector('.menu2');
    const sideMenu = document.getElementById('sideMenu');
    const overlay2 = document.getElementById('overlay2');
    
    
   menuBtn.addEventListener('click', () => {
      sideMenu.classList.toggle('active');
      overlay2.classList.toggle('active');
      document.body.style.overflow = "hidden";
      sideMenu.style.overflow = "auto";
    });
  overlay2.addEventListener('click', () => {
      sideMenu.classList.remove('active');
      overlay2.classList.remove('active');
      document.body.style.overflow = "";
    });
    
    let judul = document.querySelector(".judul");
    let judul2 = document.querySelector(".judul2");
    let agelap = document.querySelector(".agelap");

    
    document.body.style.backgroundColor = "white";
    let aitem = document.querySelectorAll(".item");
      const semuaItem = document.querySelectorAll(".item");
      const small1 = document.querySelectorAll(".small1");
    
    
    function gelap() {
  if (document.body.style.backgroundColor === "white") {
    document.body.style.backgroundColor = "#222b3a";
    judul2.style.color = "white";
    agelap.textContent = "Tema Terang";

    semuaItem.forEach(item => {
      item.style.backgroundColor = "#d3d6da8a";
      item.style.color = "white";
    });
    small1.forEach(small1 => {
      small1.style.color = "gold";
    });
    
  } else {
    document.body.style.backgroundColor = "white";
    judul2.style.color = "";
    agelap.textContent = "Tema Gelap";

    semuaItem.forEach(item => {
      item.style.backgroundColor = "";
      item.style.color = "";
    });
    small1.forEach(small1 => {
      small1.style.color = "";
    });
  }
}
   