interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: "http://127.0.0.1:8001/api";
  readonly VITE_OTHER_ENV_VARIABLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
