import { Outlet, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { Badge, Button, Toaster, useCart } from './ui';
const linkClass = ({ isActive }) =>
    [
        'inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors',
        isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-200',
    ].join(' ');

const Layout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { count } = useCart();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
                    <p className="text-lg font-semibold tracking-tight">Shop</p>
                    <nav className="flex flex-wrap items-center gap-2">
                        <NavLink to="/" end className={linkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/catalog" className={linkClass}>
                            Catalog
                        </NavLink>
                        <NavLink to="/cart" className={linkClass}>
                            Cart
                            {count > 0 && <Badge tone="warning">{count}</Badge>}
                        </NavLink>
                        <NavLink to="/account" className={linkClass}>
                            Account
                        </NavLink>
                        <Button variant="ghost" onClick={handleLogout}>
                            Logout
                        </Button>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-8">
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
};

export default Layout;
