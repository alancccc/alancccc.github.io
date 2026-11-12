const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const TRACK="spotify:track:31LnSnqFhLFLD4HtIJt4te";

// cursor
const cur=document.createElement("div");cur.className="cur";cur.setAttribute("aria-hidden","true");document.body.append(cur);
addEventListener("pointermove",e=>{cur.style.transform=`translate(${e.clientX-8}px,${e.clientY-8}px)`});
document.addEventListener("pointerover",e=>cur.classList.toggle("big",!!e.target.closest("a,button,summary")));

// music dock (Bangkok by After We)
const dock=document.createElement("aside");
dock.className="dock min";dock.setAttribute("aria-label","Music player");
dock.innerHTML='<div class="hd"><span>Bangkok, After We</span><button id="tog" aria-expanded="false">Open</button></div><div class="body" id="sp"></div>';
document.body.append(dock);
let ctrl=null,want=false;
function setDock(open){dock.classList.toggle("min",!open);$("#tog").textContent=open?"Close":"Open";$("#tog").setAttribute("aria-expanded",open)}
$("#tog").onclick=()=>setDock(dock.classList.contains("min"));
window.onSpotifyIframeApiReady=api=>api.createController($("#sp"),{uri:TRACK,width:"100%",height:80},c=>{ctrl=c;c.addListener("ready",()=>{if(want)c.play()})});
const s=document.createElement("script");s.src="https://open.spotify.com/embed/iframe-api/v1";s.async=true;document.body.append(s);
// browsers only allow audio after a click, so this is called from the entry button
window.startSound=()=>{want=true;sessionStorage.snd=1;setDock(true);if(ctrl)ctrl.play()};
if(sessionStorage.snd&&!$("#gate"))setDock(true); // other pages: show the player, press play to continue
