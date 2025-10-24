# Resume Analysis Feature - Setup Guide

## ✨ Overview
The Resume Analysis feature uses **real NLP processing** (not AI API wrappers) to parse and analyze resumes.

### Technology Stack:
- **spaCy**: Named Entity Recognition (NER) for extracting names, organizations, dates
- **PyPDF2**: PDF text extraction
- **python-docx/docx2txt**: DOCX text extraction
- **Custom Regex**: Email, phone, certification patterns
- **Skill Taxonomies**: Curated lists of tech skills (programming languages, frameworks, databases, cloud, soft skills)

---

## 🚀 Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Download spaCy Language Model

```bash
python -m spacy download en_core_web_sm
```

This downloads the English language model for Named Entity Recognition.

---

## 🔧 Backend Components

### `backend/app/resume_parser.py`
- **ResumeParser Class**: Main NLP processing engine
- **extract_text_from_file()**: Handles PDF, DOCX, TXT files
- **parse_resume()**: Orchestrates all extraction methods
- **NER Extraction**: Names, companies, dates using spaCy
- **Regex Patterns**: Email, phone, certifications
- **Skill Matching**: 100+ tech skills across 5 categories
- **Education Extraction**: Degree pattern matching
- **Experience Calculation**: Date range parsing
- **Scoring Algorithm**: Compare resume to job requirements

### API Endpoints (in `backend/app/main.py`)

#### 1. Parse Resume Only
```http
POST /upload_resume
Content-Type: multipart/form-data

file: <resume.pdf|docx|txt>
```

**Response:**
```json
{
  "parsed_data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "skills": {
      "programming_languages": ["Python", "JavaScript"],
      "frameworks": ["React", "FastAPI"],
      "databases": ["PostgreSQL"],
      "cloud_technologies": ["AWS", "Docker"],
      "soft_skills": ["Problem Solving", "Communication"],
      "other": ["Git", "CI/CD"]
    },
    "education": [
      {"degree": "B.S. Computer Science", "institution": "MIT", "year": "2020"}
    ],
    "certifications": ["AWS Certified Developer"],
    "experience_years": 3.5,
    "work_history": [
      {"company": "Google", "start_date": "2020", "end_date": "2023"}
    ],
    "summary": "Experienced full-stack developer..."
  }
}
```

#### 2. Analyze Resume Against Role
```http
POST /analyze_resume_for_role
Content-Type: multipart/form-data

file: <resume.pdf|docx|txt>
role: Software Developer
```

**Response:**
```json
{
  "match_score": 78.5,
  "skill_match_percentage": 70,
  "matched_skills": ["Python", "JavaScript", "React"],
  "missing_skills": ["TypeScript", "Node.js"],
  "experience_factor": 85,
  "has_education": true,
  "recommendations": [
    "Learn TypeScript to improve backend development skills",
    "Gain experience with Node.js frameworks"
  ]
}
```

#### 3. Full Gap Analysis with Roadmap
```http
POST /compare_resume_with_roadmap
Content-Type: multipart/form-data

file: <resume.pdf|docx|txt>
role: Data Scientist
```

**Response:**
```json
{
  "resume_summary": { /* Same as /upload_resume */ },
  "gap_analysis": { /* Same as /analyze_resume_for_role */ },
  "roadmap": {
    "role_name": "Data Scientist",
    "milestones": [...],
    "total_weeks": 52
  }
}
```

---

## 🎨 Frontend Components

### `frontend-vite/src/pages/ResumeAnalysis.tsx`
- **Two Modes**:
  - **Parse Resume**: Just extract information
  - **Compare with Role**: Full gap analysis
- **File Upload**: Drag-drop interface for PDF/DOCX/TXT
- **Results Display**:
  - Match score with circular progress
  - Matched vs Missing skills
  - Recommendations
  - Personal info, skills, education, certifications
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Dark Mode Support**: Follows system theme

---

## 🧪 Testing

### 1. Start Backend
```bash
cd backend
uvicorn app.main:app --reload
```

### 2. Start Frontend
```bash
cd frontend-vite
npm run dev
```

### 3. Test Resume Upload
1. Navigate to "Resume Analysis" page
2. Choose "Parse Resume" mode
3. Upload a sample resume (PDF, DOCX, or TXT)
4. Verify extracted information

### 4. Test Role Comparison
1. Choose "Compare with Role" mode
2. Upload resume
3. Enter target role: "Software Developer"
4. Review match score and recommendations

