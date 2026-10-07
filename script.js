// Shardy portfolio — no tracking, no analytics, no cookies set by this script
// Choice for the notice is stored only in your own browser (localStorage).
const skills = {
  paper: { title: "Paper / Spigot plugins — learning", body: "Hello-world commands, events and configs I can edit without crashing on reload. First public release is still coming soon.", tags: ["Java 17", "Paper API", "Coming soon"] },
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

// Filter builds
const chips = document.querySelectorAll(".chip");
const servers = document.querySelectorAll(".server");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    servers.forEach((s) => {
      const cats = (s.dataset.cat || "").split(" ");
      s.style.display = f === "all" || cats.includes(f) ? "" : "none";
    });
  });
});

// Glide-in on scroll — respects reduced motion via CSS
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
        if (e.target.classList.contains("hero-build")) {
          const bar = e.target.querySelector(".xp-bar span");
          if (bar) requestAnimationFrame(() => { bar.style.width = "32%"; });
        }
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
  const bar = document.querySelector(".xp-bar span");
  if (bar) bar.style.width = "32%";
}

// Cookie notice — this site sets no cookies itself
const bar = document.getElementById("cookie-bar");
const okBtn = document.getElementById("cookie-ok");
try {
  const choice = localStorage.getItem("shardy-cookie-choice");
  if (!choice && bar) bar.hidden = false;
} catch { if (bar) bar.hidden = false; }
if (okBtn) okBtn.addEventListener("click", () => {
  try { localStorage.setItem("shardy-cookie-choice", "acknowledged"); } catch {}
  if (bar) bar.hidden = true;
});

// Copy Discord handle — no data leaves your device
const copyBtn = document.getElementById("copy-discord");
const copyStatus = document.getElementById("copy-status");
if (copyBtn) copyBtn.addEventListener("click", async () => {
  const handle = "im_shardy";
  try {
    await navigator.clipboard.writeText(handle);
    if (copyStatus) copyStatus.textContent = "Copied Discord handle: im_shardy — paste it in Discord to DM me.";
  } catch {
    if (copyStatus) copyStatus.textContent = "Copy didn't work — my handle is: im_shardy";
  }
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
