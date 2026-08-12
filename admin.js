const menuTitles={dashboard:"Dashboard",prayer:"Jadwal Sholat",announcement:"Pengumuman",slides:"Slide TV",imam:"Imam & Muadzin",iqamah:"Iqamah",running:"Running Text",gallery:"Galeri",settings:"Pengaturan",users:"Pengguna"};
const pages=[...document.querySelectorAll(".page")], nav=[...document.querySelectorAll(".nav")];
function openPage(name){pages.forEach(p=>p.classList.toggle("active",p.dataset.page===name));nav.forEach(n=>n.classList.toggle("active",n.dataset.page===name));document.getElementById("pageTitle").textContent=menuTitles[name]||"Dashboard";window.scrollTo({top:0,behavior:"smooth"});}
nav.forEach(n=>n.addEventListener("click",()=>openPage(n.dataset.page)));
document.querySelectorAll("[data-open]").forEach(x=>x.addEventListener("click",()=>openPage(x.dataset.open)));
function clock(){const d=new Date();document.getElementById("dateNow").textContent=d.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"});const t=d.toLocaleTimeString("id-ID");document.getElementById("miniClock").textContent=t;document.getElementById("serverClock").textContent=t+" WIB");}
clock();setInterval(clock,1000);
function notifySaved(){const t=document.getElementById("toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);}
const prayerData=[["Imsak","04:29"],["Subuh","04:39"],["Terbit","05:52"],["Dzuhur","11:52"],["Ashar","15:13"],["Maghrib","17:48"],["Isya","19:00"]];
document.getElementById("prayerGrid").innerHTML=prayerData.map(([n,v])=>`<label>${n}<input type="time" value="${v}"></label>`).join("");
document.getElementById("annText").value=localStorage.getItem("jws_ann")||"Diharapkan kepada seluruh jamaah untuk mengikuti kajian rutin Masjid ARAFAH Kranji Munthang.";
document.getElementById("runText").value=localStorage.getItem("jws_run")||"Mari makmurkan masjid, jaga ukhuwah, dan dirikan shalat tepat waktu.";