---

## 📊 NLP Processing Details

### Named Entity Recognition (spaCy)
- Extracts **PERSON** entities for names
- Extracts **ORG** entities for companies
- Extracts **DATE** entities for work history

### Skill Taxonomies
```python
PROGRAMMING_LANGUAGES = [
  'python', 'javascript', 'typescript', 'java', 'c++', 'c#',
  'go', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'r',
  'scala', 'perl', 'dart', 'objective-c', 'shell', 'bash',
  'powershell', 'sql', 'html', 'css', 'matlab'
]

FRAMEWORKS = [
  'react', 'angular', 'vue', 'django', 'flask', 'fastapi',
  'spring', 'express', 'nodejs', 'nextjs', 'nuxt', 'svelte',
  'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas',
  'numpy', 'matplotlib', 'seaborn', 'plotly', '.net', 'asp.net',
  'laravel', 'rails', 'bootstrap', 'tailwind', 'jquery',
  'redux', 'graphql', 'rest'
]

DATABASES = [
  'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch',
  'cassandra', 'dynamodb', 'oracle', 'sql server', 'sqlite',
  'mariadb', 'neo4j', 'couchdb'
]

CLOUD_TECHNOLOGIES = [
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins',
  'gitlab ci', 'github actions', 'terraform', 'ansible',
  'vagrant', 'heroku', 'netlify', 'vercel'
]

SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'problem solving',
  'critical thinking', 'time management', 'adaptability',
  'creativity', 'collaboration', 'project management',
  'agile', 'scrum', 'presentation', 'mentoring'
]
```

### Regex Patterns
- **Email**: `r'[\w\.-]+@[\w\.-]+\.\w+'`
- **Phone**: `r'(?:\+?1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})'`
- **Certifications**: Keyword matching (AWS, Azure, Google, Microsoft, CompTIA, etc.)

### Education Extraction
```python
DEGREE_PATTERNS = [
  r"(?i)(bachelor|master|phd|doctorate|associate|diploma|b\.s\.|m\.s\.|b\.a\.|m\.a\.|mba)",
  r"(?i)(computer science|engineering|mathematics|physics|business|economics)"
]
```

---

## 🔒 Security Notes

- File size limited to 10MB (configurable in backend)
- Only accepts `.pdf`, `.docx`, `.txt` file extensions
- Files are processed in memory, not stored permanently
- No external API calls or data leakage

---

## 🚀 Performance

- **Fast Processing**: <2 seconds for typical resume
- **Efficient NER**: spaCy's optimized pipeline
- **Minimal Dependencies**: No heavy AI model downloads
- **Scalable**: Can handle concurrent uploads

---

## 🛠️ Troubleshooting

### "Import spacy could not be resolved"
```bash
pip install spacy
python -m spacy download en_core_web_sm
```

### "PyPDF2 not found"
```bash
pip install PyPDF2 python-docx docx2txt
```

### Resume not parsing correctly
- Check file encoding (UTF-8 recommended)
- Ensure resume has clear section headings
- Try different file formats (PDF usually works best)

### Skills not detected
- Skill taxonomies are keyword-based (case-insensitive)
- Add custom skills to `PROGRAMMING_LANGUAGES`, `FRAMEWORKS`, etc. in `resume_parser.py`

---

## 📝 Future Enhancements

- [ ] Add more skill categories (testing, DevOps, ML/AI)
- [ ] Support for multi-page resumes
- [ ] Export parsed data as JSON
- [ ] Batch resume processing
- [ ] Resume scoring improvements
- [ ] Custom skill taxonomy upload

---

## ✅ Verification Checklist

- [ ] Backend dependencies installed
- [ ] spaCy model downloaded (`en_core_web_sm`)
- [ ] Backend running on `http://localhost:8000`
- [ ] Frontend running on dev server
- [ ] Can upload and parse sample resume
- [ ] Skills, education, experience extracted correctly
- [ ] Role comparison working with match scores
- [ ] Recommendations displayed properly

---

## 📚 Related Documentation

- [spaCy Documentation](https://spacy.io/usage)
- [PyPDF2 Documentation](https://pypdf2.readthedocs.io/)
- [FastAPI File Uploads](https://fastapi.tiangolo.com/tutorial/request-files/)

---

**Built with ❤️ using real NLP, not AI wrappers!**
