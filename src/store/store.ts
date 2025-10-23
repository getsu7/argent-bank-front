import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import userReducer from './user.ts';

// Créer un storage personnalisé qui gère les deux storages
const createDynamicStorage = () => {
    return {
        getItem: async (key: string) => {
            // Essayer d'abord localStorage, puis sessionStorage
            const localValue = await storage.getItem(key);
            if (localValue) return localValue;
            return await sessionStorage.getItem(key);
        },
        setItem: async (key: string, value: string) => {
            const rememberMe = localStorage.getItem('rememberMe') === 'true';
            if (rememberMe) {
                await storage.setItem(key, value);
                // Nettoyer sessionStorage si on utilise localStorage
                await sessionStorage.removeItem(key);
            } else {
                await sessionStorage.setItem(key, value);
                // Nettoyer localStorage si on utilise sessionStorage
                await storage.removeItem(key);
            }
        },
        removeItem: async (key: string) => {
            // Nettoyer les deux storages
            await storage.removeItem(key);
            await sessionStorage.removeItem(key);
        }
    };
};

const persistConfig = {
    key: 'root',
    storage: createDynamicStorage(),
    whitelist: ['token']
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
