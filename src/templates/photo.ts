const latex = `\\documentclass[10pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[sfdefault,light]{roboto}
\\usepackage[top=0.55in,bottom=0.5in,left=0.7in,right=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{tikz}
\\definecolor{primary}{RGB}{30,64,110}
\\definecolor{accent}{RGB}{0,140,170}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\begin{document}

% ---- HEADER ----
\\noindent
\\begin{minipage}[c]{0.72\\linewidth}
  {\\fontsize{26}{30}\\selectfont\\bfseries\\color{primary} James O'Brien}\\par
  \\vspace{5pt}
  {\\large\\color{accent} Software Engineering Manager}\\par
  \\vspace{8pt}
  {\\small\\color{gray}%
    james.obrien@email.com \\,\\textbullet\\,
    +1 (415) 555-9021 \\,\\textbullet\\,
    San Francisco, CA \\,\\textbullet\\,
    linkedin.com/in/jobrien
  }
\\end{minipage}%
\\hfill
\\begin{minipage}[c]{0.22\\linewidth}
  \\centering
  \\begin{tikzpicture}
    \\clip[rounded corners=3pt] (0,0) rectangle (2.4,2.8);
    \\fill[gray!18] (0,0) rectangle (2.4,2.8);
    \\fill[gray!40] (1.2,2.08) circle (0.52);
    \\fill[gray!40] (1.2,-0.35) ellipse (1.05 and 0.92);
    \\node[gray, font=\\tiny\\bfseries] at (1.2,0.28) {YOUR PHOTO};
  \\end{tikzpicture}
\\end{minipage}

\\vspace{5pt}
{\\color{accent}\\rule{\\linewidth}{1.2pt}}
\\vspace{10pt}

% ---- SUMMARY ----
{\\bfseries\\color{primary} PROFESSIONAL SUMMARY}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.5pt}}
\\vspace{4pt}

{\\small Experienced engineering manager with 10+ years building high-performing distributed teams and shipping products at scale. Passionate about cultures of ownership, engineering excellence, and continuous improvement.}\\par

\\vspace{10pt}

% ---- EXPERIENCE ----
{\\bfseries\\color{primary} EXPERIENCE}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.5pt}}
\\vspace{4pt}

\\textbf{Engineering Manager} \\hfill {\\small\\textit{2020 -- Present}}\\\\
{\\small\\color{accent}\\textit{Stripe, San Francisco CA}}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Led 11 engineers across 3 squads delivering payment infrastructure processing \\$1B+/day
  \\item Reduced on-call burden by 60\\% via systematic SLO adoption and runbook automation
  \\item Grew 4 ICs to senior and 1 senior to staff through structured mentorship programmes
\\end{itemize}

\\vspace{6pt}
\\textbf{Senior Software Engineer} \\hfill {\\small\\textit{2017 -- 2020}}\\\\
{\\small\\color{accent}\\textit{Airbnb, San Francisco CA}}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Architected host payments re-platform serving 4M+ hosts across 190 countries
  \\item Drove Envoy service mesh adoption across 40+ backend microservices
\\end{itemize}

\\vspace{6pt}
\\textbf{Software Engineer} \\hfill {\\small\\textit{2015 -- 2017}}\\\\
{\\small\\color{accent}\\textit{Palantir, New York NY}}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Built data pipeline tooling for enterprise clients in healthcare and defence
  \\item Delivered forward-deployed engineering engagements at 3 Fortune 500 companies
\\end{itemize}

\\vspace{10pt}

% ---- EDUCATION ----
{\\bfseries\\color{primary} EDUCATION}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.5pt}}
\\vspace{4pt}

\\textbf{BSc Computer Science} \\hfill {\\small 2011 -- 2015}\\\\
{\\small\\color{accent}\\textit{University of California, Berkeley}} \\hfill {\\small GPA 3.82 / 4.0}

\\vspace{10pt}

% ---- SKILLS ----
{\\bfseries\\color{primary} SKILLS}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.5pt}}
\\vspace{4pt}

{\\small
\\textbf{Engineering:} Go, Python, TypeScript, Kubernetes, Terraform, PostgreSQL, Redis\\\\
\\textbf{Leadership:} Team building, roadmap planning, stakeholder alignment, hiring, coaching\\\\
\\textbf{Certifications:} AWS Solutions Architect --- Professional, CKA (Kubernetes Administrator)
}

\\end{document}`;

export default latex;
