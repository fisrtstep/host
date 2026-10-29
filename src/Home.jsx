import { Link } from 'react-router-dom';
import { Card } from './ui';

const Home = ({ username, userId, token }) => {
    return (
        <section className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    Shop home
                </h1>
                <p className="max-w-xl text-slate-600">
                    {username
                        ? `Welcome back, ${username}. Use the nav to open each micro-frontend.`
                        : 'Welcome. Use the nav to open each micro-frontend once you wire them in.'}
                </p>
            </header>

            <ul className="grid gap-4 sm:grid-cols-3">
                <NavCard
                    to="/catalog"
                    title="Catalog"
                    body="Browse Fake Store products from the catalog MFE."
                />
                <NavCard
                    to="/cart"
                    title="Cart"
                    body="View this user’s carts from the cart MFE."
                />
                <NavCard
                    to="/account"
                    title="Account"
                    body="Show the Fake Store profile from the account MFE."
                />
            </ul>
        </section>
    );
};

function NavCard({ to, title, body }) {
    return (
        <li>
            <Card className="h-full transition hover:border-slate-300 hover:shadow">
                <Link to={to} className="block h-full p-4">
                    <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{body}</p>
                </Link>
            </Card>
        </li>
    );
}

export default Home;
