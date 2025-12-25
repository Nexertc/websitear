const fireballDamage = [0,
   1500, 1500,
   1700, 1700,
    1800, 1950,
     1950, 2050,
    2200, 2200, 
    2350, 2650,
     2650, 2750,
      3100, 3100,
       3250, 3400,
        3400, 3500, 
        3650, 3650, 
        3750, 3900, 3900, 3950, 
      4100]; // Damage Fireball per level
const quakeDamage = [0, 0.145, 0.17, 0.21, 0.25, 0.29]; // Persentase kerusakan Gempa per level

const targetHP = {
  air_defense: [0, 800, 850, 900, 950, 1000, 1050, 1100, 1210, 1300, 1400, 1500, 1650, 1750, 1850, 1950],
  inferno: [0, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3700, 4000, 4400],
  xbow: [0, 1500, 1900, 2300, 2700, 3100, 3400, 3700, 4000, 4200, 4400, 4600, 4800],
  Canon: [0, 300, 360, 420, 500, 600, 660, 730, 800, 880, 960, 1060, 1160, 1260, 1380, 1500, 1620, 1740, 1870, 2000, 2150, 2250],
  Mortar: [0, 400, 450, 500, 550, 600, 650, 700, 800, 950, 1100, 1300, 1500, 1700, 1950, 2150, 2300, 2450],
  Wizard: [0, 620, 650, 680, 730, 840, 960, 1200, 1440, 1600, 1900, 2120, 2240, 2500, 2800, 3000, 3150, 3300],
  Monolit: [0, 4747, 5050, 5353, 5656],
  Multi_archer: [0, 5000, 5200, 5400, 5500],
  Canon_ganda: [0, 5400, 5700, 6000],
  Spell_tower: [0, 2500, 2800, 3100],
  Sweper: [0, 750, 800, 850, 900, 950, 1000, 1050],
  Eagle: [0, 4000, 4400, 4800, 5200, 5600, 5900, 6200],
  Ketapel: [0, 3600, 4200, 4800, 5100, 5410, 5600],
  Builder: [0, 250, 1000, 1300, 1600, 1800, 1900, 2000],
  Archer_tower: [0, 380, 420, 460, 500, 540, 580, 630, 690, 750, 810, 890, 970, 1050, 1130, 1230, 1310, 1390, 1510, 1600, 1700, 1800],
  tesla: [0, 600, 630, 660, 690, 730, 770, 810, 850, 900, 980, 1100, 1200, 1350, 1450, 1550, 1650],
  fire_spriter: [0, 4500, 5000],
  bom_tower: [0, 650, 700, 750, 850, 1050, 1300, 1600, 1900, 2300, 2500, 2700, 2900],
  pilihan_GandaCanon: [0, 4000, 4200],
  pilihan_GandaArcher: [0, 4000, 4200],
  bost_xbow: [0, 4800, 4900],
  bost_builder: [0, 2000, 2050],
  bost_BomTower: [0, 2900, 3000],
  bost_mortar: [0, 2450, 2525],
  bost_inferno: [0, 4800, 5000],
  bost_tesla: [0, 1650, 1700],
  bost_CanonGanda: [0, 6000, 6150],
  bost_MultiArcher: [0, 5400, 5500],
  bost_FireSpriter: [0, 5000, 5250],
  bost_pilihan_GandaCanon: [0, 4200, 4350],
  bost_pilihan_GandaArcher: [0, 4200, 4350],
  bost_wizard: [0, 3300, 3375]
};

function updateBuildingLevels() {
  const target = document.getElementById("target").value;
  const buildingLevelSelect = document.getElementById("building-level");
  buildingLevelSelect.innerHTML = "";
  const buildingArray = targetHP[target];
  if (!buildingArray) return;
  for (let i = 1; i < buildingArray.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = "Level " + i;
    buildingLevelSelect.appendChild(option);
  }
}

function hitungGempaDuluBaruFireball() {
  const fireLevel = parseInt(document.getElementById("zap-level").value);
  const quakeLevel = parseInt(document.getElementById("quake-level").value);
  const target = document.getElementById("target").value;
  const buildingLevel = parseInt(document.getElementById("building-level").value);

  const fireDmg = fireballDamage[Math.min(fireLevel, fireballDamage.length - 1)];
  const baseQuakePercent = quakeDamage[Math.min(quakeLevel, quakeDamage.length - 1)];
  const buildingArray = targetHP[target];

  let sisaHP = buildingArray[Math.min(buildingLevel, buildingArray.length - 1)];
  const hpAwal = sisaHP;
  let quakeCount = 0;

  let detail = `<b>Target: ${target.replace(/_/g, ' ')} Level ${buildingLevel}</b><br>HP Awal: ${hpAwal}<br><br>`;

  // LOOP GEMPA (Maksimal biasanya orang bawa 1-4 gempa)
  // Kita hitung gempa dulu sampai selesai (misal target kita adalah 2 gempa sesuai gambar)
  const jumlahGempaYangDiinginkan = 2; 

  for (let i = 1; i <= jumlahGempaYangDiinginkan; i++) {
    // RUMUS PENGURANGAN DAMAGE GEMPA BERUNTUN:
    // Damage = (Persentase / (2*i - 1)) * HP TOTAL AWAL
    let currentQuakePercent = baseQuakePercent / (2 * i - 1);
    let dmg = Math.floor(hpAwal * currentQuakePercent);
    
    sisaHP -= dmg;
    quakeCount++;
    detail += `Gempa ${i}: Damage ${dmg} → Sisa HP ${sisaHP}<br>`;
  }

  // FIREBALL DI AKHIR
  detail += `<br><b>Setelah Gempa Selesai:</b><br>`;
  detail += `Sisa HP sebelum Fireball: ${sisaHP}<br>`;
  detail += `Fireball Damage: ${fireDmg}<br>`;
  
  sisaHP -= fireDmg;
  let sisaAkhir = sisaHP > 0 ? sisaHP : 0;
  detail += `Sisa HP akhir: ${sisaAkhir}<br><br>`;

  if (sisaHP <= 0) {
    detail += `💥 <b>Sukses!</b> Bangunan hancur.`;
  } else {
    detail += `⚠️ <b>Gagal!</b> Bangunan sisa ${sisaAkhir} HP.`;
  }

  document.getElementById("hasil").innerHTML = detail;
}

