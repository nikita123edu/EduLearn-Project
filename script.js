// ===== MOBILE NAV TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Highlight active nav link
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

// ===== UTILITY: Get URL Parameter =====
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ===== UTILITY: Toast Notification =====
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== COURSES PAGE: Render Course Cards =====
function renderCourses() {
  const grid = document.getElementById("courses-grid");
  if (!grid) return;

  grid.innerHTML = COURSES.map(c => `
    <div class="course-card fade-in">
      <div class="card-img">
        <img src="${c.image}" alt="${c.title}" loading="lazy" />
        <span class="card-badge">${c.category}</span>
      </div>
      <div class="card-body">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <div class="card-meta">
          <span><i class="fas fa-clock"></i> ${c.duration}</span>
          <span><i class="fas fa-book-open"></i> ${c.lessons} Lessons</span>
          <span><i class="fas fa-signal"></i> ${c.level}</span>
        </div>
        <div style="margin-top:1rem;">
          <a href="course-detail.html?id=${c.id}" class="btn btn-primary btn-sm">View Course</a>
        </div>
      </div>
    </div>
  `).join("");
}

// ===== COURSE DETAIL PAGE =====
function renderCourseDetail() {
  const container = document.getElementById("course-detail");
  if (!container) return;

  const id = parseInt(getParam("id"));
  const course = COURSES.find(c => c.id === id);
  if (!course) {
    container.innerHTML = '<p style="text-align:center;padding:3rem;">Course not found. <a href="courses.html">Back to Courses</a></p>';
    return;
  }

  // Hero
  document.getElementById("course-hero-title").textContent = course.title;
  document.getElementById("course-hero-desc").textContent = course.description;
  document.getElementById("course-hero-meta").innerHTML = `
    <span><i class="fas fa-clock"></i> ${course.duration}</span>
    <span><i class="fas fa-book-open"></i> ${course.lessons} Lessons</span>
    <span><i class="fas fa-signal"></i> ${course.level}</span>
    <span><i class="fas fa-tag"></i> ${course.category}</span>
  `;

  // Overview tab
  document.getElementById("tab-overview").innerHTML = `
    <h3 style="margin-bottom:1rem;">What You'll Learn</h3>
    <div class="topics-list">
      ${course.topics.map(t => `
        <div class="topic-item">
          <i class="fas fa-check-circle"></i>
          <span>${t}</span>
        </div>
      `).join("")}
    </div>
  `;

  // Resources tab
  document.getElementById("tab-resources").innerHTML = `
    <h3 style="margin-bottom:1rem;">Study Materials</h3>
    <div class="resources-list">
      ${course.resources.map(r => `
        <div class="resource-item">
          <i class="fas ${r.icon}"></i>
          <span>${r.name}</span>
        </div>
      `).join("")}
    </div>
  `;

  // Video tab
  document.getElementById("tab-video").innerHTML = `
    <h3 style="margin-bottom:1rem;">Video Lecture</h3>
    <div class="video-wrapper">
      <iframe src="https://www.youtube.com/embed/${course.videoId}" 
              title="${course.title} Video" allowfullscreen loading="lazy"></iframe>
    </div>
  `;

  // Quiz tab
  document.getElementById("tab-quiz").innerHTML = `
    <div style="text-align:center; padding:2rem;">
      <i class="fas fa-pen-to-square" style="font-size:2.5rem; color:var(--primary); margin-bottom:1rem;"></i>
      <h3>Ready to Test Your Knowledge?</h3>
      <p style="color:var(--text-light); margin:1rem 0;">This quiz has ${course.quiz.length} multiple-choice questions.</p>
      <a href="quiz.html?id=${course.id}" class="btn btn-primary">Start Quiz</a>
    </div>
  `;
}

// Tab switching
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});

// ===== QUIZ ENGINE =====
let quizState = {
  courseId: null,
  questions: [],
  current: 0,
  score: 0,
  selected: null,
  answered: false
};

