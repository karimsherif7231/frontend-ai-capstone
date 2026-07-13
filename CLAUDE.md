# CLAUDE.md

## Project Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vitest
- React Testing Library

## Project Rules

- All forms must use explicit validation rules before submission. Validation logic should be separated into reusable functions when possible.
- Every user input must have proper labels, accessible error messages, and keyboard-friendly interactions.
- Interactive components must handle loading, success, and failure states instead of only covering the successful case.
- New UI components should be created as reusable components inside `src/components` when they are used across pages.
- Every new feature should include tests covering validation, edge cases, and expected user behavior.
- AI-generated code must be reviewed and verified by running tests before committing.
- Use the Next.js App Router structure and keep routes inside `src/app`.
- Follow TypeScript strict mode and avoid unnecessary `any` types.
- Use Conventional Commits for all Git commits.

## AI Development Workflow

When using AI assistance:
1. Explain the feature requirements and expected behavior.
2. Provide project context and existing file references.
3. Ask for a plan before implementation for complex changes.
4. Require verification steps such as tests or build checks after implementation.