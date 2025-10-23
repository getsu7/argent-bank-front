import type {User, UserCredentials} from "../models/UserTypes.ts";
import {ENDPOINT_LOGIN, ENDPOINT_PROFILE} from "./endpoints.ts";

export interface UpdateProfileData {
    firstName: string;
    lastName: string;
}

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

class ApiServiceError extends Error {
    status?: number;
    code?: string;

    constructor(message: string, status?: number, code?: string) {
        super(message);
        this.name = 'ApiServiceError';
        this.status = status;
        this.code = code;
    }
}

const handleApiError = async (response: Response, context: string): Promise<never> => {
    let errorMessage = `Erreur lors de ${context}`;

    switch (response.status) {
        case 400:
            errorMessage = "Requête invalide. Veuillez vérifier les données saisies.";
            break;
        case 401:
            errorMessage = "Email ou mot de passe incorrect.";
            break;
        case 403:
            errorMessage = "Accès refusé. Vous n'avez pas les permissions nécessaires.";
            break;
        case 404:
            errorMessage = "Ressource non trouvée.";
            break;
        case 500:
            errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
            break;
        case 503:
            errorMessage = "Service temporairement indisponible.";
            break;
        default:
            errorMessage = `${errorMessage} (Code: ${response.status})`;
    }

    try {
        const json = await response.json();
        if (json.message) {
            errorMessage = json.message;
        }
    } catch { /* empty */
    }

    throw new ApiServiceError(errorMessage, response.status, `HTTP_${response.status}`);
};

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
                await handleApiError(response, "la connexion");
            }

            const json = await response.json();

            if (!json.body?.token) {
                throw new ApiServiceError("Token non reçu du serveur", response.status);
            }

            return json.body.token;
        } catch (e) {
            if (e instanceof ApiServiceError) {
                throw e;
            }
            console.error("Erreur réseau:", e);
            throw new ApiServiceError(
                "Impossible de se connecter au serveur. Vérifiez votre connexion internet.",
                undefined,
                "NETWORK_ERROR"
            );
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
            });

            if (!response.ok) {
                await handleApiError(response, "la récupération du profil");
            }

            const json = await response.json();

            if (!json.body) {
                throw new ApiServiceError("Données de profil invalides", response.status);
            }

            return json.body;
        } catch (e) {
            if (e instanceof ApiServiceError) {
                throw e;
            }
            console.error("Erreur réseau:", e);
            throw new ApiServiceError(
                "Impossible de récupérer le profil. Vérifiez votre connexion internet.",
                undefined,
                "NETWORK_ERROR"
            );
        }
    }

    async function updateProfile(token: string, data: UpdateProfileData): Promise<User> {
        try {
            const response = await fetch(ENDPOINT_PROFILE, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                await handleApiError(response, "la mise à jour du profil");
            }

            const json = await response.json();

            if (!json.body) {
                throw new ApiServiceError("Réponse invalide du serveur", response.status);
            }

            return json.body;
        } catch (e) {
            if (e instanceof ApiServiceError) {
                throw e;
            }
            console.error("Erreur réseau:", e);
            throw new ApiServiceError(
                "Impossible de mettre à jour le profil. Vérifiez votre connexion internet.",
                undefined,
                "NETWORK_ERROR"
            );
        }
    }

    return {
        login,
        searchProfile,
        updateProfile,
    }
}