function initQuiz() {
  const container = document.getElementById("quiz-area");
  if (!container) return;

  const id = parseInt(getParam("id"));
  const course = COURSES.find(c => c.id === id);

  if (!course) {
    container.innerHTML = '<p style="text-align:center;padding:2rem;">Please select a course quiz. <a href="courses.html">Browse Courses</a></p>';
    // Show quiz selector
    renderQuizSelector();
    return;
  }

  quizState.courseId = id;
  quizState.questions = course.quiz;
  quizState.current = 0;
  quizState.score = 0;
  quizState.selected = null;
  quizState.answered = false;

  document.getElementById("quiz-course-title").textContent = course.title;
  renderQuestion();
}

function renderQuizSelector() {
  const selector = document.getElementById("quiz-selector");
  if (!selector) return;
  selector.innerHTML = `
    <p style="margin-bottom:1rem;">Choose a course to start the quiz:</p>
    <div class="courses-grid" style="max-width:900px; margin:0 auto;">
      ${COURSES.map(c => `
        <a href="quiz.html?id=${c.id}" class="course-card" style="text-decoration:none;">
          <div class="card-img">
            <img src="${c.image}" alt="${c.title}" loading="lazy" />
            <span class="card-badge">${c.category}</span>
          </div>
          <div class="card-body">
            <h3>${c.title}</h3>
            <p>${c.quiz.length} Questions</p>
          </div>
        </a>
      `).join("")}
    </div>
  `;
}

function renderQuestion() {
  const container = document.getElementById("quiz-area");
  const { questions, current } = quizState;
  const q = questions[current];
  const total = questions.length;
  const progress = ((current) / total) * 100;

  container.innerHTML = `
    <div class="quiz-header">
      <span>Question ${current + 1} of ${total}</span>
      <span>Score: ${quizState.score}/${total}</span>
    </div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width:${progress}%"></div>
    </div>
    <div class="quiz-card">
      <h3><span class="q-num">${current + 1}</span>${q.q}</h3>
      <div class="options-list">
        ${q.options.map((opt, i) => `
          <button class="option-btn" onclick="selectOption(${i})" data-index="${i}">
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>
        `).join("")}
      </div>
      <div class="quiz-actions">
        <div id="feedback" style="font-weight:500;"></div>
        <div>
          ${!quizState.answered ? '' : current < total - 1
            ? `<button class="btn btn-primary btn-sm" onclick="nextQuestion()">Next <i class="fas fa-arrow-right"></i></button>`
            : `<button class="btn btn-primary btn-sm" onclick="showResult()">See Results <i class="fas fa-trophy"></i></button>`
          }
        </div>
      </div>
    </div>
  `;
}

function selectOption(index) {
  if (quizState.answered) return;

  quizState.answered = true;
  quizState.selected = index;
  const correct = quizState.questions[quizState.current].answer;

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.style.pointerEvents = "none";
    if (i === correct) btn.classList.add("correct");
    if (i === index && i !== correct) btn.classList.add("wrong");
    if (i === index) btn.classList.add("selected");
  });

  const feedback = document.getElementById("feedback");
  if (index === correct) {
    quizState.score++;
    feedback.innerHTML = '<span style="color:var(--success)"><i class="fas fa-check-circle"></i> Correct!</span>';
  } else {
    feedback.innerHTML = `<span style="color:var(--danger)"><i class="fas fa-times-circle"></i> Wrong! Answer: ${quizState.questions[quizState.current].options[correct]}</span>`;
  }

  // Re-render to show next button
  renderQuestion();
  // Re-apply styles after re-render
  const newButtons = document.querySelectorAll(".option-btn");
  newButtons.forEach((btn, i) => {
    btn.style.pointerEvents = "none";
    if (i === correct) btn.classList.add("correct");
    if (i === index && i !== correct) btn.classList.add("wrong");
  });
  document.getElementById("feedback").innerHTML = feedback.innerHTML;
}

function nextQuestion() {
  quizState.current++;
  quizState.selected = null;
  quizState.answered = false;
  renderQuestion();
}

