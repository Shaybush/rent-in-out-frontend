/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_GOOGLE_AUTH_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
