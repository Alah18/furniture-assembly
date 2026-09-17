var cur = 0;

function sendForm(e) {
  e.preventDefault();
  var text = "Имя: " + document.getElementById("name").value +
    "\nТелефон: " + document.getElementById("phone").value +
    "\nЧто собрать: " + document.getElementById("what").value +
    "\nСтоимость мебели: " + (document.getElementById("sum").value || "не указана");
  document.getElementById("msg1").innerHTML = "Откроется письмо на xxlexx@list.ru";
  window.location.href = "mailto:xxlexx@list.ru?subject=Заявка на сборку&body=" + encodeURIComponent(text);
}

function sendJob(e) {
  e.preventDefault();
  var text = "Имя: " + document.getElementById("name2").value +
    "\nТелефон: " + document.getElementById("phone2").value +
    "\nВакансия: Сборщик мебели";
  document.getElementById("msg2").innerHTML = "Откроется письмо с откликом";
  window.location.href = "mailto:xxlexx@list.ru?subject=Отклик: сборщик&body=" + encodeURIComponent(text);
}

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

window.onload = function () {
  document.getElementById("form").onsubmit = sendForm;
  document.getElementById("job").onsubmit = sendJob;
  document.getElementById("prev").onclick = function () { show(cur - 1); };
  document.getElementById("next").onclick = function () { show(cur + 1); };
  show(0);

  var items = document.getElementsByClassName("qa");
  for (var i = 0; i < items.length; i++) {
    items[i].getElementsByClassName("q")[0].onclick = function () {
      this.parentNode.classList.toggle("open");
    };
  }
};
