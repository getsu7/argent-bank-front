const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

export const ENDPOINT_LOGIN = `${API_BASE_URL}/api/${API_VERSION}/user/login`;
export const ENDPOINT_PROFILE = `${API_BASE_URL}/api/${API_VERSION}/user/profile`;

