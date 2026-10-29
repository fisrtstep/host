import { useToasts } from './stores';

const tones = {
    success: 'bg-slate-900 text-white',
    error: 'bg-red-600 text-white',
};

/** Rendered once by the host Layout; remotes call `toast()` from `host/ui`. */
export function Toaster() {
    const toasts = useToasts();
    return (
        <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
        >
            {toasts.map((t) => (
                <p
                    key={t.id}
                    className={`pointer-events-auto rounded-lg px-4 py-2 text-sm shadow-lg ${tones[t.tone] ?? tones.success}`}
                >
                    {t.message}
                </p>
            ))}
        </div>
    );
}