function showResult() {
  const { score, questions, courseId } = quizState;
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const course = COURSES.find(c => c.id === courseId);

  // Save to localStorage
  const progress = JSON.parse(localStorage.getItem("edulearn_progress") || "{}");
  progress[courseId] = {
    courseName: course.title,
    score: score,
    total: total,
    percent: percent,
    date: new Date().toLocaleDateString()
  };
  localStorage.setItem("edulearn_progress", JSON.stringify(progress));

  const container = document.getElementById("quiz-area");
  let message = "";
  if (percent >= 80) message = "🎉 Excellent work! You've mastered this topic!";
  else if (percent >= 60) message = "👍 Good job! A little more practice and you'll ace it!";
  else if (percent >= 40) message = "📚 Not bad! Review the materials and try again.";
  else message = "💪 Keep learning! Review the course and give it another shot.";

  container.innerHTML = `
    <div class="quiz-card quiz-result">
      <h2>Quiz Complete!</h2>
      <div class="result-circle" style="--percent:${percent}%">
        <span>${percent}%</span>
      </div>
      <h3>${score} out of ${total} correct</h3>
      <p>${message}</p>
      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
        <a href="quiz.html?id=${courseId}" class="btn btn-primary btn-sm"><i class="fas fa-redo"></i> Retake Quiz</a>
        <a href="course-detail.html?id=${courseId}" class="btn btn-sm" style="background:var(--bg);"><i class="fas fa-arrow-left"></i> Back to Course</a>
        <a href="progress.html" class="btn btn-sm" style="background:var(--success); color:#fff;"><i class="fas fa-chart-bar"></i> View Progress</a>
      </div>
    </div>
  `;
}

// ===== PROGRESS PAGE =====
function renderProgress() {
  const container = document.getElementById("progress-content");
  if (!container) return;

  const progress = JSON.parse(localStorage.getItem("edulearn_progress") || "{}");
  const entries = Object.values(progress);

  if (entries.length === 0) {
    container.innerHTML = `
      <div class="no-progress">
        <i class="fas fa-chart-line"></i>
        <h3>No Progress Yet</h3>
        <p>Complete a quiz to see your progress here.</p>
        <a href="courses.html" class="btn btn-primary" style="margin-top:1rem;">Browse Courses</a>
      </div>
    `;
    return;
  }

  const totalQuizzes = entries.length;
  const avgScore = Math.round(entries.reduce((sum, e) => sum + e.percent, 0) / totalQuizzes);
  const bestScore = Math.max(...entries.map(e => e.percent));

  container.innerHTML = `
    <div class="progress-summary fade-in">
      <h2><i class="fas fa-trophy" style="color:var(--accent);"></i> Your Learning Dashboard</h2>
      <div class="summary-stats">
        <div class="summary-stat">
          <h3>${totalQuizzes}</h3>
          <p>Quizzes Taken</p>
        </div>
        <div class="summary-stat">
          <h3>${avgScore}%</h3>
          <p>Average Score</p>
        </div>
        <div class="summary-stat">
          <h3>${bestScore}%</h3>
          <p>Best Score</p>
        </div>
      </div>
    </div>
    <div class="progress-grid">
      ${entries.map(e => `
        <div class="progress-card fade-in">
          <h3><i class="fas fa-book"></i> ${e.courseName}</h3>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${e.percent}%"></div>
          </div>
          <div class="progress-score">${e.score}/${e.total} (${e.percent}%) — ${e.date}</div>
        </div>
      `).join("")}
    </div>
    <div style="text-align:center; margin-top:2rem;">
      <button class="btn btn-danger btn-sm" onclick="clearProgress()"><i class="fas fa-trash"></i> Clear All Progress</button>
    </div>
  `;
}

function clearProgress() {
  if (confirm("Are you sure you want to clear all progress?")) {
    localStorage.removeItem("edulearn_progress");
    renderProgress();
    showToast("Progress cleared!", "success");
  }
}

// ===== CONTACT FORM (simulated) =====
function handleContact(e) {
  e.preventDefault();
  showToast("Message sent successfully! (Demo)", "success");
  e.target.reset();
}

