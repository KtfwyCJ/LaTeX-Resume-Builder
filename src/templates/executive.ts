const latex = `\\documentclass[11pt,letterpaper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{mathptmx}
\\usepackage[top=0.6in,bottom=0.6in,left=0.8in,right=0.8in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\definecolor{charcoal}{RGB}{55,65,81}
\\definecolor{gold}{RGB}{180,140,40}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\newcommand{\\cvsection}[1]{%
  \\vspace{10pt}%
  \\noindent{\\large\\bfseries\\color{charcoal} #1}\\par
  \\vspace{2pt}%
  \\noindent{\\color{gold}\\rule{0.3\\linewidth}{2pt}}\\par
  \\vspace{3pt}%
}

\\begin{document}

\\noindent{\\color{charcoal}\\rule{\\linewidth}{2pt}}
\\vspace{5pt}

{\\fontsize{24}{28}\\selectfont\\bfseries\\color{charcoal} Jonathan A. Mercer}\\par
\\vspace{3pt}
{\\large\\color{gold} Chief Technology Officer}\\par
\\vspace{4pt}
{\\small j.mercer@email.com \\quad (617)~555-3047 \\quad linkedin.com/in/jamercer \\quad Boston, MA}\\par
\\vspace{4pt}
\\noindent{\\color{charcoal}\\rule{\\linewidth}{0.5pt}}

\\cvsection{Executive Profile}
Technology executive with 20+ years building and scaling engineering organizations. Proven track record leading digital transformations at Fortune~500 companies, growing ARR from \\$80M to \\$400M, and establishing enterprise platforms used by millions globally. Known for bridging strategy and execution across engineering, product, and business stakeholders.

\\cvsection{Experience}

\\textbf{Chief Technology Officer} \\hfill \\textit{Meridian Financial Group} \\hfill Boston, MA\\\\
\\textit{2019 -- Present}
\\begin{itemize}[leftmargin=1.6em,topsep=2pt,itemsep=2pt]
  \\item Oversaw 220-person engineering organization across 4 global offices and \\$95M annual technology budget
  \\item Led 3-year cloud migration from on-premise infrastructure to AWS; reduced operating expenses 38\\%
  \\item Launched digital wealth management platform with 2.1M registered users in first 18 months
  \\item Grew engineering team from 80 to 220; established apprenticeship program with 94\\% retention rate
\\end{itemize}

\\vspace{6pt}
\\textbf{VP of Engineering} \\hfill \\textit{Fidelity Investments} \\hfill Boston, MA\\\\
\\textit{2015 -- 2019}
\\begin{itemize}[leftmargin=1.6em,topsep=2pt,itemsep=2pt]
  \\item Led 85-person engineering division responsible for retail brokerage platform at \\$2.4B ARR
  \\item Delivered 40\\% reduction in time-to-market for new product features via DevOps transformation
  \\item Negotiated \\$12M vendor consolidation; achieved 99.99\\% platform uptime SLA throughout tenure
\\end{itemize}

\\vspace{6pt}
\\textbf{Director of Software Engineering} \\hfill \\textit{State Street Corporation} \\hfill Boston, MA\\\\
\\textit{2010 -- 2015}
\\begin{itemize}[leftmargin=1.6em,topsep=2pt,itemsep=2pt]
  \\item Directed 40-person team building custody and fund accounting systems for \\$38T AUM
  \\item Designed event-driven architecture processing 12M+ daily transactions with zero-downtime deploys
\\end{itemize}

\\cvsection{Education}

\\textbf{MIT Sloan School of Management} \\hfill Cambridge, MA\\\\
\\textit{MBA, Technology \\& Operations Management} \\hfill 2008 -- 2010

\\vspace{4pt}
\\textbf{Cornell University} \\hfill Ithaca, NY\\\\
\\textit{BS, Computer Science} \\hfill 2000 -- 2004

\\cvsection{Board \\& Advisory}

\\begin{itemize}[leftmargin=1.6em,topsep=2pt,itemsep=1pt]
  \\item Board Director, FinTech Sandbox (2022--Present)
  \\item Technology Advisory Council, Federal Reserve Bank of Boston (2021--Present)
  \\item Mentor, MIT \\$100K Entrepreneurship Competition (2018--Present)
\\end{itemize}

\\end{document}`;

export default latex;
