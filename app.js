// Application data
const appData = {
  "personalInfo": {
    "name": "Your Name",
    "title": "Senior Data Analyst & AI Specialist",
    "company": "EY",
    "location": "India",
    "bio": "Passionate Data & AI professional with expertise in Microsoft Fabric, data engineering, and machine learning. Currently working as Senior Analyst at EY, specializing in data-driven solutions and AI implementations. Enthusiastic about sharing knowledge through tech blogging and freelance writing.",
    "skills": ["Python", "SQL", "Microsoft Fabric", "Azure", "Machine Learning", "Data Engineering", "Power BI", "R", "TensorFlow", "Databricks"],
    "email": "your.email@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourhandle"
  },
  "experience": [
    {
      "title": "Senior Analyst",
      "company": "EY",
      "period": "2023 - Present",
      "description": "Leading data engineering initiatives using Microsoft Fabric. Developing scalable data solutions and implementing AI/ML models for enterprise clients.",
      "technologies": ["Microsoft Fabric", "Azure", "Python", "SQL", "Power BI"]
    },
    {
      "title": "Data Engineer",
      "company": "Previous Company",
      "period": "2021 - 2023",
      "description": "Built and maintained data pipelines, developed ETL processes, and implemented data quality frameworks.",
      "technologies": ["Python", "SQL", "Apache Spark", "Databricks", "AWS"]
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Customer Churn Prediction Model",
      "category": "Machine Learning",
      "description": "Developed a machine learning model to predict customer churn with 94% accuracy using ensemble methods and feature engineering.",
      "technologies": ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      "github": "https://github.com/yourusername/churn-prediction",
      "demo": "https://yourportfolio.github.io/churn-demo",
      "image": "project1.jpg"
    },
    {
      "id": 2,
      "title": "Real-time Data Pipeline",
      "category": "Data Engineering",
      "description": "Built a real-time data pipeline processing 100K+ events per second using Apache Kafka and Spark Streaming.",
      "technologies": ["Apache Kafka", "Spark Streaming", "Python", "Docker"],
      "github": "https://github.com/yourusername/realtime-pipeline",
      "image": "project2.jpg"
    },
    {
      "id": 3,
      "title": "NLP Sentiment Analysis",
      "category": "AI/ML",
      "description": "Created a sentiment analysis system for social media data using transformer models and deployed on Azure.",
      "technologies": ["Python", "Transformers", "Azure", "Flask"],
      "github": "https://github.com/yourusername/sentiment-analysis",
      "demo": "https://yourportfolio.github.io/sentiment-demo",
      "image": "project3.jpg"
    }
  ],
  "blogPosts": [
    {
      "id": 1,
      "title": "Getting Started with Microsoft Fabric",
      "date": "2024-01-15",
      "category": "Data Engineering",
      "excerpt": "A comprehensive guide to Microsoft Fabric for data engineers, covering setup, best practices, and real-world applications.",
      "readTime": "8 min read",
      "tags": ["Microsoft Fabric", "Data Engineering", "Azure"]
    },
    {
      "id": 2,
      "title": "Machine Learning Model Deployment Best Practices",
      "date": "2024-01-08",
      "category": "Machine Learning",
      "excerpt": "Learn the essential practices for deploying ML models to production, including monitoring, versioning, and scaling considerations.",
      "readTime": "12 min read",
      "tags": ["MLOps", "Deployment", "Production"]
    },
    {
      "id": 3,
      "title": "Data Quality in Modern Data Pipelines",
      "date": "2023-12-22",
      "category": "Data Engineering",
      "excerpt": "Implementing robust data quality checks and monitoring in your data pipelines to ensure reliable analytics and ML models.",
      "readTime": "10 min read",
      "tags": ["Data Quality", "Pipelines", "Monitoring"]
    }
  ]
};

// Global variables
let currentFilter = 'All';
let allProjects = [];
let allBlogPosts = [];

// DOM Elements
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const contactForm = document.getElementById('contactForm');
const blogSearch = document.getElementById('blogSearch');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  setCurrentYear();
});

function initializeApp() {
  loadPersonalInfo();
  loadExperience();
  loadProjects();
  loadBlogPosts();
  setupSmoothScrolling();
}

function setupEventListeners() {
  // Navigation toggle
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }
  
  // Close mobile nav when clicking on links
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Blog search
  if (blogSearch) {
    blogSearch.addEventListener('input', debounce(handleBlogSearch, 300));
  }
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (navToggle && mainNav && !navToggle.contains(e.target) && !mainNav.contains(e.target)) {
      closeMobileNav();
    }
  });
}

function loadPersonalInfo() {
  const { personalInfo } = appData;
  
  // Update page title
  document.title = `${personalInfo.name} | ${personalInfo.title}`;
  
  // Update hero section
  const heroName = document.getElementById('heroName');
  const heroTagline = document.getElementById('heroTagline');
  const bio = document.getElementById('bio');
  const avatar = document.getElementById('avatar');
  
  if (heroName) heroName.textContent = personalInfo.name;
  if (heroTagline) heroTagline.textContent = personalInfo.title;
  if (bio) bio.textContent = personalInfo.bio;
  if (avatar) avatar.textContent = personalInfo.name.charAt(0);
  
  // Update logo
  const logo = document.querySelector('.logo');
  if (logo) logo.textContent = personalInfo.name;
  
  // Load skills
  loadSkills(personalInfo.skills);
  
  // Load social links
  loadSocialLinks(personalInfo);
}

