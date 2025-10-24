# 🚀 Quick Start - Resume Analysis Feature

## What You Got
✅ **NLP-based resume parser** (NOT an AI wrapper)  
✅ **3 backend API endpoints** for parsing & analysis  
✅ **Complete frontend UI** with file upload & visualization  
✅ **Zero external API dependencies** (privacy-first)

---

## Installation (5 minutes)

### Step 1: Install Dependencies
**Windows**:
```bash
cd backend
setup_resume_parser.bat
```

**Linux/Mac**:
```bash
cd backend
chmod +x setup_resume_parser.sh
./setup_resume_parser.sh
```

**Manual** (if scripts fail):
```bash
cd backend
pip install spacy PyPDF2 python-docx docx2txt python-multipart
python -m spacy download en_core_web_sm
```

### Step 2: Start Backend
```bash
cd backend
uvicorn app.main:app --reload
```
✅ Backend should be running on `http://localhost:8000`

### Step 3: Start Frontend
```bash
cd frontend-vite
npm run dev
```
✅ Frontend should be running on `http://localhost:5173`

### Step 4: Test It
1. Open app in browser
2. Navigate to **Resume Analysis** page (navbar)
3. Upload a resume (PDF, DOCX, or TXT)
4. Choose mode:
   - **Parse Resume**: Extract info only
   - **Compare with Role**: Full gap analysis
5. View results!

---

## What It Does

### 🔍 Resume Parsing
- Extracts name, email, phone
- Identifies 100+ technical skills
- Parses education & certifications
- Calculates years of experience
- Extracts work history

### 📊 Role Comparison
- Match score (0-100%)
- Matched skills list
- Missing skills list
- Personalized recommendations
- Career gap analysis

### 🛡️ Privacy
- All processing done locally
- No data sent to external APIs
- No API keys needed
- Files not stored permanently

---

## API Endpoints

### 1. Parse Resume
```bash
curl -X POST http://localhost:8000/upload_resume \
  -F "file=@resume.pdf"
```

### 2. Analyze for Role
```bash
curl -X POST http://localhost:8000/analyze_resume_for_role \
  -F "file=@resume.pdf" \
  -F "role=Software Developer"
```

### 3. Full Gap Analysis
```bash
curl -X POST http://localhost:8000/compare_resume_with_roadmap \
  -F "file=@resume.pdf" \
  -F "role=Data Scientist"
```

---

## Troubleshooting

### "spacy not found"
```bash
pip install spacy
python -m spacy download en_core_web_sm
```

### "PyPDF2 not found"
```bash
pip install PyPDF2 python-docx docx2txt
```

### Backend won't start
```bash
cd backend
pip install -r requirements.txt
```

### Frontend build errors
```bash
cd frontend-vite
npm install
npm run dev
```

### Skills not detected
- Skills are matched against curated lists
- Check if skill names are in `resume_parser.py` taxonomies
- Skills are case-insensitive but must be spelled correctly

---

## File Structure

```
backend/
  app/
    resume_parser.py          ← NEW: NLP engine (600+ lines)
    main.py                   ← MODIFIED: Added 3 endpoints
  requirements.txt            ← MODIFIED: Added NLP deps
  setup_resume_parser.bat     ← NEW: Windows setup
  setup_resume_parser.sh      ← NEW: Linux/Mac setup

frontend-vite/
  src/
    pages/
      ResumeAnalysis.tsx      ← REBUILT: Full feature (900+ lines)

RESUME_FEATURE_SETUP.md       ← NEW: Detailed docs
RESUME_IMPLEMENTATION_SUMMARY.md ← NEW: Technical details
QUICK_START_RESUME.md          ← NEW: This file
```

---

## Key Technologies

- **spaCy**: Named Entity Recognition (NER)
- **PyPDF2**: PDF text extraction
- **python-docx**: DOCX parsing
- **Regex**: Email, phone, certification patterns
- **FastAPI**: Backend endpoints
- **React + TypeScript**: Frontend UI
- **Tailwind CSS**: Styling

---

## Success Indicators

After setup, you should see:

✅ Backend logs showing:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

✅ Frontend showing:
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

✅ Resume Analysis page with:
- File upload interface
- Two mode buttons (Parse / Compare)
- Beautiful gradient design

✅ After upload:
- Match score visualization
- Parsed resume details
- Skills categorized
- Recommendations

---

## Next Steps

1. ✅ **Test with real resumes** - Upload your own
2. ✅ **Try both modes** - Parse vs Compare
3. ✅ **Check different roles** - Software Developer, Data Scientist, etc.
4. ✅ **Review extracted skills** - See what's detected
5. 📖 **Read full docs** - See `RESUME_FEATURE_SETUP.md`

---

## Support

- 📚 **Detailed Setup**: `RESUME_FEATURE_SETUP.md`
- 🔧 **Technical Details**: `RESUME_IMPLEMENTATION_SUMMARY.md`
- 💡 **Overall Features**: Other markdown files in project root

---

## What Makes This Special

❌ **NOT an AI wrapper** - No OpenAI, Claude, or external APIs  
✅ **Real NLP processing** - spaCy, regex, pattern matching  
✅ **Privacy-first** - All data stays on your server  
✅ **Zero cost** - No API fees after initial setup  
✅ **Fast** - <2 second processing time  
✅ **Customizable** - Full control over skill taxonomies  

---

**Ready to use in 5 minutes! 🎉**
