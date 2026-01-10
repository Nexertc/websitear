const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const info = document.getElementById("info");
const compressBtn = document.getElementById("compressBtn");
const downloadLink = document.getElementById("downloadLink");

let originalFile = null;

// preview gambar
upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  originalFile = file;

  const reader = new FileReader();
  reader.onload = (ev) => {
    preview.src = ev.target.result;
    info.innerHTML = `Ukuran Asli: <b>${(file.size / 1024 / 1024).toFixed(2)} MB</b>`;
    downloadLink.style.display = "none";
  };
  reader.readAsDataURL(file);
});

compressBtn.addEventListener("click", () => {
  if (!originalFile) {
    alert("Pilih foto terlebih dahulu!");
    return;
  }
  preview.style.display = "block";

  const img = new Image();
  img.src = URL.createObjectURL(originalFile);

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxWidth = 1000;
    const scale = Math.min(1, maxWidth / img.width);

    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let quality = 0.8;
    let targetKB = 250;
    let dataUrl, sizeKB;

    do {
      dataUrl = canvas.toDataURL("image/jpeg", quality);
      sizeKB = Math.round((dataUrl.length * 3) / 4 / 1024);
      quality -= 0.05;
    } while (sizeKB > targetKB && quality > 0.1);

    preview.src = dataUrl;

    info.innerHTML = `
      Ukuran Asli: <b>${(originalFile.size / 1024 / 1024).toFixed(2)} MB</b><br>
      Hasil Kompres: <b>${sizeKB} KB</b><br>
      Kualitas: <b>${Math.round(quality * 100)}%</b>
    `;

    // aktifkan tombol download
    downloadLink.href = dataUrl;
    downloadLink.download = "foto_kompres.jpg";
    downloadLink.style.display = "inline-block";
  };
});


