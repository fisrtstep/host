import { useState } from 'react';

// Widget 07: renders a note that comes from the server as HTML.
export function Widget07({ title, noteHtml }) {
    const [open, setOpen] = useState(false);
    return (
        <section className="rounded border p-3">
            <h3 className="font-medium">{title}</h3>
            <button type="button" onClick={() => setOpen(!open)}>
                {open ? 'Hide' : 'Show'} details
            </button>
            {open && <div dangerouslySetInnerHTML={{ __html: noteHtml }} />}
        </section>
    );
}
