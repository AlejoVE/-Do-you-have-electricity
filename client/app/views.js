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
    divElTrue.setAttribute("id", "true-reports");
    const divElFalse = document.createElement("div");
    divElFalse.setAttribute("id", "false-reports");
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
  deleteReport: (id, value) => {
    const parentFalse = document.getElementById("false-reports");
    const parentTrue = document.getElementById("true-reports");
    const child = document.getElementById(`${id}`);

    if (value === true) {
      parentTrue.removeChild(child);
      return;
    }
    parentFalse.removeChild(child);
  },
  addReportForm: () => {
    const container = document.getElementById("container-new-report");
    const formEl = document.createElement("form");
    formEl.innerHTML = `<br /><label>Have Electricity?</label>
  <br />
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio1"
      value="option1"
    />
    <label class="form-check-label" for="inlineRadio1">Yes</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio2"
      value="option2"
    required/>
    <label class="form-check-label" for="inlineRadio2">No</label>
  </div>
  <br />
  <div class="form-group">
    <label for="exampleFormControlInput1">City</label>
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="example: Caracas"
    required/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">State</label>
    <select class="form-control" id="exampleFormControlSelect1" required>
      <option value="" selected disabled>Please select</option>
      <option>Amazonas</option>
      <option>Anzoátegui</option>
      <option>Apure</option>
      <option>Aragua</option>
      <option>Barinas</option>
      <option>Bolívar</option>
      <option>Carabobo</option>
      <option>Cojedes</option>
      <option>Delta Amacuro</option>
      <option>Barinas</option>
      <option>Distrito Capital</option>
      <option>Falcón</option>
      <option>Guárico</option>
      <option>Lara</option>
      <option>Mérida</option>
      <option>Miranda</option>
      <option>Monagas</option>
      <option>Nueva Esparta</option>
      <option>Portuguesa</option>
      <option>Sucre</option>
      <option>Táchira</option>
      <option>Trujillo</option>
      <option>Vargas</option>
      <option>Yaracuy</option>
      <option>Zulia</option>
    </select>
  </div>
  <div class="form-group">
    <label for="exampleFormControlInput1">Street address</label>
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="example: some address"
     required/>
  </div>
  <button type="submit" class="btn btn-success" id="save-button">Save report</button>
  <button type="submit" class="btn btn-danger" id="cancel-button">Cancel</button>`;

    container.appendChild(formEl);
  },
};

function createDiv(report) {
  const divEl = document.createElement("div");
  divEl.setAttribute("id", report.id);
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
