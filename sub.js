

document.addEventListener("DOMContentLoaded", () => {
  let submissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];

  const renderTable = (data) => {
    const tableBody = document.getElementById("student-table-body");
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No students found.</td></tr>';
      return;
    }

    data.forEach((submission, index) => {
      const row = document.createElement("tr");

      // Add row class based on status
      if (submission.status === "selected") {
        row.classList.add("row-selected");
      } else if (submission.status === "rejected") {
        row.classList.add("row-rejected");
      }

      row.innerHTML = `
        <td data-label="Name">${submission.name}</td>
        <td data-label="Email">${submission.email}</td>
        <td data-label="Phone">${submission.phone}</td>
        <td data-label="Message">${submission.message}</td>
        <td data-label="Timestamp">${submission.timestamp}</td>
        <td data-label="Status">
          <span class="status ${submission.status || ''}">
            ${submission.status ? submission.status.charAt(0).toUpperCase() + submission.status.slice(1) : 'Pending'}
          </span>
        </td>
        <td data-label="Reason">
          <input 
            type="text" 
            value="${submission.reason || ''}" 
            placeholder="Enter reason..." 
            id="reason-${index}" 
            ${submission.status ? 'disabled' : ''} 
          />
        </td>
        <td data-label="Action" class="action-buttons">
          <button class="select-btn ${submission.status ? 'disabled-btn' : ''}" onclick="updateStatus(${index}, 'selected')" ${submission.status ? 'disabled' : ''}>Select</button>
          <button class="reject-btn ${submission.status ? 'disabled-btn' : ''}" onclick="updateStatus(${index}, 'rejected')" ${submission.status ? 'disabled' : ''}>Reject</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  };

  // Initial render
  renderTable(submissions);

  // Search handler
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = submissions.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.phone.toLowerCase().includes(query) ||
      (s.status && s.status.toLowerCase().includes(query)) ||
      (s.reason && s.reason.toLowerCase().includes(query))
    );
    renderTable(filtered);
  });

  // Global function to update status and reason
  window.updateStatus = (index, status) => {
    const reasonInput = document.getElementById(`reason-${index}`);
    const reason = reasonInput ? reasonInput.value : '';

    // Update status and reason
    submissions[index].status = status;
    submissions[index].reason = reason;
    localStorage.setItem("formSubmissions", JSON.stringify(submissions));

    // Re-render table to reflect the changes
    renderTable(submissions);
  };
});
