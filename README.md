# Moments App

# Moments

The goal of Moments is simple: **make it easy to find and organize team activities in just a few clicks**, without spending hours searching, comparing options, or coordinating logistics.

Target user are managers looking for teambuildings for their teams.

## ✨ Features

- Browse curated team activities
- Quickly understand what each activity is about
- Check how far from the office are these activities located
- See what team size each activity is ideal for
- Find activities that fit their team and context

## 🏗️ Backend

Django

### ⚡ Setup

```bash
cd backend

python -m venv venv
# Linux / Mac
source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py loaddata activities.json

python3 manage.py seed_activities --count=300

python manage.py runserver
```

## 💅🏼 Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

```bash
cd frontend

npm i

npm run dev

```
