import type {User, UserCredentials} from "../models/UserTypes.ts";
import {ENDPOINT_LOGIN, ENDPOINT_PROFILE} from "./endpoints.ts";

export const UserService = () => {

    async function login(userCredentials: UserCredentials): Promise<string> {
        try {
            const response = await fetch(ENDPOINT_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: userCredentials.email, password: userCredentials.password}),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const json = await response.json();

            return json.body.token;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async function searchProfile(token: string): Promise<User> {
        try {
            const response = await fetch(ENDPOINT_PROFILE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const json = await response.json();

            return json.body;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    return {
        login,
        searchProfile,
    }
}
