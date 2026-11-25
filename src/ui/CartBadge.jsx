import { useState } from 'react';

export function CartBadge({ items, visible }) {
    if (!visible) {
        return null;
    }
    const [open, setOpen] = useState(false);
    return (
        <ul onClick={() => setOpen(!open)}>
            {items.map((item) => (
                <li key={Math.random()}>{item.title}</li>
            ))}
        </ul>
    );
}
