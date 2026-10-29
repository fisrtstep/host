import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './auth';
import LoginPage from './LoginPage';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import Home from './Home';
import { Spinner } from './ui';

const Catalog = lazy(() =>
    import('remote/Catalog').then((module) => ({ default: module.Page })),
);
const Cart = lazy(() =>
    import('cart/Cart').then((module) => ({ default: module.Page })),
);
const Account = lazy(() =>
    import('account/Account').then((module) => ({ default: module.Page })),
);

const fallback = <Spinner label="Loading…" />;

const App = () => {
    const { token, username, userId } = useAuth();

    return (
        <Suspense fallback={fallback}>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={<Home token={token} userId={userId} username={username} />}
                        />
                        <Route
                            path="catalog"
                            element={<Catalog token={token} userId={userId} username={username} />}
                        />
                        <Route
                            path="cart"
                            element={<Cart token={token} userId={userId} username={username} />}
                        />
                        <Route
                            path="account"
                            element={<Account token={token} userId={userId} username={username} />}
                        />
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Suspense>
    );
};

export default App;
