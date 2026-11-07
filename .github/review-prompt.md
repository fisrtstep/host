# Review criteria for the host app

Review the change as a careful senior front-end engineer would.

- Static: React mistakes (missing keys, props that are never used, state set during render), unclear names, dead code.
- Security: unescaped HTML, dangerouslySetInnerHTML, secrets or tokens in code, links that open new tabs without rel="noopener".
- Unit tests: a new component or a new prop with no test covering it.
- Accessibility: interactive elements without a label, tooltips that cannot be reached with the keyboard.

Report only what you can point to in the changed lines.
