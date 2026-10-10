(function(){
var d=document,w=window,$=function(i){return d.getElementById(i)},de=d.documentElement;
var SH=w.SH={extra:0,calm:false,boost:0,ticks:[]};
/* ---------- page transition ---------- */
requestAnimationFrame(function(){requestAnimationFrame(function(){de.classList.remove("wp")})});
w.addEventListener("pageshow",function(e){if(e.persisted)de.classList.remove("wp","lv")});
d.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");
if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute("download"))return;
if(a.origin!==location.origin||a.pathname===location.pathname||!/^https?:/.test(a.href))return;
e.preventDefault();if(w.SFX)w.SFX.whoosh();try{sessionStorage.setItem("wp","1")}catch(x){}de.classList.add("lv");setTimeout(function(){location.href=a.href},520)});
/* ---------- sound ---------- */
var au=new Audio("assets/theme.mp3"),snd=$("snd"),on=false;au.loop=true;au.volume=.4;
function setSnd(v){on=v;try{sessionStorage.setItem("snd",v?"1":"0")}catch(e){}snd.textContent=v?"♪ On":"♪ Off";
try{if(v){try{au.currentTime=+sessionStorage.getItem("at")||0}catch(e){}var p=au.play();if(p&&p.catch)p.catch(function(){on=false;snd.textContent="♪ Off"})}else au.pause()}catch(e){}}
snd.onclick=function(){setSnd(!on);if(on&&w.SFX)w.SFX.click()};
w.addEventListener("pagehide",function(){try{sessionStorage.setItem("at",au.currentTime)}catch(e){}});
try{if(sessionStorage.getItem("snd")==="1")setSnd(true)}catch(e){}
/* ---------- sound effects (synthesized, no files) ---------- */
var AC=null;
function ac(){if(!AC){var C=w.AudioContext||w.webkitAudioContext;if(C)AC=new C()}if(AC&&AC.state==="suspended")AC.resume();return AC}
function tone(f1,f2,dur,vol,type){if(!on)return;var a=ac();if(!a)return;var o=a.createOscillator(),g=a.createGain(),t=a.currentTime;o.type=type||"sine";o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(f2,t+dur);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}
w.SFX={click:function(){tone(640,380,.09,.06,"triangle")},pop:function(){tone(240,50,.3,.14,"sine")},
whoosh:function(){if(!on)return;var a=ac();if(!a)return;var t=a.currentTime,n=a.createBuffer(1,Math.floor(a.sampleRate*.7),a.sampleRate),dd=n.getChannelData(0),k;for(k=0;k<dd.length;k++)dd[k]=Math.random()*2-1;
var s=a.createBufferSource(),b=a.createBiquadFilter(),g=a.createGain();s.buffer=n;b.type="bandpass";b.Q.value=.9;b.frequency.setValueAtTime(300,t);b.frequency.exponentialRampToValueAtTime(3200,t+.55);
g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.15);g.gain.exponentialRampToValueAtTime(.0001,t+.62);s.connect(b);b.connect(g);g.connect(a.destination);s.start(t)}};
d.addEventListener("click",function(e){var x=e.target.closest&&e.target.closest("a,button,.opt");if(x&&x.id!=="snd")w.SFX.click()});
/* ---------- day / night ---------- */
var thm=$("thm");
function paintTheme(){var l=de.dataset.theme==="light";thm.textContent=l?"☾ Night":"☀ Day";thm.setAttribute("aria-label",l?"Switch to night mode":"Switch to day mode");var m=d.querySelector("meta[name=theme-color]");if(m)m.content=l?"#f6f2fc":"#0b0713"}
thm.onclick=function(){var l=de.dataset.theme==="light"?"dark":"light";de.classList.add("tx");de.dataset.theme=l;try{localStorage.setItem("theme",l)}catch(e){}paintTheme();setTimeout(function(){de.classList.remove("tx")},600)};
paintTheme();
/* ---------- menu, reveal, counters ---------- */
if($("menu"))$("menu").onclick=function(){$("nav").classList.toggle("open")};
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add("in");
e.target.querySelectorAll("[data-w]").forEach(function(b){b.style.width=b.dataset.w+"%"});
e.target.querySelectorAll("[data-n]").forEach(function(n){var t=+n.dataset.n,k=0;if(!t)return;var iv=setInterval(function(){n.textContent=++k;if(k>=t)clearInterval(iv)},260)});io.unobserve(e.target)})},{threshold:.12});
function watch(){d.querySelectorAll(".rv").forEach(function(el){io.observe(el)})}
/* ---------- animated background: endless neon star tunnel ---------- */
var bf=$("bgfx"),bx=bf.getContext("2d"),BW=0,BH=0,DUST=[],RM=matchMedia("(prefers-reduced-motion:reduce)").matches,mx=0,my=0,smx=0,smy=0,i;
function mk(c1,c2){var s=d.createElement("canvas");s.width=s.height=512;var y=s.getContext("2d");y.translate(256,256);
for(var ps=0;ps<2;ps++){y.beginPath();for(var q=0;q<10;q++){var rr=q%2?78:204,a=-Math.PI/2+q*Math.PI/5;y[q?"lineTo":"moveTo"](Math.cos(a)*rr,Math.sin(a)*rr)}y.closePath();y.lineJoin="round";y.shadowColor=c1;y.shadowBlur=ps?6:34;y.strokeStyle=ps?c2:c1;y.lineWidth=ps?3:12;y.stroke()}return s}
var SPR=[mk("#e11dff","#ffd6ff"),mk("#7c3aed","#c9b8ff")];
function rs(){BW=bf.width=Math.round(innerWidth*.6);BH=bf.height=Math.round(innerHeight*.6)}rs();w.addEventListener("resize",rs);
for(i=0;i<70;i++)DUST.push({a:Math.random()*6.283,r:Math.random()*600,v:.2+Math.random()*.8});
w.addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
var last=0,T=0,sp=1,ly=0,sv=0;
function bgDraw(dt,k){
sv+=(Math.min(Math.abs(scrollY-ly)*.12,5)-sv)*Math.min(1,dt*6);ly=scrollY;
var tg=SH.calm?.12:1+SH.extra+sv+SH.boost;sp+=(tg-sp)*Math.min(1,dt*3.5);SH.boost*=Math.pow(.93,k);
T+=dt*sp*.07*(RM?.2:1);smx+=(mx-smx)*Math.min(1,dt*3);smy+=(my-smy)*Math.min(1,dt*3);
var cx0=BW/2+smx*BW*.05,cy0=BH*.5+smy*BH*.05,M=Math.max(BW,BH)*1.9,n;
bx.globalCompositeOperation="source-over";bx.globalAlpha=1;bx.clearRect(0,0,BW,BH);bx.globalCompositeOperation="lighter";
for(n=0;n<9;n++){var s=(T+n/9)%1,dd=40+Math.pow(s,2.3)*M;bx.globalAlpha=Math.sin(Math.PI*s)*.85;bx.save();bx.translate(cx0,cy0);bx.rotate((n%2?1:-1)*(T*2.2+n*.7)+s*.5);bx.drawImage(SPR[n%2],-dd/2,-dd/2,dd,dd);bx.restore()}
bx.fillStyle="#f0a8ff";var far=Math.hypot(BW,BH)*.6;
for(n=0;n<DUST.length;n++){var p=DUST[n];p.r+=(.4+p.r*.012)*p.v*sp*k;if(p.r>far){p.r=0;p.a=Math.random()*6.283}bx.globalAlpha=Math.min(1,p.r/80)*.7;var z=1+p.r*.004;bx.fillRect(cx0+Math.cos(p.a)*p.r,cy0+Math.sin(p.a)*p.r,z,z)}}
function loop(now){var dt=Math.min(.05,(now-(last||now))/1000),k=dt*60;last=now;bgDraw(dt,k);
for(var n=0;n<SH.ticks.length;n++)SH.ticks[n](now,dt,k);requestAnimationFrame(loop)}
requestAnimationFrame(loop);
/* ---------- ABOUT: skills ---------- */
if($("sk")){var SK=[["Java",90,"Events, schedulers, configs, clean reloads."],["Paper API",80,"Commands, GUIs, persistence, minigames."],["Fabric",60,"Client mixins, HUDs, keybinds, toggles."],["Resource Packs",85,"Merges, versioning, custom textures."],["Git &amp; Tooling",65,"Repos, releases, launcher scripts."],["Video Editing",80,"Montages, replays, overlays, thumbnails."]];
SK.forEach(function(s){var x=d.createElement("div");x.className="item skill";x.innerHTML="<h3>"+s[0]+"<span class='mono'>"+s[1]+"%</span></h3><p>"+s[2]+"</p><div class='bar'><i data-w='"+s[1]+"'></i></div>";$("sk").appendChild(x)})}
watch();
/* ---------- PACKS: before/after slider ---------- */
if($("cmp")){var c=$("cmp"),t2=$("top2"),hb=$("hb"),dr=false;
function mv(x){var b=c.getBoundingClientRect(),p=Math.max(0,Math.min(100,(x-b.left)/b.width*100));t2.style.clipPath="inset(0 0 0 "+p+"%)";hb.style.left=p+"%"}
c.addEventListener("pointerdown",function(e){dr=true;mv(e.clientX)});w.addEventListener("pointermove",function(e){if(dr)mv(e.clientX)});w.addEventListener("pointerup",function(){dr=false})}
/* ---------- CONTACT ---------- */
if($("form")){$("form").onsubmit=function(e){e.preventDefault();$("ok").style.display="block"};
$("copy").onclick=function(){var b=this;try{navigator.clipboard.writeText("im_shardy")}catch(e){}b.textContent="Copied";setTimeout(function(){b.textContent="Copy"},1400)}}
/* ---------- config-driven bits: status, live stats, estimator, devlog, downloads ---------- */
var CFG=w.CFG||{};
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function ago(s){var m=(Date.now()-new Date(s))/6e4;if(m<60)return Math.max(1,Math.round(m))+" min ago";if(m<1440)return Math.round(m/60)+" h ago";var n=Math.round(m/1440);return n<31?n+" days ago":Math.round(n/30)+" months ago"}
var ST={available:["Open for commissions","#4ade80"],busy:["Busy, replies may be slow","#fbbf24"],closed:["Not taking jobs right now","#f87171"]};
d.querySelectorAll("[data-stat]").forEach(function(x){var s=ST[CFG.status]||ST.available,dot=el("i");x.className="stat";dot.style.background=s[1];x.textContent="";x.appendChild(dot);x.appendChild(d.createTextNode(CFG.statusText||s[0]))});
if($("vid")&&CFG.latest){var LV=CFG.latest,va=el("a","lv");va.href=LV.url;var vi=el("img");vi.src=LV.thumb;vi.alt="";var vt=el("div");vt.appendChild(el("span","mono","Newest on "+LV.platform));vt.appendChild(el("h3","",LV.title));va.appendChild(vi);va.appendChild(vt);$("vid").appendChild(va)}
function ghDraw(box,list){box.textContent="";if(!list.length){box.appendChild(el("p","","No public repositories yet."));return}
list.forEach(function(r){var row=el("div","ghr"),a=el("a","",r.n),b=el("b");a.href=r.u;b.appendChild(a);row.appendChild(b);row.appendChild(el("small","",(r.rel?"Latest release "+r.rel.tag:"No release yet")+", updated "+ago(r.p)));if(r.d)row.appendChild(el("small","",r.d));box.appendChild(row)})}
if($("gh")&&CFG.github){var gb=$("gh"),gk="gh:"+CFG.github,gc=null,gl=el("div");try{gc=JSON.parse(localStorage.getItem(gk)||"null")}catch(e){}
gb.appendChild(el("span","mono","Latest on GitHub"));gb.appendChild(gl);
if(gc&&Date.now()-gc.t<18e5)ghDraw(gl,gc.d);else{gl.textContent="Loading…";
fetch("https://api.github.com/users/"+CFG.github+"/repos?sort=pushed&per_page=6").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(rs){rs=rs.filter(function(r){return !r.fork}).slice(0,3);
return Promise.all(rs.map(function(r){return fetch("https://api.github.com/repos/"+CFG.github+"/"+r.name+"/releases/latest").then(function(x){return x.ok?x.json():null}).catch(function(){return null}).then(function(rel){return{n:r.name,d:r.description,u:r.html_url,p:r.pushed_at,rel:rel&&rel.tag_name?{tag:rel.tag_name}:null}})}))})
.then(function(list){try{localStorage.setItem(gk,JSON.stringify({t:Date.now(),d:list}))}catch(e){}ghDraw(gl,list)})
.catch(function(){gl.textContent="";var p=el("p","","GitHub can't be reached right now. "),a=el("a","","Open the profile");a.href="https://github.com/"+CFG.github;p.appendChild(a);gl.appendChild(p)})}}
/* estimator */
if($("o-svc")){var S=CFG.services,E=CFG.extras,cu=CFG.currency||"$",sel={svc:Object.keys(S)[0],size:"medium",ext:{}},sentAt=0;
var opt=function(box,name,val,label,hint,chk,type,fn){var l=el("label","opt"),i=el("input"),s=el("span");i.type=type;i.name=name;i.value=val;i.checked=chk;s.appendChild(el("b","",label));if(hint)s.appendChild(el("small","",hint));l.appendChild(i);l.appendChild(s);i.onchange=function(){fn(i)};box.appendChild(l)};
var calc=function(){var svc=S[sel.svc],z=svc.sizes[sel.size],lo=z.price[0],hi=z.price[1],dl=z.days[0],dh=z.days[1];
Object.keys(sel.ext).forEach(function(k){if(!sel.ext[k])return;var x=E[k];if(x.mult){lo*=x.mult;hi*=x.mult}if(x.add){lo+=x.add[0];hi+=x.add[1]}if(x.daysMult){dl*=x.daysMult;dh*=x.daysMult}});
var cap=z.max!=null?z.max:svc.max;if(cap!=null){lo=Math.min(lo,cap);hi=Math.min(hi,cap)}
var step=hi>30?5:1;lo=Math.max(1,Math.round(lo/step)*step);hi=Math.max(lo,Math.round(hi/step)*step);dl=Math.max(1,Math.ceil(dl));dh=Math.max(dl,Math.ceil(dh));
$("price").textContent=cu+lo+" – "+cu+hi;$("time").textContent=dl===dh?dl+" days":dl+" – "+dh+" days";return{lo:lo,hi:hi,dl:dl,dh:dh}};
var drawSizes=function(){var b=$("o-size"),z=S[sel.svc].sizes;b.textContent="";Object.keys(z).forEach(function(k){opt(b,"size",k,z[k].label,z[k].hint,k===sel.size,"radio",function(){sel.size=k;calc()})})};
Object.keys(S).forEach(function(k){opt($("o-svc"),"svc",k,S[k].label,"",k===sel.svc,"radio",function(){sel.svc=k;drawSizes();calc()})});
Object.keys(E).forEach(function(k){opt($("o-ext"),"ext",k,E[k].label,"",false,"checkbox",function(i){sel.ext[k]=i.checked;calc()})});
drawSizes();calc();$("sample").hidden=!CFG.samplePrices;
var copyIt=function(t,m){var fail=function(){m.textContent="Copy this and send it on Discord:\n"+t};try{navigator.clipboard.writeText(t).then(function(){m.textContent="Copied. Paste it in a Discord DM to "+(CFG.discord||"me")+"."},fail)}catch(e){fail()}};
$("send").onclick=function(){var who=$("who").value.trim(),m=$("emsg");
if(!who){m.textContent="Add your Discord name or email so I can reply.";$("who").focus();return}
if($("hp").value){m.textContent="Sent.";return}
if(Date.now()-sentAt<30000){m.textContent="Please wait a few seconds before sending again.";return}
var r=calc(),ex=Object.keys(sel.ext).filter(function(k){return sel.ext[k]}).map(function(k){return E[k].label}).join(", ")||"none",
text="New request from "+who+"\nService: "+S[sel.svc].label+" ("+S[sel.svc].sizes[sel.size].label+")\nExtras: "+ex+"\nEstimate: "+cu+r.lo+" – "+cu+r.hi+", "+r.dl+" – "+r.dh+" days\nDetails: "+($("det").value.trim()||"none");
if(CFG.webhook){sentAt=Date.now();m.textContent="Sending…";
fetch(CFG.webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"Shardy site",content:text.slice(0,1900)})}).then(function(x){if(!x.ok)throw 0;m.textContent="Sent. I'll reply on Discord or by email."}).catch(function(){sentAt=0;copyIt(text,m)})}
else copyIt(text,m)}}
/* devlog */
if($("devlog")){var DL=CFG.devlog||[],pj=["All"],lb=$("devlog"),chb=$("chips");DL.forEach(function(e){if(pj.indexOf(e.project)<0)pj.push(e.project)});
var drawLog=function(f){lb.textContent="";DL.filter(function(e){return f==="All"||e.project===f}).forEach(function(e){var r=el("article","log"),l=el("div"),c=el("div");l.appendChild(el("span","mono",e.date));l.appendChild(el("br"));l.appendChild(el("span","tag",e.project));c.appendChild(el("h3","",e.title));(e.body||[]).forEach(function(p){c.appendChild(el("p","",p))});r.appendChild(l);r.appendChild(c);lb.appendChild(r)})};
pj.forEach(function(p,n){var b=el("button","",p);if(!n)b.className="on";b.onclick=function(){chb.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");drawLog(p)};chb.appendChild(b)});drawLog("All")}
/* downloads */
if($("dls")){Object.keys(CFG.products||{}).forEach(function(k){var P=CFG.products[k],a=el("a","item pc");a.href="get-"+k+".html";a.appendChild(el("span","mono",P.type));a.appendChild(el("h3","",P.name));a.appendChild(el("p","",P.desc));a.appendChild(el("span","badge",P.status==="released"?"Available":"In development"));$("dls").appendChild(a)})}
if($("prod")){var PP=(CFG.products||{})[$("prod").dataset.product];if(PP){var pt=el("div","pt"),pl=el("div"),pr=el("div"),pstat=PP.status==="released"?"Available":"In development";
if(PP.img){var pim=el("img");pim.src=PP.img;pim.alt=PP.name+" preview";pr.appendChild(pim)}
pl.appendChild(el("span","badge",pstat));pl.appendChild(el("p","",PP.desc));
var fl=el("ul","facts2");[["Type",PP.type],["Requires",PP.requires]].forEach(function(f){var li=el("li");li.appendChild(el("span","",f[0]));li.appendChild(el("b","",f[1]));fl.appendChild(li)});pl.appendChild(fl);
if(PP.status==="released"&&PP.download){var db=el("a","btn","Download");db.href=PP.download;pl.appendChild(db)}
else{pl.appendChild(el("span","btn off","Not released yet"));pl.appendChild(el("p","","Want a message when it's out? Send me "+(CFG.discord||"a message")+" on Discord."))}
pt.appendChild(pl);pt.appendChild(pr);$("prod").appendChild(pt);
var cl=el("div","clw");cl.appendChild(el("h2","sh","Changelog"));
if(!(PP.changelog||[]).length)cl.appendChild(el("p","","No releases yet."));
(PP.changelog||[]).forEach(function(c){var row=el("div","cl");row.appendChild(el("b","",c.label));if(c.date)row.appendChild(el("span","mono"," "+c.date));var ul=el("ul");(c.notes||[]).forEach(function(n){ul.appendChild(el("li","",n))});row.appendChild(ul);cl.appendChild(row)});$("prod").appendChild(cl)}}
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
state="broken";cur=snap();burst();SH.boost=9;if(w.SFX){w.SFX.whoosh();setTimeout(w.SFX.pop,120)}$("flash").classList.remove("on");void $("flash").offsetWidth;$("flash").classList.add("on");star.classList.add("gone");hero.classList.remove("frozen");
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
