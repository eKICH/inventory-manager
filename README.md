# Inventory Manager

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://inventory-manager-beige-eight.vercel.app/inventory)
[![CI](https://github.com/eKICH/inventory-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/eKICH/inventory-manager/actions/workflows/ci.yml)

Inventory Manager is a production-grade inventory management application built with Angular Signals, NgRx, and Firebase.
The project demonstrates modern Angular architecture, predictable state management, and real-world UX patterns such as route guarding, 
confirmation workflows, and user feedback.

This application was designed to mirror how enterprise Angular applications are structured and maintained.

# Key Features
- Full CRUD inventory management
- Modern Angular Signals for reactive local state
- NgRx Store & Effects for global state orchestration
- Firebase-backed persistence layer
- Guarded and normalized routes
- User feedback via toast notifications
- Confirmation flows for destructive actions
- Environment-based configuration (dev / prod)

# Technology Stack
- Angular 20+
- Angular Signals
- NgRx (Store, Effects, Selectors)
- Firebase Firestore
- RxJS
- TypeScript
- Standalone Components

# Architecture Overview
The application follows a scalable, enterprise-style architecture:

**Presentation Components**
- Handle forms, routing, and UI interactions
- No direct API access

**NgRx Store**
- Single source of truth for inventory data
- Handles loading, success, and error states

**NgRx Effects**
- Isolate side effects and Firebase interactions
- Dispatch success/failure actions
- Trigger user notifications

**Angular Signals**
- Manage route-driven state (e.g., edit mode)
- Eliminate unnecessary subscriptions
- Provide clean derived state

**Firebase Backend**
- Firestore as the persistence layer
- Numeric ID generation via counter document
- Server-side timestamps for creation dates

# State Management Strategy
This project intentionally combines NgRx and Angular Signals:

**NgRx is used for:**
- Inventory collection state
- API communication
- Side effects and error handling

**Signals are used for:**
- Local UI state
- Route-based state (```isEditMode```)
- Derived values without RxJS subscriptions

This hybrid approach balances predictability with simplicity.


# Routing & Guards

**Routes**
| Route | Description |
| :--- | :--- |
| ```/inventory``` | Inventory list
| ```/add-inventory``` | Create Inventory
| ```/:id/:name``` | View Inventory
| ```/:id/edit-inventory``` | Edit Inventory

# Route Protection
Routes are guarded using ```InventoryExistsGuard```:
- Prevents access to non-existent inventory items
- Automatically loads inventory if not present in the store
- Normalizes URLs using slugified names
- Redirects invalid routes with user feedback
Example behavior:

```
/10/jiksu-motor → Redirects to /inventory with error message

```

# User Experience Considerations
- Toast notifications for all create/update/delete operations
- Confirmation modal before deletion
- Disabled submission during processing
- Clear loading and error states
- SEO-friendly and normalized URLs

These decisions reflect real-world UX requirements.

# 🌐 Live Demo

Check out the deployed app: [Inventory Manager Live](https://inventory-manager-beige-eight.vercel.app/inventory)  
All features — create, edit, delete, and view inventory — are fully functional.

# Environment Configuration
Angular environment file replacement is used.

```
src/environments/
├── environment.ts
└── environment.prod.ts

```

Both files export the same configuration shape and contain Firebase credentials.

# Firebase Integration
- Firestore is used as the database
- Inventory items stored as documents
- Numeric IDs generated via a counter document
- Server timestamps used for creation dates
- Architecture allows easy migration to Firebase Realtime Database

No custom REST API is required.

# What This Project Demonstrates
- Advanced Angular Signals usage
- Clean NgRx architecture with effects
- Route guard-driven data validation
- Firebase integration in a real application
- Separation of concerns
- Production-ready UX patterns

# Author Notes
This project was built to reflect real-world Angular application patterns, focusing on maintainability, 
scalability, and user experience rather than quick demos.

# Running the Project

**Install dependencies**
```
npm install

```

**Start development server**
```
ng serve → Navigate to http://localhost:4200

```

