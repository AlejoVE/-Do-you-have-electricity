const handlers = {
  deleteReport: async (e) => {
    e.preventDefault();
    try {
      const id = Number(e.target.form.id);
      await fetch(`/api/reports/${id}`, {
        method: "DELETE",
      });
      const res = await fetch("/api/reports");
      const reports = await res.json();

      views.renderReports(reports);
      //   alert("file is deleted");
    } catch (error) {
      console.log(error);
    }
  },
};
