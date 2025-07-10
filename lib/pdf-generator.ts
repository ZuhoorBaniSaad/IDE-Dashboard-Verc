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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #2d3748;
          line-height: 1.6;
          padding: 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          min-height: 100vh;
        }
        
        .header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }
        
        .header h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }
        
        .header p {
          font-size: 18px;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        
        .content {
          padding: 40px 30px;
        }
        
        .section {
          margin-bottom: 50px;
          page-break-inside: avoid;
        }
        
        .section h2 {
          font-size: 28px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 3px solid #e2e8f0;
          position: relative;
        }
        
        .section h2::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
        
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .kpi-card {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }
        
        .kpi-card:hover {
          transform: translateY(-2px);
        }
        
        .kpi-value {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        
        .kpi-label {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        th {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          padding: 18px 15px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
        }
        
        tr:nth-child(even) {
          background-color: #f8fafc;
        }
        
        tr:hover {
          background-color: #e2e8f0;
        }
        
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .status-on-track { 
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }
        
        .status-delayed-20 { 
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }
        
        .status-delayed-50 { 
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
        }
        
        .status-significantly-delayed { 
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }
        
        .chart-placeholder {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          color: #64748b;
          font-style: italic;
          margin: 20px 0;
        }
        
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }
        
        .highlight-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .highlight-card h4 {
          color: #1a202c;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .highlight-card p {
          color: #4a5568;
          margin-bottom: 15px;
          line-height: 1.6;
        }
        
        .highlight-details {
          list-style: none;
          padding: 0;
        }
        
        .highlight-details li {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }
        
        .highlight-details li::before {
          content: '•';
          color: #4f46e5;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .capability-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }
        
        .capability-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .capability-card h4 {
          color: #1a202c;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .capability-count {
          font-size: 36px;
          font-weight: 700;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }
        
        .capability-activities {
          list-style: none;
          padding: 0;
          text-align: left;
        }
        
        .capability-activities li {
          color: #64748b;
          font-size: 13px;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }
        
        .capability-activities li::before {
          content: '•';
          color: #4f46e5;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .recognition-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }
        
        .recognition-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 25px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .recognition-card h4 {
          color: #1a202c;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .recognition-type {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 15px;
        }
        
        .recognition-card p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        
        .team-members {
          color: #64748b;
          font-size: 13px;
          font-style: italic;
        }
        
        @media print {
          body { 
            margin: 0;
            background: white !important;
          }
          .container {
            box-shadow: none;
          }
          .section { 
            page-break-inside: avoid;
          }
          .kpi-card:hover,
          tr:hover {
            transform: none;
            background-color: inherit;
          }
        }
        
        @page {
          margin: 0.5in;
          size: A4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Digital Centre of Excellence</h1>
          <p>Comprehensive Dashboard Report - ${currentDate}</p>
        </div>

        <div class="content">
          <div class="section">
            <h2>📊 Overview KPIs</h2>
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
            <h2>🎯 Digital Ambition Program</h2>
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
                    <td><strong>${item.programName}</strong></td>
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
            <h2>🤖 RPA Summary</h2>
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
            
            <h3 style="color: #1a202c; font-size: 20px; margin: 30px 0 15px 0;">💰 Dollar Savings by Directorate</h3>
            <table>
              <thead>
                <tr>
                  <th>Directorate</th>
                  <th>Savings Amount</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                ${data.rpa.savingsByDirectorate
                  .map((item: any) => {
                    const total = data.rpa.savingsByDirectorate.reduce((sum: number, d: any) => sum + d.value, 0)
                    const percentage = ((item.value / total) * 100).toFixed(1)
                    return `
                      <tr>
                        <td><strong>${item.name}</strong></td>
                        <td>$${item.value}M</td>
                        <td>${percentage}%</td>
                      </tr>
                    `
                  })
                  .join("")}
              </tbody>
            </table>
            
            <h3 style="color: #1a202c; font-size: 20px; margin: 30px 0 15px 0;">📈 Project Status by Directorate</h3>
            <table>
              <thead>
                <tr>
                  <th>Directorate</th>
                  <th>Planning</th>
                  <th>Development</th>
                  <th>Production</th>
                  <th>Under Discussion</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${data.rpa.projectStatusByDirectorate
                  .map((item: any) => {
                    const total = item.planning + item.development + item.production + item.underDiscussion
                    return `
                      <tr>
                        <td><strong>${item.directorate}</strong></td>
                        <td>${item.planning}</td>
                        <td>${item.development}</td>
                        <td>${item.production}</td>
                        <td>${item.underDiscussion}</td>
                        <td><strong>${total}</strong></td>
                      </tr>
                    `
                  })
                  .join("")}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>💡 IDE Highlights</h2>
            <div class="highlights-grid">
              ${data.ideHighlights
                .map(
                  (item: any) => `
                <div class="highlight-card">
                  <h4>${item.title}</h4>
                  <p>${item.description}</p>
                  <ul class="highlight-details">
                    ${item.details.map((detail: string) => `<li>${detail}</li>`).join("")}
                  </ul>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="section">
            <h2>🧠 Capability Development</h2>
            <div class="capability-grid">
              ${data.capabilityDevelopment
                .map(
                  (item: any) => `
                <div class="capability-card">
                  <h4>${item.title}</h4>
                  <div class="capability-count">${item.totalCount}</div>
                  <ul class="capability-activities">
                    ${item.activities.map((activity: string) => `<li>${activity}</li>`).join("")}
                  </ul>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="section">
            <h2>🏆 Recognition & Awards</h2>
            <div class="recognition-grid">
              ${data.recognitionAwards
                .map(
                  (item: any) => `
                <div class="recognition-card">
                  <h4>${item.name}</h4>
                  <div class="recognition-type">${item.type}</div>
                  <p>${item.recognition}</p>
                  ${item.teamMembers ? `<p class="team-members"><strong>Team:</strong> ${item.teamMembers.join(", ")}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="section">
            <h2>🤝 Team Building Activities</h2>
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
                    <td><strong>${item.teamName}</strong></td>
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
        </div>
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
