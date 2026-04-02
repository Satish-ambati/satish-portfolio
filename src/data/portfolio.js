export const personalInfo = {
  name: "Ambati Satish",
  title: "Java Developer",
  email: "satish.ambati0804@gmail.com",
  phone: "+91 8106204119",
  linkedin: "https://linkedin.com/in/satish0804",
  github: "https://github.com/Satish-ambati",
  leetcode: "https://leetcode.com/u/satish0804",
  college: "S R K R Engineering College",
  degree: "B.Tech Computer Science (2023–2027)",
  cgpa: "9.1/10",
  clubRole: "Web & App Lead — Coding Club, SRKR Engineering College",
bio: "Java Full Stack Developer and Mobile App Developer with a strong foundation in building scalable web and cross-platform applications. Passionate about problem-solving, data structures, and developing secure systems as a cybersecurity enthusiast. Active contributor and Executive Member of the Coding Club at SRKR Engineering College, driving technical learning and innovation.",  avatarInitials: "AS",
};

export const roles = [
  "Java Developer",
  "Spring Boot Engineer",
  "React Native Dev",
  "Microservices Architect",
  "Cybersecurity Enthusiast",
];

export const skills = [
  { category: "Languages", items: [
    { name: "Java", level: 85 },
    { name: "Python", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "C", level: 70 },
    { name: "HTML/CSS", level: 80 },
  ]},
  { category: "Frameworks", items: [
    { name: "Spring Boot", level: 80 },
    { name: "React Native", level: 80 },
    { name: "Vite+React", level: 80 },
    { name: "Swing", level: 70 },
  ]},
  { category: "Databases & ORM", items: [
    { name: "MySQL", level: 85 },
    { name: "MongoDB", level: 70 },
    { name: "JPA/Hibernate", level: 80 },
    { name: "SQLite", level: 50 },
  ]},
  { category: "Tools & DevOps", items: [
    { name: "Docker", level: 65 },
    { name: "GitHub", level: 85 },
    { name: "Postman", level: 85 },
    { name: "IntelliJ IDEA", level: 90 },
  ]},
  { category: "Cybersecurity", items: [
    { name: "Ethical Hacking", level: 80 },
    { name: "Web Application Penetration Testing", level: 60 },
    { name: "Computer Networks", level: 74 },
    { name: "Cryptography & Network Security", level: 75 },
  ]},
  { category: "Architecture", items: [
    { name: "Microservices", level: 80 },
    { name: "REST APIs", level: 90 },
    { name: "DSA", level: 80 },
    { name: "OOPs", level: 90 },
  ]},
];

export const projects = [
  {
    name: "VastuGuru",
    stack: ["React Native", "SQLite"],
    color: "cyan",
    icon: "🏠",
    description: "Hybrid mobile app supporting offline Vastu calculation based on house dimensions with dynamic PDF report generation.",
    features: [
      "Offline data synchronization with SQLite",
      "Area, perimeter, hypotenuse & basic calculator",
      "Dynamic PDF report generation for Vastu results",
      "Supports fully offline mode",
    ],
    github: "https://github.com/Satish-ambati/VastuGuru",
  },
  {
    name: "Sport Connect",
    stack: ["React Native", "Spring Boot", "MySQL", "Hibernate"],
    color: "purple",
    icon: "⚽",
    description: "Sports social platform connecting coaches and players with tournament scheduling and an e-commerce module for sports equipment.",
    features: [
      "Coach–Player networking and talent showcase",
      "Tournament scheduling with real-time scores",
      "E-commerce: sell/donate sports equipment",
      "RESTful APIs with Spring Boot + MySQL",
    ],
    github: "https://github.com/Satish-ambati",
  },
  {
    name: "Quiz Management System",
    stack: ["Java 23", "Spring Boot", "Eureka", "API Gateway", "OpenFeign", "JWT"],
    color: "green",
    icon: "📊",
    description: "Microservices-based quiz platform with Teacher, Student, and Auth services secured with JWT and Spring Security.",
    features: [
      "Microservices: Teacher/Admin, Student, Auth services",
      "JWT + Spring Security token-based auth",
      "Eureka service discovery & API Gateway",
      "OpenFeign for inter-service communication",
    ],
    github: "https://github.com/Satish-ambati/QuizLearning",
  },
  
];

