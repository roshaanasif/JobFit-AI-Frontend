# Job Fit AI Frontend

A modern Next.js frontend for an AI-powered job-fit platform that helps users evaluate how well their resume matches a job description, identify skill gaps, and prepare for interviews.

This client app connects to a backend API for authentication, profile management, analysis history, and AI-powered resume evaluation.

## Overview

Job Fit AI is designed for job seekers who want to:

- compare their resume with a target job description
- get a match score and skill-gap analysis
- generate a tailored preparation roadmap
- review previous analyses from a personal dashboard
- prepare for technical interviews using generated questions

The app includes protected routes, authentication flow, dashboard analytics, analysis history, and profile management.

## Features

- User authentication with login and registration
- Protected dashboard and route access
- Resume/job analysis workflow
- AI-based job match scoring
- Skill gap detection
- Personalized preparation guidance
- Interview question generation
- Analysis history and recent reports
- KPI overview on the dashboard
- Token-aware API setup with automatic refresh handling

## Tech Stack

- Next.js 16
- React 19
- Redux Toolkit
- Axios
- Tailwind CSS
- Font Awesome icons
- ESLint

## Project Structure

```text
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.jsx
│   ├── (Dashboard)/
│   │   ├── dashboard/
│   │   └── layout.jsx
│   ├── (myAnalysis)/
│   │   └── analysis/[slug]/[id]/
│   ├── (NewAnalysis)/
│   │   └── analyze/
│   ├── (profile)/
│   │   └── profile/
│   ├── Redux/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── analyze/
│   │   └── history/
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── protectedRoutes.jsx
│   │   └── guestRoutes.jsx
│   ├── lib/
│   │   └── axios.js
│   ├── store/
│   │   ├── provider.jsx
│   │   └── store.js
│   ├── utils/
│   │   └── all.js
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── package-lock.json
```

## Authentication and API Flow

The app uses Redux Toolkit for auth state and Axios for API calls. The request interceptor:

- attaches the saved access token to authorized requests
- handles automatic token refresh when a request returns 401
- clears auth state when refresh fails

The base API configuration is defined in `app/lib/axios.js`.

## Main User Journey

1. User signs up or logs in.
2. The app loads auth state and initializes the session.
3. User lands on the dashboard.
4. User creates a new analysis.
5. User submits a resume and target job description.
6. The backend returns match analysis, missing skills, and preparation recommendations.
7. User reviews results and can revisit historic analyses.

## Frontend Architecture Notes

The app follows the Next.js App Router structure and organizes state by feature:

- `auth` for login, registration, and session state
- `dashboard` for KPI and recent reports
- `analyze` for job fit evaluation workflow
- `profile` for account/profile data
- `history` for past analyses

This keeps the UI logic and data fetching modular and easier to scale.


## Related Repository

This repository contains the frontend only. It is intended to work with a matching backend service that provides the AI analysis endpoints and authentication APIs.

