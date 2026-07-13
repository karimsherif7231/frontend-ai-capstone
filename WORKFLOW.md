# AI Development Workflow Comparison

## Overview

This experiment compared two AI-assisted development approaches by building the same feature twice: a settings form with validation. The first implementation used a vague prompt with minimal context, while the second implementation used a structured prompt with project context, constraints, expected behavior, and a verification step.

## Round One: Vague Prompt

In the first round, the AI was given a simple request to create a settings form without detailed requirements. The result was a basic implementation that provided the main UI but required more manual review and improvements.

The main issues found during review were missing validation details, limited handling of edge cases, and less attention to accessibility. The implementation worked for the happy path but did not fully consider real user scenarios such as invalid input, failed submissions, or slow network responses.

## Round Two: Detailed Prompt and Verification Loop

The second round followed a more structured workflow. The AI first explored the project structure and created a plan before writing code. The prompt included specific requirements, technical constraints, accessibility expectations, and example behaviors.

The final implementation included:
- Reusable SettingsForm component
- Input validation rules
- Loading and success states
- Error handling for failed submissions
- Accessible labels and error associations
- Automated tests for validation and user interactions

After implementation, the AI generated tests and verified that all tests passed. This reduced the amount of manual debugging and increased confidence in the final result.

## Comparison

The detailed workflow produced more correct and maintainable code. Although the second round required more time during the planning phase, it reduced review and fixing time because many possible problems were considered before implementation.

The vague approach focused mainly on generating code quickly, while the detailed approach focused on producing a feature that could be reviewed and trusted.

## AI Mistake Found

During the process, an issue was discovered where the generated project structure caused confusion after moving files between folders. The problem was identified through testing because the expected routes were not available. This showed the importance of verifying AI-generated changes instead of assuming the output is always correct.

## Lessons Learned

Effective AI-assisted development requires clear specifications, constraints, and verification steps. A good prompt should describe not only what to build, but also how the result should behave and how it should be tested. The verification loop is what turns AI from a code generator into a development assistant.