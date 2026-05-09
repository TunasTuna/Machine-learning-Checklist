// ─── State ────────────────────────────────────────────────────────────────────

const KEY = "mlroadmap_v3";
let state = {}, activeFilter = "all", shownM = new Set();

function load() {
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { state = {}; }
}

function save() {
  state._ts = Date.now();
  localStorage.setItem(KEY, JSON.stringify(state));
}

function pDone(pi) {
  return PHASES[pi].tasks.filter((_, ti) => state[`${pi}_${ti}`]).length;
}

function allDone() {
  return PHASES.reduce((s, _, pi) => s + pDone(pi), 0);
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  const wrap = document.getElementById("phases-wrap");
  wrap.innerHTML = "";
  PHASES.forEach((_, pi) => {
    const el = buildPhase(pi);
    el.style.animationDelay = (pi * 0.07) + "s";
    wrap.appendChild(el);
    applyFilter(el, pi);
  });
  updateGlobal();
}

function buildPhase(pi) {
  const p = PHASES[pi];
  const done = pDone(pi), total = p.tasks.length;
  const pct = Math.round(done / total * 100);
  const isOpen = !!state[`o${pi}`];
  const isComp = done === total;

  const el = document.createElement("div");
  el.className = "phase" + (isOpen ? " open" : "") + (isComp ? " complete" : "");
  el.id = `p${pi}`;

  el.innerHTML = `
    <div class="phase-header" onclick="togglePhase(${pi})">
      <div class="phase-icon" style="background:${p.bg};color:${p.color}">${p.num}</div>
      <div class="phase-info">
        <div class="phase-title-text">${p.title}</div>
        <div class="phase-sub-text" id="ps${pi}">${p.weeks} · ${done}/${total} tasks</div>
      </div>
      <div class="phase-right">
        <span class="phase-pct-label" id="pp${pi}">${pct}%</span>
        <div class="chevron" id="ch${pi}">▾</div>
      </div>
    </div>
    <div class="phase-prog-strip">
      <div class="phase-prog-bar" id="pb${pi}" style="width:${pct}%;background:${p.color}"></div>
    </div>
    <div class="phase-body">
      <div class="phase-body-inner">
        <div id="tl${pi}">${buildTasks(pi)}</div>
        <div class="resources-box">
          <div class="res-head">📚 Resources <span class="res-count">${p.resources.length} links</span></div>
          <div class="res-chips">
            ${p.resources.map((r, ri) => {
              const tc = RESOURCE_TYPE_COLORS[r.type] || { bg: "rgba(255,255,255,0.08)", col: "#888" };
              return `<button class="res-chip" onclick="openModal(${pi})" style="border-color:${tc.col}22">
                <span class="res-chip-icon" style="color:${tc.col}">${r.icon}</span>
                <span class="res-chip-type" style="color:${tc.col}">${r.type}</span>
                <span class="res-chip-name">${r.name.split("—")[0].trim()}</span>
              </button>`;
            }).join("")}
          </div>
          <button class="view-all-btn" onclick="openModal(${pi})" style="border-color:${p.color}44;color:${p.color}">
            View all ${p.resources.length} resources →
          </button>
        </div>
      </div>
    </div>`;
  return el;
}

function buildTasks(pi) {
  return PHASES[pi].tasks.map((t, ti) => {
    const done = !!state[`${pi}_${ti}`];
    const [bg, col] = TAGS[t.tag] || ["rgba(255,255,255,0.08)", "#888"];
    return `<div class="task${done ? " done" : ""}" onclick="toggleTask(${pi},${ti})">
      <div class="task-box">
        <svg class="check-icon" width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1 4L4 7.5L10 1" stroke="currentColor" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="task-body">
        <div class="task-label">${t.t}</div>
        <span class="task-tag" style="background:${bg};color:${col}">${t.tag}</span>
      </div>
    </div>`;
  }).join("");
}

function refreshPhase(pi) {
  const el = document.getElementById(`p${pi}`);
  if (!el) return;
  const done = pDone(pi), total = PHASES[pi].tasks.length;
  const pct = Math.round(done / total * 100);
  el.classList.toggle("complete", done === total);
  document.getElementById(`ps${pi}`).textContent = `${PHASES[pi].weeks} · ${done}/${total} tasks`;
  document.getElementById(`pp${pi}`).textContent = pct + "%";
  document.getElementById(`pb${pi}`).style.width = pct + "%";
  document.getElementById(`tl${pi}`).innerHTML = buildTasks(pi);
}

