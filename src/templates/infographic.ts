const latex = `\\documentclass[10pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[light,default]{sourcesanspro}
\\usepackage[top=0in,bottom=0in,left=0in,right=0.25in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{paracol}
\\usepackage{tikz}
\\definecolor{primary}{RGB}{44,62,80}
\\definecolor{accent}{RGB}{41,128,185}
\\definecolor{sidecolor}{RGB}{235,239,244}
\\setlength{\\parindent}{0pt}
\\setlength{\\columnsep}{12pt}
\\pagestyle{empty}
\\columnratio{0.33}

\\newcommand{\\skillbar}[2]{%
  {\\small\\color{primary} #1}\\par
  \\vspace{1pt}%
  \\noindent\\begin{tikzpicture}
    \\fill[accent!22] (0,0) rectangle (4.2,0.17);
    \\fill[accent] (0,0) rectangle (#2*0.042,0.17);
  \\end{tikzpicture}\\par
  \\vspace{5pt}%
}

\\begin{document}

\\backgroundcolor{c[0]}{sidecolor}
\\begin{paracol}{2}

% ===== LEFT SIDEBAR =====

\\vspace{18pt}
\\begin{center}
  {\\fontsize{16}{20}\\selectfont\\bfseries\\color{primary} Alex Rivera}\\par
  \\vspace{4pt}
  {\\small\\color{accent} Senior Data Engineer}\\par
\\end{center}
\\vspace{14pt}

{\\leftskip=10pt\\rightskip=6pt\\small\\bfseries\\color{accent} CONTACT\\par}
\\vspace{3pt}
{\\leftskip=10pt\\rightskip=6pt\\small\\color{primary}\\raggedright%
alex@datapipe.io\\\\
+1 (512) 333-7654\\\\
Austin, TX\\par}

\\vspace{12pt}
{\\leftskip=10pt\\rightskip=6pt\\small\\bfseries\\color{accent} TECHNICAL SKILLS\\par}
\\vspace{4pt}
{\\leftskip=10pt\\rightskip=6pt%
\\skillbar{Python}{95}%
\\skillbar{SQL}{92}%
\\skillbar{Apache Spark}{82}%
\\skillbar{dbt}{78}%
\\skillbar{Apache Airflow}{85}%
\\skillbar{Docker / Kubernetes}{72}%
\\skillbar{Terraform}{65}%
}

\\vspace{8pt}
{\\leftskip=10pt\\rightskip=6pt\\small\\bfseries\\color{accent} LANGUAGES\\par}
\\vspace{4pt}
{\\leftskip=10pt\\rightskip=6pt%
\\skillbar{English}{100}%
\\skillbar{Spanish}{72}%
}

\\vspace{8pt}
{\\leftskip=10pt\\rightskip=6pt\\small\\bfseries\\color{accent} EDUCATION\\par}
\\vspace{3pt}
{\\leftskip=10pt\\rightskip=6pt\\small\\color{primary}\\raggedright%
\\textbf{MS Data Science}\\\\
UT Austin, 2019\\\\[4pt]
\\textbf{BS Computer Science}\\\\
Rice University, 2017\\par}

% ===== RIGHT MAIN CONTENT =====
\\switchcolumn

\\vspace{14pt}

{\\large\\bfseries\\color{primary} EXPERIENCE}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.8pt}}
\\vspace{3pt}

\\textbf{Senior Data Engineer} \\hfill {\\small\\textit{2022 -- Present}}\\\\
{\\small\\color{accent}\\textit{Databricks, Austin TX}}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt,parsep=0pt]
  \\item Built real-time ingestion pipelines handling 5 TB/day with sub-second latency
  \\item Cut warehouse compute costs by 40\\% through query optimisation and result caching
  \\item Mentored 3 junior engineers; led weekly data platform guild (20+ attendees)
\\end{itemize}

\\vspace{6pt}
\\textbf{Data Engineer} \\hfill {\\small\\textit{2019 -- 2022}}\\\\
{\\small\\color{accent}\\textit{HEB Digital, San Antonio TX}}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt,parsep=0pt]
  \\item Migrated legacy ETL to Airflow + dbt, reducing pipeline failure rate by 70\\%
  \\item Built customer segmentation models used by 8 product and marketing teams
  \\item Designed company-wide data catalog documenting 1,200+ datasets
\\end{itemize}

\\vspace{10pt}
{\\large\\bfseries\\color{primary} PROJECTS}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.8pt}}
\\vspace{3pt}

\\textbf{OpenLake} --- {\\small open source}\\\\
{\\small Delta Lake governance toolkit; 900+ GitHub stars, adopted by 40+ companies.}

\\vspace{5pt}
\\textbf{StreamBench}\\\\
{\\small Public benchmark comparing Spark, Flink, and DuckDB for streaming workloads.}

\\vspace{10pt}
{\\large\\bfseries\\color{primary} CERTIFICATIONS}\\\\[-3pt]
{\\color{accent}\\rule{\\linewidth}{0.8pt}}
\\vspace{3pt}

{\\small
Databricks Certified Data Engineer --- Professional\\\\
AWS Certified Data Analytics --- Specialty\\\\
dbt Certified Developer
}

\\end{paracol}
\\end{document}`;

export default latex;
