export const dashboardData = {
  overview: {
    totalProjects: 47,
    valueGenerated: 12500000, // $12.5M
    actualPercentage: 87,
    pdoEngagements: 23,
    externalEngagements: 15,
    valueContributions: [
      { project: "Digital Transformation Initiative", contribution: 4200000, percentage: 33.6 },
      { project: "RPA Implementation", contribution: 3100000, percentage: 24.8 },
      { project: "Data Analytics Platform", contribution: 2800000, percentage: 22.4 },
      { project: "Cloud Migration", contribution: 1500000, percentage: 12.0 },
      { project: "AI/ML Projects", contribution: 900000, percentage: 7.2 },
    ],
  },
  digitalAmbition: [
    {
      programName: "Digital Transformation Initiative",
      phase: "POC",
      comments: "Implementation proceeding as planned with minor adjustments",
      status: "On Track",
    },
    {
      programName: "Cloud Migration Program",
      phase: "Phase 2",
      comments: "Experiencing some technical challenges with legacy systems",
      status: "Delayed by 20%",
    },
    {
      programName: "Data Analytics Platform",
      phase: "Phase 4",
      comments: "Resource constraints affecting timeline",
      status: "Delayed by >50%",
    },
    {
      programName: "AI/ML Implementation",
      phase: "Phase 1",
      comments: "Major technical roadblocks identified",
      status: "Significantly Delayed",
    },
    {
      programName: "Cybersecurity Enhancement",
      phase: "Phase 2",
      comments: "Ahead of schedule with excellent team performance",
      status: "On Track",
    },
    {
      programName: "Mobile Application Development",
      phase: "Phase 3",
      comments: "User testing phase showing positive results",
      status: "On Track",
    },
  ],
  rpa: {
    kpis: {
      liveProcesses: 24,
      inDevelopment: 8,
      planned: 12,
      valueGenerated: 3100000, // $3.1M
      manhourSavings: 45,
      robots: 18,
    },
    savingsByDirectorate: [
      { name: "Operations", value: 1.2 },
      { name: "Finance", value: 0.8 },
      { name: "HR", value: 0.6 },
      { name: "IT", value: 0.3 },
      { name: "Procurement", value: 0.2 },
    ],
    projectStatusByDirectorate: [
      {
        directorate: "Operations",
        planning: 3,
        development: 2,
        production: 8,
        underDiscussion: 1,
      },
      {
        directorate: "Finance",
        planning: 2,
        development: 3,
        production: 5,
        underDiscussion: 2,
      },
      {
        directorate: "HR",
        planning: 1,
        development: 2,
        production: 4,
        underDiscussion: 1,
      },
      {
        directorate: "IT",
        planning: 4,
        development: 1,
        production: 3,
        underDiscussion: 0,
      },
      {
        directorate: "Procurement",
        planning: 2,
        development: 0,
        production: 4,
        underDiscussion: 1,
      },
    ],
  },
  ideHighlights: [
    {
      title: "Innovation Lab Launch",
      description:
        "Successfully launched the new innovation lab with state-of-the-art equipment and collaborative spaces.",
      details: [
        "Equipped with latest VR/AR technology",
        "Collaborative workspaces for cross-functional teams",
        "24/7 access for all employees",
        "Monthly innovation challenges launched",
      ],
    },
    {
      title: "Digital Skills Training Program",
      description: "Comprehensive training program to upskill employees in digital technologies and methodologies.",
      details: [
        "Over 500 employees trained in Q4",
        "Focus on AI, ML, and data analytics",
        "Certification partnerships with leading tech companies",
        "95% completion rate achieved",
      ],
    },
    {
      title: "Startup Collaboration Initiative",
      description: "Partnership program with local startups to foster innovation and knowledge exchange.",
      details: [
        "15 startup partnerships established",
        "Joint pilot projects in progress",
        "Mentorship program for entrepreneurs",
        "Technology transfer agreements signed",
      ],
    },
    {
      title: "Digital Innovation Awards",
      description: "Annual awards program recognizing outstanding digital innovation contributions.",
      details: [
        "50+ submissions received this year",
        "Categories include AI, automation, and sustainability",
        "Winner implementations scaled company-wide",
        "External industry recognition received",
      ],
    },
  ],
  capabilityDevelopment: [
    {
      title: "Technical Training",
      totalCount: 156,
      icon: "GraduationCap",
      activities: [
        "Cloud computing certifications",
        "Data science bootcamps",
        "Cybersecurity workshops",
        "DevOps methodology training",
      ],
    },
    {
      title: "Leadership Development",
      totalCount: 89,
      icon: "Users",
      activities: [
        "Digital leadership programs",
        "Change management workshops",
        "Strategic thinking seminars",
        "Cross-functional collaboration training",
      ],
    },
    {
      title: "Knowledge Sharing",
      totalCount: 234,
      icon: "BookOpen",
      activities: [
        "Monthly tech talks",
        "Best practices documentation",
        "Internal conferences",
        "Peer learning sessions",
      ],
    },
    {
      title: "Certifications",
      totalCount: 67,
      icon: "Award",
      activities: [
        "Professional certifications achieved",
        "Industry standard compliance",
        "Vendor-specific qualifications",
        "Internal competency assessments",
      ],
    },
  ],
  recognitionAwards: [
    {
      name: "Ahmed Al-Rashid",
      type: "Individual",
      recognition: "Outstanding contribution to RPA implementation, saving over $500K annually",
      photo: "/placeholder-user.jpg",
    },
    {
      name: "Digital Innovation Team",
      type: "Team",
      recognition: "Excellence in developing the AI-powered predictive maintenance system",
      teamMembers: ["Sarah Johnson", "Mohammed Al-Zahra", "Lisa Chen", "Omar Hassan"],
    },
    {
      name: "Fatima Al-Kindi",
      type: "Individual",
      recognition: "Leadership in digital transformation initiatives across multiple departments",
      photo: "/placeholder-user.jpg",
    },
    {
      name: "Cloud Migration Squad",
      type: "Team",
      recognition: "Successful migration of 80% of legacy systems to cloud infrastructure",
      teamMembers: ["David Park", "Aisha Al-Balushi", "Carlos Rodriguez"],
    },
    {
      name: "Khalid Al-Mamari",
      type: "Individual",
      recognition: "Innovation in developing automated reporting solutions",
      photo: "/placeholder-user.jpg",
    },
    {
      name: "Data Analytics Hub",
      type: "Team",
      recognition: "Creating comprehensive business intelligence dashboards",
      teamMembers: ["Jennifer Wu", "Hassan Al-Lawati", "Maria Santos", "Youssef Benali"],
    },
  ],
  teamBuilding: [
    {
      teamName: "Digital Innovation Team",
      date: "2024-01-15",
      activityName: "Innovation Workshop & Team Retreat",
      status: "Done",
    },
    {
      teamName: "RPA Development Squad",
      date: "2024-01-22",
      activityName: "Automation Challenge Competition",
      status: "Done",
    },
    {
      teamName: "Cloud Migration Team",
      date: "2024-02-05",
      activityName: "Technical Skills Workshop",
      status: "Done",
    },
    {
      teamName: "Data Analytics Hub",
      date: "2024-02-18",
      activityName: "Data Visualization Hackathon",
      status: "In Progress",
    },
    {
      teamName: "Cybersecurity Unit",
      date: "2024-03-01",
      activityName: "Security Awareness Training",
      status: "Done",
    },
    {
      teamName: "AI/ML Research Group",
      date: "2024-03-15",
      activityName: "Machine Learning Conference",
      status: "In Progress",
    },
    {
      teamName: "Digital Transformation Office",
      date: "2024-03-28",
      activityName: "Strategic Planning Session",
      status: "Done",
    },
    {
      teamName: "Mobile Development Team",
      date: "2024-04-10",
      activityName: "App Development Sprint",
      status: "In Progress",
    },
  ],
}
