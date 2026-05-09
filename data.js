// ─── Phase & Resource Data ───────────────────────────────────────────────────

const PHASES = [
  {
    title: "Math & Python Foundations",
    weeks: "Weeks 1–4",
    num: "01",
    color: "#5b9cf6",
    bg: "rgba(91,156,246,0.13)",
    tasks: [
      { t: "Review linear algebra basics: vectors, matrices, dot products", tag: "Math" },
      { t: "Learn calculus fundamentals: derivatives and the chain rule", tag: "Math" },
      { t: "Get comfortable with probability & statistics (mean, variance, distributions)", tag: "Math" },
      { t: "Set up Python environment with conda or venv", tag: "Python" },
      { t: "Practice NumPy and pandas for data manipulation", tag: "Python" },
    ],
    resources: [
      {
        name: "3Blue1Brown — Essence of Linear Algebra",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
        icon: "▶",
        type: "YouTube",
        desc: "Visual, intuitive series on vectors, matrices, and transformations."
      },
      {
        name: "3Blue1Brown — Essence of Calculus",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
        icon: "▶",
        type: "YouTube",
        desc: "Animated calculus from first principles — derivatives and integrals explained visually."
      },
      {
        name: "Khan Academy — Statistics & Probability",
        url: "https://www.khanacademy.org/math/statistics-probability",
        icon: "📖",
        type: "Course",
        desc: "Free, structured lessons covering all the stats you need for ML."
      },
      {
        name: "Python Official Docs — Getting Started",
        url: "https://docs.python.org/3/tutorial/index.html",
        icon: "📄",
        type: "Docs",
        desc: "The official Python tutorial — great for getting your environment set up."
      },
      {
        name: "NumPy — Absolute Beginners Guide",
        url: "https://numpy.org/doc/stable/user/absolute_beginners.html",
        icon: "📄",
        type: "Docs",
        desc: "Official NumPy guide covering arrays, operations, and data manipulation."
      },
      {
        name: "Pandas — Getting Started Tutorials",
        url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html",
        icon: "📄",
        type: "Docs",
        desc: "Official pandas tutorials — learn to load, clean, and explore data."
      },
    ]
  },
  {
    title: "Core ML Concepts",
    weeks: "Weeks 5–8",
    num: "02",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.13)",
    tasks: [
      { t: "Understand supervised vs unsupervised learning", tag: "Theory" },
      { t: "Learn the train / validation / test split concept", tag: "Theory" },
      { t: "Implement linear regression from scratch with NumPy", tag: "Code" },
      { t: "Implement logistic regression and understand loss functions", tag: "Code" },
      { t: "Understand gradient descent and how models learn", tag: "Theory" },
    ],
    resources: [
      {
        name: "StatQuest — Machine Learning Playlist",
        url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
        icon: "▶",
        type: "YouTube",
        desc: "Josh Starmer breaks down ML algorithms with clear visuals and intuition."
      },
      {
        name: "Kaggle Learn — Intro to Machine Learning",
        url: "https://www.kaggle.com/learn/intro-to-machine-learning",
        icon: "🏆",
        type: "Course",
        desc: "Free hands-on micro-course covering core ML concepts with real datasets."
      },
      {
        name: "Google ML Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        icon: "📖",
        type: "Course",
        desc: "Google's free ML crash course with videos, exercises, and real examples."
      },
      {
        name: "scikit-learn — Getting Started",
        url: "https://scikit-learn.org/stable/getting_started.html",
        icon: "📄",
        type: "Docs",
        desc: "Official scikit-learn quickstart — estimators, transformers, and pipelines."
      },
    ]
  },
  {
    title: "Scikit-learn & First Projects",
    weeks: "Weeks 9–12",
    num: "03",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.13)",
    tasks: [
      { t: "Build decision trees and random forests with scikit-learn", tag: "Code" },
      { t: "Learn cross-validation, overfitting, and regularization", tag: "Theory" },
      { t: "Complete a Kaggle competition (Titanic or House Prices)", tag: "Project" },
      { t: "Learn feature engineering and data preprocessing pipelines", tag: "Code" },
      { t: "Evaluate models: precision, recall, F1, and confusion matrices", tag: "Theory" },
    ],
    resources: [
      {
        name: "Kaggle — Titanic Competition",
        url: "https://www.kaggle.com/competitions/titanic",
        icon: "🏆",
        type: "Project",
        desc: "The classic beginner Kaggle competition. Great for applying scikit-learn end-to-end."
      },
      {
        name: "Kaggle — House Prices Competition",
        url: "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques",
        icon: "🏆",
        type: "Project",
        desc: "Regression challenge — perfect for feature engineering practice."
      },
      {
        name: "scikit-learn — User Guide",
        url: "https://scikit-learn.org/stable/user_guide.html",
        icon: "📄",
        type: "Docs",
        desc: "Complete reference for all scikit-learn models, pipelines, and evaluation tools."
      },
      {
        name: "Kaggle Learn — Intermediate ML",
        url: "https://www.kaggle.com/learn/intermediate-machine-learning",
        icon: "🏆",
        type: "Course",
        desc: "Covers missing values, pipelines, cross-validation, and XGBoost."
      },
      {
        name: "Towards Data Science — Feature Engineering",
        url: "https://towardsdatascience.com/feature-engineering-for-machine-learning-3a5e293a5114",
        icon: "📝",
        type: "Article",
        desc: "Practical guide to feature engineering techniques used in real ML projects."
      },
    ]
  },
  {
    title: "Neural Networks & PyTorch",
    weeks: "Weeks 13–20",
    num: "04",
    color: "#c084fc",
    bg: "rgba(192,132,252,0.13)",
    tasks: [
      { t: "Understand how neural networks work: layers, activations, backprop", tag: "Theory" },
      { t: "Learn PyTorch: tensors, autograd, and training loops", tag: "Code" },
      { t: "Train a feedforward network on a real dataset (e.g. MNIST)", tag: "Project" },
      { t: "Experiment with CNNs for image data or RNNs for sequences", tag: "Code" },
    ],
    resources: [
      {
        name: "3Blue1Brown — Neural Networks Series",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        icon: "▶",
        type: "YouTube",
        desc: "Visual deep dive into how neural nets, backprop, and gradient descent actually work."
      },
      {
        name: "fast.ai — Practical Deep Learning for Coders",
        url: "https://course.fast.ai/",
        icon: "📖",
        type: "Course",
        desc: "Top-down approach to deep learning — build real models from day one using PyTorch."
      },
      {
        name: "PyTorch — Official Tutorials",
        url: "https://pytorch.org/tutorials/beginner/basics/intro.html",
        icon: "📄",
        type: "Docs",
        desc: "Official step-by-step tutorials: tensors, autograd, building and training models."
      },
      {
        name: "Andrej Karpathy — Neural Networks Zero to Hero",
        url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
        icon: "▶",
        type: "YouTube",
        desc: "Build neural networks from scratch in pure Python — legendary beginner series."
      },
      {
        name: "Papers With Code — MNIST Benchmarks",
        url: "https://paperswithcode.com/sota/image-classification-on-mnist",
        icon: "🔬",
        type: "Research",
        desc: "See state-of-the-art MNIST results and link to the papers and code behind them."
      },
    ]
  },
  {
    title: "Custom Model & Deployment",
    weeks: "Weeks 21–28",
    num: "05",
    color: "#fb7185",
    bg: "rgba(251,113,133,0.13)",
    tasks: [
      { t: "Define your problem: data sources, target variable, success metric", tag: "Plan" },
      { t: "Collect, clean, and explore your dataset (EDA)", tag: "Data" },
      { t: "Train and iterate on your custom model architecture", tag: "Train" },
      { t: "Tune hyperparameters with a systematic approach", tag: "Train" },
      { t: "Package and deploy the model (Flask API or Hugging Face Spaces)", tag: "Deploy" },
    ],
    resources: [
      {
        name: "Hugging Face Spaces — Deploy ML Apps",
        url: "https://huggingface.co/spaces",
        icon: "🚀",
        type: "Platform",
        desc: "Free hosting for ML demos — deploy Gradio or Streamlit apps in minutes."
      },
      {
        name: "Streamlit — Build ML Web Apps",
        url: "https://streamlit.io/",
        icon: "🚀",
        type: "Tool",
        desc: "Turn Python scripts into shareable web apps with zero frontend code."
      },
      {
        name: "Weights & Biases — Experiment Tracking",
        url: "https://wandb.ai/site",
        icon: "📊",
        type: "Tool",
        desc: "Track experiments, visualize metrics, and compare model runs automatically."
      },
      {
        name: "Kaggle Learn — Feature Engineering",
        url: "https://www.kaggle.com/learn/feature-engineering",
        icon: "🏆",
        type: "Course",
        desc: "Advanced feature engineering techniques for squeezing performance from your data."
      },
      {
        name: "Flask — Quickstart for ML APIs",
        url: "https://flask.palletsprojects.com/en/stable/quickstart/",
        icon: "📄",
        type: "Docs",
        desc: "Official Flask quickstart — wrap your model in a REST API endpoint."
      },
      {
        name: "ONNX — Export & Run Models Anywhere",
        url: "https://onnx.ai/get-started.html",
        icon: "📄",
        type: "Docs",
        desc: "Export PyTorch or sklearn models to ONNX format for cross-platform deployment."
      },
    ]
  }
];

