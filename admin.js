const menu=[
["dashboard","⌂","Dashboard"],["prayer","☼","Jadwal Sholat"],["announcement","⚑","Pengumuman"],["slides","▣","Slide TV"],["imam","♟","Imam & Muadzin"],["iqamah","◷","Iqamah"],["running","T","Running Text"],["gallery","▧","Galeri"],["settings","⚙","Pengaturan"],["users","♙","Pengguna"]
];
const nav=document.getElementById("nav");
nav.innerHTML=menu.map(m=>`<div class="nav ${m[0]==="dashboard"?"active":""}" data-page="${m[0]}"><span class="ico">${m[1]}</span><span class="label">${m[2]}</span></div>`).join("");
document.querySelectorAll(".nav").forEach(x=>x.onclick=()=>openPage(x.dataset.page));
function openPage(name){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.querySelector(`[data-page="${name}"]`)?.classList.add("active");
 document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===name));
 const title=menu.find(x=>x[0]===name)?.[2]||"Dashboard";
 document.getElementById("pageTitle").textContent=title;
 if(name==="announcement") document.getElementById("annText").value=localStorage.getItem("jws_ann")||"Disampaikan kepada seluruh jamaah untuk mengikuti kajian rutin Masjid ARAFAH Kranji Munthang.";
 if(name==="running") document.getElementById("runText").value=localStorage.getItem("jws_run")||"Mari makmurkan masjid, jaga ukhuwah, dan dirikan shalat tepat waktu.";
}
function saveAnn(){localStorage.setItem("jws_ann",document.getElementById("annText").value);alert("Pengumuman tersimpan.");}
function saveRun(){localStorage.setItem("jws_run",document.getElementById("runText").value);alert("Running text tersimpan.");}
function saveSettings(){localStorage.setItem("jws_mosque",document.getElementById("mosqueInput").value);localStorage.setItem("jws_loc",document.getElementById("locInput").value);alert("Pengaturan tersimpan.");}
const prayers={Imsak:"04:29",Subuh:"04:39",Terbit:"05:52",Dzuhur:"11:52",Ashar:"15:13",Maghrib:"17:48",Isya:"19:00"};
document.getElementById("prayerForm").innerHTML=Object.entries(prayers).map(([k,v])=>`<label>${k}<input id="time_${k}" type="time" value="${v}"></label>`).join("");
function savePrayer(){Object.keys(prayers).forEach(k=>localStorage.setItem("jws_"+k,document.getElementById("time_"+k).value));alert("Jadwal sholat tersimpan.");}
function tick(){
 const n=new Date();
 document.getElementById("dateNow").textContent=n.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"});
 document.getElementById("miniClock").textContent=n.toLocaleTimeString("id-ID");
}
tick();setInterval(tick,1000);
