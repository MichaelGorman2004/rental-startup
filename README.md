# VenueLink 🎓🍺

> **Connect. Book. Celebrate.**  
> The premier platform connecting college organizations with local bars and event venues.

## 📋 Project Overview

VenueLink is a two-sided marketplace tailored to streamline the event booking process between **Student Organizations** (Fraternities, Sororities, Clubs) and **Local Venues** (Bars, Restaurants, Event Spaces).

### Core Features
- **Student Orgs:** Browse venues, filter by capacity/type, propose events, manage budget, and track bookings.
- **Venue Admins:** Manage venue profile, set availability, accept/decline requests, view revenue metrics.
- **Platform:** Secure payments (Booking Fee), in-app messaging, contract management, and real-time notifications.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) (Vite)
- **Language:** TypeScript
- **UI Library:** [Mantine UI](https://mantine.dev/) (v7)
- **State Management:** Zustand or React Query (TanStack Query)
- **Icons:** Tabler Icons (Standard with Mantine)

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Language:** Python 3.11+
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy (Async) + Alembic for migrations
- **Validation:** Pydantic

### Infrastructure & Services
- **Hosting:** [Railway](https://railway.app/)
- **Authentication:** Managed Service (e.g., Clerk, Auth0, or Supabase Auth)
- **Image Storage:** Railway Persistent Volume or Cloudinary (Free Tier)
- **CI/CD:** GitHub Actions
- **Containerization:** Docker

---

## 📅 12-Week MVP Roadmap

We have **2 AI-assisted Engineers** and **12 weeks**. The goal is a high-quality, stable MVP without overengineering.

### Phase 1: Foundation & Auth (Weeks 1-2)
- **Goal:** Functional environment, DB schema, and User Authentication.
- [ ] **Ticket 1.1:** Repo setup (Monorepo), linting (ESLint, Ruff), and CI pipeline.
- [ ] **Ticket 1.2:** Database Schema Design (Users, Roles, Venues tables).
- [ ] **Ticket 1.3:** Auth Integration (Managed Provider).
    -   *Requirement:* Enforce `.edu` email validation for Student Orgs.
- [ ] **Ticket 1.4:** Frontend Auth Pages (Login, Sign up, Role Selection).

### Phase 2: Venue Management & Discovery (Weeks 3-4)
- **Goal:** Venues can onboard; Orgs can find them.
- [ ] **Ticket 2.1:** Venue Profile CRUD (Name, Capacity, Price, Amenities).
- [ ] **Ticket 2.2:** Image Upload Handling.
    -   *Strategy:* Store on Railway Volume (Disk) or Cloudinary for MVP.
- [ ] **Ticket 2.3:** Venue Discovery UI (Search, Filters for Type/Capacity/Price).
- [ ] **Ticket 2.4:** Venue Details Page (Public view for Orgs).
    -   *Map:* Static address listing with "Open in Maps" external link.

### Phase 3: Booking Logic Core (Weeks 5-6)
- **Goal:** The core transaction flow (Request -> Accept/Decline).
- [ ] **Ticket 3.1:** Booking Data Model (Status: Pending, Confirmed, Rejected, Completed).
- [ ] **Ticket 3.2:** "Request Booking" Form for Orgs (Date, Time, Guest Count).
- [ ] **Ticket 3.3:** Venue Dashboard - Booking Request Queue (Accept/Decline actions).
- [ ] **Ticket 3.4:** Availability/Calendar Logic (Prevent double bookings).

### Phase 4: Communication & Notifications (Weeks 7-8)
- **Goal:** Reduce friction and keep users informed.
- [ ] **Ticket 4.1:** In-App Messaging System.
    -   *Tech:* Simple persistent chat stored in DB (No WebSockets needed yet).
- [ ] **Ticket 4.2:** Notification Service (Database + Email).
- [ ] **Ticket 4.3:** Polling for updates (keep it simple).

### Phase 5: Payments (Weeks 9-10)
- **Goal:** Monetization via Booking Fees.
- [ ] **Ticket 5.1:** Payment Gateway Integration (Stripe Checkout).
- [ ] **Ticket 5.2:** Booking Fee Logic.
    -   *Flow:* Org pays "Booking Fee" to Platform to confirm. Venue payment handled directly/offline by parties.
- [ ] **Ticket 5.3:** Webhook Handling (Payment success updates booking status to "Confirmed").

### Phase 6: Dashboards & Polish (Weeks 11-12)
- **Goal:** Analytics, UI cleanup, and Launch.
- [ ] **Ticket 6.1:** Admin Dashboard (Revenue, Occupancy Stats).
- [ ] **Ticket 6.2:** Mobile Responsiveness Audit & Fixes.
- [ ] **Ticket 6.3:** Final E2E Testing & Bug Fixes.
- [ ] **Ticket 6.4:** Deployment & Production Environment Setup on Railway.

---

## 🏗 Code Organization & Structure

We follow a strict **Feature-Based Module** structure to keep the codebase scalable.

### Backend Structure (FastAPI)
```
backend/
├── app/
│   ├── core/           # Config, Security, Database setup
│   ├── api/            # API Route definitions (endpoints)
│   ├── modules/        # Feature modules
│   │   ├── auth/
│   │   │   ├── schemas.py
│   │   │   ├── services.py
│   │   │   ├── models.py
│   │   │   └── router.py
│   │   ├── venues/
│   │   └── bookings/
│   └── main.py
├── alembic/            # Migrations
└── tests/
```

### Frontend Structure (React)
```
frontend/
├── src/
│   ├── features/       # Feature-based organization
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   ├── venues/
│   │   └── dashboard/
│   ├── components/     # Shared UI components (Buttons, Inputs)
│   ├── layout/         # Layout wrappers
│   ├── lib/            # External library configs (axios, mantine)
│   ├── utils/          # Pure utility functions
│   └── App.tsx
```

---

## 🎨 UI Mockup

You can view the detailed HTML/CSS mockups for the application here:
[View UI Mockup](docs/ui-mockup.html)

---

## 📜 Comprehensive Code & Architecture Guidelines

### Code Organization & Structure

- **Barrel Exports** (Index Files)
- **Utils/Helpers Directory**
- **Constants Management**
- **Types/Models Directory**
- **Services Directory**
- **Modular Architecture**
- **Feature-Based Organization**
- **Layer Architecture** (Presentation, Business, Data)
- **Clean Architecture**
- **Domain-Driven Design (DDD)**
- **Microservices Architecture**
- **Monorepo vs Polyrepo**
- **Shared Libraries/Packages**

### Code Quality Standards

#### Naming & Clarity

- Descriptive Variable Names
- Descriptive Function Names
- Consistent Naming Conventions
- No Magic Numbers/Strings
- Self-Documenting Code
- Meaningful Comments (when necessary)

#### Code Size & Complexity

- Function Size Limits (e.g., < 50 lines)
- File Size Limits (e.g., < 300 lines)
- Class Size Limits (e.g., < 200 lines)
- Cyclomatic Complexity Limits
- Cognitive Complexity Awareness
- Avoid Deep Nesting (max 3-4 levels)
- Single Level of Abstraction per Function

#### Code Patterns

- Early Returns / Guard Clauses
- Pure Functions
- Minimize Side Effects
- Explicit over Implicit
- Fail Fast
- Defensive Programming
- Avoid Global State
- Avoid Mutable State (when possible)

#### Error Handling

- Explicit Error Handling
- Custom Error Types/Classes
- Never Swallow Errors
- Error Logging with Context
- Try-Catch Blocks
- Error Boundaries (React)
- Graceful Degradation
- Retry Logic (when appropriate)

### Development Workflow

#### Code Review & Collaboration

- Code Reviews for Every Change
- Pull Request Templates
- Pair Programming
- Mob Programming
- Code Ownership
- Knowledge Sharing
- Documentation

#### Version Control

- Git Best Practices
- Branching Strategies (Git Flow, Trunk-Based)
- Meaningful Commit Messages
- Small, Focused Commits
- Feature Branches
- Semantic Versioning
- Changelog Maintenance

#### Automation & Tooling

- **Linting** (ESLint, Pylint, etc.)
- **Code Formatting** (Prettier, Black, etc.)
- **Pre-commit Hooks**
- **CI/CD Pipelines**
- **Static Type Checking** (TypeScript, mypy)
- **Code Analysis Tools** (SonarQube, CodeClimate)
- **Dependency Management**
- **Automated Testing in CI**
- **Build Automation**

### Import & Export Management

- Organized Imports (built-ins → external → internal → relative)
- Alphabetically Sorted Imports
- No Unused Imports
- No Wildcard Imports (unless necessary)
- Named Exports over Default (when appropriate)
- Barrel Exports for Clean APIs
- Circular Dependency Prevention

### Performance Best Practices

- **Lazy Loading**
- **Code Splitting**
- **Tree Shaking**
- **Memoization** (React.memo, useMemo, useCallback)
- **Caching Strategies**
- **Debouncing & Throttling**
- **Pagination**
- **Virtual Scrolling**
- **Image Optimization**
- **Bundle Size Optimization**
- **Critical Rendering Path Optimization**
- **Database Query Optimization**
- **Connection Pooling**
- **Avoid Premature Optimization**
- **Algorithmic Complexity Awareness** (Big O)
- **Profiling & Benchmarking**

### Security Best Practices

- **Input Validation**
- **Output Sanitization**
- **Parameterized Queries** (SQL Injection Prevention)
- **XSS Prevention**
- **CSRF Protection**
- **Authentication & Authorization**
- **Secrets Management** (Environment Variables, Vaults)
- **HTTPS/TLS**
- **Rate Limiting**
- **Content Security Policy (CSP)**
- **CORS Configuration**
- **Dependency Vulnerability Scanning**
- **Least Privilege Principle**
- **Security Headers**

### Architecture Patterns

#### General

- MVC (Model-View-Controller)
- MVVM (Model-View-ViewModel)
- MVP (Model-View-Presenter)
- Hexagonal Architecture
- Onion Architecture
- Event-Driven Architecture
- CQRS (Command Query Responsibility Segregation)
- Event Sourcing

#### Frontend

- Component-Based Architecture
- Container/Presentational Components
- Compound Components
- Render Props
- Higher-Order Components (HOCs)
- Custom Hooks
- State Management Patterns (Redux, Zustand, Context)
- Atomic Design

#### Backend

- RESTful API Design
- GraphQL Best Practices
- Microservices
- Serverless Architecture
- API Gateway Pattern
- Backend for Frontend (BFF)
- Service Mesh

### Frontend-Specific Best Practices

- Component Reusability
- Props Drilling Avoidance
- State Management (Local vs Global)
- React Hooks Best Practices
- Virtual DOM Optimization
- Progressive Enhancement
- **Accessibility (a11y)**
- **Responsive Design**
- **Mobile-First Design**
- SEO Best Practices
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Code Splitting by Route
- Asset Optimization
- Browser Compatibility
- Performance Budgets

### Backend-Specific Best Practices

- RESTful Conventions
- HTTP Status Code Usage
- Request Validation
- Response Standardization
- Middleware Pattern
- Rate Limiting
- Request Logging
- Database Transactions
- Connection Pooling
- Background Jobs/Queues
- Graceful Shutdown
- Health Checks
- API Versioning
- Documentation (OpenAPI/Swagger)

### Database Best Practices

- Database Normalization
- Denormalization (when appropriate)
- Foreign Key Constraints
- Database Indexes
- Query Optimization
- Migration Scripts
- Seed Data
- Transaction Management
- Soft Deletes vs Hard Deletes
- Audit Trails
- Database Backup Strategies
- Read Replicas

### Documentation Practices

- README Files
- API Documentation (OpenAPI, Swagger)
- Code Comments (when necessary)
- JSDoc / DocStrings
- Architecture Decision Records (ADRs)
- Runbooks
- Changelog
- Contributing Guidelines
- Code of Conduct
- Inline Documentation
- Diagrams (Architecture, Sequence, etc.)
- Concise comments on every function or constant that explain what the code does on a high level, how it does it (logic outline), and why its there (what is it used for)

### Refactoring Practices

- Extract Method
- Extract Variable/Constant
- Rename
- Move Method/Function
- Remove Dead Code
- Remove Commented Code
- Remove Unused Variables/Imports
- Simplify Conditionals
- Replace Magic Numbers with Constants
- Replace Conditional with Polymorphism
- Introduce Parameter Object

### Monitoring & Observability

- Structured Logging
- Log Levels (DEBUG, INFO, WARN, ERROR)
- Error Tracking (Sentry, Rollbar)
- Application Performance Monitoring (APM)
- Distributed Tracing
- Metrics Collection
- Alerting
- Dashboard Creation
- Health Checks
- Uptime Monitoring

### State Management

- Immutable State Updates
- State Normalization
- Centralized State
- Local Component State
- Derived State
- State Machines
- Optimistic Updates
- Pessimistic Updates
- State Persistence

### Asynchronous Programming

- Promises vs Async/Await
- Error Handling in Async Code
- Race Conditions Prevention
- Deadlock Prevention
- Callback Hell Avoidance
- Promise Chaining
- Promise.all / Promise.allSettled
- Cancellation Tokens
- Timeout Handling

### Code Style & Formatting

- Consistent Code Formatting
- Line Length Limits (e.g., 80-120 characters)
- Indentation Standards (spaces vs tabs)
- Brace Style
- File Naming Conventions
- Directory Naming Conventions
- Comment Style
- Code Block Organization

### Dependency Management

- Lock Files (package-lock.json, yarn.lock)
- Semantic Versioning
- Dependency Updates
- Vulnerability Scanning
- Tree Shaking
- Peer Dependencies
- Dev Dependencies vs Dependencies
- Avoid Circular Dependencies
- Minimal Dependencies

### API Design Best Practices

- RESTful Resource Naming
- HTTP Method Usage
- Pagination
- Filtering & Sorting
- Field Selection
- Versioning
- Rate Limiting
- HATEOAS (when appropriate)
- Error Response Standards
- Success Response Standards
- Idempotency
- Content Negotiation

### React-Specific Best Practices

- Functional Components over Class Components
- Custom Hooks for Reusability
- useCallback & useMemo for Performance
- Key Props in Lists
- Controlled vs Uncontrolled Components
- Error Boundaries
- Lazy Loading Components
- Code Splitting by Route
- Context API Usage
- Avoid Prop Drilling
- Component Composition

### TypeScript-Specific Best Practices

- Enable Strict Mode
- SUPER IMPORTANT!!!!!! Avoid `any` Type
- Use Union Types
- Use Type Guards
- Use Generics
- Interface vs Type
- Enum Usage
- Type Inference
- Const Assertions
- Discriminated Unions

### General Best Practices

- **Boy Scout Rule** (Leave code better than you found it)
- **Premature Optimization is the Root of All Evil**
- **Fail Fast, Fail Loud**
- **Make It Work, Make It Right, Make It Fast**
- **Zero Tolerance for Warnings**
- **Zero Tolerance for Linting Errors**
- **Code for Humans, Not Machines**
- **Explicit is Better than Implicit**
- **Simple is Better than Complex**
- **Flat is Better than Nested**

---

## 📝 Code Planning & Implementation Guide

### Investigation Protocol (MANDATORY BEFORE ANY CHANGE)

#### Step 1: Map Current State (5-10 min)

- [ ]  Trace execution flow from entry point to output
- [ ]  List all files in the execution path
- [ ]  Document data transformations
- [ ]  Note all function calls in the chain

#### Step 2: Find Dependencies (3-5 min)

- [ ]  Search for all imports of files you'll modify
- [ ]  Check for indirect dependencies (shared types, constants, utilities)
- [ ]  Use IDE "Find All References" on functions/classes
- [ ]  Look for similar patterns elsewhere

#### Step 3: Check for Existing Solutions (2-3 min)

- [ ]  Search utils folder for similar functionality
- [ ]  Check if pattern exists elsewhere in codebase
- [ ]  Look for related constants to reuse
- [ ]  Review recent commits for related changes

#### Step 4: Cite Your Evidence

Every plan must include:

- **File paths + line numbers** (`src/auth/middleware.js:45-52`)
- **Why existing code is relevant** (causes bug, handles similar case, etc.)
- **Integration points** (what will be affected by your change)

---

### Core Implementation Standards

#### Code Quality Rules

- [ ]  **No magic numbers** - all values are named constants
- [ ]  **No duplication** - extract to utilities if used 2+ times
- [ ]  **Function size** - keep under 50 lines
- [ ]  **File size** - keep under 300 lines
- [ ]  **Early returns** - guard clauses first
- [ ]  **Organized imports** - built-ins → external → internal → relative
- [ ]  **Zero linting errors/warnings**
- [ ]  **No unused imports, variables, or functions**
- [ ]  **Explicit error handling** - never silent failures

#### Code Organization Decision Tree

**Is this logic used in 2+ places?**

- YES → Extract to utilities folder
- NO → Is this business logic?
    - YES → Does it involve data persistence?
        - YES → Repository/data layer
        - NO → Services/business layer
    - NO → Is this API/UI interface?
        - YES → Controllers/routes layer
        - NO → Is this configuration/constants?
            - YES → Constants/config folder
            - NO → Keep in current file

#### Module Structure Rules

- **Never use `utils.ts`, `constants.ts`**
- **Use subdirectories instead**:
    
    ```
    module/
    ├── module.service.ts
    ├── utils/
    │   ├── function-name.ts
    │   └── index.ts
    ├── constants/
    │   ├── constant-name.ts
    │   └── index.ts
    └── index.ts
    ```
    
- **Create subdirectory when**: You have 2+ files of same category

---

### Planning Template

#### For Bug Fixes

```
Problem: [Brief description]

Evidence:
- File: [path:lines] - [why this is the issue]
- File: [path:lines] - [related code]

Dependencies Affected:
- [what will break/change]
- [what needs updating]

Solution:
- [specific changes with rationale]
- [why this is the right approach]

Testing:
- [how to verify the fix]
```

#### For New Features

```
Feature: [Brief description]

Investigation Results:
- Existing similar code: [path:lines]
- Constants to reuse: [what and where]
- Utilities available: [what exists]

Implementation Plan:
1. [Step with file path and rationale]
2. [Step with file path and files/modules]
- Modifies existing: [files:lines]
- Interacts with: [services/modules]

Standards Compliance:
- [ ] No magic numbers (will create: [constants])
- [ ] No duplication (using: [existing utilities])
- [ ] Functions < 50 lines
- [ ] Error handling explicit
- [ ] Proper imports organization

Testing Plan: [if tests are required]
- [ ] Unit tests for: [what]
- [ ] Integration tests for: [what]
```

#### For Refactoring

```
Refactor Goal: [What and why]

Current Problems:
- File: [path] - [issue: too long, duplicated, etc.]
- Code: [path:lines] - [specific problem]

Refactor Plan:
1. Extract: [what] → [where] - [rationale]
2. Rename: [what] → [new name] - [rationale]
3. Move: [what] → [where] - [rationale]

Risk Assessment:
- Files affected: [count and list]
- Breaking changes: [yes/no and what]
- Testing strategy: [how to verify nothing broke]
```

---

### Quick Decision Checklist

Before writing code, ask:

- [ ]  Have I traced all dependencies?
- [ ]  Have I checked for existing solutions?
- [ ]  Can I cite specific file paths for my decisions?
- [ ]  Does my plan avoid magic numbers?
- [ ]  Does my plan avoid duplication?
- [ ]  Will functions stay under 50 lines?
- [ ]  Am I using the right code organization pattern?
- [ ]  Have I considered error handling?
- [ ]  Do I know what tests are needed (if testing required)?
- [ ]  Have I documented any standards exceptions?

---

### Key Principles

**Evidence-Based Changes**: Every decision must reference actual code
**DRY**: Don't Repeat Yourself - extract if used 2+ times
**KISS**: Keep It Simple - simplest solution that works
**Investigate First**: 10-18 minutes of investigation prevents hours of debugging
**No Assumptions**: If unclear, ask questions before implementing

---

**Remember**: A good plan with code citations is worth 10x the implementation time it takes.