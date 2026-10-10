/* SHARD SLICE — mini game on the home hero. Safe to delete (also remove shardgame.css + 2 tags in index.html). */
(function () {
  "use strict";
  var d = document, de = d.documentElement, hero = d.getElementById("hero");
  if (!hero) return;
  var RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var COLS = [["#a78bfa", "#4c1d95"], ["#67e8f9", "#0e7490"], ["#f0abfc", "#86198f"], ["#6ee7b7", "#047857"], ["#fcd34d", "#b45309"]];
  function mk(t, c) { var e = d.createElement(t); e.className = c; return e; }

  /* ---------- DOM ---------- */
  var cv = mk("canvas", "sg-cv"), ctx = cv.getContext("2d");
  var hud = mk("div", "sg-hud"); hud.setAttribute("aria-hidden", "true");
  hud.innerHTML = '<div><small>SCORE</small><b class="s">0</b></div><div class="sg-lv"></div><div><small>BEST</small><b class="b">0</b></div>';
  var ov = mk("div", "sg-ov");
  var play = mk("button", "sg-play"); play.type = "button";
  play.innerHTML = '<span class="sg-pi">&#9876;</span><span>Play Shard Slice</span><em>swipe to cut</em>';
  var ex = mk("button", "pill sg-ex"); ex.type = "button"; ex.textContent = "\u2715 Exit";
  hero.appendChild(cv); hero.appendChild(hud); hero.appendChild(ov); hero.appendChild(play); hero.appendChild(ex);
  var elS = hud.querySelector(".s"), elB = hud.querySelector(".b"), elL = hud.querySelector(".sg-lv");

  /* ---------- state ---------- */
  var W = 0, H = 0, DPR = 1, mode = "idle", raf = 0, last = 0, token = 0;
  var objs = [], halves = [], parts = [], texts = [], trail = [], q = [];
  var score = 0, lives = 3, level = 0, spawnT = 0, shake = 0, redFlash = 0, comboN = 0, comboT = -9, newBest = false;
  var best = 0;
  try { best = +localStorage.getItem("sgbest") || 0; } catch (e) {}
  elB.textContent = best;

  function size() {
    var r = hero.getBoundingClientRect();
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
  }
  addEventListener("resize", function () { if (mode !== "idle") size(); });

  function paintLives() {
    var s = "";
    for (var i = 1; i <= 3; i++) s += '<i class="' + (i > lives ? "x" : "") + '">\u2665</i>';
    elL.innerHTML = s;
  }

  /* ---------- flow ---------- */
  function start() {
    token++;
    var my = token;
    objs = []; halves = []; parts = []; texts = []; trail = []; q = [];
    score = 0; lives = 3; level = 0; spawnT = .5; shake = 0; redFlash = 0; comboN = 0; newBest = false;
    elS.textContent = 0; elB.textContent = best; paintLives();
    window.scrollTo(0, 0);
    de.style.overflow = "hidden";
    hero.classList.add("vx-game");
    size();
    mode = "count";
    var steps = ["3", "2", "1", "SLICE!"], i = 0;
    ov.className = "sg-ov on";
    (function step() {
      if (my !== token) return;
      if (i >= steps.length) { ov.className = "sg-ov"; ov.innerHTML = ""; mode = "run"; return; }
      ov.innerHTML = '<div class="sg-cd"><div class="sg-n' + (i === 3 ? " go" : "") + '">' + steps[i] + '</div>' +
        (i === 0 ? '<p>Swipe through the shards. Dodge the red bombs. Don\u2019t let 3 fall.</p>' : "") + "</div>";
      i++;
      setTimeout(step, i === 4 ? 450 : 620);
    })();
    cancelAnimationFrame(raf);
    last = performance.now() / 1000;
    raf = requestAnimationFrame(frame);
  }
  function exit() {
    token++;
    mode = "idle";
    cancelAnimationFrame(raf);
    ov.className = "sg-ov"; ov.innerHTML = "";
    hero.classList.remove("vx-game");
    de.style.overflow = "";
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
  }
  function over() {
    mode = "over";
    if (score > best) {
      best = score; newBest = true;
      try { localStorage.setItem("sgbest", best); } catch (e) {}
    }
    elB.textContent = best;
    ov.className = "sg-ov on";
    ov.innerHTML = '<div class="sg-go"><small>GAME OVER</small><b>' + score + '</b><p>' +
      (newBest ? "\u2605 New best!" : "Best: " + best) + '</p><div><button type="button" class="pill sg-a">Play again</button> <button type="button" class="pill sg-x">Exit</button></div></div>';
  }
  play.addEventListener("click", start);
  ex.addEventListener("click", exit);
  ov.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
  ov.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("button");
    if (!t) return;
    if (t.classList.contains("sg-a")) start();
    else if (t.classList.contains("sg-x")) exit();
  });
  window.addEventListener("keydown", function (e) {
    if (mode === "idle") return;
    if (e.key === "Tab") return;
    if (e.key === "Escape") { exit(); }
    e.stopImmediatePropagation();
    if (e.key === " " || e.key === "Enter" || e.key.indexOf("Arrow") === 0) e.preventDefault();
  }, true);

  /* ---------- spawning ---------- */
  function spawn() {
    var bomb = Math.random() < Math.min(.09 + level * .014, .24);
    var sc = Math.min(1, Math.max(.7, W / 1000));
    var r = (bomb ? 30 : 26 + Math.random() * 12) * sc;
    var x = W * (.12 + Math.random() * .76);
    var g = H * 1.55, apex = H * (.5 + Math.random() * .32);
    var vy = -Math.sqrt(2 * g * apex), tUp = -vy / g;
    var vx = (W / 2 - x) * (.2 + Math.random() * .4) / tUp + (Math.random() - .5) * W * .08;
    objs.push({ x: x, y: H + r, vx: vx, vy: vy, g: g, r: r, rot: Math.random() * 6, vr: (Math.random() - .5) * 5, bomb: bomb, c: COLS[(Math.random() * COLS.length) | 0], dead: false });
  }
  function wave() {
    var n = 1 + (Math.random() < .4 ? 1 : 0) + (level > 3 && Math.random() < .3 ? 1 : 0);
    for (var i = 0; i < n; i++) q.push(i * .14);
  }

  /* ---------- hit logic ---------- */
  function burst(x, y, col, n, spd) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.283, s = (.3 + Math.random()) * spd;
      parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: .45 + Math.random() * .5, col: col, sz: 1.5 + Math.random() * 3 });
    }
  }
  function pop(x, y, s, col, big) { texts.push({ x: x, y: y, s: s, col: col, t: 0, max: big ? 1.1 : .75, big: big }); }
  function loseLife() {
    lives--; paintLives();
    if (lives <= 0) over();
  }
  function hit(o, ang, now) {
    o.dead = true;
    if (o.bomb) {
      burst(o.x, o.y, "#ff2d55", 36, 420); burst(o.x, o.y, "#ffd0a0", 14, 300);
      pop(o.x, o.y - 10, "BOOM", "#ff2d55", true);
      shake = RM ? 0 : 18; redFlash = 1;
      loseLife();
      return;
    }
    score++; elS.textContent = score;
    level = Math.floor(score / 12);
    comboN = (now - comboT < .38) ? comboN + 1 : 1; comboT = now;
    if (comboN >= 3) { score++; elS.textContent = score; pop(o.x, o.y - 24, "x" + comboN + " COMBO", "#fcd34d", true); }
    else pop(o.x, o.y - 6, "+1", o.c[0], false);
    burst(o.x, o.y, o.c[0], 16, 300); burst(o.x, o.y, "#ffffff", 6, 220);
    shake = RM ? 0 : Math.max(shake, 5);
    var nx = -Math.sin(ang), ny = Math.cos(ang);
    for (var s = -1; s <= 1; s += 2)
      halves.push({ x: o.x, y: o.y, vx: o.vx + nx * s * 150, vy: o.vy + ny * s * 150 - 40, g: o.g, r: o.r, rot: o.rot, vr: o.vr + s * 2.5, ang: ang, side: s, c: o.c, life: 0, max: .9 });
  }
  function slice(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy);
    if (len < 4) return;
    var ang = Math.atan2(dy, dx);
    for (var i = 0; i < objs.length; i++) {
      var o = objs[i];
      if (o.dead) continue;
      var t = ((o.x - a.x) * dx + (o.y - a.y) * dy) / (len * len);
      t = Math.max(0, Math.min(1, t));
      var px = a.x + dx * t - o.x, py = a.y + dy * t - o.y;
      if (px * px + py * py <= (o.r * 1.1 + 3) * (o.r * 1.1 + 3)) hit(o, ang, b.t);
    }
  }

  /* ---------- input ---------- */
  var down = false, lp = null;
  function pt(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() / 1000 }; }
  cv.addEventListener("pointerdown", function (e) {
    e.stopPropagation(); down = true; lp = pt(e);
    try { cv.setPointerCapture(e.pointerId); } catch (_) {}
  });
  cv.addEventListener("pointermove", function (e) {
    e.stopPropagation();
    if (mode === "idle") return;
    var p = pt(e);
    if (e.pointerType === "mouse" || down) {
      if (lp && mode === "run") slice(lp, p);
      trail.push(p);
    }
    lp = p;
  });
  function up(e) { down = false; if (e.pointerType !== "mouse") lp = null; }
  cv.addEventListener("pointerup", up);
  cv.addEventListener("pointercancel", up);
  cv.addEventListener("pointerleave", function () { lp = null; });

  /* ---------- drawing ---------- */
  function gem(x, y, r, rot, c, alpha) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
    ctx.shadowColor = c[0]; ctx.shadowBlur = 20;
    var g = ctx.createLinearGradient(-r, -r, r, r);
    g.addColorStop(0, "#ffffff"); g.addColorStop(.38, c[0]); g.addColorStop(1, c[1]);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.15); ctx.lineTo(r * .9, -r * .2); ctx.lineTo(r * .62, r * .95); ctx.lineTo(-r * .62, r * .95); ctx.lineTo(-r * .9, -r * .2); ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-r * .9, -r * .2); ctx.lineTo(r * .9, -r * .2);
    ctx.moveTo(0, -r * 1.15); ctx.lineTo(-r * .3, -r * .2); ctx.lineTo(-r * .62, r * .95);
    ctx.moveTo(0, -r * 1.15); ctx.lineTo(r * .3, -r * .2); ctx.lineTo(r * .62, r * .95);
    ctx.strokeStyle = "rgba(255,255,255,.4)"; ctx.stroke();
    ctx.restore();
  }
  function bomb(o, now) {
    ctx.save();
    ctx.translate(o.x, o.y);
    var r = o.r;
    ctx.shadowColor = "#ff2d55"; ctx.shadowBlur = 18 + 10 * Math.sin(now * 12);
    var g = ctx.createRadialGradient(-r * .3, -r * .3, 2, 0, 0, r);
    g.addColorStop(0, "#6b2036"); g.addColorStop(1, "#0a0309");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.283); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#ff2d55"; ctx.lineWidth = 3; ctx.stroke();
    ctx.rotate(o.rot * .3);
    ctx.lineWidth = 4; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-r * .38, -r * .38); ctx.lineTo(r * .38, r * .38); ctx.moveTo(r * .38, -r * .38); ctx.lineTo(-r * .38, r * .38); ctx.stroke();
    ctx.restore();
  }
  function drawTrail(now) {
    trail = trail.filter(function (p) { return now - p.t < .22; });
    if (trail.length < 2) return;
    ctx.save(); ctx.lineCap = "round"; ctx.lineJoin = "round";
    for (var i = 1; i < trail.length; i++) {
      var a = trail[i - 1], b = trail[i], k = Math.max(0, 1 - (now - b.t) / .22);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.shadowColor = "#a78bfa"; ctx.shadowBlur = 16;
      ctx.strokeStyle = "rgba(167,139,250," + (k * .9) + ")"; ctx.lineWidth = 3 + 9 * k; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255,255,255," + k + ")"; ctx.lineWidth = 1 + 3 * k; ctx.stroke();
    }
    ctx.restore();
  }

  function update(dt, now) {
    if (mode === "run") {
      spawnT -= dt;
      if (spawnT <= 0) { wave(); spawnT = Math.max(.42, 1.05 - level * .06) + Math.random() * .25; }
      for (var i = q.length - 1; i >= 0; i--) { q[i] -= dt; if (q[i] <= 0) { spawn(); q.splice(i, 1); } }
    }
    for (var j = 0; j < objs.length; j++) {
      var o = objs[j];
      o.vy += o.g * dt; o.x += o.vx * dt; o.y += o.vy * dt; o.rot += o.vr * dt;
      if (o.vy > 0 && o.y > H + o.r + 12 && !o.dead) {
        o.dead = true;
        if (!o.bomb && mode === "run") {
          pop(Math.max(40, Math.min(W - 40, o.x)), H - 40, "MISS", "#fb7185", false);
          loseLife();
        }
      }
    }
    objs = objs.filter(function (o) { return !o.dead; });
    halves.forEach(function (h) { h.life += dt; h.vy += h.g * dt; h.x += h.vx * dt; h.y += h.vy * dt; h.rot += h.vr * dt; });
    halves = halves.filter(function (h) { return h.life < h.max; });
    parts.forEach(function (p) { p.life += dt; p.vy += 380 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= .985; });
    parts = parts.filter(function (p) { return p.life < p.max; });
    texts.forEach(function (t) { t.t += dt; });
    texts = texts.filter(function (t) { return t.t < t.max; });
    shake *= Math.pow(.001, dt); if (shake < .3) shake = 0;
    redFlash = Math.max(0, redFlash - dt * 2.2);
  }
  function draw(now) {
    var sx = shake ? (Math.random() - .5) * shake : 0, sy = shake ? (Math.random() - .5) * shake : 0;
    ctx.setTransform(DPR, 0, 0, DPR, sx * DPR, sy * DPR);
    ctx.clearRect(-20, -20, W + 40, H + 40);
    if (redFlash > 0) { ctx.fillStyle = "rgba(255,40,70," + (.22 * redFlash) + ")"; ctx.fillRect(-20, -20, W + 40, H + 40); }
    objs.forEach(function (o) { o.bomb ? bomb(o, now) : gem(o.x, o.y, o.r, o.rot, o.c, 1); });
    halves.forEach(function (h) {
      ctx.save();
      ctx.translate(h.x, h.y); ctx.rotate(h.ang);
      ctx.beginPath(); ctx.rect(-200, h.side < 0 ? -200 : 0, 400, 200); ctx.clip();
      ctx.rotate(-h.ang); ctx.translate(-h.x, -h.y);
      gem(h.x, h.y, h.r, h.rot, h.c, 1 - h.life / h.max);
      ctx.restore();
    });
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    parts.forEach(function (p) {
      var k = 1 - p.life / p.max;
      ctx.globalAlpha = k; ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.sz * k + .4, 0, 6.283); ctx.fill();
    });
    ctx.restore();
    drawTrail(now);
    texts.forEach(function (t) {
      var k = t.t / t.max;
      ctx.save();
      ctx.globalAlpha = 1 - k * k;
      ctx.font = "800 " + (t.big ? 34 : 24) + "px Syne, 'Arial Black', system-ui, sans-serif";
      ctx.textAlign = "center"; ctx.fillStyle = t.col;
      ctx.shadowColor = t.col; ctx.shadowBlur = 14;
      ctx.fillText(t.s, t.x, t.y - k * 46);
      ctx.restore();
    });
  }
  function frame(ts) {
    raf = requestAnimationFrame(frame);
    var now = ts / 1000, dt = Math.min(.033, Math.max(0, now - last));
    last = now;
    update(dt, now);
    draw(now);
  }
})();