function applyFilter(el, pi) {
  const done = pDone(pi), total = PHASES[pi].tasks.length;
  if (activeFilter === "done")   el.style.display = done === total ? "" : "none";
  else if (activeFilter === "active") el.style.display = (done > 0 && done < total) ? "" : "none";
  else el.style.display = "";
}

// ─── Global Progress ──────────────────────────────────────────────────────────

function updateGlobal() {
  const done = allDone(), pct = Math.round(done / TOTAL * 100);

  document.getElementById("s-done").textContent = done;
  document.getElementById("s-left").textContent = TOTAL - done;
  const compPhases = PHASES.filter((_, pi) => pDone(pi) === PHASES[pi].tasks.length).length;
  document.getElementById("s-phases").textContent = `${compPhases}/5`;
  document.getElementById("s-pct").textContent = pct + "%";

  const circ = 201.1;
  document.getElementById("ring-arc").style.strokeDashoffset = circ - (pct / 100) * circ;
  document.getElementById("ring-pct").textContent = pct + "%";
  document.getElementById("prog-bar").style.width = pct + "%";

  const msgs = [
    [0,   "Just getting started",      "Check off tasks below to track your journey."],
    [10,  "Making moves 💪",           "You've crossed the starting line."],
    [25,  "Building momentum 🚀",      "A quarter done — math and Python are paying off."],
    [50,  "Halfway there ⚡",          "Right in the middle of the roadmap. Keep going."],
    [75,  "Almost there 🔥",           "Three-quarters done. The model is within reach."],
    [90,  "Final stretch 🎯",          "So close. Time to deploy!"],
    [100, "You did it! 🎓",            "All tasks complete — you built a custom ML model."],
  ];
  let title = msgs[0][1], sub = msgs[0][2];
  for (const [t, ti, si] of msgs) { if (pct >= t) { title = ti; sub = si; } }
  document.getElementById("prog-title").textContent = title;
  document.getElementById("prog-sub").textContent = sub;

  for (const m of MILESTONES) {
    if (pct >= m.pct && !shownM.has(m.pct)) {
      shownM.add(m.pct);
      triggerMilestone(m);
    }
  }

  updateStreak();

  if (state._ts) {
    const d = new Date(state._ts);
    document.getElementById("last-save").textContent =
      `saved ${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
}

// ─── Milestones & Streaks ─────────────────────────────────────────────────────

function triggerMilestone(m) {
  document.getElementById("m-icon").textContent = m.icon;
  document.getElementById("m-title").textContent = m.title;
  document.getElementById("m-sub").textContent = m.sub;
  const el = document.getElementById("milestone");
  el.classList.add("visible");
  if (m.pct >= 50) spawnConfetti();
  setTimeout(() => el.classList.remove("visible"), 5000);
}

function updateStreak() {
  const el = document.getElementById("streak");
  const today = new Date().toDateString();
  if (!state._lastDay) { el.classList.remove("show"); return; }
  if (state._lastDay === today || (state._streak || 0) > 1) {
    el.classList.add("show");
    document.getElementById("streak-n").textContent = state._streak || 1;
  } else {
    el.classList.remove("show");
  }
}

function recordActivity() {
  const today = new Date().toDateString();
  if (state._lastDay !== today) {
    const yest = new Date(Date.now() - 86400000).toDateString();
    state._streak = (state._lastDay === yest) ? (state._streak || 1) + 1 : 1;
    state._lastDay = today;
  }
}

// ─── Interactions ─────────────────────────────────────────────────────────────

function toggleTask(pi, ti) {
  const wasD = !!state[`${pi}_${ti}`];
  state[`${pi}_${ti}`] = !wasD;
  if (!wasD) recordActivity();
  save();
  refreshPhase(pi);
  updateGlobal();
  PHASES.forEach((_, i) => {
    const el = document.getElementById(`p${i}`);
    if (el) applyFilter(el, i);
  });
  if (!wasD) toast("Task completed ✓");
}

function togglePhase(pi) {
  state[`o${pi}`] = !state[`o${pi}`];
  save();
  const el = document.getElementById(`p${pi}`);
  el.classList.toggle("open", !!state[`o${pi}`]);
  document.getElementById(`ch${pi}`).textContent = state[`o${pi}`] ? "▾" : "▸";
}

function expandAll() {
  PHASES.forEach((_, pi) => { state[`o${pi}`] = true; });
  save(); render();
}

function collapseAll() {
  PHASES.forEach((_, pi) => { state[`o${pi}`] = false; });
  save(); render();
}

function askReset() {
  if (!confirm("Reset all progress? This can't be undone.")) return;
  Object.keys(state).filter(k => !k.startsWith("o")).forEach(k => delete state[k]);
  shownM.clear();
  save(); render();
  toast("Progress reset");
}

// ─── Resource Modal ───────────────────────────────────────────────────────────

function openModal(pi) {
  const p = PHASES[pi];
  const overlay = document.getElementById("modal-overlay");
  const modal = document.getElementById("modal");

  document.getElementById("modal-title").textContent = "Resources";
  document.getElementById("modal-subtitle").textContent = p.title + " · " + p.weeks;
  document.getElementById("modal-phase-icon").textContent = p.num;
  document.getElementById("modal-phase-icon").style.cssText =
    `background:${p.bg};color:${p.color};width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;flex-shrink:0;`;

  const body = document.getElementById("modal-body");
  body.innerHTML = p.resources.map(r => {
    const tc = RESOURCE_TYPE_COLORS[r.type] || { bg: "rgba(255,255,255,0.08)", col: "#888" };
    return `
      <a class="modal-resource" href="${r.url}" target="_blank" rel="noopener noreferrer">
        <div class="modal-res-icon" style="background:${tc.bg};color:${tc.col}">${r.icon}</div>
        <div class="modal-res-info">
          <div class="modal-res-name">${r.name}</div>
          <div class="modal-res-desc">${r.desc}</div>
        </div>
        <div class="modal-res-badge" style="background:${tc.bg};color:${tc.col}">${r.type}</div>
        <div class="modal-res-arrow">↗</div>
      </a>`;
  }).join("");

  overlay.classList.add("open");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
  if (e.target.tagName === "INPUT") return;
  if (e.key === "e") expandAll();
  if (e.key === "c") collapseAll();
});

// ─── Toast ────────────────────────────────────────────────────────────────────

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function spawnConfetti() {
  const cols = ["#5b9cf6", "#4ade80", "#fbbf24", "#c084fc", "#fb7185", "#2dd4bf", "#f97316"];
  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const sz = 6 + Math.random() * 8;
      el.style.cssText = `
        left:${8 + Math.random() * 84}vw;
        top:-${sz * 2}px;
        width:${sz}px;
        height:${sz * (0.4 + Math.random() * 0.8)}px;
        background:${cols[Math.floor(Math.random() * cols.length)]};
        animation-duration:${1.4 + Math.random() * 2}s;
        animation-delay:${Math.random() * 0.4}s;
        transform:rotate(${Math.random() * 360}deg);
        border-radius:${Math.random() > 0.5 ? "50%" : "3px"};
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    }, i * 18);
  }
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

