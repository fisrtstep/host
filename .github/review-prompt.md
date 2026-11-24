<!-- cross-repo-ai-review recommended-prompt: general-secrets@1,general-authorization@2,general-input-validation@2,react-xss@1,react-hooks-rules@1,react-effects@1,react-state-and-keys@1,general-tests@1 -->

Review the added lines of this pull request against the criteria below. Report a problem only when the code shown supports it.

## Code quality and bugs
- Flag a Hook (a function named use...) called inside a condition, a loop, after an early return, in an event handler, in a class, in a function passed to useMemo, useReducer or useEffect, or in try/catch.
- Flag a Hook called from a plain function that is neither a component nor a custom Hook.
- Flag an Effect that only computes a value from props or state and stores it in state: compute it while rendering.
- Flag an Effect that reacts to a user action: it belongs in the event handler.
- Flag an object or array in state that is changed in place instead of replaced with a copy.
- Flag list items with no key, a key that is not unique among siblings, or one made while rendering (random or new on every render).

## Security
- Flag a password, API key, token or private key written into the code, a config file or a test.
- Flag a secret that is logged or returned in a response.
- Flag a new route or action that reads or changes a record by an id taken from the request, when the lines shown do not check that the caller may use that record. A sign-in check alone is not that check, and an id taken from the signed-in session needs none.
- Flag a check done only for some entry points, or one that allows access when no rule matched.
- Flag a valid id or role taken as proof of permission.
- Flag request data that reaches a query, a command, a file path, a redirect, a template string or stored data before it is checked against what the code accepts (type, length, allowed values, nested items). Data only sent back in a response or shown through an escaping template is not flagged.
- Flag validation that tries to spot bad values (a deny list) instead of stating the allowed ones.
- Flag dangerouslySetInnerHTML given HTML that was not sanitized.
- Flag a URL from user data put in href or src without the code checking what it points to.

## Unit tests
- Flag a test that asserts on internal state or private calls instead of what a user or a caller of the code sees.
