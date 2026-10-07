// Tiny interactions — no framework
const skills = {
  paper: { title: "Paper / Spigot plugins", body: "Events, commands, permissions with LuckPerms, configs that server owners can actually edit. TODO: link your best plugin repo here.", tags: ["Java 17", "Paper API", "Minigames"] },
  java: { title: "Java", body: "The language behind my Minecraft work. I can read stacktraces, split logic into classes, and use the Paper Javadocs without copy-pasting blindly.", tags: ["OOP", "Collections", "Maven / Gradle"] },
  luau: { title: "Luau — learning fast", body: "Variables to RemoteEvents. Currently practicing leaderstats, checkpoints and pcall-wrapped DataStores. TODO: push first .lua file and link it.", tags: ["Variables", "Functions", "Events"] },
  studio: { title: "Roblox Studio", body: "Parts, models, Toolbox done safely, playtesting with friends. Next: polish lighting + spawn placement so obbies feel fair.", tags: ["Obby design", "Playtest", "Toolbox"] },
  yaml: { title: "YAML / Config design", body: "My superpower on small servers: clean config.yml files with comments, defaults that work, and no crash on reload.", tags: ["Shop GUIs", "Ranks", "Messages"] },
  web: { title: "HTML / CSS", body: "Enough to ship this site and a server homepage: semantic HTML, responsive grids, GitHub Pages deploys.", tags: ["This portfolio", "Server sites"] },
  git: { title: "Git + GitHub", body: "Commit, push, Pages deploys. Learning to write READMEs with run steps and screenshots — like this site has.", tags: ["Commits", "Pages", "READMEs"] },
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
    if (!d) return;
    titleEl.textContent = d.title;
    bodyEl.textContent = d.body;
    tagsEl.innerHTML = d.tags.map((t) => `<li>${t}</li>`).join("");
  });
});

// Filter builds like server versions
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

document.getElementById("year").textContent = new Date().getFullYear();
