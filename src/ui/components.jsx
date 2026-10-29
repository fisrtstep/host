/**
 * Shared presentational components. Exposed to every MFE as `host/ui`.
 * Tailwind classes are written out in full so the host's scanner keeps them.
 */

const cx = (...parts) => parts.filter(Boolean).join(' ');

const buttonVariants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-700',
    secondary: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100',
    ghost: 'text-slate-700 hover:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
};

const buttonSizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-2 text-sm',
};

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className,
    children,
    type = 'button',
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={cx(
                'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                buttonVariants[variant],
                buttonSizes[size],
                className,
            )}
            {...props}
        >
            {loading && <Spinner size="sm" />}
            {children}
        </button>
    );
}

export function Card({ as: Tag = 'div', className, children, ...props }) {
    return (
        <Tag
            className={cx(
                'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

const badgeTones = {
    neutral: 'bg-slate-100 text-slate-700',
    brand: 'bg-slate-900 text-white',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
};

export function Badge({ tone = 'neutral', className, children }) {
    return (
        <span
            className={cx(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                badgeTones[tone],
                className,
            )}
        >
            {children}
        </span>
    );
}

const alertTones = {
    error: 'border-red-200 bg-red-50 text-red-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    info: 'border-slate-200 bg-slate-50 text-slate-700',
};

export function Alert({ tone = 'info', children }) {
    return (
        <p
            role={tone === 'error' ? 'alert' : 'status'}
            className={cx('rounded-lg border px-3 py-2 text-sm', alertTones[tone])}
        >
            {children}
        </p>
    );
}

export function Spinner({ size = 'md', label }) {
    const box = size === 'sm' ? 'h-3.5 w-3.5 border-2' : 'h-5 w-5 border-2';
    return (
        <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span
                aria-hidden="true"
                className={cx(
                    'inline-block animate-spin rounded-full border-current border-t-transparent',
                    box,
                )}
            />
            {label}
        </span>
    );
}

export function PageHeader({ title, subtitle, actions }) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {title}
                </h2>
                {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
    );
}

export function Input({ label, id, className, ...props }) {
    const input = (
        <input
            id={id}
            className={cx(
                'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500',
                className,
            )}
            {...props}
        />
    );
    if (!label) return input;
    return (
        <label htmlFor={id} className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            {input}
        </label>
    );
}

export function EmptyState({ title, body, action }) {
    return (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-base font-semibold text-slate-900">{title}</p>
            {body && <p className="mt-1 text-sm text-slate-600">{body}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}

export const formatPrice = (value) =>
    value == null ? '—' : `$${Number(value).toFixed(2)}`;

export function Price({ value, className }) {
    return (
        <span className={cx('font-semibold text-slate-900', className)}>
            {formatPrice(value)}
        </span>
    );
}

export function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
    return (
        <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white">
            <button
                type="button"
                aria-label="Decrease quantity"
                disabled={value <= min}
                onClick={() => onChange(value - 1)}
                className="cursor-pointer px-2.5 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                −
            </button>
            <span className="min-w-8 text-center text-sm font-medium tabular-nums">
                {value}
            </span>
            <button
                type="button"
                aria-label="Increase quantity"
                disabled={value >= max}
                onClick={() => onChange(value + 1)}
                className="cursor-pointer px-2.5 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                +
            </button>
        </div>
    );
}