function loadSkills(skills) {
  const skillsList = document.getElementById('skillsList');
  if (!skillsList) return;
  
  skillsList.innerHTML = skills.map(skill => 
    `<li class="skill-item">${skill}</li>`
  ).join('');
}

function loadSocialLinks(personalInfo) {
  const socialLinks = document.getElementById('socialLinks');
  if (!socialLinks) return;
  
  const links = [
    { name: 'LinkedIn', url: personalInfo.linkedin, icon: '💼' },
    { name: 'GitHub', url: personalInfo.github, icon: '🔗' },
    { name: 'Twitter', url: personalInfo.twitter, icon: '🐦' },
    { name: 'Email', url: `mailto:${personalInfo.email}`, icon: '✉️' }
  ];
  
  socialLinks.innerHTML = links.map(link => 
    `<a href="${link.url}" target="_blank" rel="noopener noreferrer" title="${link.name}">
      <span style="font-size: 1.5rem;">${link.icon}</span>
    </a>`
  ).join('');
}

function loadExperience() {
  const experienceTimeline = document.getElementById('experienceTimeline');
  if (!experienceTimeline) return;
  
  experienceTimeline.innerHTML = appData.experience.map(exp => 
    `<div class="timeline-item fade-in-up">
      <h3>${exp.title}</h3>
      <div class="period">${exp.company} • ${exp.period}</div>
      <p>${exp.description}</p>
      <div class="tech-stack">
        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>`
  ).join('');
}

function loadProjects() {
  allProjects = appData.projects;
  const projectFilters = document.getElementById('projectFilters');
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (!projectFilters || !projectsGrid) return;
  
  // Create filter buttons
  const categories = ['All', ...new Set(allProjects.map(p => p.category))];
  projectFilters.innerHTML = categories.map(category => 
    `<button class="filter-btn ${category === currentFilter ? 'active' : ''}" 
             data-filter="${category}">${category}</button>`
  ).join('');
  
  // Add event listeners to filter buttons
  projectFilters.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      const filter = e.target.dataset.filter;
      setActiveFilter(filter);
      filterProjects(filter);
    }
  });
  
  // Display projects
  displayProjects(allProjects);
}

function setActiveFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function filterProjects(filter) {
  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);
  displayProjects(filteredProjects);
}

function displayProjects(projects) {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;
  
  projectsGrid.innerHTML = projects.map(project => 
    `<div class="project-card fade-in-up" tabindex="0">
      <div class="card-header">
        <h3>${project.title}</h3>
        <div class="category">${project.category}</div>
      </div>
      <div class="card-body">
        <p>${project.description}</p>
        <div class="tech-stack">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
        </div>
      </div>
    </div>`
  ).join('');
}

function loadBlogPosts() {
  allBlogPosts = appData.blogPosts;
  displayBlogPosts(allBlogPosts);
}

function displayBlogPosts(posts) {
  const blogList = document.getElementById('blogList');
  if (!blogList) return;
  
  blogList.innerHTML = posts.map(post => 
    `<article class="blog-item fade-in-up">
      <h3>${post.title}</h3>
      <div class="blog-meta">
        <span>${formatDate(post.date)}</span>
        <span>•</span>
        <span>${post.category}</span>
        <span>•</span>
        <span>${post.readTime}</span>
      </div>
      <p>${post.excerpt}</p>
      <div class="blog-tags">
        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
      </div>
    </article>`
  ).join('');
}

function handleBlogSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  
  if (!searchTerm) {
    displayBlogPosts(allBlogPosts);
    return;
  }
  
  const filteredPosts = allBlogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  );
  
  displayBlogPosts(filteredPosts);
}

function handleContactForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const formStatus = document.getElementById('formStatus');
  
  // Get form values
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Validate form
  if (!name || !name.trim()) {
    showFormStatus('Please enter your name.', 'error');
    return;
  }
  
  if (!email || !email.trim()) {
    showFormStatus('Please enter your email address.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showFormStatus('Please enter a valid email address.', 'error');
    return;
  }
  
  if (!message || !message.trim()) {
    showFormStatus('Please enter your message.', 'error');
    return;
  }
  
  // Simulate successful form submission
  showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
  event.target.reset();
}

function showFormStatus(message, type) {
  const formStatus = document.getElementById('formStatus');
  if (!formStatus) return;
  
  formStatus.textContent = message;
  formStatus.className = `status status--${type}`;
  formStatus.classList.remove('hidden');
  
  // Hide status after 5 seconds
  setTimeout(() => {
    formStatus.classList.add('hidden');
  }, 5000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function toggleMobileNav() {
  if (mainNav) {
    mainNav.classList.toggle('active');
  }
  if (navToggle) {
    navToggle.classList.toggle('active');
  }
}

function closeMobileNav() {
  if (mainNav) {
    mainNav.classList.remove('active');
  }
  if (navToggle) {
    navToggle.classList.remove('active');
  }
}

function setupSmoothScrolling() {
  // Add smooth scrolling to all navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Intersection Observer for fade-in animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Initialize intersection observer after DOM is loaded
document.addEventListener('DOMContentLoaded', setupIntersectionObserver);

// Keyboard navigation for project cards
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    const focusedCard = document.activeElement;
    if (focusedCard && focusedCard.classList.contains('project-card')) {
      event.preventDefault();
      const githubLink = focusedCard.querySelector('.project-links a');
      if (githubLink) {
        githubLink.click();
      }
    }
  }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidEmail,
    formatDate,
    debounce
  };
}