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
    const id = getId(e);
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
  modifyReport: (e) => {
    e.preventDefault();
    const fieldsetElement = e.target.parentNode.firstElementChild;
    fieldsetElement.removeAttribute("disabled");

    const id = e.target.id;

    const buttonEl = document.getElementById(`${id}`);
    buttonEl.removeAttribute("class");
    buttonEl.innerHTML = "Save";
    buttonEl.setAttribute("class", "btn btn-success");
    buttonEl.removeAttribute("onclick");

    buttonEl.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = getId(e);
      const inputState = e.target.form[1].value;
      const inputCity = e.target.form[2].value.trim();
      const inputAddress = e.target.form[3].value.trim();
      const inputHaveElectricity = e.target.form[4].value.toLowerCase().trim();

      if (
        inputCity === "" ||
        inputAddress === "" ||
        inputHaveElectricity === ""
      ) {
        alert("Please fill in all the fields of the form");
        return;
      }
      if (inputHaveElectricity !== "yes") {
        if (inputHaveElectricity !== "no") {
          alert(
            `The only valid values for "Have Electricity" are "yes" or "no", please try again`
          );
          return;
        }
      }
      const value = inputHaveElectricity === "yes";

      try {
        await fetch("/api/reports/" + id, {
          method: "PUT",
          body: JSON.stringify({
            state: inputState,
            city: inputCity,
            have_electricity: value,
            street_address: inputAddress,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        alert("Report successfully modified!");
        location.reload();
      } catch (error) {
        console.log(error);
      }
    });
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

function getId(e) {
  const id = Number(
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
  );
  return id;
}
