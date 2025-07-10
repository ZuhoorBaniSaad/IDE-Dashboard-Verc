export function generatePDFReport(data: any, currentDate: string) {
  // Create a new window with the dashboard content for printing
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    alert("Please allow popups to generate the PDF report")
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>DCoE Dashboard Report - ${currentDate}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
          color: #1e293b;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #10b981;
        }
        .header h1 {
          color: #10b981;
          margin: 0;
          font-size: 28px;
        }
        .header p {
          color: #64748b;
          margin: 5px 0 0 0;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section h2 {
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        .kpi-card {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }
        .kpi-value {
          font-size: 24px;
          font-weight: bold;
          color: #10b981;
        }
        .kpi-label {
          font-size: 14px;
          color: #64748b;
          margin-top: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f8fafc;
          font-weight: 600;
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-on-track { background-color: #dcfce7; color: #166534; }
        .status-delayed-20 { background-color: #fef3c7; color: #92400e; }
        .status-delayed-50 { background-color: #fed7aa; color: #9a3412; }
        .status-significantly-delayed { background-color: #fecaca; color: #991b1b; }
        .recognition-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }
        .recognition-card {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }
        @media print {
          body { margin: 0; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Digital Centre of Excellence</h1>
        <p>DCoE Dashboard Report - ${currentDate}</p>
      </div>

      <div class="section">
        <h2>Overview KPIs</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-value">${data.overview.totalProjects}</div>
            <div class="kpi-label">Total Projects</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">$${(data.overview.valueGenerated / 1000000).toFixed(1)}M</div>
            <div class="kpi-label">Value Generated</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.overview.actualPercentage}%</div>
            <div class="kpi-label">Actual %</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.overview.pdoEngagements}</div>
            <div class="kpi-label">PDO Engagements</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.overview.externalEngagements}</div>
            <div class="kpi-label">External Engagements</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Digital Ambition Program</h2>
        <table>
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Phase</th>
              <th>Comments</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.digitalAmbition
              .map(
                (item: any) => `
              <tr>
                <td>${item.programName}</td>
                <td>${item.phase}</td>
                <td>${item.comments}</td>
                <td>
                  <span class="status-badge ${getStatusClass(item.status)}">
                    ${item.status}
                  </span>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>RPA Summary</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-value">${data.rpa.kpis.liveProcesses}</div>
            <div class="kpi-label">Live Processes</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.rpa.kpis.inDevelopment}</div>
            <div class="kpi-label">In Development</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.rpa.kpis.planned}</div>
            <div class="kpi-label">Planned</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">$${(data.rpa.kpis.valueGenerated / 1000000).toFixed(1)}M</div>
            <div class="kpi-label">Value Generated</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.rpa.kpis.manhourSavings}K</div>
            <div class="kpi-label">Manhour Savings</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${data.rpa.kpis.robots}</div>
            <div class="kpi-label">Robots</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Recognition & Awards</h2>
        <div class="recognition-grid">
          ${data.recognitionAwards
            .map(
              (item: any) => `
            <div class="recognition-card">
              <h4>${item.name}</h4>
              <p><strong>Type:</strong> ${item.type}</p>
              <p>${item.recognition}</p>
              ${item.teamMembers ? `<p><strong>Team:</strong> ${item.teamMembers.join(", ")}</p>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="section">
        <h2>Team Building Activities</h2>
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Date</th>
              <th>Activity Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.teamBuilding
              .map(
                (item: any) => `
              <tr>
                <td>${item.teamName}</td>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${item.activityName}</td>
                <td>
                  <span class="status-badge ${item.status === "Done" ? "status-on-track" : "status-delayed-20"}">
                    ${item.status}
                  </span>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()

  // Wait for content to load then print
  setTimeout(() => {
    printWindow.print()
  }, 1000)
}

function getStatusClass(status: string): string {
  switch (status) {
    case "On Track":
      return "status-on-track"
    case "Delayed by 20%":
      return "status-delayed-20"
    case "Delayed by >50%":
      return "status-delayed-50"
    case "Significantly Delayed":
      return "status-significantly-delayed"
    default:
      return "status-on-track"
  }
}
