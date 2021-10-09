//jos napsauta "Hyväksy"-painike
document.getElementById("accept").addEventListener("click", function () {
  var txtName = 1;
  var obj = JSON.parse(localStorage.yourObject || '{"Name": ""}');
  obj.Name = txtName;
  localStorage.yourObject = JSON.stringify(obj);
  //piilota evästeikkuna 
  document.getElementById("cookie").style.display = "none";
});

//jos napsauta "X"-painike
document.getElementById("cancel").addEventListener("click", function () {
  var txtName = 0;
  var obj = JSON.parse(localStorage.yourObject || '{"Name": ""}');
  obj.Name = txtName;
  localStorage.yourObject = JSON.stringify(obj);
  //piilota evästeikkuna
  document.getElementById("cookie").style.display = "none";
});

//näytä viesti kerran päivässä 
if (localStorage.last) {
  //Date.now () on millisekuntia, joten muunna kaikki päiviksi, ja jos se on yli 1 päivä, näytä evästeikkuna 
  if ((localStorage.last - Date.now()) / (1000 * 60 * 60 * 24) >= 1) {
    //Näytä evästeikkuna
    document.getElementById("cookie").style.display = "block";
    //Nollaa ajastin 
    localStorage.last = Date.now(); 
    }
  } else {
    localStorage.last = Date.now();
    //Näytä evästeikkuna, koska ei ole koskaan näyttänyt sitä aiemmin. 
    document.getElementById("cookie").style.display = "block"; 
}