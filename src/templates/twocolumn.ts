const latex = `\\documentclass[10pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{textcomp}
\\usepackage[light,default]{sourcesanspro}
\\usepackage[top=0.65in,bottom=0.65in,left=0.7in,right=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{xcolor}
\\usepackage{paracol}
\\definecolor{primary}{RGB}{15,23,42}
\\definecolor{accent}{RGB}{14,116,144}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}
\\columnratio{0.38}

\\begin{document}

% ---- NAME HEADER (full width) ----
{\\fontsize{24}{28}\\selectfont\\bfseries\\color{primary} David Chen}\\par
\\vspace{3pt}
{\\color{accent} Data Scientist \\&  ML Engineer}\\par
\\vspace{3pt}
{\\small david.chen@ml.io \\;\\textbullet\\; (555) 654-3210 \\;\\textbullet\\; linkedin.com/in/davidchen \\;\\textbullet\\; Boston, MA}\\par
\\vspace{4pt}
\\noindent{\\color{accent}\\rule{\\linewidth}{1pt}}
\\vspace{6pt}

\\begin{paracol}{2}

% ===== LEFT COLUMN =====
{\\small\\bfseries\\color{accent}\\MakeUppercase{Skills}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
\\textbf{ML / AI}\\\\
PyTorch, TensorFlow, Scikit-learn\\\\
LLMs, RAG, Fine-tuning, RLHF\\\\[4pt]
\\textbf{Data}\\\\
Python, SQL, Spark, dbt\\\\
Pandas, NumPy, Polars\\\\[4pt]
\\textbf{Engineering}\\\\
FastAPI, Docker, Kubernetes\\\\
AWS SageMaker, GCP Vertex AI\\\\
MLflow, Airflow\\\\[4pt]
\\textbf{Visualisation}\\\\
Plotly, Matplotlib, Tableau
}

\\vspace{10pt}
{\\small\\bfseries\\color{accent}\\MakeUppercase{Education}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
\\textbf{MIT}\\\\
SM, Computer Science\\\\
2019 -- 2021\\\\
GPA 4.8/5.0\\\\[6pt]
\\textbf{Tsinghua University}\\\\
BE, Software Engineering\\\\
2015 -- 2019\\\\
GPA 3.9/4.0
}

\\vspace{10pt}
{\\small\\bfseries\\color{accent}\\MakeUppercase{Certifications}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
AWS Certified ML --- Specialty\\\\
GCP Professional Data Engineer\\\\
Deep Learning Specialisation (Coursera)
}

\\vspace{10pt}
{\\small\\bfseries\\color{accent}\\MakeUppercase{Languages}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
English --- Fluent\\\\
Mandarin --- Native\\\\
Japanese --- Beginner
}

% ===== RIGHT COLUMN =====
\\switchcolumn

{\\small\\bfseries\\color{accent}\\MakeUppercase{Experience}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
\\textbf{Staff Data Scientist} \\hfill 2023 -- Present\\\\
\\textit{Wayfair · Boston, MA}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Built LLM-powered product recommendation engine, lifting revenue-per-visit by 14\\%
  \\item Led team of 4 data scientists on demand forecasting platform (\\$2B inventory impact)
  \\item Reduced model training cost by 60\\% via mixed-precision and gradient checkpointing
\\end{itemize}

\\vspace{5pt}
\\textbf{Senior Data Scientist} \\hfill 2021 -- 2023\\\\
\\textit{HubSpot · Cambridge, MA}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Shipped churn-prediction model serving 150k accounts; reduced churn by 9\\%
  \\item Designed A/B testing framework adopted by 6 product teams
\\end{itemize}

\\vspace{5pt}
\\textbf{ML Research Intern} \\hfill 2020\\\\
\\textit{Google Brain · Mountain View, CA}
\\begin{itemize}[leftmargin=*,topsep=2pt,itemsep=1pt]
  \\item Researched efficient attention mechanisms; co-authored 1 NeurIPS workshop paper
\\end{itemize}
}

\\vspace{8pt}
{\\small\\bfseries\\color{accent}\\MakeUppercase{Selected Projects}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
\\textbf{OpenEmbed} \\hfill \\href{https://github.com/dchen/openembed}{github}\\\\
Open-source sentence embedding library (Python) with 3k+ GitHub stars.\\\\[4pt]
\\textbf{ForecastKit} \\hfill \\href{https://forecastkit.io}{forecastkit.io}\\\\
Time-series forecasting SaaS used by 40+ e-commerce companies.
}

\\vspace{8pt}
{\\small\\bfseries\\color{accent}\\MakeUppercase{Publications}}\\\\[-4pt]
\\rule{\\linewidth}{0.3pt}\\vspace{3pt}

{\\small
D. Chen et al., ``Efficient Sparse Attention for Long Documents,'' NeurIPS Workshop 2020.\\\\
D. Chen \\& L. Wang, ``Demand Forecasting with Temporal Fusion Transformers,'' ICML 2022.
}

\\end{paracol}
\\end{document}`;

export default latex;
