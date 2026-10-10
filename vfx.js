/* SHARDY VFX LAYER — safe to delete (also remove vfx.css). Does not touch site.js. */
(function () {
  "use strict";
  var d = document, de = d.documentElement, b = d.body;
  var RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var TOUCH = matchMedia("(hover:none)").matches;
  var raf = window.requestAnimationFrame.bind(window);
  de.classList.add("vfx");

  function mk(tag, cls, parent) {
    var e = d.createElement(tag);
    if (cls) e.className = cls;
    (parent || b).appendChild(e);
    return e;
  }

  /* ---- aurora ---- */
  var aur = d.createElement("div");
  aur.className = "vx-aur";
  aur.setAttribute("aria-hidden", "true");
  aur.innerHTML = "<i></i><i></i><i></i>";
  b.insertBefore(aur, b.firstChild);

  /* ---- scroll progress + glass header + aurora parallax ---- */
  var prog = mk("div", "vx-prog");
  prog.setAttribute("aria-hidden", "true");
  var hd = d.querySelector("header");
  var tick = false;
  function onScroll() {
    if (tick) return;
    tick = true;
    raf(function () {
      var y = window.scrollY || de.scrollTop;
      var max = Math.max(1, de.scrollHeight - innerHeight);
      prog.style.transform = "scaleX(" + Math.min(1, y / max) + ")";
      if (hd) hd.classList.toggle("vx-s", y > 20);
      if (!RM) aur.style.transform = "translate3d(0," + (-y * 0.06) + "px,0)";
      tick = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---- split-word headline reveal ---- */
  function splitNode(node, state) {
    var kids = Array.prototype.slice.call(node.childNodes);
    kids.forEach(function (n) {
      if (n.nodeType === 3) {
        var parts = n.nodeValue.split(/(\s+)/);
        var frag = d.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(d.createTextNode(" "));
          } else {
            var w = d.createElement("span");
            w.className = "vx-w";
            w.setAttribute("aria-hidden", "true");
            var i = d.createElement("i");
            i.style.setProperty("--i", state.n++);
            i.textContent = p;
            w.appendChild(i);
            frag.appendChild(w);
          }
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) {
        splitNode(n, state);
      }
    });
  }
  if (!RM) {
    d.querySelectorAll(".top h1,.thead h1").forEach(function (h) {
      var label = h.textContent.replace(/\s+/g, " ").trim();
      h.setAttribute("aria-label", label);
      h.classList.add("vx-split");
      splitNode(h, { n: 0 });
    });
  }

  /* ---- reveal fallback + stagger ---- */
  function prep() {
    d.querySelectorAll(".rv").forEach(function (r) {
      var k = 0;
      Array.prototype.forEach.call(r.children, function (c) { c.style.setProperty("--k", k++); });
    });
  }
  prep();
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    var watch = function () { d.querySelectorAll(".rv:not(.in)").forEach(function (r) { io.observe(r); }); };
    watch();
    setTimeout(function () { prep(); watch(); }, 700);
  } else {
    d.querySelectorAll(".rv").forEach(function (r) { r.classList.add("in"); });
  }
  /* safety: never leave content hidden */
  setTimeout(function () {
    d.querySelectorAll(".rv:not(.in)").forEach(function (r) {
      var rc = r.getBoundingClientRect();
      if (rc.top < innerHeight) r.classList.add("in");
    });
  }, 2500);

  /* ---- cursor light, spotlight, tilt, magnetic buttons ---- */
  var cg = null, cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy, cgOn = false;
  if (!TOUCH && !RM) {
    cg = mk("div", "vx-cg");
    cg.setAttribute("aria-hidden", "true");
    (function loop() {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      cg.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      raf(loop);
    })();
  }

  var tiltEl = null, magEl = null;
  function resetTilt() { if (tiltEl) { tiltEl.style.transform = ""; tiltEl = null; } }
  function resetMag() { if (magEl) { magEl.style.transform = ""; magEl = null; } }

  d.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    tx = e.clientX; ty = e.clientY;
    if (cg && !cgOn) { cgOn = true; cx = tx; cy = ty; cg.classList.add("on"); }
    var t = e.target;
    if (!t || !t.closest) return;

    var c = t.closest(".card,.exc,.pc");
    if (c) {
      var r = c.getBoundingClientRect();
      var px = e.clientX - r.left, py = e.clientY - r.top;
      c.style.setProperty("--mx", px + "px");
      c.style.setProperty("--my", py + "px");
      if (!RM && c.matches(".card:not(.out):not(.vid),.pc") && r.width < 720) {
        if (tiltEl && tiltEl !== c) resetTilt();
        tiltEl = c;
        var rx = ((py / r.height) - 0.5) * -7, ry = ((px / r.width) - 0.5) * 7;
        c.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-4px)";
      } else if (tiltEl && tiltEl !== c) resetTilt();
    } else resetTilt();

    var m = t.closest(".btn:not(.off)");
    if (m && !RM) {
      var br = m.getBoundingClientRect();
      var dx = (e.clientX - (br.left + br.width / 2)) * 0.22;
      var dy = (e.clientY - (br.top + br.height / 2)) * 0.3;
      if (magEl && magEl !== m) resetMag();
      magEl = m;
      m.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
    } else resetMag();
  }, { passive: true });
  d.addEventListener("pointerleave", function () { resetTilt(); resetMag(); if (cg) { cg.classList.remove("on"); cgOn = false; } });
  d.documentElement.addEventListener("mouseleave", function () { resetTilt(); resetMag(); if (cg) { cg.classList.remove("on"); cgOn = false; } });

  /* ---- shooting stars ---- */
  function shoot() {
    if (d.hidden || de.dataset.theme === "light") return;
    var s = mk("div", "vx-sh");
    s.style.left = Math.random() * innerWidth * 0.7 + "px";
    s.style.top = Math.random() * innerHeight * 0.4 + "px";
    s.addEventListener("animationend", function () { s.remove(); });
  }
  if (!RM) {
    (function next() {
      setTimeout(function () { shoot(); next(); }, 3500 + Math.random() * 4500);
    })();
    setTimeout(shoot, 1200);
  }
  /* ---- home hero: "I make ___" + live code card (edit PANELS to change content) ---- */
  var hero = d.getElementById("hero");
  if (hero) {
    /* word, dark color, light color, file name, kind, lines, footer */
    var PANELS = [
      { w: "plugins", c: ["#a78bfa", "#6d28d9"], f: "ShardyPlugin.java", ok: "✔ Build success · 0.8s", L: [
        '<i class=k>public class</i> <i class=f>ShardyPlugin</i> <i class=k>extends</i> JavaPlugin {',
        '  <i class=a>@Override</i>',
        '  <i class=k>public void</i> <i class=f>onEnable</i>() {',
        '    getCommand(<i class=s>"shardy"</i>).setExecutor(<i class=k>new</i> <i class=f>Hello</i>());',
        '    getLogger().info(<i class=s>"Enabled!"</i>);',
        '  }', '}'] },
      { w: "packs", c: ["#67e8f9", "#0891b2"], f: "pack.mcmeta", ok: "✔ Pack loaded · 16x", L: [
        '{', '  <i class=s>"pack"</i>: {', '    <i class=s>"pack_format"</i>: <i class=n>34</i>,',
        '    <i class=s>"description"</i>: <i class=s>"Crimson PvP 16x"</i>', '  },',
        '  <i class=s>"swords"</i>: [<i class=s>"netherite"</i>, <i class=s>"diamond"</i>]', '}'] },
      { w: "edits", c: ["#f0abfc", "#c026d3"], f: "montage.timeline", ok: "▶ Rendering 1080p · 60 fps", T: [
        ["VIDEO", [[2, 30, 0], [34, 22, 1], [60, 36, 2]]],
        ["FX", [[10, 18, 1], [40, 12, 0], [70, 22, 1]]],
        ["AUDIO", [[0, 96, 2]]]] },
      { w: "mods", c: ["#6ee7b7", "#059669"], f: "AmethystHud.java", ok: "✔ Mod loaded · Fabric", L: [
        '<i class=k>public class</i> <i class=f>AmethystHud</i> <i class=k>implements</i> ClientModInitializer {',
        '  <i class=a>@Override</i>', '  <i class=k>public void</i> <i class=f>onInitializeClient</i>() {',
        '    HudRenderCallback.EVENT.register(<i class=k>this</i>::draw);', '  }', '}'] },
      { w: "launchers", c: ["#fcd34d", "#b45309"], f: "shard-launcher", ok: "✔ Minecraft launched", L: [
        '<i class=c>$</i> shard-launcher start', '<i class=s>✔</i> Java 17 found', '<i class=s>✔</i> Profile loaded',
        '<i class=s>✔</i> Discord presence on', '<i class=f>→</i> Launching Minecraft…'] },
      { w: "PvP montages", c: ["#fb7185", "#e11d48"], f: "pvp-montage.timeline", ok: "▶ Exporting · 4K · 60 fps", T: [
        ["CLIPS", [[0, 20, 0], [22, 14, 1], [38, 26, 2], [66, 30, 0]]],
        ["HITS", [[8, 4, 1], [30, 4, 1], [50, 4, 1], [74, 4, 1], [90, 4, 1]]],
        ["MUSIC", [[0, 96, 2]]]] }
    ];
    var rot = d.createElement("div");
    rot.className = "vx-rot";
    rot.setAttribute("aria-label", "I make plugins, packs, edits, mods, launchers and PvP montages");
    rot.innerHTML = '<span class="vx-rl" aria-hidden="true">I make</span><span class="vx-rw" aria-hidden="true"><b></b><u></u></span>';
    hero.appendChild(rot);
    var wb = rot.querySelector("b"), caret = rot.querySelector("u");
    var stage = d.getElementById("vxs"), body = d.getElementById("vxb"),
        fn = d.getElementById("vxf"), okEl = d.getElementById("vxk");
    function col(p) { return p.c[de.dataset.theme === "light" ? 1 : 0]; }

    function panelHTML(p) {
      var out = "", k = 0;
      if (p.L) {
        p.L.forEach(function (ln, i) {
          out += '<div class="vx-ln" style="--d:' + (i * 110) + 'ms"><b>' + (i + 1) + '</b><span>' + ln + '</span></div>';
        });
      } else {
        out += '<div class="vx-tl">';
        p.T.forEach(function (tr, r) {
          out += '<div class="vx-tr"><em>' + tr[0] + '</em><div>';
          tr[1].forEach(function (c) {
            out += '<u class="g' + c[2] + '" style="left:' + c[0] + '%;width:' + c[1] + '%;--d:' + (r * 160 + k++ * 90) + 'ms"></u>';
          });
          out += '</div></div>';
        });
        out += '<span class="vx-ph"></span></div>';
      }
      return out;
    }
    var shown = -1;
    function showPanel(i) {
      if (!stage || i === shown) return;
      shown = i;
      var p = PANELS[i];
      stage.style.setProperty("--acc", col(p));
      body.classList.add("out");
      okEl.classList.remove("on");
      setTimeout(function () {
        fn.textContent = p.f;
        body.innerHTML = panelHTML(p);
        body.classList.remove("out");
        okEl.textContent = p.ok;
        setTimeout(function () { okEl.classList.add("on"); }, (p.L ? p.L.length * 110 : 900) + 250);
      }, RM ? 0 : 170);
    }

    if (RM) {
      wb.textContent = "plugins · packs · edits";
      caret.style.display = "none";
      showPanel(0);
    } else {
      var wi = 0, ci = 0, del = false;
      (function type() {
        var p = PANELS[wi], w = p.w;
        wb.style.color = col(p);
        caret.style.background = col(p);
        if (!del) {
          ci++;
          if (ci === 1) showPanel(wi);
          wb.textContent = w.slice(0, ci);
          if (ci === w.length) { del = true; return void setTimeout(type, 2600); }
          setTimeout(type, 85);
        } else {
          ci--;
          wb.textContent = w.slice(0, ci);
          if (ci === 0) { del = false; wi = (wi + 1) % PANELS.length; return void setTimeout(type, 260); }
          setTimeout(type, 40);
        }
      })();
    }

    /* ---- 3D tilt + depth parallax (mouse), idle sway (touch) ---- */
    var card = d.getElementById("vxc"), chips = stage ? stage.querySelectorAll(".vx-chip") : [];
    if (card && !RM) {
      var rx = 0, ry = 0, trx = 0, try_ = 0, px = 0, py = 0, tpx = 0, tpy = 0;
      hero.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        var nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        try_ = nx * 16; trx = -ny * 12; tpx = nx; tpy = ny;
        var r = card.getBoundingClientRect();
        card.style.setProperty("--sx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--sy", ((e.clientY - r.top) / r.height * 100) + "%");
      }, { passive: true });
      hero.addEventListener("pointerleave", function () { trx = try_ = tpx = tpy = 0; });
      (function loop() {
        rx += (trx - rx) * 0.09; ry += (try_ - ry) * 0.09; px += (tpx - px) * 0.09; py += (tpy - py) * 0.09;
        card.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
        chips.forEach(function (c) {
          var z = +c.dataset.z;
          c.style.setProperty("--tx", (px * z * 1.4).toFixed(1) + "px");
          c.style.setProperty("--ty", (py * z).toFixed(1) + "px");
        });
        raf(loop);
      })();
    }
    /* re-color when theme flips */
    var thm = d.getElementById("thm");
    if (thm) thm.addEventListener("click", function () {
      setTimeout(function () { if (shown > -1 && stage) stage.style.setProperty("--acc", col(PANELS[shown])); }, 30);
    });
  }
})();
