/* ============================================================
   Birthday site logic. You shouldn't need to edit this file —
   everything personal lives in config.js
   ============================================================ */
(function () {
  "use strict";
  var C = window.BDAY || {};
  var $ = function (s) { return document.querySelector(s); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- SVG builders ---------- */
  function spiral(R, turns) {
    var d = "M0 0", steps = 110, i, t, a, r;
    for (i = 1; i <= steps; i++) {
      t = i / steps; a = t * turns * 2 * Math.PI; r = t * R;
      d += " L" + (Math.cos(a) * r).toFixed(1) + " " + (Math.sin(a) * r).toFixed(1);
    }
    return d;
  }

  // Fuzzy "pipe cleaner" style sunflower
  function sunflower(cx, cy, r, o) {
    o = o || {};
    var rot = o.rot || 0, delay = o.delay || 0, bloom = o.bloom !== false;
    var n = 18, back = "", front = "", i, a;
    for (i = 0; i < n; i++) {
      a = i * 360 / n;
      back += '<ellipse cx="0" cy="' + (-r * 0.66) + '" rx="' + (r * 0.17) + '" ry="' + (r * 0.32) + '" transform="rotate(' + (a + 360 / n / 2) + ')"/>';
      front += '<ellipse cx="0" cy="' + (-r * 0.7) + '" rx="' + (r * 0.17) + '" ry="' + (r * 0.34) + '" transform="rotate(' + a + ')"/>';
    }
    var inner =
      '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + rot + ')">' +
        '<g fill="#f2a900" stroke="#c98500" stroke-width="1" stroke-dasharray="2 2.2">' + back + '</g>' +
        '<g fill="#ffcf1f" stroke="#e09b00" stroke-width="1" stroke-dasharray="2 2.2">' + front + '</g>' +
        '<circle r="' + (r * 0.42) + '" fill="#5a2d12"/>' +
        '<circle r="' + (r * 0.42) + '" fill="none" stroke="#3b1b0a" stroke-width="2.2" stroke-dasharray="1.5 2.6"/>' +
        '<path d="' + spiral(r * 0.38, 3.2) + '" fill="none" stroke="#2f1507" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</g>';
    return bloom ? '<g class="bloom" style="--d:' + delay + 's">' + inner + '</g>' : inner;
  }

  function daisy(cx, cy, r, o) {
    o = o || {};
    var rot = o.rot || 0, delay = o.delay || 0, p = "", i;
    for (i = 0; i < 6; i++) {
      p += '<ellipse cx="0" cy="' + (-r * 0.56) + '" rx="' + (r * 0.3) + '" ry="' + (r * 0.44) + '" transform="rotate(' + (i * 60) + ')"/>';
    }
    return '<g class="bloom" style="--d:' + delay + 's"><g transform="translate(' + cx + ' ' + cy + ') rotate(' + rot + ')">' +
      '<g fill="#ffffff" stroke="#e2dac6" stroke-width="1.4" stroke-dasharray="2 2.4">' + p + '</g>' +
      '<circle r="' + (r * 0.3) + '" fill="#ffc61a" stroke="#d99400" stroke-width="1.4" stroke-dasharray="1.5 2.2"/>' +
      '</g></g>';
  }

  function puffs(delay) {
    return '<g class="bloom" style="--d:' + delay + 's">' +
      '<path d="M236 330 Q 290 230 300 84" fill="none" stroke="#3f7a30" stroke-width="5" stroke-linecap="round"/>' +
      '<g fill="#5fa04a" stroke="#3f7a30" stroke-width="1.4" stroke-dasharray="2 2.4">' +
      '<circle cx="300" cy="74" r="17"/><circle cx="268" cy="104" r="19"/><circle cx="318" cy="132" r="19"/><circle cx="288" cy="170" r="14"/>' +
      '</g></g>';
  }

  function bouquetSVG() {
    var panels = "", angles = [-62, -42, -22, 22, 42, 62, 0], i;
    for (i = 0; i < angles.length; i++) {
      panels += '<rect x="148" y="60" width="84" height="320" rx="18" transform="rotate(' + angles[i] + ' 190 380)" fill="' + (i % 2 ? "#efe0c0" : "#f6ecd6") + '" stroke="#dccba5" stroke-width="2"/>';
    }
    var stems = '<g fill="none" stroke="#4f8f3d" stroke-width="5" stroke-linecap="round">' +
      '<path d="M190 380 Q 150 280 125 175"/><path d="M190 380 Q 220 300 240 235"/>' +
      '<path d="M190 380 Q 230 250 262 128"/><path d="M190 380 Q 130 320 84 262"/>' +
      '<path d="M190 380 Q 180 330 160 282"/></g>';
    var flowers =
      sunflower(125, 175, 72, { delay: .15, rot: -8 }) +
      puffs(.9) +
      sunflower(240, 235, 70, { delay: .35, rot: 10 }) +
      daisy(262, 126, 34, { delay: .6, rot: 12 }) +
      daisy(82, 262, 33, { delay: .75, rot: -10 }) +
      daisy(160, 284, 31, { delay: .9, rot: 6 });
    var tissue = '<path d="M92 300 q22 -22 44 -4 t44 -2 t44 2 t44 -2 t44 4 L316 330 L92 330 Z" fill="#ffffff" opacity=".92"/>';
    var front =
      '<path d="M36 296 C110 322 160 344 160 388 L148 474 L232 474 L220 388 C220 344 270 322 344 296 C262 306 118 306 36 296 Z" fill="#f6ecd6" stroke="#dccba5" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M120 318 Q150 360 156 440 M260 318 Q230 360 224 440 M190 330 L190 470" fill="none" stroke="#e3d3ae" stroke-width="2" stroke-linecap="round"/>';
    var ribbon =
      '<g fill="none" stroke-linecap="round">' +
        '<path d="M190 392 Q 168 436 176 476" stroke="#f0b99a" stroke-width="11"/>' +
        '<path d="M190 392 Q 216 434 206 470" stroke="#f0b99a" stroke-width="11"/>' +
        '<path d="M190 392 Q 168 436 176 476 M190 392 Q 216 434 206 470" stroke="#d9b261" stroke-width="1.4" stroke-dasharray="3 3"/>' +
      '</g>' +
      '<ellipse cx="158" cy="386" rx="32" ry="14" transform="rotate(-18 158 386)" fill="#f5c9ad" stroke="#d9b261" stroke-width="1.6"/>' +
      '<ellipse cx="222" cy="386" rx="32" ry="14" transform="rotate(18 222 386)" fill="#f5c9ad" stroke="#d9b261" stroke-width="1.6"/>' +
      '<circle cx="190" cy="390" r="10" fill="#efb293" stroke="#d9b261" stroke-width="1.6"/>';
    return '<svg viewBox="0 0 380 490" role="img" aria-label="A bouquet of sunflowers and daisies"><g class="sway">' +
      panels + stems + flowers + tissue + front + ribbon + '</g></svg>';
  }

  function gateFlowerSVG() {
    return '<svg viewBox="0 0 200 270" aria-hidden="true">' +
      '<path d="M100 150 L100 262" stroke="#4f8f3d" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M100 215 Q 60 205 48 170 Q 90 172 100 215 Z" fill="#5fa04a" stroke="#3f7a30" stroke-width="2"/>' +
      '<path d="M100 232 Q 140 222 154 190 Q 108 192 100 232 Z" fill="#5fa04a" stroke="#3f7a30" stroke-width="2"/>' +
      sunflower(100, 100, 80, { delay: .2 }) + '</svg>';
  }

  function finaleFlowerSVG() {
    return '<svg viewBox="0 0 200 200" aria-hidden="true">' + sunflower(100, 100, 86, { delay: .1 }) + '</svg>';
  }

  function cakeSVG() {
    var nick = String(C.nickname || "Genius").toUpperCase();
    var line1 = "HAPPY " + (C.age || 21) + ",";
    var f1 = 22, f2 = nick.length > 9 ? 15 : (nick.length > 7 ? 18 : 22);
    return '<svg viewBox="0 0 420 320" role="img" aria-label="A birthday cake with a lit candle">' +
      '<defs><linearGradient id="side" x1="0" x2="1"><stop offset="0" stop-color="#eadcbc"/><stop offset=".45" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6d6b4"/></linearGradient>' +
      '<radialGradient id="flameGlow"><stop offset="0" stop-color="#ffd54a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd54a" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse cx="210" cy="262" rx="196" ry="46" fill="#d9c9a6" opacity=".4"/>' +
      '<path d="M40 150 v98 a170 62 0 0 0 340 0 v-98 z" fill="url(#side)" stroke="#e2d1ad" stroke-width="2"/>' +
      '<ellipse cx="210" cy="150" rx="170" ry="62" fill="#fffdf6" stroke="#eadcbc" stroke-width="2"/>' +
      '<text x="92" y="142" font-family="Gaegu, cursive" font-weight="700" font-size="' + f1 + '" fill="#d6322b" letter-spacing="1" transform="rotate(-5 92 142)">' + line1 + '</text>' +
      '<text x="92" y="166" font-family="Gaegu, cursive" font-weight="700" font-size="' + f2 + '" fill="#d6322b" letter-spacing="1" transform="rotate(-5 92 166)">' + nick + '</text>' +
      /* doodle */
      '<g transform="translate(252 158)" fill="none" stroke="#2a2420" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
        '<g class="doodle-head">' +
          '<circle r="22" fill="#fffdf6"/>' +
          '<circle cx="-7" cy="0" r="1.6" fill="#2a2420"/><circle cx="8" cy="-3" r="1.6" fill="#2a2420"/>' +
          '<path d="M-3 7 Q2 11 7 5"/>' +
          '<g transform="rotate(-12 -4 -26)"><path d="M-30 -26 L-4 -36 L22 -26 L-4 -17 Z" fill="#fffdf6"/><path d="M-14 -22 V-14 Q-4 -9 8 -14 V-22"/><path d="M-30 -26 L-30 -12"/><circle cx="-30" cy="-10" r="2" fill="#2a2420"/></g>' +
        '</g>' +
        '<path d="M-14 16 Q-30 20 -28 36 M-26 26 l-2 -9"/>' +
        '<path d="M14 17 Q32 24 38 46"/>' +
        '<g transform="translate(46 -34)">' +
          '<circle class="bulb-glass" r="9" fill="#fff6c9"/><path d="M-4 8 v6 h8 v-6 M-3 11 h6" /><path d="M-3 0 l3 4 l3 -4" stroke-width="1.6"/>' +
          '<g stroke-width="2"><path class="bulb-ray" d="M-16 -14 l-5 -5"/><path class="bulb-ray" d="M0 -20 v-8"/><path class="bulb-ray" d="M16 -14 l5 -5"/></g>' +
        '</g>' +
        '<path class="sparkle" d="M64 4 q0 7 7 7 q-7 0 -7 7 q0 -7 -7 -7 q7 0 7 -7z" fill="#2a2420" stroke-width="1"/>' +
      '</g>' +
      /* candle */
      '<g id="candle" class="candle" transform="translate(210 0)">' +
        '<rect x="-34" y="36" width="68" height="86" fill="transparent"/>' +
        '<rect x="-4.5" y="80" width="9" height="36" rx="2" fill="#f4c9ad" stroke="#d8a583" stroke-width="1.4"/>' +
        '<path d="M-4.5 90 l9 -5 M-4.5 100 l9 -5 M-4.5 110 l9 -5" stroke="#fffaf0" stroke-width="2.4" opacity=".85"/>' +
        '<path d="M0 80 v-5" stroke="#4a2410" stroke-width="1.6" stroke-linecap="round"/>' +
        '<circle class="glow" cx="0" cy="62" r="26" fill="url(#flameGlow)"/>' +
        '<path class="flame" d="M0 76 C-8 67 -6 58 0 48 C6 58 8 67 0 76 Z" fill="#ffae00"/>' +
        '<path class="flame" d="M0 75 C-4 70 -3 64 0 59 C3 64 4 70 0 75 Z" fill="#fff3b0"/>' +
        '<path class="smoke" d="M0 52 q-7 -9 0 -17 t0 -17" fill="none" stroke="#b9a98d" stroke-width="2.4" stroke-linecap="round"/>' +
      '</g>' +
    '</svg>';
  }

  /* ---------- Build page ---------- */
  function build() {
    $("#gateFlower").innerHTML = gateFlowerSVG();
    // bloom the gate flower right away
    document.querySelectorAll("#gateFlower .bloom").forEach(function (b) { setTimeout(function () { b.classList.add("on"); }, 60); });
    $("#gateText").textContent = C.gateText || "";
    $("#openBtn").textContent = C.gateButton || "Open";

    $("#heroName").textContent = C.nickname || "";
    document.title = "Happy Birthday " + (C.nickname || "") + " 🌻";
    $("#cake").innerHTML = cakeSVG();
    $("#wishHint").textContent = C.wishHint || "";
    $("#wishDone").textContent = C.wishDone || "";

    var her = C.herName || "you";
    $("#letterTitle").textContent = (C.letterTitle || "Dear {her},").replace("{her}", her);
    $("#letterSign").innerHTML = (C.letterSign || "") + "<br>" + (C.yourName || "");
    var body = $("#letterBody");
    (C.letter || []).forEach(function () { body.appendChild(document.createElement("p")); });

    $("#bouquet").innerHTML = bouquetSVG();

    $("#reasonsTitle").textContent = C.reasonsTitle || "";
    var reasons = C.reasons || [];
    $("#total").textContent = reasons.length;
    var wrap = $("#reasons");
    reasons.forEach(function (txt, i) {
      var b = document.createElement("button");
      b.className = "reveal reason";
      b.style.transitionDelay = (i % 6) * 60 + "ms";
      b.setAttribute("aria-label", "Reason number " + (i + 1));
      b.innerHTML = '<div class="reason-in"><div class="face front"><svg viewBox="-50 -50 100 100">' +
        sunflower(0, 0, 44, { bloom: false }) + '</svg><b>' + (i + 1) + '</b></div><div class="face back"></div></div>';
      b.querySelector(".back").textContent = txt;
      b.addEventListener("click", function () {
        var was = b.classList.contains("open");
        b.classList.toggle("open");
        if (!was) {
          found++; $("#found").textContent = found;
          var r = b.getBoundingClientRect();
          burst(r.left + r.width / 2, r.top + r.height / 2, 14, 0.7);
          if (found === reasons.length) {
            setTimeout(function () { toast("You found them all 💛"); bigConfetti(); }, 600);
          }
        }
      });
      wrap.appendChild(b);
    });

    $("#videosTitle").textContent = C.videosTitle || "";
    var vwrap = $("#videos");
    (C.videos || []).forEach(function (v, i) {
      var card = document.createElement("div");
      card.className = "vcard reveal";
      card.style.transitionDelay = i * 150 + "ms";
      card.innerHTML =
        '<div class="vframe"><div class="vplace"><div><big>🎬</big><span>Your video goes here</span><br><code></code></div></div>' +
        '<video playsinline controls preload="metadata"></video></div>' +
        '<div class="vtitle"></div><div class="vcap"></div>';
      card.querySelector("code").textContent = v.file;
      card.querySelector(".vtitle").textContent = v.title || "";
      card.querySelector(".vcap").textContent = v.caption || "";
      var vid = card.querySelector("video"), frame = card.querySelector(".vframe");
      vid.addEventListener("loadedmetadata", function () {
        frame.classList.add("ready");
       if (vid.videoWidth && vid.videoHeight) {
  frame.style.aspectRatio = vid.videoWidth + " / " + vid.videoHeight;
}
      });
      vid.addEventListener("play", function () { duckMusic(true); });
      vid.addEventListener("pause", function () { duckMusic(false); });
      vid.addEventListener("ended", function () { duckMusic(false); });
      vid.src = v.file;
      vwrap.appendChild(card);
    });

    $("#finaleFlower").innerHTML = finaleFlowerSVG();
    $("#footer").textContent = C.footerText || "";
  }

  var found = 0;

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  /* ---------- Falling petals ---------- */
  function petals() {
    if (reduceMotion) return;
    var box = $("#petals"), i, p;
    for (i = 0; i < 16; i++) {
      p = document.createElement("span");
      p.className = "petal";
      p.style.left = Math.random() * 100 + "vw";
      p.style.setProperty("--s", (8 + Math.random() * 10).toFixed(1) + "px");
      p.style.setProperty("--t", (11 + Math.random() * 12).toFixed(1) + "s");
      p.style.setProperty("--d", (-Math.random() * 20).toFixed(1) + "s");
      p.style.setProperty("--x", (Math.random() * 160 - 80).toFixed(0) + "px");
      box.appendChild(p);
    }
  }

  /* ---------- Confetti ---------- */
  var cv = $("#confetti"), ctx = cv.getContext("2d"), parts = [], running = false, W = 0, H = 0, dpr = 1;
  var COLORS = ["#f7b500", "#ffd43b", "#d6322b", "#f2c4a8", "#5fa04a", "#fffaf0", "#4a2410", "#ff8fa3"];
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize); resize();

  function burst(x, y, n, power) {
    if (reduceMotion) return;
    power = power || 1;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, s = (3 + Math.random() * 7) * power;
      parts.push({
        x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 4 * power,
        r: Math.random() * 6.28, vr: (Math.random() - .5) * .4,
        w: 6 + Math.random() * 7, h: 4 + Math.random() * 5,
        c: COLORS[(Math.random() * COLORS.length) | 0], shape: Math.random() < .25 ? "c" : "r"
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }
  function bigConfetti() {
    burst(W * .2, H * .6, 70, 1.3); burst(W * .8, H * .6, 70, 1.3); burst(W * .5, H * .4, 90, 1.4);
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.vy += .22; p.vx *= .992; p.vy *= .992;
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if (p.y > H + 30) { parts.splice(i, 1); continue; }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
      if (p.shape === "c") { ctx.beginPath(); ctx.arc(0, 0, p.h / 1.4, 0, 6.3); ctx.fill(); }
      else { ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, W, H); }
  }

  /* ---------- Music ---------- */
  var audio = null, audioOk = true, wantMusic = false, ducked = false;
  var musicBtn = $("#musicBtn");
  function setPlaying(on) { musicBtn.classList.toggle("playing", on); }
  function initAudio() {
    if (!C.song) { audioOk = false; return; }
    audio = new Audio(C.song);
    audio.loop = true; audio.volume = .7; audio.preload = "auto";
    audio.addEventListener("error", function () { audioOk = false; setPlaying(false); });
  }
  function playMusic() {
    if (!audio || !audioOk) return;
    var pr = audio.play();
    if (pr && pr.then) pr.then(function () { wantMusic = true; setPlaying(true); }).catch(function () { setPlaying(false); });
  }
  function duckMusic(isVideoPlaying) {
    if (!audio || !audioOk) return;
    if (isVideoPlaying) {
      if (!audio.paused) { ducked = true; audio.pause(); setPlaying(false); }
    } else if (ducked) {
      // resume only if no other video is still playing
      var any = Array.prototype.some.call(document.querySelectorAll("video"), function (v) { return !v.paused && !v.ended; });
      if (!any) { ducked = false; playMusic(); }
    }
  }
  musicBtn.addEventListener("click", function () {
    if (!audio || !audioOk) { toast("Add your song to assets/song.mp3 🎶"); return; }
    if (audio.paused) { ducked = false; playMusic(); } else { audio.pause(); wantMusic = false; ducked = false; setPlaying(false); }
  });

  /* ---------- Candle ---------- */
  var blown = false;
  function setupCandle() {
    var cake = $("#cake svg"), candle = $("#candle");
    function toggle() {
      blown = !blown;
      cake.classList.toggle("blown", blown);
      var done = $("#wishDone"), hint = $("#wishHint");
      done.classList.toggle("show", blown);
      hint.textContent = blown ? "Tap the candle again to relight it 🕯️" : (C.wishHint || "");
      if (blown) {
        var r = candle.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + 10, 60, 1.1);
        setTimeout(bigConfetti, 250);
        if (navigator.vibrate) navigator.vibrate(40);
      }
    }
    candle.addEventListener("click", toggle);
    $("#wishHint").style.cursor = "pointer";
    $("#wishHint").addEventListener("click", toggle);
  }

  /* ---------- Letter typewriter ---------- */
  var typed = false, typing = false, skipType = false;
  function typeLetter() {
    if (typed || typing) return;
    typing = true;
    var ps = document.querySelectorAll("#letterBody p"), texts = C.letter || [];
    if (reduceMotion) { ps.forEach(function (p, i) { p.textContent = texts[i]; }); typed = true; return; }
    var pi = 0, ci = 0;
    function step() {
      if (skipType) { ps.forEach(function (p, i) { p.textContent = texts[i]; p.classList.remove("caret"); }); typed = true; return; }
      if (pi >= ps.length) { typed = true; return; }
      var p = ps[pi], t = texts[pi];
      p.classList.add("caret");
      if (ci < t.length) {
        ci++; p.textContent = t.slice(0, ci);
        var ch = t.charAt(ci - 1);
        setTimeout(step, /[.,!?]/.test(ch) ? 190 : 24);
      } else {
        p.classList.remove("caret"); pi++; ci = 0; setTimeout(step, 420);
      }
    }
    step();
  }
  $("#letterBody").addEventListener("click", function () { skipType = true; if (!typing) typeLetter(); });

  /* ---------- Reveal on scroll ---------- */
  function observe() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); typeLetter(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          if (en.target.classList.contains("paper")) setTimeout(typeLetter, 500);
          io.unobserve(en.target);
        }
      });
    }, { threshold: .18 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Gate ---------- */
  function open() {
    document.body.classList.remove("locked");
    $("#gate").classList.add("gone");
    playMusic();
    setTimeout(function () { burst(W / 2, H / 2, 90, 1.3); }, 350);
    setTimeout(observe, 300);
    // give the hero a first impression: bloom-in
    document.querySelectorAll("#gateFlower .bloom").forEach(function (b) { b.classList.add("on"); });
  }

  /* ---------- Init ---------- */
  build();
  initAudio();
  petals();
  setupCandle();
  $("#openBtn").addEventListener("click", open);
  $("#surpriseBtn").addEventListener("click", function () {
    bigConfetti();
    setTimeout(bigConfetti, 700);
    setTimeout(bigConfetti, 1400);
    toast("Happy birthday, my love 🌻");
  });
    /* ---------- Always start at the cake ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", function () { window.scrollTo(0, 0); });
  $(".scroll-cue").addEventListener("click", function (e) {
    e.preventDefault();
    $("#letter").scrollIntoView({ behavior: "smooth" });
  });
})();