const TAGS = {
  Math:    ["rgba(91,156,246,0.14)",  "#5b9cf6"],
  Python:  ["rgba(74,222,128,0.14)",  "#4ade80"],
  Theory:  ["rgba(192,132,252,0.14)", "#c084fc"],
  Code:    ["rgba(251,191,36,0.14)",  "#fbbf24"],
  Project: ["rgba(45,212,191,0.14)",  "#2dd4bf"],
  Plan:    ["rgba(251,113,133,0.14)", "#fb7185"],
  Data:    ["rgba(251,191,36,0.14)",  "#fbbf24"],
  Train:   ["rgba(192,132,252,0.14)", "#c084fc"],
  Deploy:  ["rgba(251,113,133,0.14)", "#fb7185"],
};

const RESOURCE_TYPE_COLORS = {
  YouTube:  { bg: "rgba(255,70,70,0.12)",   col: "#ff4646", icon: "▶" },
  Course:   { bg: "rgba(74,222,128,0.12)",  col: "#4ade80", icon: "📖" },
  Docs:     { bg: "rgba(91,156,246,0.12)",  col: "#5b9cf6", icon: "📄" },
  Project:  { bg: "rgba(251,191,36,0.12)",  col: "#fbbf24", icon: "🏆" },
  Article:  { bg: "rgba(45,212,191,0.12)",  col: "#2dd4bf", icon: "📝" },
  Research: { bg: "rgba(192,132,252,0.12)", col: "#c084fc", icon: "🔬" },
  Platform: { bg: "rgba(251,113,133,0.12)", col: "#fb7185", icon: "🚀" },
  Tool:     { bg: "rgba(251,191,36,0.12)",  col: "#fbbf24", icon: "🛠" },
};

const MILESTONES = [
  { pct: 25,  icon: "🚀", title: "25% complete!", sub: "Solid start — math and Python are paying off." },
  { pct: 50,  icon: "⚡", title: "Halfway there!", sub: "Right in the middle of the ML journey." },
  { pct: 75,  icon: "🔥", title: "75% done!", sub: "Almost there — the model is within reach." },
  { pct: 100, icon: "🎓", title: "All done!", sub: "You built and deployed a custom ML model." },
];

const TOTAL = PHASES.reduce((s, p) => s + p.tasks.length, 0);
