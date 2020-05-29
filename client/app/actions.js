const handlers = {
  displayForm: () => {
    document.getElementById("report-button").setAttribute("disabled", true);
    // document.getElementById("report-button").removeAttribute("disabled");
    views.addReportForm();
    ButtonListeners();
  },
  addReport: async (e) => {
    e.preventDefault();
    const haveElectricity = getRadioButtonSelectedValue(
      document.reportForm.inlineRadioOptions
    );
    const value = haveElectricity === "yes";
    const inputCity = e.target.form[2].value;
    const inputState = e.target.form[3].value;
    const inputAddress = e.target.form[4].value;

    if (inputAddress === "" || inputCity === "" || inputState === "") {
      alert("Please introduce the city, state and address");
      return;
    }

    try {
      await fetch("/api/reports/", {
        method: "POST",
        body: JSON.stringify({
          city: inputCity,
          state: inputState,
          street_address: inputAddress,
          have_electricity: value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      alert("Report saved");
      views.closeReportForm();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  },
  deleteReport: async (e) => {
    e.preventDefault();
    const id = Number(
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
    );
    const valueElectricity = e.target.form[4].value;
    const valueBoolean = valueElectricity === "yes";

    try {
      await fetch(`/api/reports/${id}`, {
        method: "DELETE",
      });

      views.deleteReport(id, valueBoolean);
      alert("Report removed");
    } catch (error) {
      console.log(error);
    }
  },
};

function ButtonListeners() {
  document
    .getElementById("save-button")
    .addEventListener("click", handlers.addReport);

  document
    .getElementById("cancel-button")
    .addEventListener("click", views.closeReportForm);
}

function getRadioButtonSelectedValue(ctrl) {
  for (i = 0; i < ctrl.length; i++) if (ctrl[i].checked) return ctrl[i].value;
}
