/* ===== CONFIG — EDIT ME: name, links, form endpoint ===== */
const CONFIG={name:"MostCallMeShardy",discord:"im_shardy",discordId:"1126831477783527434" /* Shardy — must ALSO join https://discord.gg/lanyard or live status won't show */,email:"newspiderman72@gmail.com",github:"https://github.com/ItzShardy",formspree:"" /* paste https://formspree.io/f/XXXX here to go live */};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
/* preloader */
addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("done"),900));setTimeout(()=>$("#loader").classList.add("done"),3200);
const ldMsgs=["Loading chunks…","Brewing potions…","Pinging Discord…","Polishing pixels…"];let ldI=0;const ldT=setInterval(()=>{const e=$("#ldStatus");if(!e||$("#loader").classList.contains("done")){clearInterval(ldT);return}e.textContent=ldMsgs[++ldI%ldMsgs.length]},450);
/* progress + nav + top */
const fill=$("#pfill"),topBtn=$("#top"),nav=$("#nav"),secs=["about","skills","projects","services","packs","journey","faq","contact"].map(id=>document.getElementById(id));
function onScroll(){const h=document.documentElement,m=h.scrollHeight-h.clientHeight;fill.style.width=(m?h.scrollTop/m*100:0)+"%";nav.classList.toggle("small",scrollY>30);topBtn.classList.toggle("show",scrollY>600);
let cur="";secs.forEach(s=>{if(s&&scrollY>s.offsetTop-200)cur=s.id});$$("#links a").forEach(a=>a.classList.toggle("on",a.hash==="#"+cur));
const tl=$("#tl");if(tl){const r=tl.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.7-r.top)/r.height));$("#tlfill").style.height=(p*100)+"%";}
const spBg=$("#spaceBg");if(spBg&&!reduced&&scrollY<innerHeight*1.2){spBg.style.transform=`translateY(${scrollY*.15}px)`}}
let tick=false;addEventListener("scroll",()=>{if(!tick){requestAnimationFrame(()=>{onScroll();tick=false});tick=true}},{passive:true});onScroll();
topBtn.onclick=()=>scrollTo({top:0,behavior:reduced?"auto":"smooth"});
/* mobile menu */
const burger=$("#burger"),links=$("#links");burger.onclick=()=>{const o=links.classList.toggle("open");burger.setAttribute("aria-expanded",o)};links.onclick=e=>{if(e.target.tagName==="A")links.classList.remove("open")};
/* cursor + magnetic */
if(matchMedia("(hover:hover)").matches&&!reduced){const d=$("#cdot"),r=$("#cring");let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;d.style.left=mx+"px";d.style.top=my+"px";const t=e.target.closest("a,button,.proj,.chip,input,textarea");r.classList.toggle("big",!!t)});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;r.style.left=rx+"px";r.style.top=ry+"px";requestAnimationFrame(loop)})();
$$(".magnetic").forEach(b=>{b.addEventListener("mousemove",e=>{const q=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-q.left-q.width/2)*.12}px,${(e.clientY-q.top-q.height/2)*.18}px)`});b.addEventListener("mouseleave",()=>b.style.transform="")})}
/* canvas particles + parallax + confetti */
const cv=$("#stars"),cx=cv.getContext("2d");let W,H,ps=[],px=0,py=0;
function size(){const h=cv.parentElement;W=cv.width=h.offsetWidth;H=cv.height=h.offsetHeight}size();addEventListener("resize",size);
const N=reduced?0:70;for(let i=0;i<N;i++)ps.push({x:Math.random(),y:Math.random(),s:Math.random()*2.4+.6,v:Math.random()*.0006+.0002,o:Math.random()*.7+.2});
addEventListener("mousemove",e=>{px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5});
(function draw(){cx.clearRect(0,0,W,H);ps.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=1;const tw=.6+.4*Math.sin(Date.now()*.002+p.x*20);cx.globalAlpha=p.o*tw;cx.fillStyle="#c4b5fd";const X=(p.x+px*.03)*W,Y=(p.y+py*.03)*H;cx.fillRect(X,Y,p.s,p.s)});cx.globalAlpha=1;if(!reduced)requestAnimationFrame(draw)})();
let confetti=[];function burst(){for(let i=0;i<160;i++)confetti.push({x:W/2,y:H/3,vx:(Math.random()-.5)*9,vy:Math.random()*-7-2,l:80});if(confetti.length&&!burst.run){burst.run=true;(function cl(){cx.fillStyle="#8b5cf6";confetti.forEach(c=>{c.x+=c.vx;c.y+=c.vy;c.vy+=.3;c.l--;cx.globalAlpha=Math.max(0,c.l/80);cx.fillRect(c.x%W,(c.y+H)%H,5,5)});confetti=confetti.filter(c=>c.l>0);if(confetti.length)requestAnimationFrame(cl);else burst.run=false})( )}}
let seq=[];addEventListener("keydown",e=>{seq.push(e.key);seq=seq.slice(-10);if(seq.join(",").includes("ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a")){burst();seq=[]}});
/* typewriter */
/* role cycler (Morphext-style vertical rotator, vanilla, seamless loop) */
(function(){const list=$("#roleList");if(!list||reduced)return;list.appendChild(list.children[0].cloneNode(true));const n=list.children.length-1;let i=0;
setInterval(()=>{i++;const h=list.children[0].getBoundingClientRect().height;list.style.transform=`translateY(${-i*h}px)`;
if(i===n){list.addEventListener("transitionend",function rst(){list.removeEventListener("transitionend",rst);list.style.transition="none";list.style.transform="translateY(0)";i=0;requestAnimationFrame(()=>{list.style.transition=""})},{once:true})}},2200)})();
/* view transitions wrapper (gallery-style morphs, instant fallback elsewhere) */
const vt=fn=>{if(document.startViewTransition&&!reduced){document.startViewTransition(fn)}else{fn()}};
/* reveal + counters + xp */
/* split-text reveals (chars cascade when their heading scrolls in; skipped under reduced motion) */
function split(el){const t=el.textContent;el.setAttribute("aria-label",t);el.textContent="";[...t].forEach((c,i)=>{const s=document.createElement("span");s.className="ch";s.style.setProperty("--i",i);s.textContent=c;s.setAttribute("aria-hidden","true");el.appendChild(s)})}
if(!reduced){const heroH=document.querySelector(".hero-name");if(heroH)split(heroH)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(e.target.tagName==="H2"&&!e.target.dataset.split&&!reduced){split(e.target);e.target.dataset.split=1}e.target.classList.add("in");io.unobserve(e.target);
if(e.target.querySelector("[data-count]")||e.target.hasAttribute("data-count")){};
e.target.querySelectorAll(".xp i").forEach(i=>i.style.width=i.dataset.w+"%");
if(e.target.classList.contains("skill"))e.target.querySelector(".xp i").style.width=e.target.querySelector(".xp i").dataset.w+"%"}}),{threshold:.15});
$$(".rv").forEach(el=>io.observe(el));$$(".xp i").forEach(i=>io.observe(i.closest(".skill")||i));
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const b=e.target,end=+b.dataset.count,t0=performance.now();
(function tick2(t){const p=Math.min(1,(t-t0)/1200);b.textContent=Math.round(end*(reduced?1:1-Math.pow(1-p,3)));if(p<1&&!reduced)requestAnimationFrame(tick2)})(t0);cio.unobserve(b)}),{threshold:.5});
$$("[data-count]").forEach(b=>cio.observe(b));
/* tilt */
if(matchMedia("(hover:hover)").matches&&!reduced)$$(".tilt").forEach(c=>{c.addEventListener("mousemove",e=>{const q=c.getBoundingClientRect(),x=(e.clientX-q.left)/q.width-.5,y=(e.clientY-q.top)/q.height-.5;c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg)`;c.style.setProperty("--gx",(x+.5)*100+"%");c.style.setProperty("--gy",(y+.5)*100+"%")});c.addEventListener("mouseleave",()=>c.style.transform="")});
/* filters + modal */
$$(".chip[data-f]").forEach(ch=>ch.onclick=()=>{$$(".chip[data-f]").forEach(c=>c.classList.remove("on"));ch.classList.add("on");const f=ch.dataset.f;
vt(()=>{$$("#grid .proj").forEach(p=>{p.style.display=(f==="all"||p.dataset.cat===f)?"":"none"})})});
const modal=$("#modal");function openM(t,d,g){$("#mTitle").textContent=t;$("#mDesc").textContent=d;$("#mTags").textContent=g;vt(()=>modal.classList.add("open"));$("#mClose").focus()}
function closeM(){vt(()=>modal.classList.remove("open"))}$$("#grid .proj").forEach(p=>{p.tabIndex=0;p.setAttribute("role","button");p.onclick=()=>openM(p.dataset.title,p.dataset.desc,p.dataset.tags);p.onkeydown=e=>{if(e.key==="Enter")openM(p.dataset.title,p.dataset.desc,p.dataset.tags)}});
$("#mClose").onclick=closeM;modal.onclick=e=>{if(e.target===modal)closeM()};addEventListener("keydown",e=>{if(e.key==="Escape"){closeM();links.classList.remove("open")}});
document.querySelectorAll(".glyphs,.enchant").forEach(()=>{});
/* before/after */
const mcR=$("#mcRange");if(mcR){const top=$("#mcTop"),knob=$("#mcKnob"),fb=$("#mcFallback");let failed=0;
const upd=()=>{const v=mcR.value;top.style.clipPath=`inset(0 ${100-v}% 0 0)`;knob.style.left=v+"%"};mcR.oninput=upd;upd();
["mcOn","mcOff"].forEach(id=>{const im=document.getElementById(id);if(!im)return;const dead=()=>{failed++;im.style.display="none";if(failed>=2){fb.style.display="block";mcR.style.display="none";knob.style.display="none"}};if(im.complete&&!im.naturalWidth)dead();im.onerror=dead})};
/* form */
$("#copyD").onclick=async()=>{try{await navigator.clipboard.writeText(CONFIG.discord);$("#copyMsg").textContent="Copied Discord: "+CONFIG.discord}catch{$("#copyMsg").textContent="Discord: "+CONFIG.discord}};
/* live Discord presence via Lanyard (guns.lol-style). Needs CONFIG.discordId + user in lanyard server */
async function presence(){const st=$("#pStatus"),act=$("#pActivity"),dot=$("#pDot"),img=$("#pAvatar"),nm=$("#pName"),live=$("#pLive");if(!st)return;
if(!CONFIG.discordId){st.textContent="live status needs my Discord ID — DMs open anyway";return}
try{const r=await fetch("https://api.lanyard.rest/v1/users/"+CONFIG.discordId);const j=await r.json();if(!j.success)throw 0;
const u=j.data.discord_user,s=j.data.discord_status;
img.src=u.avatar?`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128`:`https://cdn.discordapp.com/embed/avatars/${(+u.discriminator||0)%5}.png`;
nm.textContent=u.global_name||u.username;st.textContent="@"+u.username+" · "+s;dot.className="dot-"+s;live.style.display=s==="offline"?"none":"";
const sp=j.data.listening_to_spotify&&j.data.spotify,game=(j.data.activities||[]).find(a=>a.type===0);
if(sp)act.textContent="♪ "+j.data.spotify.song+" — "+j.data.spotify.artist;
else if(game)act.textContent="▶ "+game.name+(game.details?" — "+game.details:"");
else act.textContent=s==="offline"?"Offline — DMs still open, I reply fast.":"Online — say hi.";
}catch{st.textContent="status unavailable";act.textContent="Discord DMs still open: "+CONFIG.discord;dot.className="dot-offline"}}
presence();setInterval(presence,30000);
const theme=$("#theme"),mus=$("#music");mus.onclick=()=>{if(theme.paused){theme.play().catch(()=>{});mus.classList.add("on");mus.setAttribute("aria-pressed","true");mus.setAttribute("aria-label","Pause site music");mus.title="Pause music"}else{theme.pause();mus.classList.remove("on");mus.setAttribute("aria-pressed","false");mus.setAttribute("aria-label","Play site music");mus.title="Play music"}};
$("#form").onsubmit=async e=>{e.preventDefault();let ok=true;
const v=(id,eid,test)=>{const val=$(id).value.trim();$(eid).textContent=test(val)?"":"⚠ "+$(eid).id.replace("e-","")+" needs attention";if(test(val)){}else ok=false};
v("#fname","#e-name",x=>x.length>1);v("#fmail","#e-mail",x=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));v("#fmsg","#e-msg",x=>x.length>9);
if(!ok)return;if(!CONFIG.formspree){$("#formOk").style.display="block";return}
const r=await fetch(CONFIG.formspree,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({name:$("#fname").value,email:$("#fmail").value,message:$("#fmsg").value})});
$("#formOk").style.display="block";$("#formOk").textContent=r.ok?"✓ Sent! I'll reply soon.":"⚠ Send failed — email me directly instead."};
