
function digits(s) {
  return (s || "").replace(/\D/g, "");
}

function hasLetter(s) {
  return /[а-яёa-z]/i.test(s || "");
}

function hasVowel(s) {
  return /[аеёиоуыэюяaeiou]/i.test(s || "");
}

function isMash(s) {
  var t = (s || "").toLowerCase().replace(/\s+/g, "");
  if (t.length < 4) return false;
  if (/^(.)\1+$/.test(t)) return true;
  var i;
  for (i = 2; i <= 4; i++) {
    var part = t.slice(0, i);
    if (part.length >= 2 && t.indexOf(part + part) === 0) return true;
  }
  return false;
}

function showErr(id, text) {
  var box = document.getElementById(id);
  if (box) box.innerHTML = text || "";
}

function mark(el, bad) {
  if (!el) return;
  if (bad) el.className = (el.className + " ploho").replace(/\sploho/g, "") + " ploho";
  else el.className = el.className.replace(/\s*ploho/g, "");
}

function checkName(el, errId) {
  var v = (el.value || "").trim();
  if (v.length < 2 || !hasLetter(v) || /\d/.test(v) || !hasVowel(v) || isMash(v) || !/^[а-яёa-z\-\s]+$/i.test(v)) {
    showErr(errId, "Напишите имя нормально, буквами");
    mark(el, true);
    return false;
  }
  showErr(errId, "");
  mark(el, false);
  return true;
}

function checkPhone(el, errId) {
  var d = digits(el.value);
  if (d.length === 10 && d.charAt(0) === "9") d = "7" + d;
  if (d.length === 11 && d.charAt(0) === "8") d = "7" + d.slice(1);
  if (!(d.length === 11 && d.charAt(0) === "7")) {
    showErr(errId, "Телефон вида +7 900 123-45-67");
    mark(el, true);
    return false;
  }
  el.value = "+7" + d.slice(1);
  showErr(errId, "");
  mark(el, false);
  return true;
}

function checkWhat(el, errId) {
  var v = (el.value || "").trim();
  if (v.length < 4 || !hasLetter(v) || !hasVowel(v) || isMash(v) || /^\d+$/.test(v)) {
    showErr(errId, "Напишите, что собрать: шкаф, стол, стеллаж");
    mark(el, true);
    return false;
  }
  showErr(errId, "");
  mark(el, false);
  return true;
}

function checkSum(el, errId) {
  var v = (el.value || "").trim();
  if (!v) {
    showErr(errId, "");
    mark(el, false);
    return true;
  }
  var n = parseInt(digits(v), 10);
  if (!n || n < 1000 || n > 20000000) {
    showErr(errId, "Укажите стоимость мебели числом, например 180000");
    mark(el, true);
    return false;
  }
  showErr(errId, "");
  mark(el, false);
  return true;
}

function checkLead(e) {
  var ok = true;
  if (!checkName(document.getElementById("name"), "err-name")) ok = false;
  if (!checkPhone(document.getElementById("phone"), "err-phone")) ok = false;
  if (!checkWhat(document.getElementById("what"), "err-what")) ok = false;
  if (!checkSum(document.getElementById("sum"), "err-sum")) ok = false;
  if (!ok) e.preventDefault();
}

function checkJob(e) {
  var ok = true;
  if (!checkName(document.getElementById("name2"), "err-name2")) ok = false;
  if (!checkPhone(document.getElementById("phone2"), "err-phone2")) ok = false;
  if (!ok) e.preventDefault();
}

var cur = 0;

function total() {
  return document.getElementById("lenta").children.length;
}

function show(i) {
  var max = total();
  if (i < 0) cur = max - 1;
  else if (i >= max) cur = 0;
  else cur = i;
  document.getElementById("lenta").style.transform = "translateX(-" + (cur * 100) + "%)";
  document.getElementById("lenta").style.transition = "0.4s";
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var dots = document.getElementById("dots");
  if (max < 2) {
    if (prev) prev.style.display = "none";
    if (next) next.style.display = "none";
    if (dots) dots.innerHTML = "";
    return;
  }
  if (prev) prev.style.display = "";
  if (next) next.style.display = "";
  var html = "";
  for (var n = 0; n < max; n++) {
    if (n == cur) html += "<button class='on' type='button'></button>";
    else html += "<button type='button' onclick='show(" + n + ")'></button>";
  }
  dots.innerHTML = html;
}

window.onload = function() {
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  if (prev) prev.onclick = function() { show(cur - 1); };
  if (next) next.onclick = function() { show(cur + 1); };
  if (document.getElementById("lenta")) show(0);
  var f1 = document.getElementById("form");
  var f2 = document.getElementById("job");
  if (f1) f1.onsubmit = checkLead;
  if (f2) f2.onsubmit = checkJob;

  var btn = document.getElementById("menuBtn");
  var menu = document.querySelector(".menu");
  if (btn && menu) {
    btn.onclick = function() {
      menu.classList.toggle("open");
    };
    var links = menu.getElementsByTagName("a");
    for (var k = 0; k < links.length; k++) {
      links[k].onclick = function() { menu.classList.remove("open"); };
    }
  }

  var items = document.getElementsByClassName("qa");
  for (var i = 0; i < items.length; i++) {
    items[i].getElementsByClassName("q")[0].onclick = function() {
      this.parentNode.classList.toggle("open");
    };
  }
};
