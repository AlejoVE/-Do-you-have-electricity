const handlers = {
  addReport: async () => {
    console.log("hi");
    views.addReportForm();
    try {
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
