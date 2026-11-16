/* Shared header, footer, theme, mobile menu and search for every page. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const body = document.body;
  const PAGE = body.dataset.page || "";
  const SEARCH_PLACEHOLDER = body.dataset.search || "Search page...";
  const root = document.documentElement;

  const SUB = [
    ["Robotics", "robotics"],
    ["RC Projects", "rc-projects"],
    ["Electronics", "electronics"],
    ["3D Printable", "3d-printable"],
  ];
  const NAV = [
    ["experience", "Experience", "experience.html"],
    ["publications", "Publications", "publications.html"],
    ["achievements", "Achievements", "achievements.html"],
  ];
  const ON = "text-cyan-500 dark:text-yellow-400 font-bold";
  const HOVER = "hover:text-cyan-500 dark:hover:text-yellow-400";
  const cls = (key) => (PAGE === key ? ON : HOVER);
  const cur = (key) => (PAGE === key ? ' aria-current="page"' : "");

  const header = `
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-white text-slate-900 px-3 py-2">Skip to content</a>
  <header class="sticky top-0 z-50 py-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-b-4 border-slate-800 dark:border-slate-200">
    <div class="container mx-auto px-4 sm:px-6 flex justify-between items-center">
      <a href="index.html" aria-label="Ahmad Ilyas – home"><img src="images/blinky.png" alt="" width="48" height="48" class="w-12 h-12"></a>
      <nav aria-label="Main" class="hidden md:flex items-center space-x-4 text-lg">
        <a href="index.html#about" class="${HOVER}">About</a>
        <div class="relative group">
          <a href="projects.html#robotics" class="${cls("projects")} flex items-center"${cur("projects")}>Projects <i data-lucide="chevron-down" class="w-4 h-4 ml-1"></i></a>
          <div class="absolute z-10 -left-4 top-full pt-2 w-48 hidden group-hover:block group-focus-within:block">
            <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-4 border-slate-800 dark:border-slate-200 rounded-md overflow-hidden">
              ${SUB.map(([l, id]) => `<a href="projects.html#${id}" class="block px-4 py-2 hover:bg-cyan-100 dark:hover:bg-slate-700">${l}</a>`).join("")}
            </div>
          </div>
        </div>
        ${NAV.map(([k, l, h]) => `<a href="${h}" class="${cls(k)}"${cur(k)}>${l}</a>`).join("")}
        <a href="index.html#contact" class="bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 dark:bg-yellow-500 dark:text-slate-900 dark:hover:bg-yellow-600">Contact</a>
      </nav>
      <div class="flex items-center">
        <div class="relative hidden md:block mr-4">
          <label for="search-input" class="sr-only">${SEARCH_PLACEHOLDER}</label>
          <input type="search" id="search-input" placeholder="${SEARCH_PLACEHOLDER}" class="bg-amber-50 dark:bg-slate-700 border-2 border-slate-800 dark:border-slate-200 p-1 pl-8 text-lg w-44 lg:w-48 transition-all duration-300 focus:w-64">
          <i data-lucide="search" class="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none"></i>
        </div>
        <button id="theme-toggle" type="button" class="mr-4 text-slate-800 dark:text-slate-200" aria-label="Toggle dark mode"></button>
        <button id="mobile-menu-button" type="button" class="md:hidden text-slate-800 dark:text-slate-200" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i data-lucide="menu"></i></button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden md:hidden px-4 sm:px-6 pb-4 pt-4 space-y-2 text-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
      <div class="relative mb-4">
        <label for="mobile-search-input" class="sr-only">${SEARCH_PLACEHOLDER}</label>
        <input type="search" id="mobile-search-input" placeholder="${SEARCH_PLACEHOLDER}" class="w-full bg-amber-50 dark:bg-slate-700 border-2 border-slate-800 dark:border-slate-200 p-2 pl-10 text-lg">
        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none"></i>
      </div>
      <a href="index.html#about" class="block ${HOVER}">About</a>
      <button id="mobile-projects-button" type="button" aria-expanded="false" aria-controls="mobile-projects-menu" class="flex justify-between items-center w-full ${cls("projects")}">Projects <i data-lucide="chevron-down" class="w-4 h-4"></i></button>
      <div id="mobile-projects-menu" class="hidden pl-4">
        ${SUB.map(([l, id]) => `<a href="projects.html#${id}" class="block py-1 ${HOVER}">${l}</a>`).join("")}
      </div>
      ${NAV.map(([k, l, h]) => `<a href="${h}" class="block ${cls(k)}"${cur(k)}>${l}</a>`).join("")}
      <a href="index.html#contact" class="block text-center mt-2 bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 dark:bg-yellow-500 dark:text-slate-900 dark:hover:bg-yellow-600">Contact</a>
    </div>
  </header>`;

  const footer = `<footer class="py-8 text-center border-t-4 border-slate-800 dark:border-slate-200 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"><p class="text-lg">&copy; ${new Date().getFullYear()} Ahmad Ilyas. All rights reserved.</p></footer>`;

  const hMount = $("#site-header"), fMount = $("#site-footer");
  if (hMount) hMount.outerHTML = header;
  if (fMount) fMount.outerHTML = footer;

  const icons = () => window.lucide && window.lucide.createIcons();

  /* Theme: "system" (default, follows OS), "light" or "dark". Only an explicit choice is saved. */
  const tt = $("#theme-toggle");
  const mq = matchMedia("(prefers-color-scheme: dark)");
  const getPref = () => {
    try { const t = localStorage.getItem("theme"); return t === "light" || t === "dark" ? t : "system"; }
    catch (e) { return "system"; }
  };
  function render(pref) {
    root.classList.toggle("dark", pref === "dark" || (pref === "system" && mq.matches));
    const icon = { system: "monitor", light: "sun", dark: "moon" }[pref];
    const label = {
      system: "Theme: follows system. Click for light",
      light: "Theme: light. Click for dark",
      dark: "Theme: dark. Click to follow system",
    }[pref];
    tt.innerHTML = `<i data-lucide="${icon}" class="w-6 h-6"></i>`;
    tt.setAttribute("aria-label", label);
    tt.title = label;
    icons();
  }
  function setPref(p) {
    try { p === "system" ? localStorage.removeItem("theme") : localStorage.setItem("theme", p); } catch (e) {}
    render(p);
  }
  render(getPref());
  tt.addEventListener("click", () => setPref({ system: "light", light: "dark", dark: "system" }[getPref()]));
  const onSys = () => { if (getPref() === "system") render("system"); };
  mq.addEventListener ? mq.addEventListener("change", onSys) : mq.addListener(onSys);

  /* Mobile menu */
  const mb = $("#mobile-menu-button"), mm = $("#mobile-menu");
  const setOpen = (open) => {
    mm.classList.toggle("hidden", !open);
    mb.setAttribute("aria-expanded", String(open));
    mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  mb.addEventListener("click", () => setOpen(mm.classList.contains("hidden")));
  mm.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  const pb = $("#mobile-projects-button"), pm = $("#mobile-projects-menu");
  pb.addEventListener("click", () => {
    const open = pm.classList.toggle("hidden") === false;
    pb.setAttribute("aria-expanded", String(open));
  });

  /* Search: items carry data-search-item; containers carry data-search-group */
  function runSearch(raw) {
    const term = raw.toLowerCase().trim();
    let any = false;
    document.querySelectorAll("[data-search-item]").forEach((el) => {
      const text = (el.dataset.searchText || el.textContent).toLowerCase();
      const hit = !term || text.includes(term);
      el.style.display = hit ? "" : "none";
      if (hit) any = true;
    });
    document.querySelectorAll("[data-search-group]").forEach((g) => {
      const visible = [...g.querySelectorAll("[data-search-item]")].some((i) => i.style.display !== "none");
      g.style.display = !term || visible ? "" : "none";
    });
    const nr = $("#no-results");
    if (nr) nr.classList.toggle("hidden", any || !term);
  }
  window.runSearch = runSearch;
  const inputs = [$("#search-input"), $("#mobile-search-input")];
  inputs.forEach((inp) => inp.addEventListener("input", (e) => {
    inputs.forEach((o) => { if (o !== e.target) o.value = e.target.value; });
    runSearch(e.target.value);
  }));
  icons();
})();

/* ---------- Scroll reveal + small motion helpers ---------- */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const main = document.querySelector("main");
  if (!main) return;
  const SEL = "h1, h2, .rpg-box, article, dl > div";
  const seen = new WeakSet();
  const io = "IntersectionObserver" in window && !reduce
    ? new IntersectionObserver((entries) => {
        let i = 0;
        entries.filter((e) => e.isIntersecting).forEach((e) => {
          e.target.style.setProperty("--d", Math.min(i++ * 70, 350) + "ms");
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" })
    : null;

  function register(el) {
    if (!(el instanceof Element) || seen.has(el)) return;
    if (!el.matches(SEL) || el.parentElement.closest(".reveal")) return;
    seen.add(el);
    if (!io) return;
    el.classList.add("reveal");
    io.observe(el);
  }
  function scan(root) {
    register(root);
    if (root.querySelectorAll) root.querySelectorAll(SEL).forEach(register);
  }
  scan(main);
  new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && scan(n))))
    .observe(main, { childList: true, subtree: true });

  const tt = document.getElementById("theme-toggle");
  tt && tt.addEventListener("click", () => {
    tt.classList.remove("spin"); void tt.offsetWidth; tt.classList.add("spin");
  });
})();
