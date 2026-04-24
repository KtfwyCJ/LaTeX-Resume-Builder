const latex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[sfdefault]{cabin}
\\usepackage[top=1in,bottom=1in,left=1.1in,right=1.1in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}
\\pagestyle{empty}

\\begin{document}

{\\centering
  {\\Large\\bfseries Alex Johnson}\\par
  \\vspace{5pt}
  {\\small alex.johnson@email.com \\quad +1 (555) 246-8100 \\quad github.com/alexj \\quad Austin, TX}\\par
}

\\bigskip

\\noindent{\\bfseries EDUCATION}\\\\[-6pt]
\\noindent\\rule{\\linewidth}{0.3pt}

\\textbf{University of Texas at Austin} \\hfill Austin, TX\\\\
BS Computer Science \\hfill Aug 2019 -- May 2023\\\\
GPA 3.85 · Dean's Honor List · Turing Scholar

\\bigskip

\\noindent{\\bfseries EXPERIENCE}\\\\[-6pt]
\\noindent\\rule{\\linewidth}{0.3pt}

\\textbf{Backend Engineer} · Notion \\hfill Sep 2023 -- Present · San Francisco, CA
\\begin{itemize}[leftmargin=1.2em,topsep=3pt,itemsep=1pt,parsep=0pt]
  \\item Rebuilt document sync engine, cutting p99 latency from 800ms to 120ms
  \\item Shipped offline-first mode for mobile clients (iOS \\& Android)
  \\item Wrote architecture decision records adopted across 5 backend teams
\\end{itemize}

\\vspace{6pt}
\\textbf{SWE Intern} · Cloudflare \\hfill May 2022 -- Aug 2022 · Remote
\\begin{itemize}[leftmargin=1.2em,topsep=3pt,itemsep=1pt,parsep=0pt]
  \\item Implemented rate-limiting middleware for Workers platform in Rust
  \\item Reduced cold-start time by 15\\% through init code optimisation
\\end{itemize}

\\bigskip

\\noindent{\\bfseries PROJECTS}\\\\[-6pt]
\\noindent\\rule{\\linewidth}{0.3pt}

\\textbf{Turbo Router} · \\href{https://github.com/alexj/turbo-router}{github.com/alexj/turbo-router}\\\\
High-performance HTTP router in Rust achieving 2M req/s on a single core. 2k+ GitHub stars.

\\vspace{4pt}
\\textbf{Pocket Budgets} · \\href{https://pocketbudgets.app}{pocketbudgets.app}\\\\
Personal finance tracker with automatic bank sync, built with Next.js and Plaid API. 3k MAU.

\\bigskip

\\noindent{\\bfseries SKILLS}\\\\[-6pt]
\\noindent\\rule{\\linewidth}{0.3pt}

Rust, Go, TypeScript, Python · PostgreSQL, Redis, Kafka · Docker, Kubernetes, AWS

\\end{document}`;

export default latex;
