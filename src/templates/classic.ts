const latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{mathptmx}
\\usepackage[top=0.75in,bottom=0.75in,left=1in,right=1in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\begin{document}

{\\centering
  {\\LARGE\\textbf{John Doe}}\\par
  \\vspace{5pt}
  {\\small john.doe@email.com \\quad (555)~123-4567 \\quad linkedin.com/in/johndoe \\quad New York, NY}\\par
}

\\vspace{6pt}
\\noindent\\rule{\\linewidth}{0.6pt}
\\vspace{2pt}

\\section*{Education}
\\noindent\\rule{\\linewidth}{0.3pt}\\vspace{2pt}

\\textbf{Columbia University} \\hfill New York, NY\\\\
\\textit{Master of Science in Computer Science} \\hfill Sep 2020 -- May 2022\\\\
GPA: 3.9/4.0 \\quad Relevant coursework: Algorithms, Machine Learning, Distributed Systems

\\vspace{6pt}
\\textbf{University of California, Berkeley} \\hfill Berkeley, CA\\\\
\\textit{Bachelor of Science in Computer Science} \\hfill Sep 2016 -- May 2020\\\\
GPA: 3.8/4.0 \\quad Dean's List (6 semesters)

\\section*{Experience}
\\noindent\\rule{\\linewidth}{0.3pt}\\vspace{2pt}

\\textbf{Software Engineer} --- Google \\hfill Mountain View, CA\\\\
\\textit{Full-time} \\hfill Jul 2022 -- Present
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Led redesign of internal build pipeline, reducing average CI time by 40\\%
  \\item Designed and shipped a distributed caching layer serving 50k+ RPS
  \\item Mentored 3 junior engineers and conducted 30+ technical interviews
\\end{itemize}

\\vspace{4pt}
\\textbf{Software Engineering Intern} --- Meta \\hfill Menlo Park, CA\\\\
\\textit{Internship} \\hfill May 2021 -- Aug 2021
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Built a real-time analytics dashboard used by 200+ internal teams
  \\item Optimised GraphQL resolver performance by 35\\% through query batching
\\end{itemize}

\\section*{Projects}
\\noindent\\rule{\\linewidth}{0.3pt}\\vspace{2pt}

\\textbf{OpenSearch} \\hfill \\href{https://github.com/johndoe/opensearch}{github.com/johndoe/opensearch}\\\\
Full-text search engine built in Go with BM25 ranking, inverted index, and a REST API. 800+ GitHub stars.

\\vspace{4pt}
\\textbf{NoteSync} \\hfill \\href{https://notesync.app}{notesync.app}\\\\
Real-time collaborative note-taking app built with React, WebSockets, and PostgreSQL. 1,200 active users.

\\section*{Skills}
\\noindent\\rule{\\linewidth}{0.3pt}\\vspace{2pt}

\\textbf{Languages:} Python, Go, TypeScript, Java, SQL\\\\
\\textbf{Frameworks:} React, Node.js, gRPC, Spring Boot\\\\
\\textbf{Tools:} Kubernetes, Docker, Terraform, PostgreSQL, Redis, Git

\\end{document}`;

export default latex;
