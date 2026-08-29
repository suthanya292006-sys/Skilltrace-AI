# SkillTrace AI

> An AI-powered student portfolio, skill assessment, career recommendation, and placement-readiness platform.

## Overview

**SkillTrace AI** is an intelligent career development platform designed to help students evaluate their technical capabilities, manage their professional portfolios, identify skill gaps, and discover suitable career opportunities.

The platform brings together **skills, projects, certifications, resumes, assessment performance, and portfolio information** to create a comprehensive student profile. Using machine learning-based career analysis, SkillTrace AI provides personalized career recommendations based on the student's abilities and performance.

The platform also includes an **administrative portal** that enables administrators to monitor students, assessments, portfolios, career recommendations, companies, placement readiness, and overall platform analytics.

---

## Key Features

### 🎓 Student Portfolio Management

SkillTrace AI provides a centralized portfolio management system where students can maintain their professional information.

- Resume upload and portfolio management
- Technical and professional skill management
- Project and certification management
- GitHub and LinkedIn profile integration
- Centralized student career profile
- Continuous portfolio updates

### 🤖 AI Portfolio Analysis

The platform analyzes portfolio information to provide meaningful insights into a student's technical profile.

- Portfolio-based skill evaluation
- Project and experience analysis
- Identification of technical strengths
- Portfolio improvement suggestions
- Overall portfolio assessment

### 📝 Technical Assessments

Students can evaluate their technical knowledge through online assessments.

- Skill-based technical assessments
- Question navigation and answer tracking
- Automated assessment scoring
- Mark questions for review
- Performance analysis
- Assessment-based skill evaluation

### 📊 Skill Analysis

The skill analysis module helps students understand their current technical capabilities and areas that require improvement.

- Technical skill evaluation
- Skill-strength identification
- Skill-gap analysis
- Career-oriented skill comparison
- Identification of skills required for specific career roles

### 🎯 AI Career Recommendation

The career recommendation module uses a **trained machine learning model** to identify suitable career roles based on multiple student attributes.

The recommendation considers:

- Technical skills
- Number of projects
- Assessment performance
- Portfolio score

The machine learning model is integrated with the application through a **FastAPI-based REST API**, allowing career predictions to be generated dynamically from student data.

### 💼 Career & Placement

The platform helps students connect their skills and portfolio with potential career opportunities.

- Personalized career recommendations
- Career path exploration
- Placement-readiness analysis
- Suitable role identification
- Company matching based on student profiles
- Career-oriented skill insights

### 📋 Reports & Analytics

SkillTrace AI provides reports and analytics to help students and administrators understand performance and career readiness.

- Student performance reports
- Portfolio analysis reports
- Career recommendation results
- Skill-gap insights
- Placement-readiness insights
- Administrative analytics

### 🛡️ Admin Portal

The administrative portal provides centralized monitoring and management capabilities.

Administrators can manage and monitor:

- Student profiles
- Assessments
- Companies
- Career paths
- Portfolio analysis
- Career recommendations
- Placement information
- Analytics and reports

---

## Technology Stack

### Frontend

- **React.js** – Component-based user interface
- **Vite** – Fast frontend development and build tool
- **JavaScript** – Application logic
- **Material UI (MUI)** – UI components and responsive design
- **HTML5** – Application structure
- **CSS3** – Styling and layout

### Backend

- **Python** – Backend and machine learning development
- **FastAPI** – REST API development
- **Uvicorn** – ASGI server
- **Pydantic** – Data validation and request handling

### Machine Learning

- **Python** – Model development
- **Scikit-learn** – Machine learning model development
- **Pandas** – Data processing
- **NumPy** – Numerical computation
- **Joblib** – Model serialization and loading

### Development & Version Control

- **Visual Studio Code** – Development environment
- **Git** – Version control
- **GitHub** – Source code management
- **REST API** – Frontend-backend communication
- **Swagger / OpenAPI** – API documentation and testing

---

## Core Workflow

```text
Student Profile
      ↓
Skills + Projects + Certifications
      ↓
Technical Assessment
      ↓
Assessment Score
      ↓
Portfolio Analysis
      ↓
Portfolio Score
      ↓
AI Career Recommendation
      ↓
Career Path & Placement Insights
