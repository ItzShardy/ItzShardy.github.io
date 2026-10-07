// Shardy workbench — no tracking, no cookies set here.
// Reveal is JS-gated: content is visible by default; JS only adds polish.
const skills = {
  paper: { title: "Paper / Spigot plugins — learning", body: "Hello-world commands, events and configs that survive a reload. First public release is still coming soon.", tags: ["Java 17", "Paper API", "Coming soon"] },
  java: { title: "Java — learning for plugins", body: "Classes, methods, events and reading stacktraces. Enough to follow Paper docs and fix small bugs.", tags: ["OOP basics", "Events", "Stacktraces"] },
  yaml: { title: "YAML / Config design", body: "Clean config files with comments and safe defaults. If reload breaks, I fix the YAML first.", tags: ["Shop ideas", "Messages", "Safe reloads"] },
  web: { title: "HTML / CSS", body: "Enough to build this site and a simple server homepage. Semantic HTML, responsive layout, GitHub Pages.", tags: ["This portfolio", "Server pages"] },
  git: { title: "Git + GitHub", body: "Commit, push, Pages deploys. Learning to write honest READMEs with run steps.", tags: ["Commits", "Pages", "READMEs"] },
};

const slots = document.querySelectorAll(".slot");
const titleEl = document.getElementById("skill-title");
const bodyEl = document.getElementById("skill-body");
const tagsEl = document.getElementById("skill-tags");
slots.forEach((btn) => {
  btn.addEventListener("click", () => {
    slots.forEach((b) => { b.classList.remove("selected"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("selected");
    btn.setAttribute("aria-selected", "true");
    const d = skills[btn.dataset.skill];
    if (!d || !titleEl) return;
    titleEl.textContent = d.title;
    bodyEl.textContent = d.body;
    tagsEl.innerHTML = d.tags.map((t) => `<li>${t}</li>`).join("");
  });
});

const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".blueprint");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    cards.forEach((s) => {
      const cats = (s.dataset.cat || "").split(" ");
      const show = f === "all" || cats.includes(f);
      s.style.display = show ? "" : "none";
      if (show) { s.classList.remove("visible"); requestAnimationFrame(() => requestAnimationFrame(() => s.classList.add("visible"))); }
    });
  });
});

// Scroll reveal with safety: force-show everything after 2.5s no matter what
function showAll() { document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible")); }
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => io.observe(el));
  setTimeout(showAll, 2500);
} else { showAll(); }

// Build meter fills when visible
function fillMeters() {
  const xp = document.getElementById("xp-fill");
  if (xp) requestAnimationFrame(() => { xp.style.width = "32%"; });
}
window.addEventListener("load", fillMeters);
setTimeout(fillMeters, 800);

// Scroll progress bar
const fill = document.getElementById("progress-fill");
function onScroll() {
  if (!fill) return;
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  fill.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Cookie notice — sets nothing, remembers choice locally only
const bar = document.getElementById("cookie-bar");
const okBtn = document.getElementById("cookie-ok");
try {
  if (!localStorage.getItem("shardy-cookie-choice") && bar) bar.hidden = false;
} catch { if (bar) bar.hidden = false; }
if (okBtn) okBtn.addEventListener("click", () => {
  try { localStorage.setItem("shardy-cookie-choice", "acknowledged"); } catch {}
  if (bar) bar.hidden = true;
});

// Copy Discord — stays on device
const copyBtn = document.getElementById("copy-discord");
const copyStatus = document.getElementById("copy-status");
if (copyBtn) copyBtn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("im_shardy"); if (copyStatus) copyStatus.textContent = "Copied: im_shardy — paste it in Discord to DM me."; }
  catch { if (copyStatus) copyStatus.textContent = "Copy didn't work — my handle is: im_shardy"; }
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
