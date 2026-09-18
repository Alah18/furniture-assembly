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
  var html = "";
  for (var n = 0; n < max; n++) {
    if (n == cur) html += "<button class='on' type='button'></button>";
    else html += "<button type='button' onclick='show(" + n + ")'></button>";
  }
  document.getElementById("dots").innerHTML = html;
}

window.onload = function() {
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  if (prev) prev.onclick = function() { show(cur - 1); };
  if (next) next.onclick = function() { show(cur + 1); };
  if (document.getElementById("lenta")) show(0);

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
