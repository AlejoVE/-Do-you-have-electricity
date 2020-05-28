const init = async () => {
  const res = await fetch("api/reports");
  const data = await res.json();
  console.log(data);
};

init();

// fetch("/api/reports")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     document.getElementById("reports-container").innerHTML = "hola";
//   })
//   .catch((err) => console.error(err));
