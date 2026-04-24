const latex = `\\documentclass[10pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[sfdefault,light]{roboto}
\\usepackage[top=0.6in,bottom=0.6in,left=0.75in,right=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\definecolor{accent}{RGB}{79,70,229}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\newcommand{\\sectionrule}{%
  \\vspace{4pt}\\noindent{\\color{accent}\\rule{\\linewidth}{1.2pt}}\\vspace{4pt}%
}
\\newcommand{\\cvsection}[1]{%
  \\vspace{8pt}{\\large\\bfseries\\color{accent}#1}\\sectionrule%
}

\\begin{document}

{\\centering
  {\\fontsize{22}{26}\\selectfont\\bfseries\\color{accent} Jane Smith}\\par
  \\vspace{5pt}
  {\\small jane.smith@email.com \\enspace|\\enspace (555)~987-6543 \\enspace|\\enspace linkedin.com/in/janesmith \\enspace|\\enspace San Francisco, CA}\\par
}

\\cvsection{Summary}
Results-driven product manager with 5+ years of experience shipping consumer and B2B products.
Proven track record of growing engagement metrics by 2--3$\\times$ through data-informed iteration.

\\cvsection{Experience}

\\textbf{Senior Product Manager} \\hfill {\\color{accent}\\textit{Stripe}} \\hfill San Francisco, CA\\\\
\\textit{Mar 2021 -- Present}
\\begin{itemize}[leftmargin=*,topsep=3pt,itemsep=2pt]
  \\item Owned the Payments Dashboard product used by 500k+ merchants globally
  \\item Launched fraud-detection feature reducing chargebacks by 28\\% in Q3 2023
  \\item Collaborated with engineering and design teams across 3 time zones
\\end{itemize}

\\vspace{6pt}
\\textbf{Product Manager} \\hfill {\\color{accent}\\textit{Airbnb}} \\hfill San Francisco, CA\\\\
\\textit{Jun 2018 -- Feb 2021}
\\begin{itemize}[leftmargin=*,topsep=3pt,itemsep=2pt]
  \\item Drove 22\\% increase in host onboarding completion through redesigned flow
  \\item Defined and tracked OKRs for a squad of 8 engineers and 2 designers
\\end{itemize}

\\cvsection{Education}

\\textbf{Stanford University} \\hfill Stanford, CA\\\\
\\textit{MBA} \\hfill 2016 -- 2018

\\vspace{4pt}
\\textbf{University of Michigan} \\hfill Ann Arbor, MI\\\\
\\textit{BS, Industrial Engineering, magna cum laude} \\hfill 2012 -- 2016

\\cvsection{Skills \\& Tools}

\\textbf{Product:} Roadmapping, A/B Testing, User Research, OKRs, PRDs, Go-to-Market\\\\
\\textbf{Data:} SQL, Mixpanel, Amplitude, Looker\\\\
\\textbf{Tools:} Figma, Jira, Notion, Confluence, Linear

\\end{document}`;

export default latex;