// ===== HOME PAGE: Render Featured Courses =====
function renderFeatured() {
  const grid = document.getElementById("featured-courses");
  if (!grid) return;

  grid.innerHTML = COURSES.slice(0, 3).map(c => `
    <div class="course-card fade-in">
      <div class="card-img">
        <img src="${c.image}" alt="${c.title}" loading="lazy" />
        <span class="card-badge">${c.category}</span>
      </div>
      <div class="card-body">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <div class="card-meta">
          <span><i class="fas fa-clock"></i> ${c.duration}</span>
          <span><i class="fas fa-signal"></i> ${c.level}</span>
        </div>
        <div style="margin-top:1rem;">
          <a href="course-detail.html?id=${c.id}" class="btn btn-primary btn-sm">View Course</a>
        </div>
      </div>
    </div>
  `).join("");
}

// ===== LIBRARY PAGE =====
let activeFilter = "All";

function renderLibrary() {
  const container = document.getElementById("library-content");
  if (!container) return;

  const totalBooks = LIBRARY.reduce((sum, s) => sum + s.books.length, 0);

  let html = `
    <div class="library-stats">
      <div class="stat-item"><i class="fas fa-book" style="color:var(--primary);"></i><h3>${totalBooks}</h3><p>Books Available</p></div>
      <div class="stat-item"><i class="fas fa-layer-group" style="color:var(--secondary);"></i><h3>${LIBRARY.length}</h3><p>Subjects</p></div>
      <div class="stat-item"><i class="fas fa-download" style="color:var(--success);"></i><h3>Free</h3><p>Open Access</p></div>
    </div>

    <div class="library-search">
      <i class="fas fa-search"></i>
      <input type="text" id="library-search-input" placeholder="Search books by title or author..." oninput="filterBooks()" />
    </div>

    <div class="subject-filters" id="subject-filters">
      <button class="filter-btn active" onclick="setFilter('All')"><i class="fas fa-th"></i> All</button>
      ${LIBRARY.map(s => `
        <button class="filter-btn" onclick="setFilter('${s.subject}')">
          <i class="fas ${s.icon}"></i> ${s.subject}
        </button>
      `).join("")}
    </div>

    <div id="library-books"></div>
  `;
  container.innerHTML = html;
  renderBooks();
}

function setFilter(subject) {
  activeFilter = subject;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent.trim() === subject || (subject === "All" && btn.textContent.trim() === "All"));
  });
  renderBooks();
}

function filterBooks() {
  renderBooks();
}

function renderBooks() {
  const container = document.getElementById("library-books");
  if (!container) return;
  const query = (document.getElementById("library-search-input")?.value || "").toLowerCase();

  let html = "";
  const subjects = activeFilter === "All" ? LIBRARY : LIBRARY.filter(s => s.subject === activeFilter);

  subjects.forEach(s => {
    const filtered = s.books.filter(b =>
      b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
    );
    if (filtered.length === 0) return;

    html += `
      <div class="subject-section fade-in">
        <div class="subject-heading">
          <i class="fas ${s.icon}" style="background:${s.color};"></i>
          <h3>${s.subject}</h3>
          <span>${filtered.length} book${filtered.length > 1 ? 's' : ''}</span>
        </div>
        <div class="books-grid">
          ${filtered.map(b => `
            <div class="book-card">
              <div class="book-cover">
                <img src="${b.cover}" alt="${b.title}" loading="lazy" />
                <span class="book-format"><i class="fas fa-file-pdf"></i> PDF</span>
              </div>
              <div class="book-info">
                <h4>${b.title}</h4>
                <p class="book-author"><i class="fas fa-user-pen"></i> ${b.author}</p>
                <div class="book-meta">
                  <span><i class="fas fa-file-lines"></i> ${b.pages} pages</span>
                  <span><i class="fas fa-calendar"></i> ${b.year > 0 ? b.year : Math.abs(b.year) + ' BC'}</span>
                </div>
                <a href="${b.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
                  <i class="fas fa-external-link-alt"></i> Read / Download
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });

  if (!html) {
    html = `<div class="no-progress"><i class="fas fa-search"></i><h3>No books found</h3><p>Try a different search term or filter.</p></div>`;
  }
  container.innerHTML = html;
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderCourses();
  renderCourseDetail();
  initQuiz();
  renderProgress();
  renderLibrary();
});
