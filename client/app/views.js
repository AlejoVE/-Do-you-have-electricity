const views = {
  renderReports: (arrayReports, value) => {
    const reports = arrayReports;
    const theyHaveElectricity = [];
    const theyDoNotHaveElectricity = [];

    reports.forEach((report) => {
      if (report.have_electricity === true) {
        theyHaveElectricity.push(report);
      } else {
        theyDoNotHaveElectricity.push(report);
      }
    });

    const divElTrue = document.createElement("div");
    const divElFalse = document.createElement("div");

    theyDoNotHaveElectricity.forEach((report) => {
      const divEl = createDiv(report);
      divElFalse.appendChild(divEl);
    });

    theyHaveElectricity.forEach((report) => {
      const divEl = createDiv(report);
      divElTrue.appendChild(divEl);
    });

    if (value === true) {
      return divElTrue;
    }

    return divElFalse;
  },
};

function createDiv(report) {
  const divEl = document.createElement("div");
  const ulEl = document.createElement("ul");
  const li = document.createElement("li");
  let haveElectricity = "yes";

  if (report.have_electricity === false) {
    haveElectricity = "no";
  }

  li.innerHTML = `<details close>
  <summary>Report N°: ${report.id}. Place: ${report.city} </summary>
    <form>
      <fieldset disabled>
        <label>State:</label>
        <input type="text" value="${report.state}" />
        <br />
        <label>City:</label>
        <input type="text" value="${report.city}" />
        <br />
        <label>Street address:</label>
        <input type="text" value="${report.street_address}" />
        <br />
        <label>Have Electricity:</label>
        <input type="text" value="${haveElectricity}" />
        <br />
        <p><strong>Date:</strong> ${report.date}</p>
      </fieldset>
      <button class="btn btn-danger" id="btn-delete-${report.id}" onclick="handlers.deleteReport(event)">Delete</button>
      <button class="btn btn-primary" id="btn-modify-${report.id}">Modify Report</button>
    </form>
</details>
`;
  ulEl.appendChild(li);
  divEl.appendChild(ulEl);
  return divEl;
}