export const internships = [
  {
    company: "APSSDC",
    role: "Data Analysis Intern",
    period: "May 2025",
    project: "Olympics Data Analysis",
    stack: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
    color: "cyan",
    file: "internship_APSSDC.pdf",
    points: [
      "Analyzed 120+ years of Olympic data uncovering athlete performance patterns",
      "Built automated preprocessing pipelines with Pandas & NumPy",
      "Designed interactive dashboards revealing nation-wise medal trends",
    ],
  },
  {
    company: "1M1B Foundation",
    file: "internship_1M1B.pdf",
    role: "React Native Intern",
    period: "June 2025",
    project: "Bus Route Optimizer",
    stack: ["React Native", "GPS API", "Expo EAS"],
    color: "green",
    points: [
      "Developed mobile app optimizing school bus routes with real-time GPS mapping",
      "Designed full project structure: folder hierarchy, components, navigation",
      "Managed API key permissions and backend service integration",
      "Generated production-ready APK via Expo Application Services (EAS)",
    ],
  },
];

export const certifications = [
  {
    name: "Cyber Forensics Online Workshop",
    grade: "Certified",
    date: "22 Feb 2026",
    issuer: "Academy Of Tech Masters",
    color: "orange",
    file: "cyberForencics by aotms.pdf",
  },
  {
    name: "Practical Cyber Security for Cyber Security Practitioners (NPTEL)",
    grade: "Elite+Silver — 84%",
    date: "Jul–Oct 2025",
    issuer: "NPTEL",
    color: "cyan",
    file: "Practical Cyber Security for Cyber Security Practitioners.pdf",
  },
  {
    name: "Ethical Hacking (NPTEL)",
    grade: "Elite — 65%",
    date: "Jul–Oct 2025",
    issuer: "NPTEL",
    color: "purple",
    file: "Ethical Hacking.pdf",
  },
  {
    name: "Cybersecurity",
    grade: "Certified",
    date: "01 Dec 2025",
    issuer: "Tech Mahindra Foundation / Skills India",
    color: "green",
    file: "cybersecurity_skills_india_certificate.pdf",
  },
  {
    name: "Java (NPTEL)",
    grade: "Elite+Silver — 83%",
    date: "Jan–Apr 2025",
    issuer: "NPTEL",
    color: "orange",
    file: "Programming In Java.pdf",
  },
  {
    name: "DSA using Python (NPTEL)",
    grade: "58%",
    date: "Jan–Apr 2025",
    issuer: "NPTEL",
    color: "cyan",
    file: "Programming, Data Structures And Algorithms Using Python.pdf",
  },
  {
    name: "C Programming",
    grade: "Certified",
    date: "Jan 2024",
    issuer: "Cisco",
    color: "purple",
    file: "cisco c language.pdf",
  },
  {
    name: "Cybersecurity",
    grade: "Certified",
    date: "Dec 2023",
    issuer: "Cisco",
    color: "green",
    file: "cisco-certificate_cybersecurity.pdf",
  },
];

export const achievements = [
  {
    title: "LeetCode 390 Problems",
    description: "Solved 390 problems on LeetCode and earned the 50-Day Badge streak",
    icon: "⚡",
    link: "https://leetcode.com/u/satish0804",
    color: "cyan",
    stat: "390+",
    statLabel: "Problems Solved",
  },
  {
    title: "Cybersecurity Excellence",
    description: "Awarded Excellence Certificate in Advanced Cybersecurity Workshop by Academy of Tech Masters",
    icon: "🛡️",
    date: "Dec 2025",
    color: "green",
    stat: "Elite",
    statLabel: "Certification",
  },
  {
    title: "Web & App Lead",
    description: "Leading web and app development initiatives at the Coding Club, SRKR Engineering College",
    icon: "💻",
    color: "orange",
    stat: "Club Lead",
    statLabel: "Coding Club",
  },
];
