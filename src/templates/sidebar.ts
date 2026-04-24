const latex = `\\documentclass[10pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[sfdefault]{roboto}
\\usepackage[top=0in,bottom=0in,left=0in,right=0in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{array}
\\definecolor{sidecolor}{RGB}{34,40,60}
\\definecolor{accentcolor}{RGB}{99,179,237}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\begin{document}
\\noindent
\\begin{minipage}[t]{0.32\\textwidth}
  \\colorbox{sidecolor}{%
    \\begin{minipage}[t][\\textheight][t]{\\textwidth}%
      \\vspace{20pt}
      \\centering
      {\\fontsize{18}{22}\\selectfont\\bfseries\\color{white} Maria\\\\[2pt]Garcia}\\par
      \\vspace{4pt}
      {\\small\\color{accentcolor} UX Designer}\\par
      \\vspace{18pt}
      \\raggedright\\hspace{10pt}
      {\\small\\bfseries\\color{accentcolor} CONTACT}\\par
      \\vspace{4pt}
      \\hspace{10pt}{\\small\\color{white}
        maria@design.io\\\\
        +1 (555) 321-7890\\\\
        Seattle, WA\\\\
        linkedin.com/in/mgarcia%
      }\\par
      \\vspace{16pt}
      \\hspace{10pt}{\\small\\bfseries\\color{accentcolor} SKILLS}\\par
      \\vspace{4pt}
      \\hspace{10pt}{\\small\\color{white}
        Figma \\& Sketch\\\\
        Prototyping\\\\
        User Research\\\\
        Usability Testing\\\\
        Design Systems\\\\
        HTML / CSS\\\\
        Adobe Creative Suite%
      }\\par
      \\vspace{16pt}
      \\hspace{10pt}{\\small\\bfseries\\color{accentcolor} LANGUAGES}\\par
      \\vspace{4pt}
      \\hspace{10pt}{\\small\\color{white}
        English --- Native\\\\
        Spanish --- Fluent\\\\
        French --- Intermediate%
      }\\par
      \\vspace{16pt}
      \\hspace{10pt}{\\small\\bfseries\\color{accentcolor} EDUCATION}\\par
      \\vspace{4pt}
      \\hspace{10pt}{\\small\\color{white}
        \\textbf{BFA Interaction Design}\\\\
        Rhode Island School\\\\
        of Design, 2017\\\\[6pt]
        \\textbf{UX Certificate}\\\\
        Google, 2019%
      }\\par
    \\end{minipage}%
  }%
\\end{minipage}%
\\hspace{0.02\\textwidth}%
\\begin{minipage}[t]{0.64\\textwidth}
  \\vspace{16pt}

  {\\large\\bfseries\\color{sidecolor} EXPERIENCE}\\\\[-4pt]
  {\\color{accentcolor}\\rule{\\linewidth}{1.2pt}}
  \\vspace{4pt}

  \\textbf{Lead UX Designer} \\hfill {\\small\\textit{2021 -- Present}}\\\\
  {\\color{sidecolor}\\textit{Microsoft, Redmond WA}}
  \\begin{itemize}[leftmargin=*,topsep=3pt,itemsep=2pt]
    \\item Redesigned the Teams mobile app onboarding, improving D7 retention by 31\\%
    \\item Led a design system initiative adopted by 12 product teams (400+ components)
    \\item Managed 2 mid-level designers and a research contractor
  \\end{itemize}

  \\vspace{8pt}
  \\textbf{Senior UX Designer} \\hfill {\\small\\textit{2019 -- 2021}}\\\\
  {\\color{sidecolor}\\textit{Amazon, Seattle WA}}
  \\begin{itemize}[leftmargin=*,topsep=3pt,itemsep=2pt]
    \\item Owned end-to-end design for Alexa Smart Home setup flow (10M+ devices)
    \\item Ran 25+ moderated usability sessions and synthesised findings into product changes
    \\item Reduced setup abandonment rate from 38\\% to 19\\% over 3 release cycles
  \\end{itemize}

  \\vspace{8pt}
  \\textbf{UX Designer} \\hfill {\\small\\textit{2017 -- 2019}}\\\\
  {\\color{sidecolor}\\textit{IDEO, San Francisco CA}}
  \\begin{itemize}[leftmargin=*,topsep=3pt,itemsep=2pt]
    \\item Delivered UX for clients including Nike, Kaiser Permanente, and Ford
    \\item Facilitated design sprints with cross-functional stakeholders
  \\end{itemize}

  \\vspace{12pt}
  {\\large\\bfseries\\color{sidecolor} SELECTED PROJECTS}\\\\[-4pt]
  {\\color{accentcolor}\\rule{\\linewidth}{1.2pt}}
  \\vspace{4pt}

  \\textbf{HealthTrack App Redesign} --- Kaiser Permanente\\\\
  {\\small Redesigned patient portal mobile app. Net Promoter Score increased from 24 to 61.}

  \\vspace{6pt}
  \\textbf{Ford In-Vehicle UX} --- Ford Motor Company\\\\
  {\\small Designed voice-first navigation experience for SYNC 4 platform. Shipped in 2020 F-150.}

  \\vspace{12pt}
  {\\large\\bfseries\\color{sidecolor} AWARDS}\\\\[-4pt]
  {\\color{accentcolor}\\rule{\\linewidth}{1.2pt}}
  \\vspace{4pt}

  \\textbf{Webby Award} --- Best UX, Mobile Apps category, 2022\\\\
  \\textbf{Fast Company Innovation by Design} --- Finalist, 2021\\\\
  \\textbf{RISD Presidential Scholar} --- 2013--2017
\\end{minipage}
\\end{document}`;

export default latex;
