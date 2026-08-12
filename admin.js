
const KEY="jws_arafah_demo";
const defaults={
 mosque:"MASJID ARAFAH", location:"Kranji Munthang",
 prayer:[["Imsak","04:29"],["Subuh","04:39"],["Terbit","05:52"],["Dzuhur","11:52"],["Ashar","15:13"],["Maghrib","17:48"],["Isya","19:00"]],
 iqamah:{Subuh:10,Dzuhur:10,Ashar:10,Maghrib:10,Isya:10},
 announcements:[{title:"Kajian Rutin Ahad Pagi",date:"03 Agustus 2026 - 10 Agustus 2026",status:"Aktif"},{title:"Pembangunan Tempat Wudhu",date:"01 Agustus 2026 - 31 Agustus 2026",status:"Aktif"},{title:"Donasi untuk Kegiatan Masjid",date:"30 Juli 2026 - 30 Agustus 2026",status:"Aktif"}],
 slides:["Jadwal Sholat","Ayat Al-Quran","Hadits","Donasi Masjid","Kegiatan Masjid"],
 running:"Mari makmurkan masjid, jaga ukhuwah, dan dirikan shalat tepat waktu."
};
let state=JSON.parse(localStorage.getItem(KEY)||"null")||structuredClone(defaults);
function persist(){localStorage.setItem(KEY,JSON.stringify(state))}
const menus=[
["dashboard","⌂","Dashboard"],["prayer","☼","Jadwal Sholat"],["announcement","⚑","Pengumuman"],["slides","▣","Slide TV"],["imam","♟","Imam & Muadzin"],["iqamah","◷","Iqamah"],["running","T","Running Text"],["gallery","▧","Galeri"],["settings","⚙","Pengaturan"],["users","♙","Pengguna"]
];
const nav=document.getElementById("nav");
nav.innerHTML=menus.map(m=>`<button class="nav" data-page="${m[0]}"><span>${m[1]}</span><label>${m[2]}</label></button>`).join("");
const titles=Object.fromEntries(menus.map(m=>[m[0],m[2]]));
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function dashboard(){
return `<section class="page active" data-page="dashboard">
<div class="stats">
${[
["⚑",state.announcements.length,"Pengumuman Aktif","announcement","greenish"],
["▣",state.slides.length,"Jumlah Slide","slides","blueish"],
["T","Running Text","Aktif","running","purpleish"],
["♟","6","Imam & Muadzin","imam","yellowish"],
["◷","10 Menit","Waktu Iqamah","iqamah","greenish"]
].map(x=>`<article class="stat ${x[4]}"><div class="stat-icon">${x[0]}</div><div><b>${esc(x[1])}</b><span>${x[2]}</span><a data-page="${x[3]}">Lihat pengaturan</a></div></article>`).join("")}
</div>
<div class="three-col">
<article class="panel"><div class="panel-head">⚑ <b>Pengumuman Terbaru</b><button class="small-btn" data-page="announcement">Lihat Semua</button></div><div class="rows">
${state.announcements.slice(0,5).map(a=>`<div class="row"><div><b>● ${esc(a.title)}</b><small>${esc(a.date)}</small></div><em>${esc(a.status)}</em></div>`).join("")}
</div></article>
<article class="panel"><div class="panel-head">▣ <b>Slide Aktif</b><button class="small-btn" data-page="slides">Lihat Semua</button></div><div class="rows">
${state.slides.slice(0,5).map((s,i)=>`<div class="slide-row"><b>${i+1}</b><div class="thumb">JWS</div><div><b>${esc(s)}</b><small>Durasi 15 detik</small></div><em>Aktif</em></div>`).join("")}
</div></article>
<article class="panel"><div class="panel-head">⚙ <b>Informasi Sistem</b></div><div class="info">
${[["Versi Aplikasi","Demo 1.0"],["Sumber Jadwal","Data Demo"],["Lokasi",state.location],["Resolusi Layar TV","1920 × 1080"],["Status Layar TV","Online"],["Waktu Server",new Date().toLocaleTimeString("id-ID")+" WIB"]].map(x=>`<div><span>${x[0]}</span><b class="${x[0].startsWith("Status")?"online":""}">${esc(x[1])}</b></div>`).join("")}
</div></article>
</div>
<div class="lower-grid">
<article class="panel"><div class="section-title">Pengumuman › Tambah Pengumuman</div><div class="form">
<label>Judul</label><input id="newAnnTitle" placeholder="Contoh: Kajian Rutin Ahad Pagi">
<label>Isi / keterangan</label><textarea id="newAnnBody" rows="4">Diharapkan seluruh jamaah mengikuti kegiatan Masjid ARAFAH.</textarea>
<div class="form-buttons"><button class="btn green" id="saveAnnDash">💾 Simpan</button></div>
</div></article>
<article class="panel"><div class="section-title">Slide TV › Daftar Slide</div><div class="form">
<label>Tambah nama slide</label><input id="newSlide" placeholder="Contoh: Donasi Masjid">
<div class="form-buttons"><button class="btn green" id="saveSlideDash">＋ Tambah Slide</button></div>
</div></article>
<article class="panel"><div class="section-title">Status TV</div><div class="form"><div class="tv-status"><span class="status-dot"></span> TV siap menampilkan demo</div><button class="btn blue" id="openTv2">Buka Layar TV ↗</button></div></article>
</div></section>`;
}
function pages(){
return dashboard()+
`<section class="page" data-page="prayer"><div class="simple-panel"><h2>Jadwal Sholat</h2><p>Atur jadwal sholat untuk demo JWS.</p><div class="prayer-form">${state.prayer.map((p,i)=>`<label>${p[0]}<input class="prayer-input" data-i="${i}" type="time" value="${p[1]}"></label>`).join("")}</div><button class="btn green" id="savePrayer">💾 Simpan Jadwal</button></div></section>`+
`<section class="page" data-page="announcement"><div class="simple-panel"><h2>Pengumuman</h2><p>Tambah pengumuman yang tersimpan di browser.</p><label>Judul</label><input id="annTitle" placeholder="Judul pengumuman"><label>Keterangan</label><textarea id="annBody" rows="5"></textarea><button class="btn green" id="addAnn">＋ Simpan Pengumuman</button><div class="list-box">${state.announcements.map((a,i)=>`<div class="list-item"><div><b>${esc(a.title)}</b><small>${esc(a.date)}</small></div><button class="danger" data-del-ann="${i}">Hapus</button></div>`).join("")}</div></div></section>`+
`<section class="page" data-page="slides"><div class="simple-panel"><h2>Slide TV</h2><p>Kelola urutan slide yang akan ditampilkan di TV.</p><div class="inline"><input id="slideTitle" placeholder="Nama slide"><button class="btn green" id="addSlide">＋ Tambah</button></div><div class="list-box">${state.slides.map((s,i)=>`<div class="list-item"><div><b>${i+1}. ${esc(s)}</b><small>Durasi 15 detik · Aktif</small></div><button class="danger" data-del-slide="${i}">Hapus</button></div>`).join("")}</div></div></section>`+
`<section class="page" data-page="imam"><div class="simple-panel"><h2>Imam & Muadzin</h2><div class="two-form"><label>Imam Sholat<textarea rows="6">Ustadz Ahmad
Ustadz Muhammad
Ustadz Ali</textarea></label><label>Muadzin<textarea rows="6">Ahmad
Budi
Fajar</textarea></label></div><button class="btn green" id="saveGeneric">💾 Simpan</button></div></section>`+
`<section class="page" data-page="iqamah"><div class="simple-panel"><h2>Iqamah</h2><div class="iq-grid">${Object.entries(state.iqamah).map(([k,v])=>`<label>${k}<input class="iq-input" data-k="${k}" type="number" min="1" value="${v}"> menit</label>`).join("")}</div><button class="btn green" id="saveIqamah">💾 Simpan</button></div></section>`+
`<section class="page" data-page="running"><div class="simple-panel"><h2>Running Text</h2><p>Pesan ini digunakan oleh layar TV.</p><textarea id="runText" rows="6">${esc(state.running)}</textarea><button class="btn green" id="saveRunning">💾 Simpan Running Text</button></div></section>`+
`<section class="page" data-page="gallery"><div class="simple-panel"><h2>Galeri</h2><p>Demo galeri siap dikembangkan untuk upload foto kegiatan.</p><div class="gallery-demo"><div>🕌</div><div>📷</div><div>🌙</div><div>📖</div></div></div></section>`+
`<section class="page" data-page="settings"><div class="simple-panel"><h2>Pengaturan</h2><label>Nama Masjid</label><input id="mosqueInput" value="${esc(state.mosque)}"><label>Lokasi</label><input id="locInput" value="${esc(state.location)}"><button class="btn green" id="saveSettings">💾 Simpan Pengaturan</button></div></section>`+
`<section class="page" data-page="users"><div class="simple-panel"><h2>Pengguna</h2><div class="user-card"><div class="avatar">A</div><div><b>Admin Masjid</b><small>Super Admin · Demo Lokal</small></div></div><p>Autentikasi online akan ditambahkan pada tahap database.</p></div></section>`;
}
function render(){document.getElementById("pages").innerHTML=pages();bind();document.getElementById("previewMosque").textContent=state.mosque;}
function openPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.dataset.page===name));document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===name));document.querySelectorAll(".head-actions [data-page]").forEach(()=>{});document.getElementById("pageTitle").textContent=titles[name]||"Dashboard";document.getElementById("pageSubtitle").textContent=name==="dashboard"?"Selamat datang di Admin Panel JWS Masjid ARAFAH Kranji Munthang":"Kelola "+titles[name]+" Masjid ARAFAH";window.scrollTo({top:0,behavior:"smooth"});}
function toast(msg){let t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
function bind(){
document.querySelectorAll("[data-page]").forEach(x=>x.onclick=()=>openPage(x.dataset.page));
document.getElementById("openTv2")?.addEventListener("click",()=>window.open("tv.html","_blank"));
document.getElementById("saveAnnDash")?.addEventListener("click",()=>{let title=document.getElementById("newAnnTitle").value.trim();if(!title)return toast("Isi judul terlebih dahulu");state.announcements.unshift({title,date:"12 Agustus 2026 - 19 Agustus 2026",status:"Aktif"});persist();render();openPage("dashboard");toast("Pengumuman disimpan");});
document.getElementById("saveSlideDash")?.addEventListener("click",()=>{let v=document.getElementById("newSlide").value.trim();if(!v)return toast("Isi nama slide terlebih dahulu");state.slides.push(v);persist();render();openPage("dashboard");toast("Slide ditambahkan");});
document.getElementById("savePrayer")?.addEventListener("click",()=>{document.querySelectorAll(".prayer-input").forEach(x=>state.prayer[x.dataset.i][1]=x.value);persist();toast("Jadwal sholat disimpan")});
document.getElementById("addAnn")?.addEventListener("click",()=>{let v=document.getElementById("annTitle").value.trim();if(!v)return toast("Judul belum diisi");state.announcements.unshift({title:v,date:"12 Agustus 2026 - 19 Agustus 2026",status:"Aktif"});persist();render();openPage("announcement");toast("Pengumuman disimpan")});
document.querySelectorAll("[data-del-ann]").forEach(b=>b.onclick=()=>{state.announcements.splice(+b.dataset.delAnn,1);persist();render();openPage("announcement");toast("Pengumuman dihapus")});
document.getElementById("addSlide")?.addEventListener("click",()=>{let v=document.getElementById("slideTitle").value.trim();if(!v)return toast("Nama slide belum diisi");state.slides.push(v);persist();render();openPage("slides");toast("Slide ditambahkan")});
document.querySelectorAll("[data-del-slide]").forEach(b=>b.onclick=()=>{state.slides.splice(+b.dataset.delSlide,1);persist();render();openPage("slides");toast("Slide dihapus")});
document.getElementById("saveIqamah")?.addEventListener("click",()=>{document.querySelectorAll(".iq-input").forEach(x=>state.iqamah[x.dataset.k]=+x.value);persist();toast("Pengaturan iqamah disimpan")});
document.getElementById("saveRunning")?.addEventListener("click",()=>{state.running=document.getElementById("runText").value;persist();toast("Running text disimpan")});
document.getElementById("saveSettings")?.addEventListener("click",()=>{state.mosque=document.getElementById("mosqueInput").value||"MASJID ARAFAH";state.location=document.getElementById("locInput").value||"Kranji Munthang";persist();render();openPage("settings");toast("Pengaturan disimpan")});
document.getElementById("saveGeneric")?.addEventListener("click",()=>toast("Data demo disimpan"));
}
nav.addEventListener("click",e=>{let b=e.target.closest(".nav");if(b)openPage(b.dataset.page)});
document.querySelectorAll(".head-actions [data-page]").forEach(b=>b.onclick=()=>openPage(b.dataset.page));
document.getElementById("openTv").onclick=()=>window.open("tv.html","_blank");
function clock(){let d=new Date();document.getElementById("dateNow").textContent=d.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"});document.getElementById("miniClock").textContent=d.toLocaleTimeString("id-ID");}
render();openPage("dashboard");clock();setInterval(clock,1000);
