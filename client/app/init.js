const init = async () => {
  const res = await fetch("api/reports");
  const data = await res.json();

  const mainDivTrue = document.getElementById("reports-container-true");
  const mainDivFalse = document.getElementById("reports-container-false");
  const divElTrue = views.renderReports(data, true);
  const divElFalse = views.renderReports(data, false);
  mainDivTrue.appendChild(divElTrue);
  mainDivFalse.appendChild(divElFalse);
};

init();

// fetch("/api/reports")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     document.getElementById("reports-container").innerHTML = "hola";
//   })
//   .catch((err) => console.error(err));
