(function(){
var d=document,w=window,$=function(i){return d.getElementById(i)},de=d.documentElement;
var SH=w.SH={extra:0,calm:false,boost:0,ticks:[]};
var FORMSPREE="https://formspree.io/f/mppqragj"; /* live contact endpoint */
/* ---------- page transition ---------- */
requestAnimationFrame(function(){requestAnimationFrame(function(){de.classList.remove("wp")})});
w.addEventListener("pageshow",function(e){if(e.persisted)de.classList.remove("wp","lv")});
d.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");
if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute("download"))return;
if(a.origin!==location.origin||a.pathname===location.pathname||!/^https?:/.test(a.href))return;
e.preventDefault();try{sessionStorage.setItem("wp","1")}catch(x){}de.classList.add("lv");setTimeout(function(){location.href=a.href},520)});
/* ---------- sound ---------- */
var au=new Audio("assets/theme.mp3"),snd=$("snd"),on=false;au.loop=true;au.volume=.4;
function setSnd(v){on=v;try{sessionStorage.setItem("snd",v?"1":"0")}catch(e){}snd.textContent=v?"♪ On":"♪ Off";
try{if(v){try{au.currentTime=+sessionStorage.getItem("at")||0}catch(e){}var p=au.play();if(p&&p.catch)p.catch(function(){on=false;snd.textContent="♪ Off"})}else au.pause()}catch(e){}}
snd.onclick=function(){setSnd(!on)};
w.addEventListener("pagehide",function(){try{sessionStorage.setItem("at",au.currentTime)}catch(e){}});
try{if(sessionStorage.getItem("snd")==="1")setSnd(true)}catch(e){}
/* ---------- menu, reveal, counters ---------- */
if($("menu"))$("menu").onclick=function(){$("nav").classList.toggle("open")};
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add("in");
e.target.querySelectorAll("[data-w]").forEach(function(b){b.style.width=b.dataset.w+"%"});
e.target.querySelectorAll("[data-n]").forEach(function(n){var t=+n.dataset.n,k=0;if(!t)return;var iv=setInterval(function(){n.textContent=++k;if(k>=t)clearInterval(iv)},260)});io.unobserve(e.target)})},{threshold:.12});
function watch(){d.querySelectorAll(".rv").forEach(function(el){io.observe(el)})}
/* ---------- animated background: endless neon star tunnel ---------- */
var bf=$("bgfx"),bgi=$("bgi"),bx=bf.getContext("2d"),BW=0,BH=0,DUST=[],RM=matchMedia("(prefers-reduced-motion:reduce)").matches,mx=0,my=0,smx=0,smy=0,i;
var CFS={star:{t:"star",c:[["#e11dff","#ffd6ff"],["#7c3aed","#c9b8ff"]],a:.85,rot:1,dust:"#f0a8ff",dz:1,n:70},
star2:{t:"star",c:[["#6d5bff","#dcd6ff"],["#c026ff","#f5d0ff"]],a:.6,rot:1,dust:"#c9c0ff",dz:1,n:70},
sky:{t:"spark",c:[["#7aa2ff","#ffffff"],["#a98bff","#f3ecff"]],a:.32,rot:.35,dust:"#dbe7ff",dz:1.3,n:120,tw:1},
shard:{t:"shard",c:[["#c026ff","#ffd6ff"],["#6d28d9","#d9c9ff"]],a:.38,rot:1.5,dust:"#f0b4ff",dz:1,n:70},
pixel:{t:"pixel",c:[["#b86bff","#f3d9ff"],["#7c3aed","#d9c2ff"]],a:.3,rot:0,dust:"#e6c8ff",dz:3,n:60,sq:1},
nova:{t:"burst",c:[["#e11dff","#ffffff"],["#8b5cf6","#f3e8ff"]],a:.34,rot:.8,dust:"#ffffff",dz:1.4,n:90},
crystal:{t:"cross",c:[["#7c6cff","#ffffff"],["#c026ff","#f5e0ff"]],a:.3,rot:1,dust:"#c9b8ff",dz:1,n:70}},
CF=CFS[d.body.dataset.bg]||CFS.star;
function shape(y,t){var q,a,rr;
if(t==="star"){for(q=0;q<10;q++){rr=q%2?78:204;a=-Math.PI/2+q*Math.PI/5;y[q?"lineTo":"moveTo"](Math.cos(a)*rr,Math.sin(a)*rr)}y.closePath()}
else if(t==="spark"||t==="cross"){var inn=t==="spark"?26:70,o=t==="spark"?0:Math.PI/4;for(q=0;q<8;q++){rr=q%2?inn:212;a=-Math.PI/2+o+q*Math.PI/4;y[q?"lineTo":"moveTo"](Math.cos(a)*rr,Math.sin(a)*rr)}y.closePath()}
else if(t==="shard"){for(q=0;q<3;q++){a=q*Math.PI/3;var ca=Math.cos(a),sa=Math.sin(a);
function P(px,py){return[px*ca-py*sa,px*sa+py*ca]}
var p0=P(0,-215),p1=P(30,0),p2=P(0,215),p3=P(-30,0);y.moveTo(p0[0],p0[1]);y.lineTo(p1[0],p1[1]);y.lineTo(p2[0],p2[1]);y.lineTo(p3[0],p3[1]);y.closePath()}}
else if(t==="pixel"){y.rect(-170,-170,340,340);y.rect(-24,-226,48,48);y.rect(-24,178,48,48);y.rect(-226,-24,48,48);y.rect(178,-24,48,48)}
else if(t==="burst"){for(q=0;q<14;q++){a=q*Math.PI/7+(q%3)*.05;rr=q%3===0?214:q%3===1?150:186;y.moveTo(Math.cos(a)*46,Math.sin(a)*46);y.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}}}
function mk(t,c1,c2){var s=d.createElement("canvas");s.width=s.height=512;var y=s.getContext("2d");y.translate(256,256);
for(var ps=0;ps<2;ps++){y.beginPath();shape(y,t);y.lineJoin=t==="pixel"?"miter":"round";y.lineCap="round";y.shadowColor=c1;y.shadowBlur=ps?6:34;y.strokeStyle=ps?c2:c1;y.lineWidth=ps?3:12;y.stroke()}return s}
var SPR=[mk(CF.t,CF.c[0][0],CF.c[0][1]),mk(CF.t,CF.c[1][0],CF.c[1][1])];
function rs(){BW=bf.width=Math.round(innerWidth*.6);BH=bf.height=Math.round(innerHeight*.6)}rs();w.addEventListener("resize",rs);
for(i=0;i<CF.n;i++)DUST.push({a:Math.random()*6.283,r:Math.random()*600,v:.2+Math.random()*.8});
w.addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
var last=0,T=0,sp=1,ly=0,sv=0;
function bgDraw(dt,k){
sv+=(Math.min(Math.abs(scrollY-ly)*.12,5)-sv)*Math.min(1,dt*6);ly=scrollY;
var tg=SH.calm?.12:1+SH.extra+sv+SH.boost;sp+=(tg-sp)*Math.min(1,dt*3.5);SH.boost*=Math.pow(.93,k);
T+=dt*sp*.07*(RM?.2:1);smx+=(mx-smx)*Math.min(1,dt*3);smy+=(my-smy)*Math.min(1,dt*3);if(bgi)bgi.style.translate=(-smx*28).toFixed(1)+"px "+(-smy*28).toFixed(1)+"px";
var cx0=BW/2+smx*BW*.05,cy0=BH*.5+smy*BH*.05,M=Math.max(BW,BH)*1.9,n;
bx.globalCompositeOperation="source-over";bx.globalAlpha=1;bx.clearRect(0,0,BW,BH);bx.globalCompositeOperation="lighter";
for(n=0;n<9;n++){var s=(T+n/9)%1,dd=40+Math.pow(s,2.3)*M;bx.globalAlpha=Math.sin(Math.PI*s)*CF.a;bx.save();bx.translate(cx0,cy0);bx.rotate(((n%2?1:-1)*(T*2.2+n*.7)+s*.5)*CF.rot);bx.drawImage(SPR[n%2],-dd/2,-dd/2,dd,dd);bx.restore()}
bx.fillStyle=CF.dust;var far=Math.hypot(BW,BH)*.6;
for(n=0;n<DUST.length;n++){var p=DUST[n];p.r+=(.4+p.r*.012)*p.v*sp*k;if(p.r>far){p.r=0;p.a=Math.random()*6.283}bx.globalAlpha=Math.min(1,p.r/80)*.7*(CF.tw?.5+.5*Math.sin(T*70+n*1.9):1);var z=(1+p.r*.004)*CF.dz;if(CF.sq)z=Math.max(3,Math.round(z/3)*3);bx.fillRect(cx0+Math.cos(p.a)*p.r,cy0+Math.sin(p.a)*p.r,z,z)}}
function loop(now){var dt=Math.min(.05,(now-(last||now))/1000),k=dt*60;last=now;bgDraw(dt,k);
for(var n=0;n<SH.ticks.length;n++)SH.ticks[n](now,dt,k);requestAnimationFrame(loop)}
requestAnimationFrame(loop);
/* ---------- ABOUT: skills ---------- */
if($("sk")){var SK=[["Java",90,"Events, schedulers, configs, clean reloads."],["Paper API",80,"Commands, GUIs, persistence, minigames."],["Fabric",60,"Client mixins, HUDs, keybinds, toggles."],["Resource Packs",85,"Merges, versioning, custom textures."],["Git &amp; Tooling",65,"Repos, releases, launcher scripts."],["Video Editing",80,"Montages, replays, overlays, thumbnails."]];
SK.forEach(function(s){var x=d.createElement("div");x.className="card skill";x.innerHTML="<h3>"+s[0]+"<span class='mono'>"+s[1]+"%</span></h3><p>"+s[2]+"</p><div class='bar'><i data-w='"+s[1]+"'></i></div>";$("sk").appendChild(x)})}
watch();
/* ---------- PACKS: before/after slider ---------- */
if($("cmp")){var c=$("cmp"),t2=$("top2"),hb=$("hb"),dr=false;
function mv(x){var b=c.getBoundingClientRect(),p=Math.max(0,Math.min(100,(x-b.left)/b.width*100));t2.style.clipPath="inset(0 0 0 "+p+"%)";hb.style.left=p+"%"}
c.addEventListener("pointerdown",function(e){dr=true;mv(e.clientX)});w.addEventListener("pointermove",function(e){if(dr)mv(e.clientX)});w.addEventListener("pointerup",function(){dr=false})}
/* ---------- CONTACT ---------- */
if($("form")){$("form").onsubmit=function(e){e.preventDefault();var f=e.target,ok=$("ok");
var nm=f.elements.name.value.trim(),ml=f.elements.email.value.trim(),ms=f.elements.message.value.trim();
var sv=f.elements.server?f.elements.server.value.trim():"",pl=f.elements.players?f.elements.players.value.trim():"",fl=f.elements.feel?f.elements.feel.value.trim():"";
if(nm.length<2||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ml)||ms.length<10){ok.style.display="block";ok.textContent="Please fill your name, a valid email and 10+ characters.";return}
if(!FORMSPREE){ok.style.display="block";ok.textContent="Looks good! Hook up Formspree to actually deliver this.";return}
ok.style.display="block";ok.textContent="Sending…";
fetch(FORMSPREE,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({name:nm,email:ml,message:ms,server:sv,players:pl,feel:fl})}).then(function(r){ok.textContent=r.ok?"Sent! I reply fast.":"Send failed — email me directly instead."}).catch(function(){ok.textContent="Send failed — email me directly instead."})}};
if($("copy"))$("copy").onclick=function(){var b=this;try{navigator.clipboard.writeText("im_shardy")}catch(e){}b.textContent="Copied";setTimeout(function(){b.textContent="Copy"},1400)}
/* ---------- DISCORD presence (Lanyard) ---------- */
(function(){var st=$("pStatus");if(!st)return;var act=$("pActivity"),dot=$("pDot"),img=$("pAvatar"),nm=$("pName"),live=$("pLive");
function show(){var r=new XMLHttpRequest();r.open("GET","https://api.lanyard.rest/v1/users/1126831477783527434",true);r.onload=function(){try{var j=JSON.parse(r.responseText);if(!j.success)throw 0;
var u=j.data.discord_user,s=j.data.discord_status;
img.src=u.avatar?("https://cdn.discordapp.com/avatars/"+u.id+"/"+u.avatar+".png?size=128"):("https://cdn.discordapp.com/embed/avatars/"+((+u.discriminator||0)%5)+".png");
nm.textContent=u.global_name||u.username;st.textContent="@"+u.username+" · "+s;dot.className="dot-"+s;live.style.display=s==="offline"?"none":"";
var sp=j.data.listening_to_spotify&&j.data.spotify,gm=null,i,ac=j.data.activities||[];
for(i=0;i<ac.length;i++){if(ac[i].type===0){gm=ac[i];break}}
if(sp)act.textContent="♪ "+j.data.spotify.song+" — "+j.data.spotify.artist;
else if(gm)act.textContent="▶ "+gm.name+(gm.details?" — "+gm.details:"");
else act.textContent=s==="offline"?"Offline — DMs still open.":"Online — say hi."}catch(e){st.textContent="status unavailable";act.textContent="DMs open: im_shardy"}};r.onerror=function(){st.textContent="status unavailable";act.textContent="DMs open: im_shardy"};r.send()}
show();setInterval(show,30000)})();
/* ---------- WORK: 3D tunnel gallery ---------- */
if($("tun")){var tun=$("tun"),tc=[].slice.call($("cam").children),NC=tc.length,tunTop=0,tunH=0,pp=0,lastpp=-1,lastIdx=-1;
function tunLayout(){tunTop=tun.getBoundingClientRect().top+scrollY;tunH=tun.offsetHeight-innerHeight}
function tunnel(p){var cz=p*(NC-1)*1100+250,sx=innerWidth<820?.1:.2,idx=0,best=1e9;
tc.forEach(function(c,i){var z=-i*1100+cz,x=i===0?0:(i%2?1:-1)*innerWidth*sx,y=((i%3)-1)*40,o=Math.max(0,Math.min(1,(z+3300)/1500))*Math.max(0,Math.min(1,(600-z)/500));
c.style.transform="translate(-50%,-50%) translate3d("+x+"px,"+y+"px,"+z+"px)";c.style.opacity=o;c.style.pointerEvents=(o>.6&&z>-500)?"auto":"none";if(Math.abs(z)<best){best=Math.abs(z);idx=i}});
if(idx!==lastIdx){lastIdx=idx;$("ti").textContent="0"+(idx+1);$("tt").textContent=tc[idx].dataset.t}
$("tb").style.transform="scaleX("+p+")"}
w.addEventListener("resize",tunLayout);w.addEventListener("load",tunLayout);
if(w.ResizeObserver)new ResizeObserver(tunLayout).observe(d.body);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(tunLayout);tunLayout();
SH.ticks.push(function(now,dt){if(tunH<=0)return;var tp=Math.max(0,Math.min(1,(scrollY-tunTop)/tunH));pp+=(tp-pp)*Math.min(1,dt*7);if(Math.abs(tp-pp)<.0004)pp=tp;
if(pp!==lastpp&&scrollY>tunTop-innerHeight&&scrollY<tunTop+tunH+innerHeight){tunnel(pp);lastpp=pp}})}
/* ---------- HOME: spin, freeze, break ---------- */
if($("hero")){
var hero=$("hero"),star=$("star"),hint=$("hint"),mf=$("mf"),fx=$("fx"),cx=fx.getContext("2d");
var ang=0,vel=0,en=0,frozen=false,state="wait",sc=0,t0=performance.now(),parts=[],cur="",N=0,dirty=false;
var H={grow:"Growing…",play:"Use the arrow keys or drag to spin the crystal. Keep spinning to freeze it, then press Enter to break it.",frozen:"Frozen. Press Enter to break it and take a photo.",photo:"Swipe the photo up, or press ↑, to add it to the album."};
function say(k){hint.textContent=H[k]}say("grow");
var R=$("rows"),r,s,j;for(i=0;i<8;i++){r=d.createElement("div");r.className="row";r.style.animationDuration=(46+i*7)+"s";for(j=0;j<12;j++){s=d.createElement("span");s.textContent="SHARDY";r.appendChild(s)}R.appendChild(r)}
var A=[],tab="new";try{A=JSON.parse(localStorage.getItem("shardy-album")||"[]")}catch(e){A=[]}N=A.length;
function save(){try{localStorage.setItem("shardy-album",JSON.stringify(A.slice(0,30)))}catch(e){}}
function render(){$("cnt").textContent=A.length;var g=$("grid");g.innerHTML="";var L=A.filter(function(a){return tab==="new"||a.like});
if(!L.length){g.innerHTML="<p style='color:var(--mute)'>"+(tab==="new"?"No crystals yet. Spin, freeze and break one.":"Nothing liked yet.")+"</p>";return}
L.forEach(function(a){var f=d.createElement("div");f.className="ph";f.innerHTML="<img src='"+a.src+"' alt='Crystal'><button class='"+(a.like?"on":"")+"' aria-label='Like'>♥</button>";f.querySelector("button").onclick=function(){a.like=!a.like;save();render()};g.appendChild(f)})}
render();
$("albBtn").onclick=function(){$("alb").classList.add("on");render()};$("close").onclick=function(){$("alb").classList.remove("on")};
d.querySelectorAll(".tabs button").forEach(function(b){b.onclick=function(){d.querySelectorAll(".tabs button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");tab=b.dataset.t;render()}});
function snap(){var W=420,Hh=520,c=d.createElement("canvas");c.width=W;c.height=Hh;var x=c.getContext("2d"),bi=$("bgi"),k=Math.max(W/bi.naturalWidth,Hh/bi.naturalHeight);
x.drawImage(bi,(W-bi.naturalWidth*k)/2,(Hh-bi.naturalHeight*k)/2,bi.naturalWidth*k,bi.naturalHeight*k);x.fillStyle="rgba(0,0,0,.3)";x.fillRect(0,0,W,Hh);
var S=360,t=d.createElement("canvas");t.width=t.height=S;var y=t.getContext("2d");
try{y.filter=frozen?"brightness(1.3)":"hue-rotate(95deg) saturate(1.7) brightness(1.1)"}catch(e){}
y.translate(S/2,S/2);y.rotate(ang*Math.PI/180);y.drawImage(star,-S/2,-S/2,S,S);y.setTransform(1,0,0,1,0,0);y.filter="none";
y.globalCompositeOperation="destination-in";var gr=y.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);gr.addColorStop(.5,"#000");gr.addColorStop(1,"rgba(0,0,0,0)");y.fillStyle=gr;y.fillRect(0,0,S,S);
x.globalCompositeOperation="screen";x.drawImage(t,(W-S)/2,(Hh-S)/2-10,S,S);try{return c.toDataURL("image/jpeg",.7)}catch(e){return ""}}
function size(){fx.width=innerWidth;fx.height=innerHeight}size();w.addEventListener("resize",size);
function burst(){var b=$("stage").getBoundingClientRect(),x0=b.left+b.width/2,y0=b.top+b.height/2,C=["#ffffff","#e11dff","#9fe8ff","#7c3aed","#f0a8ff"];
for(var n=0;n<110;n++){var a=Math.random()*6.283,v=3+Math.random()*13;parts.push({x:x0,y:y0,vx:Math.cos(a)*v,vy:Math.sin(a)*v-2,r:Math.random()*6.28,vr:(Math.random()-.5)*.4,s:6+Math.random()*20,c:C[n%5],l:1})}}
function drawParts(){cx.clearRect(0,0,fx.width,fx.height);
for(var n=parts.length-1;n>=0;n--){var p=parts[n];p.x+=p.vx;p.y+=p.vy;p.vy+=.28;p.vx*=.99;p.r+=p.vr;p.l-=.011;if(p.l<=0){parts.splice(n,1);continue}
cx.save();cx.globalAlpha=p.l;cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.shadowColor=p.c;cx.shadowBlur=14;cx.beginPath();cx.moveTo(0,-p.s);cx.lineTo(p.s*.7,p.s*.6);cx.lineTo(-p.s*.5,p.s*.4);cx.closePath();cx.fill();cx.restore()}}
function ease(t){var c=1.4;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)}
function enter(snd0){$("gate").classList.add("off");t0=performance.now();state="grow";try{sessionStorage.setItem("gate","1")}catch(e){}if(snd0!==null)setSnd(snd0)}
$("gs").onclick=function(){enter(true)};$("gn").onclick=function(){enter(false)};
try{if(sessionStorage.getItem("gate")==="1")enter(null)}catch(e){}
SH.ticks.push(function(now,dt,k){
if(state==="wait"){sc=0;ang=-260}
else if(state==="grow"){var g=Math.min(1,(now-t0)/2400);sc=ease(g);ang=(1-g)*(1-g)*-260;star.style.opacity=g<1?Math.min(1,g*2.5):"";if(g>=1){state="play";say("play")}}
else if(state==="play"){ang+=vel*k;vel*=Math.pow(frozen?.86:.985,k);if(!frozen){en+=(Math.abs(vel)*.0007-.0005)*k;en=Math.max(0,Math.min(1,en));if(en>=1){frozen=true;hero.classList.add("frozen");say("frozen")}}}
star.style.transform="rotate("+ang+"deg) scale("+Math.max(sc,0)+")";mf.style.transform="scaleX("+en+")";
SH.extra=Math.min(Math.abs(vel),16)*.3;SH.calm=frozen&&state==="play";
if(parts.length){drawParts();dirty=true}else if(dirty){cx.clearRect(0,0,fx.width,fx.height);dirty=false}});
function spin(v){if(state!=="play"||frozen)return;vel=Math.max(-16,Math.min(16,vel+v))}
function shatter(){if(state!=="play")return;
if(!frozen){say("play");hint.classList.remove("shake");void hint.offsetWidth;hint.classList.add("shake");return}
state="broken";cur=snap();burst();SH.boost=9;$("flash").classList.remove("on");void $("flash").offsetWidth;$("flash").classList.add("on");star.classList.add("gone");hero.classList.remove("frozen");
setTimeout(function(){$("pimg").src=cur;$("pnum").textContent="#"+(N+1);$("photo").classList.remove("up");$("photo").classList.add("show");$("pbtn").classList.add("show");state="photo";say("photo")},900)}
function regrow(){$("photo").classList.remove("show","up");$("pbtn").classList.remove("show");star.classList.remove("gone");ang=0;vel=0;en=0;frozen=false;sc=0;state="grow";t0=performance.now();say("grow")}
function add(){if(state!=="photo")return;state="added";N++;if(cur)A.unshift({src:cur,like:false});save();render();$("photo").classList.add("up");$("pbtn").classList.remove("show");setTimeout(regrow,900)}
function skip(){if(state!=="photo")return;state="added";$("photo").classList.remove("show");$("pbtn").classList.remove("show");setTimeout(regrow,400)}
$("brk").onclick=shatter;$("padd").onclick=add;$("pskip").onclick=skip;
w.addEventListener("keydown",function(e){var t=e.target.tagName;if(/INPUT|TEXTAREA/.test(t)||(/BUTTON|SUMMARY|A/.test(t)&&e.key==="Enter"))return;
if(e.key==="Escape")$("alb").classList.remove("on");
if(e.key==="ArrowLeft")spin(-1.8);else if(e.key==="ArrowRight")spin(1.8);else if(e.key==="Enter")shatter();else if(e.key==="ArrowUp"&&state==="photo"){e.preventDefault();add()}else if(e.key==="ArrowDown"&&state==="photo")skip()});
var px=null;hero.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;px=e.clientX;hero.style.cursor="grabbing"});
w.addEventListener("pointermove",function(e){if(px===null)return;spin((e.clientX-px)*.35);px=e.clientX});
w.addEventListener("pointerup",function(){px=null;hero.style.cursor=""});
var py=null;$("photo").addEventListener("pointerdown",function(e){py=e.clientY});w.addEventListener("pointerup",function(e){if(py!==null&&py-e.clientY>60)add();py=null})}
})();
