const latex = `\\documentclass[10pt,letterpaper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[sfdefault]{roboto}
\\usepackage[top=0.5in,bottom=0.5in,left=0.65in,right=0.65in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\definecolor{navy}{RGB}{15,23,42}
\\definecolor{teal}{RGB}{20,184,166}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\newcommand{\\cvsection}[1]{%
  \\vspace{8pt}%
  \\noindent{\\large\\bfseries\\color{navy}\\MakeUppercase{#1}}\\par
  \\vspace{-5pt}%
  {\\color{teal}\\rule{\\linewidth}{1pt}}%
  \\vspace{2pt}%
}

\\begin{document}

{\\color{navy}\\rule{\\linewidth}{3pt}}
\\vspace{4pt}

{\\fontsize{22}{26}\\selectfont\\bfseries\\color{navy} Marcus Rivera}\\par
\\vspace{2pt}
{\\large\\color{teal} Full-Stack Software Engineer}\\par
\\vspace{3pt}
{\\small marcus.rivera@email.com \\quad (555)~234-5678 \\quad github.com/mrivera \\quad Austin, TX}\\par
\\vspace{3pt}
{\\color{teal}\\rule{\\linewidth}{1pt}}

\\cvsection{Experience}

\\textbf{Staff Software Engineer} \\hfill {\\color{navy}\\textit{Cloudflare}} \\hfill Austin, TX\\\\
\\textit{Jan 2022 -- Present}
\\begin{itemize}[leftmargin=1.5em,topsep=2pt,itemsep=2pt]
  \\item Architected edge-computing pipeline processing 5M+ requests/day with sub-10ms P99 latency
  \\item Led migration of monolith to microservices, reducing deploys from weekly to 50+ per day
  \\item Mentored 6 engineers; 3 promoted to senior during tenure
\\end{itemize}

\\vspace{5pt}
\\textbf{Senior Software Engineer} \\hfill {\\color{navy}\\textit{Shopify}} \\hfill Remote\\\\
\\textit{May 2019 -- Dec 2021}
\\begin{itemize}[leftmargin=1.5em,topsep=2pt,itemsep=2pt]
  \\item Built cart checkout APIs serving Black Friday traffic peaks of 80k RPM
  \\item Reduced database query latency 60\\% via strategic indexing and query rewriting
  \\item Shipped real-time inventory sync used by 200k+ merchants globally
\\end{itemize}

\\vspace{5pt}
\\textbf{Software Engineer} \\hfill {\\color{navy}\\textit{Twilio}} \\hfill San Francisco, CA\\\\
\\textit{Jul 2016 -- Apr 2019}
\\begin{itemize}[leftmargin=1.5em,topsep=2pt,itemsep=2pt]
  \\item Developed SMS delivery pipeline handling 500M+ messages/month
  \\item Integrated 12 international carrier APIs; improved global delivery rate to 99.3\\%
\\end{itemize}

\\cvsection{Education}

\\textbf{University of Texas at Austin} \\hfill Austin, TX\\\\
\\textit{BS, Computer Science, Summa Cum Laude} \\hfill 2012 -- 2016

\\cvsection{Projects}

\\textbf{EdgeCache} \\quad Open-source distributed caching library with 2.4k GitHub stars. Written in Go; supports LRU, LFU, and TTL eviction.

\\vspace{3pt}
\\textbf{QueryLens} \\quad CLI tool for visualizing SQL query execution plans; adopted by 800+ developers within 3 months of launch.

\\cvsection{Skills}

\\textbf{Languages:} Go, TypeScript, Python, Rust, SQL\\\\
\\textbf{Frameworks:} React, Node.js, gRPC, GraphQL, Kafka\\\\
\\textbf{Infrastructure:} Kubernetes, Terraform, AWS, Cloudflare Workers, PostgreSQL, Redis

\\end{document}`;

export default latex;
