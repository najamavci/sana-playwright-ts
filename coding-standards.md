# Table of Contents
1. [Coding Standards](#coding-standards)
   1. [Indentation](#indentation)
   2. [Naming Convention](#naming-convention)
   3. [Code Formatting](#code-formatting)
   4. [Statics & Constants](#statics--constants)
   5. [Imports](#imports)
   6. [Strings](#strings)
   7. [Access Modifiers](#access-modifiers)

# Coding Standards

This document outlines the coding standards for this project (TypeScript + Playwright + Cucumber).
Follow these rules to keep the codebase consistent, readable, and easy to debug in CI.

## Indentation

- Use **4 spaces** for indentation.
- Do not use tabs.
- Keep line length reasonable (aim for **~100–120 chars** max).

## Naming Convention

### Files & Folders
- **File names:** `kebab-case`  
  Example: `create-workflow-steps.ts`, `sana-chat.feature`
- **Folder names:** `kebab-case` (same as files)

### TypeScript identifiers
- **Classes:** `PascalCase`  
  Example: `SanaChatPage`, `WorkflowEditor`
- **Interfaces / Types:** `PascalCase`  
  Example: `WorkflowData`, `PWWorld`
- **Methods / functions:** `camelCase`  
  Example: `createWorkflow()`, `openWorkflowsPage()`
- **Variables / properties:** `camelCase`  
  Example: `workflowName`, `baseUrl`
- **Constants:** `UPPER_SNAKE_CASE`  
  Example: `DEFAULT_TIMEOUT_MS`, `WORKFLOW_TAG`
- **Enums:** `PascalCase` enum name, `UPPER_SNAKE_CASE` keys  
  Example: `enum UserRole { ADMIN, MEMBER }`

### Cucumber
- **Feature files:** describe the domain, not the implementation.  
  Example: `Feature: Workflows`
- **Scenario names:** sentence case, outcome-focused.  
  Example: `Scenario: Edit an existing workflow`

## Code Formatting

### General
- Prefer small, single-purpose functions.
- Avoid deep nesting; return early when possible.
- One logical action per line. Don’t stack unrelated calls on the same line.

### Classes
- Keep one class per file (unless a tiny helper type is tightly coupled).
- Put methods in a predictable order:
   1. public API
   2. protected helpers
   3. private helpers
- Add **one empty line** between class methods (exception: simple “locator-only” classes if you use them).

### Step Definitions (Cucumber)
- Keep steps **thin**:
   - Steps should orchestrate actions and assertions.
   - Put selectors and UI logic in page objects / helper modules.
- Separate *arrange / act / assert* clearly:
   - `Given` = context/navigation/setup
   - `When` = actions
   - `Then` = assertions
- Prefer explicit Playwright `expect()` assertions over implicit waits.

Example:
- `typescript await workflowsPage.open();`
- `await workflowsPage.createWorkflow(name);`
- `await expect(workflowsPage.workflowRow(name)).toBeVisible();`

### Fluent style
Use fluent/chained APIs only when it improves readability and each call is part of one cohesive action.

Good:

- `typescript await workflowEditor .setName(name) .setDescription(description) .save();`
- `typescript await workflowEditor.open().setName(name).setDescription(description).save();`Avoid chaining that mixes navigation + assertions + unrelated actions.

## Statics & Constants

- Use `static readonly` only for values that truly never change.
  Example:
- `typescript class Routes { static readonly WORKFLOWS = '/workflows'; }`
- `typescript const DEFAULT_TIMEOUT_MS = 5000;`

- Prefer `const` for immutable values inside a block:
- `typescript const workflowName = `e2e-workflow-${Date.now()}`;`

- Never store test data that must be unique (e.g., workflow names) as a static constant.

## Imports

- Use ES imports (`import ... from ...`).
- Prefer **named exports** for utilities; consider default exports for a single primary class per file.
- Keep imports ordered:
   1. Node built-ins (`node:*`)
   2. external packages
   3. internal modules
- Avoid deep relative paths when possible; if paths grow, introduce TS path aliases later.

Example:
- `typescript import path from 'node:path';  import { Given } from '@cucumber/cucumber'; import { expect } from '@playwright/test';`
-  `import { WorkflowsPage } from '../src/pages/workflows-page';`

### Strings
- `Use single quotes ' everywhere in the code, except for strings containing this character; in that case, use double quotes ".`
- `JSON files should use standard double quotes " to define strings.`

### Access Modifiers
- By default, in JavaScript/TypeScript, everything is public. However, to limit this behavior, try to restrict access to properties/variables if they are not required outside the class. Two main access modifiers are available in TypeScript:
- private: Accessed only within the class it is declared.
- protected: Accessed only within the class and direct descendants.

Example
- `typescript export class WorkflowsPage { constructor(private readonly page: Page) {}`

async open(): Promise<void> {
await this.page.goto('/workflows');
}

private workflowNameInput() {
return this.page.getByTestId('workflow-name');
}
}