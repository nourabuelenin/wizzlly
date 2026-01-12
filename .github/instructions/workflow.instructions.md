---
applyTo: "**"
---

# Complete Task Management Guide for AI Assistants

A comprehensive workflow for generating, managing, and executing feature implementation tasks in development projects using Copilot and Cursor.

---

## Part 1: Task Generation from Feature Descriptions

### Goal

To guide an AI assistant in creating a **detailed, step-by-step task list** in Markdown format based on a feature description. The task list should **guide a developer through implementation**.

### Output Specifications

- **Format:** Markdown (`.md`)
- **Location:** `/tasks/`
- **Filename:** `tasks-[feature-name].md`  
  _Example:_ `tasks-user-profile-editing.md`

### Generation Process

1. **Receive Feature Description**  
   The user provides a feature description with requirements, functionality, and any constraints.

2. **Analyze Feature Requirements**  
   Read and analyze the functional requirements, user needs, and implementation details from the feature description.

3. **Assess Current State**

   - Review the existing codebase to understand existing infrastructure, architectural patterns, and conventions.
   - Identify any existing components, features, or utilities that can be leveraged or need modification.

4. **Phase 1: Generate Parent Tasks**

   - Based on the analysis, create the file and generate **high-level tasks** (about 5, typically).
   - Present these tasks to the user in the specified format (without sub-tasks yet).
   - Inform the user:
     > "I have generated the high-level tasks based on the feature description. Ready to generate the sub-tasks? Respond with 'Go' to proceed."

5. **Wait for Confirmation**  
   Pause until the user responds with **"Go"**.

6. **Phase 2: Generate Sub-Tasks**

   - Break each parent task into smaller, actionable steps.
   - Ensure sub-tasks follow logically and cover all implementation details.

7. **Identify Relevant Files**

   - List potential files to be created or modified.
   - Include a short explanation of their relevance.

8. **Generate Final Output**

   - Combine parent tasks, sub-tasks, relevant files, and notes into the final Markdown structure.

9. **Save Task List**
   - Save in `/tasks/` directory.
   - Use filename format: `tasks-[feature-name].md`.

### Task List Format Template

```markdown
## Relevant Files

- `path/to/potential/file1.ts` – Contains the main component for this feature.
- `path/to/another/file.tsx` – API route handler for data submission.
- `lib/utils/helpers.ts` – Utility functions needed for calculations.

### Notes

- Follow existing project patterns and conventions when implementing the feature.

## Tasks

- [ ] 1.0 Parent Task Title
  - [ ] 1.1 Sub-task description
  - [ ] 1.2 Sub-task description
- [ ] 2.0 Parent Task Title
  - [ ] 2.1 Sub-task description
- [ ] 3.0 Parent Task Title _(may not require sub-tasks if purely structural or configuration)_
```

### Interaction Model

This process requires a pause after generating parent tasks to confirm alignment with the user's expectations before adding sub-tasks. **Confirmation keyword: "Go"**.

**Target Audience:** The task list is written for a junior developer who will implement the feature with awareness of the existing codebase context.

---

## Part 2: Task Implementation and Management

### Implementation Workflow

#### 1. Work Flow Protocol

- **One sub-task at a time**: Do **NOT** start the next sub-task until you ask the user for permission and they respond with `"yes"`, `"y"`, or `"next"`.
- **Stop after each sub-task** and wait for the user's go-ahead.
- **Before starting work**: Check which sub-task is next in the task list.

#### 2. Completion Protocol

When you finish a sub-task:

1. **Mark as Completed**  
   Change `[ ]` to `[x]` for the completed sub-task.

2. **Mark the Parent Task as Completed**  
   If all sub-tasks under a parent are completed, change `[ ]` to `[x]` for the parent task.

### Task List Maintenance

#### Continuous Updates

- **Update the task list** as you work:

  - Mark tasks and sub-tasks as completed `[x]` per the protocol.
  - Add new tasks if they emerge during development.

- **Maintain the "Relevant Files" section**:
  - List **every file** created or modified.
  - Add a **one-line description** for each file's purpose.

#### Dynamic Task Management

- **Add newly discovered tasks** that emerge during implementation.
- **Update task descriptions** if requirements change during development.
- **Maintain accurate progress tracking** throughout the implementation process.

---

## AI Assistant Instructions

When working with this task management system, the AI must:

### Pre-Implementation

- **Generate comprehensive task lists** following the two-phase approach (parent tasks → confirmation → sub-tasks).
- **Assess existing codebase** thoroughly before task generation.
- **Wait for user confirmation** at the designated checkpoint.

### During Implementation

- **Follow the one-sub-task-at-a-time rule** strictly.
- **Pause for user approval** before continuing to the next sub-task (accept "yes", "y", or "next").
- **Update the task list file** after any significant work.
- **Check which sub-task is next** before starting work.

### Post-Implementation

- **Mark completed tasks** with `[x]` immediately upon completion.
- **Update the "Relevant Files" section** to reflect all modifications.

### Maintenance Requirements

- **Keep task lists current** with real-time updates.
- **Add emergent tasks** discovered during implementation.
- **Maintain file documentation** accuracy throughout the process.

---

## Best Practices

1. **Clarity**: Write tasks that are clear and actionable for junior developers.
2. **Granularity**: Break down complex tasks into manageable sub-tasks.
3. **Context**: Always consider existing codebase patterns and conventions.
4. **Communication**: Maintain clear checkpoints for user approval and guidance (accept "yes", "y", or "next").
5. **Documentation**: Keep comprehensive records of file changes and purposes.

This unified workflow ensures systematic feature development with proper tracking, user involvement, and maintainable code practices.
