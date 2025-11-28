
    const upload = document.getElementById("upload");
    const preview = document.getElementById("preview");
    const info = document.getElementById("info");
    const compressBtn = document.getElementById("compressBtn");
    let originalFile = null;

    // Tampilkan preview saat file diunggah
    upload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      originalFile = file;
      const reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
        info.innerHTML = `Ukuran Asli: <b>${(file.size / 1024 / 1024).toFixed(2)} MB</b>`;
      };
      reader.readAsDataURL(file);
    });

    compressBtn.addEventListener("click", async () => {
      if (!originalFile) return alert("Pilih foto terlebih dahulu!");

      const targetKB = 250; // target sekitar 250KB
      const img = new Image();
      img.src = URL.createObjectURL(originalFile);

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Atur ukuran maksimal agar proporsional
        const maxWidth = 1000;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.8;
        let compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        let compressedBytes = Math.round((compressedDataUrl.length * 3) / 4 / 1024); // dalam KB

        // Turunkan kualitas bertahap sampai mendekati target
        while (compressedBytes > targetKB && quality > 0.1) {
          quality -= 0.05;
          compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          compressedBytes = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
        }

        preview.src = compressedDataUrl;
        info.innerHTML = `
          Ukuran Asli: <b>${(originalFile.size / 1024 / 1024).toFixed(2)} MB</b><br>
          Hasil Kompres: <b>${compressedBytes} KB</b><br>
          Kualitas: ${(quality * 100).toFixed(0)}%
        `;

        // Tombol download hasil kompres
        let oldLink = document.querySelector(".download");
        if (oldLink) oldLink.remove();

        const link = document.createElement("a");
        link.href = compressedDataUrl;
        link.download = "foto_kompres_optimal.jpg";
        link.textContent = "💾 Download Hasil Kompres";
        link.className = "download";
        document.body.appendChild(link);
      };
    });
  