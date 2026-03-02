# Project Scope: Smart To-Do & Project Tracker (Micro-SaaS)

## Mission

To provide small teams, freelancers, and solo founders with a lightweight, real-time collaborative project and task management tool that reduces mental clutter, increases daily execution efficiency, and tracks progress clearly.

## Vision

A minimal, fast, and ready-to-deploy micro-SaaS product that is immediately monetizable and scalable for small teams, available on marketplaces like Microns.io.

## Core Problems Solved

- Difficulty organizing daily tasks and projects.
- Lack of real-time visibility in small team collaboration.
- Difficulty measuring progress for small projects.
- Overwhelming complexity in existing project management tools.
- Need for a self-contained, deployable solution for micro-SaaS buyers.

## Key Features

- **Projects**: Create, edit, and delete projects. Each project is a container for tasks.
- **Tasks**: Standard tasks with title, status (todo/in-progress/done), priority, and optional due date.
- **Subtasks**: Optional breakdown for detailed action items under tasks.
- **Progress Tracking**: Automatically calculate project completion based on tasks completed. Display progress visually with a progress bar.
- **Real-Time Collaboration**: Multiple users can collaborate on projects and tasks. Updates propagate instantly via WebSockets.
- **User & Organization Management**: Users belong to an organization (multi-tenant ready). Roles: Owner, Member.
- **Invite Members**: Add team members via email.
- **Completed & Overdue Views**: Users can see overdue tasks and completed tasks for motivation
- **Freemium monetization**: free = limited projects, Pro = unlimited projects.
- **Simple analytics**: tasks completed per day/week.

## User Flow

### Sign-Up / Login

- Email + password authentication.
- JWT-based session management.

### Dashboard / Home

    - Displays today’s tasks and ongoing projects.
    - Overdue tasks prioritized.
    - Quick access to projects.

### Project View

    - Shows project title, progress bar, tasks list.
    - Add/edit/delete tasks & subtasks.
    - Tasks are updated in real-time across users.

### Task Management

    - Create task → optionally create subtasks.
    - Update status → progress recalculated.
    - Assign task to a user.

### Collaboration

    - Invite members via email.
    - Role-based permissions (Owner/Member).
    - All updates sync via WebSockets in real-time.

### Completed / Overdue Tasks

    - Track motivation (completed)
    - Highlight pending actions (overdue).

## Technology Stack

| Layer                                   | Technology                                                      |
| --------------------------------------- | --------------------------------------------------------------- |
| Frontend                                | Next.js (React)                                                 |
| Backend                                 | FastAPI                                                         |
| Database                                | PostgreSQL                                                      |
| Real-Time                               | FastAPI WebSockets                                              |
| Caching / PubSub (Optional for scaling) | Redis                                                           |
| Deployment                              | Docker Compose (Frontend + Backend + Postgres)                  |
| Authentication                          | JWT                                                             |
| Payment / Monetization                  | Stripe Integration                                              |
| Optional Hosting                        | Vercel (Frontend), DigitalOcean/Render/Railway (Backend & DB)   |

## Product Positioning on Microns.io

- **Product Name (example)**: FocusFlow

- **Tagline**: “Real-time project and task tracker for small teams”

- **Selling Points**
      - Ready-to-use micro-SaaS
      - Real-time collaboration
      - Clean and minimal UI
      - Project progress visualization
      - Multi-user support for small teams

- **Target Buyer**
      - Freelancers, solo founders, micro-startups, small teams (2–10 users)

## Monetization Strategy

- **Freemium Model**
      - Free Tier: Limited projects (e.g., 3 projects)
      - Pro Tier: Unlimited projects
      - Pricing: $5–$10/month per user
