# Table of Contents
1. [Coding Standards](#coding-standards)
    1. [Indentation](#indentation)
    2. [Naming Convention](#naming-convention)
    3. [Code Formatting](#code-formatting)
    4. [Statics](#statics)
    5. [Imports](#imports)
    6. [Strings](#strings)
    7. [Access Modifiers](#access-modifiers)

# Coding Standards

This section outlines the coding standards to be followed within the project. The project currently adheres to recommended linting rules for TypeScript; detailed information on them can be found [here](#).

## Indentation

Standard 4-space-based indentation is utilized in the project. It is recommended to configure your IDE accordingly.

## Naming Convention

- **Class:** Should have the same name as the file in which it is contained.
- **File:** Use kebab-case for file names.
- **Class:** Use PascalCase for class names.
- **Method:** Use camelCase for method names.
- **Aliases:** Use the case of the aliased entity.
- **Variable and Property:** Use camelCase.
- **Enum Key, Const, and Statics:** Use UPPER_SNAKE_CASE.

## Code Formatting

- Methods inside classes should have an empty line between them (except for locator classes).
- Steps should have a clear distinction between context and actions. Actions should be clearly separated, and each action should be called on the next line.
- Use fluent interface inside context classes whenever possible for better readability.

Example:

```typescript
context1
    .action();

context2
    .action1()
    .action2();

Statics
Statics should be used only in places where the value won't change during the test execution (e.g., values of enums or variables containing constants).

To define a class property as static, use the following construction: static readonly PROPERTY_NAME.

Use the const modifier to make a variable not changeable, but remember that const context lives only within the block, similar to the let modifier.

Imports
Use import statements to refer to entities outside the current entity. To be available for import, an entity needs to be exported.

Example:

typescript
Copy code
// Enum.ts
export default enum Enum { /* ... */ }

// SomeFile.ts
import Enum from '../enums/Enum';
Strings
Use single quotes ' everywhere in the code, except for strings containing this character; in that case, use double quotes ".

JSON files should use standard double quotes " to define strings.

Access Modifiers
By default, in JavaScript/TypeScript, everything is public. However, to limit this behavior, try to restrict access to properties/variables if they are not required outside the class. Two main access modifiers are available in TypeScript:

private: Accessed only within the class it is declared.
protected: Accessed only within the class and direct descendants.
