import { useSyncExternalStore } from 'react';

/**
 * Cross-MFE stores. Module Federation can evaluate this file more than once
 * (once in the host bundle, once via `host/ui` in a remote), so each store
 * lives on `window` to guarantee a single instance.
 */
function createStore(key, initial, persistKey) {
    const registry = (window.__MF_LAB_STORES__ ??= {});
    if (registry[key]) return registry[key];

    let state = initial;
    if (persistKey) {
        try {
            const raw = localStorage.getItem(persistKey);
            if (raw) state = JSON.parse(raw);
        } catch {
            // ignore unreadable storage
        }
    }

    const listeners = new Set();
    const store = {
        get: () => state,
        set(next) {
            state = typeof next === 'function' ? next(state) : next;
            if (persistKey) {
                try {
                    localStorage.setItem(persistKey, JSON.stringify(state));
                } catch {
                    // ignore quota / private mode
                }
            }
            listeners.forEach((listener) => listener());
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
    registry[key] = store;
    return store;
}

// ---- Cart -----------------------------------------------------------------

const cartStore = createStore('cart', [], 'mf-lab-cart');

export const cart = {
    add(product, quantity = 1) {
        cartStore.set((items) => {
            const existing = items.find((i) => i.productId === product.id);
            if (existing) {
                return items.map((i) =>
                    i.productId === product.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i,
                );
            }
            return [
                ...items,
                {
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity,
                },
            ];
        });
    },
    setQuantity(productId, quantity) {
        cartStore.set((items) =>
            items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        );
    },
    remove(productId) {
        cartStore.set((items) => items.filter((i) => i.productId !== productId));
    },
    clear() {
        cartStore.set([]);
    },
};

export function useCart() {
    const items = useSyncExternalStore(cartStore.subscribe, cartStore.get);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
    return { lines: items, count, total, ...cart };
}

// ---- Toasts ---------------------------------------------------------------

const toastStore = createStore('toasts', []);
let nextToastId = 1;

export function toast(message, tone = 'success') {
    const id = nextToastId++;
    toastStore.set((list) => [...list, { id, message, tone }]);
    setTimeout(() => {
        toastStore.set((list) => list.filter((t) => t.id !== id));
    }, 3000);
}

export function useToasts() {
    return useSyncExternalStore(toastStore.subscribe, toastStore.get);
}
