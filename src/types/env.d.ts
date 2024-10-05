declare namespace NodeJS {
	export interface ProcessEnv {
		MONGODB_CONNECTION_STRING: string;
		PORT?: number;
		CLIENT_URL: string;
		SERVER_URL: string;
	}
}
