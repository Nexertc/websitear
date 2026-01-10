

  const overlay = document.getElementById("overlay");
 let isimenu = document.querySelector(".isimenu"); 

function klikmenu(){
  isimenu.style.display = "block";
  overlay.style.display = "block";
    document.body.style.overflow = "hidden";
}




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
      

    let pg = document.querySelectorAll(".pg");

function gelap() {
  if (document.body.style.backgroundColor === "white") {
    document.body.style.backgroundColor = "#222b3a";
    agelap.textContent = "Tema Terang";

    pg.forEach(p => {
      p.style.color = 'white';
    });

  } else {
    document.body.style.backgroundColor = "white";
    agelap.textContent = "Tema Gelap";

    pg.forEach(p => {
      p.style.color = 'black';
    });
  }
}


const meta = document.getElementById("viewportMeta");

function desktopMode() {
  let mode = localStorage.getItem("mode");

  if (mode === "desktop") {
    // balik ke mobile
    meta.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
    localStorage.setItem("mode", "mobile");
    document.querySelector(".av").innerText = "Mode Desktop";
  } else {
    // pindah ke desktop
    meta.setAttribute("content", "width=1024");
    localStorage.setItem("mode", "desktop");
    document.querySelector(".av").innerText = "Mode Mobile";
  }
}

// cek saat halaman dibuka
if (localStorage.getItem("mode") === "desktop") {
  meta.setAttribute("content", "width=1024");
  document.querySelector(".av").innerText = "Mode Mobile";
} else {
  meta.setAttribute(
    "content",
    "width=device-width, initial-scale=1.0"
  );
}

   