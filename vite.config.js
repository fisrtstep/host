import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            react(),
            tailwindcss(),
            federation({
                name: 'host',
                filename: 'remoteEntry.js',
                // Shared design system + cross-MFE stores consumed by every remote
                exposes: {
                    './ui': './src/ui/index.js',
                },
                remotes: {
                    remote: {
                        type: 'module',
                        name: 'remote',
                        entry: env.VITE_REMOTE_ENTRY,
                    },
                    cart: {
                        type: 'module',
                        name: 'cart',
                        entry: env.VITE_CART_ENTRY,
                    },
                    account: {
                        type: 'module',
                        name: 'account',
                        entry: env.VITE_ACCOUNT_ENTRY,
                    },
                },
                shared: {
                    react: { singleton: true },
                    'react-dom/': { singleton: true },
                },
                dts: false,
            }),
        ],
        optimizeDeps: {
            exclude: [
                'remote/Catalog',
                'cart/Cart',
                'account/Account',
                '@tailwindcss/oxide',
                '@tailwindcss/oxide-darwin-arm64',
                'fsevents',
            ],
        },
        server: {
            port: 5173,
            // Remotes load host/ui from this dev server
            cors: true,
        },
    };
});