document.querySelectorAll(".filter-tab").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    activeFilter = b.dataset.f;
    PHASES.forEach((_, pi) => {
      const el = document.getElementById(`p${pi}`);
      if (el) applyFilter(el, pi);
    });
  });
});

// ─── Custom Cursor ────────────────────────────────────────────────────────────

let cx = 0, cy = 0, rx = 0, ry = 0;
const cur = document.getElementById("cursor");
const curR = document.getElementById("cursor-ring");

document.addEventListener("mousemove", e => { cx = e.clientX; cy = e.clientY; });

(function loop() {
  cur.style.left = cx + "px"; cur.style.top = cy + "px";
  rx += (cx - rx) * 0.13; ry += (cy - ry) * 0.13;
  curR.style.left = rx + "px"; curR.style.top = ry + "px";
  requestAnimationFrame(loop);
})();

document.addEventListener("mouseover", e => {
  if (e.target.closest(".task, .ctrl-btn, .filter-tab, .res-chip, .phase-header, .modal-resource, .view-all-btn"))
    document.body.classList.add("hovering");
});
document.addEventListener("mouseout", () => document.body.classList.remove("hovering"));
document.addEventListener("mouseleave", () => { cur.style.opacity = "0"; curR.style.opacity = "0"; });
document.addEventListener("mouseenter", () => { cur.style.opacity = "1"; curR.style.opacity = "1"; });

// ─── Init ─────────────────────────────────────────────────────────────────────

load();
render();
