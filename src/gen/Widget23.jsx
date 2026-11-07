import { useState } from 'react';

// Widget 23: shows a short note and lets the user expand it.
export function Widget23({ title, note, href }) {
    const [open, setOpen] = useState(false);
    return (
        <section className="rounded border p-3">
            <h3 className="font-medium">{title}</h3>
            <button type="button" onClick={() => setOpen(!open)}>
                {open ? 'Hide' : 'Show'} details
            </button>
            {open && <p>{note}</p>}
            <a href={href}>Read more</a>
        </section>
    );
}
