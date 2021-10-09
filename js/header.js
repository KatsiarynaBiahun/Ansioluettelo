//responsive header
function headerResponsive() {
  var x = document.getElementById("header-link");
  if (x.className === "header") {
    x.className += " responsive";
  } else {
    x.className = "header";
  }
}
