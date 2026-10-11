/* ============================================================
   SHARDY SITE SETTINGS — the only file you need to edit.
   ============================================================ */
window.CFG = {

  /* ---- Work status shown on the home page, estimator and devlog.
         Change this one word: "available", "busy" or "closed" ---- */
  status: "available",
  statusText: "",            // optional: your own sentence instead of the default

  /* ---- Contact ---- */
  discord: "im_shardy",
  /* Paste a Discord webhook URL here so estimator requests arrive in your server.
     Discord: Server settings > Integrations > Webhooks > New webhook > Copy URL.
     WARNING: anything in this file is public. Anyone who finds the URL can post
     to that channel, so use a private channel you can mute or delete the webhook.
     Leave it "" and the estimator copies the request for the visitor to paste into a DM. */
  webhook: "",

  /* ---- GitHub (latest repos and releases load automatically) ---- */
  github: "ItzShardy",

  /* ---- Newest video: update these 4 lines whenever you post ---- */
  latest: {
    platform: "TikTok",
    title: "Slop edit: mace montage",
    url: "https://www.tiktok.com/@mc_shardy/video/7693619983271644438",
    thumb: "https://itzshardy.github.io/assets/vid1.jpg"
  },

  /* ---- Estimator ----
     !!! The prices below are SAMPLE numbers. Set your real ones, then change
     samplePrices to false (that removes the "sample prices" notice). */
  samplePrices: true,
  currency: "$",
  services: {
    plugin: { label: "Plugin", max: 25, sizes: {
      small:  { label: "Small",  hint: "1 to 3 commands, simple config",       price: [2, 5],     days: [1, 3], max: 5 },
      medium: { label: "Medium", hint: "Menus, saved data, several features",   price: [5, 10],    days: [3, 7] },
      large:  { label: "Large",  hint: "A minigame or a full system",           price: [10, 25],   days: [7, 21] } } },
    pack: { label: "Resource pack", max: 5, sizes: {
      small:  { label: "Small",  hint: "A few items or a UI tweak",             price: [1, 2],     days: [1, 3] },
      medium: { label: "Medium", hint: "A full weapon or armor set",            price: [2, 4],     days: [3, 7] },
      large:  { label: "Large",  hint: "A whole pack with many items",          price: [3, 5],     days: [7, 21] } } },
    setup: { label: "Server setup", max: 25, sizes: {
      small:  { label: "Small",  hint: "Basic plugins and permissions",         price: [5, 10],    days: [1, 2] },
      medium: { label: "Medium", hint: "Ranks, economy, custom configs",        price: [10, 18],   days: [2, 5] },
      large:  { label: "Large",  hint: "A full network or gamemode setup",      price: [15, 25],   days: [5, 14] } } },
    edit: { label: "Video edit", max: 2, sizes: {
      small:  { label: "Small",  hint: "A short clip or a thumbnail",           price: [1, 1],     days: [1, 2] },
      medium: { label: "Medium", hint: "A montage up to one minute",            price: [1, 2],     days: [2, 5] },
      large:  { label: "Large",  hint: "A long edit or a full overlay set",     price: [15, 30],   days: [5, 10], max: 30 } } }
  },
  /* "max" = the highest price the estimator will ever show, extras included.
     It can sit on a whole service or on one size. */
  extras: {
    rush:    { label: "Rush delivery",              mult: 1.5, daysMult: 0.5 },
    source:  { label: "Include source files",       mult: 1.2 },
    support: { label: "1 month of support after delivery", mult: 1.1 }
  },

  /* ---- Devlog: newest first. Replace these with real updates. ---- */
  devlog: [
    { date: "2026-10-10", project: "Website", title: "New site: classic, 3D, estimator and downloads",
      body: ["The portfolio now has a classic version and a 3D version, a price estimator, a downloads area and this devlog."] },
    { date: "2026-10-10", project: "AmethystHUD", title: "Status: in development",
      body: ["AmethystHUD is a Fabric client mod with a clean HUD and toggles. It's still being built and has no release date yet."] },
    { date: "2026-10-10", project: "Shard Launcher", title: "Status: releasing soon",
      body: ["Shard Launcher is a custom Minecraft launcher with Discord Rich Presence. It's close, but not out yet."] }
  ],

  /* ---- Downloads: one page per product (get-pack.html etc.).
         When something is ready, set status to "released", paste the file link
         into download, and add a changelog entry. ---- */
  products: {
    "pack": {
      name: "Shardy's Red Soul", type: "Resource pack", status: "released",
      img: "https://itzshardy.github.io/assets/pack-on.png",
      desc: "Red soul retexture with prismatic glint, tinted sky and custom icon, by MostCallMeShardy.",
      requires: "Minecraft Java Edition",
      download: "https://itzshardy.github.io/assets/downloads/Shardys-Red-Soul.zip",
      changelog: [
        { label: "Current release", date: "2026-10-11", notes: ["Red soul swords and armor", "Prismatic glint", "Tinted sky and icon"] }
      ]
    },
    "amethysthud": {
      name: "AmethystHUD", type: "Fabric mod", status: "released",
      img: "https://itzshardy.github.io/assets/amethysthud-logo.png",
      desc: "Crystal, anchor, armor, tools, fire and sky styles in one menu, with extras and cosmetics. Keeps itself up to date (switch it off in Extras). Sky styles use Skyboxify.",
      requires: "Minecraft Java 1.21.11, Fabric Loader 0.15+, Fabric API (ModMenu and Skyboxify suggested)",
      download: "https://itzshardy.github.io/assets/downloads/AmethystHUD-1.5.2-mc1.21.11.jar",
      changelog: [
        { label: "v1.5.2", date: "2026-10-11", notes: ["Latest styles and fixes"] },
        { label: "v1.5.1", date: "2026-10-11", notes: ["Crystal, anchor, armor, tools, fire and sky styles", "Extras and cosmetics menu", "Auto-updater (toggleable in Extras)"] }
      ]
    },
    "shard-launcher": {
      name: "Shard Launcher", type: "Launcher", status: "soon",
      img: "",
      desc: "A custom Minecraft launcher with Discord Rich Presence.",
      requires: "Java 17 or newer",
      download: "",
      changelog: []
    }
  }
};
