// ===== COURSE DATA =====
const COURSES = [
  {
    id: 1,
    title: "Introduction to Biology",
    category: "Science",
    description: "Explore the fascinating world of living organisms — from cells and DNA to ecosystems and evolution.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop",
    duration: "6 weeks",
    lessons: 12,
    level: "Beginner",
    topics: [
      "Cell Structure & Function",
      "DNA & Genetics",
      "Photosynthesis & Respiration",
      "Human Body Systems",
      "Ecology & Ecosystems",
      "Evolution & Natural Selection"
    ],
    resources: [
      { name: "Cell Biology Notes (PDF)", icon: "fa-file-pdf" },
      { name: "Genetics Cheat Sheet", icon: "fa-file-alt" },
      { name: "Lab Experiment Guide", icon: "fa-flask" },
      { name: "Interactive Cell Diagram", icon: "fa-microscope" }
    ],
    videoId: "QnQe0xW_JY4",
    quiz: [
      { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"], answer: 1 },
      { q: "DNA stands for:", options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Deoxyribose Nucleic Atom", "Dynamic Nuclear Acid"], answer: 0 },
      { q: "Which process converts sunlight into chemical energy?", options: ["Respiration", "Fermentation", "Photosynthesis", "Osmosis"], answer: 2 },
      { q: "The basic unit of life is:", options: ["Atom", "Molecule", "Cell", "Tissue"], answer: 2 },
      { q: "Which organ system is responsible for transporting blood?", options: ["Nervous System", "Circulatory System", "Digestive System", "Respiratory System"], answer: 1 }
    ]
  },
  {
    id: 2,
    title: "Fundamentals of Algebra",
    category: "Mathematics",
    description: "Build a strong foundation in algebra — master equations, expressions, functions, and problem-solving techniques.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    duration: "8 weeks",
    lessons: 16,
    level: "Beginner",
    topics: [
      "Variables & Expressions",
      "Linear Equations",
      "Inequalities",
      "Polynomials",
      "Quadratic Equations",
      "Functions & Graphs"
    ],
    resources: [
      { name: "Algebra Formula Sheet", icon: "fa-file-pdf" },
      { name: "Practice Problem Set", icon: "fa-file-alt" },
      { name: "Graphing Calculator Guide", icon: "fa-calculator" },
      { name: "Video Lecture Notes", icon: "fa-video" }
    ],
    videoId: "NybHckSEQBI",
    quiz: [
      { q: "Solve for x: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 7", "x = 3"], answer: 0 },
      { q: "What is the degree of the polynomial 3x³ + 2x - 1?", options: ["1", "2", "3", "0"], answer: 2 },
      { q: "Which of these is a quadratic equation?", options: ["2x + 1 = 0", "x² + 3x + 2 = 0", "x³ = 8", "5x = 25"], answer: 1 },
      { q: "What is the slope of the line y = 3x + 7?", options: ["7", "3", "3x", "10"], answer: 1 },
      { q: "Simplify: (x + 2)(x - 2)", options: ["x² - 4", "x² + 4", "2x", "x² - 2x"], answer: 0 }
    ]
  },
  {
    id: 3,
    title: "World History Overview",
    category: "History",
    description: "Journey through the major events and civilizations that shaped our modern world, from ancient times to the 20th century.",
    image: "history.png",
    duration: "10 weeks",
    lessons: 20,
    level: "Intermediate",
    topics: [
      "Ancient Civilizations",
      "The Roman Empire",
      "Medieval Europe",
      "The Renaissance",
      "Industrial Revolution",
      "World Wars & Modern Era"
    ],
    resources: [
      { name: "Timeline of World History", icon: "fa-file-pdf" },
      { name: "Map Collection", icon: "fa-map" },
      { name: "Key Figures Guide", icon: "fa-user-graduate" },
      { name: "Documentary Links", icon: "fa-film" }
    ],
    videoId: "BCNk_mCMRgs",
    quiz: [
      { q: "Which civilization built the pyramids of Giza?", options: ["Roman", "Greek", "Egyptian", "Mesopotamian"], answer: 2 },
      { q: "The Renaissance began in which country?", options: ["France", "England", "Italy", "Germany"], answer: 2 },
      { q: "The Industrial Revolution started in:", options: ["United States", "France", "Germany", "Britain"], answer: 3 },
      { q: "World War I began in which year?", options: ["1905", "1914", "1918", "1939"], answer: 1 },
      { q: "Who was the first President of the United States?", options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], answer: 2 }
    ]
  },
  {
    id: 4,
    title: "Python Programming",
    category: "Computer Science",
    description: "Learn Python from scratch — variables, loops, functions, and build your first programs step by step.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    duration: "8 weeks",
    lessons: 18,
    level: "Beginner",
    topics: [
      "Python Basics & Syntax",
      "Variables & Data Types",
      "Control Flow (if/else)",
      "Loops (for & while)",
      "Functions & Modules",
      "Lists, Tuples & Dictionaries"
    ],
    resources: [
      { name: "Python Quick Reference", icon: "fa-file-pdf" },
      { name: "Coding Exercises", icon: "fa-code" },
      { name: "Project Ideas List", icon: "fa-lightbulb" },
      { name: "Debugging Guide", icon: "fa-bug" }
    ],
    videoId: "kqtD5dpn9C8",
    quiz: [
      { q: "Which keyword is used to define a function in Python?", options: ["func", "function", "def", "define"], answer: 2 },
      { q: "What will print(type(42)) output?", options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'num'>"], answer: 1 },
      { q: "Which data structure uses key-value pairs?", options: ["List", "Tuple", "Set", "Dictionary"], answer: 3 },
      { q: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
      { q: "What does 'len([1, 2, 3])' return?", options: ["1", "2", "3", "6"], answer: 2 }
    ]
  },
  {
    id: 5,
    title: "Physics: Motion & Forces",
    category: "Science",
    description: "Understand the fundamental laws of motion and forces that govern our physical universe.",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&h=400&fit=crop",
    duration: "7 weeks",
    lessons: 14,
    level: "Intermediate",
    topics: [
      "Speed, Velocity & Acceleration",
      "Newton's Laws of Motion",
      "Friction & Air Resistance",
      "Gravity & Free Fall",
      "Work, Energy & Power",
      "Momentum & Collisions"
    ],
    resources: [
      { name: "Physics Formula Sheet", icon: "fa-file-pdf" },
      { name: "Problem Solving Guide", icon: "fa-file-alt" },
      { name: "Lab Experiment Manual", icon: "fa-flask" },
      { name: "Simulation Links", icon: "fa-atom" }
    ],
    videoId: "kKKM8Y-u7ds",
    quiz: [
      { q: "Newton's First Law is also known as the Law of:", options: ["Acceleration", "Inertia", "Gravity", "Momentum"], answer: 1 },
      { q: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2 },
      { q: "Acceleration due to gravity on Earth is approximately:", options: ["5.8 m/s²", "9.8 m/s²", "12.5 m/s²", "15.0 m/s²"], answer: 1 },
      { q: "Which of these is a vector quantity?", options: ["Speed", "Mass", "Temperature", "Velocity"], answer: 3 },
      { q: "The formula for kinetic energy is:", options: ["mgh", "½mv²", "Fd", "ma"], answer: 1 }
    ]
  },
  {
    id: 6,
    title: "English Literature",
    category: "Language Arts",
    description: "Discover classic and modern literary works — analyze themes, characters, and storytelling techniques.",
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&h=400&fit=crop",
    duration: "6 weeks",
    lessons: 12,
    level: "Beginner",
    topics: [
      "Elements of Fiction",
      "Poetry Analysis",
      "Shakespeare's Works",
      "Modern Short Stories",
      "Literary Devices",
      "Essay Writing Techniques"
    ],
    resources: [
      { name: "Literary Terms Glossary", icon: "fa-file-pdf" },
      { name: "Reading List", icon: "fa-book" },
      { name: "Essay Templates", icon: "fa-file-alt" },
      { name: "Author Biographies", icon: "fa-user" }
    ],
    videoId: "MSYw502dJNY",
    quiz: [
      { q: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], answer: 2 },
      { q: "A metaphor is:", options: ["A direct comparison without 'like' or 'as'", "A comparison using 'like' or 'as'", "An exaggeration", "A repeated sound"], answer: 0 },
      { q: "What is the main character of a story called?", options: ["Antagonist", "Narrator", "Protagonist", "Foil"], answer: 2 },
      { q: "A sonnet traditionally has how many lines?", options: ["10", "12", "14", "16"], answer: 2 },
      { q: "Which literary device gives human qualities to non-human things?", options: ["Simile", "Alliteration", "Personification", "Hyperbole"], answer: 2 }
    ]
  }
];
