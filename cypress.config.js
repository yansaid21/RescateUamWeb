import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    NO_PROXY: 'localhost,127.0.0.1,::1', // Excluir localhost del proxy
  },
  devServer: {
    framework: 'react',
      bundler: 'vite',
  },
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  server: {
    host: '127.0.0.1', // o '0.0.0.0' para aceptar conexiones externas
    port: 5173,        // Asegúrate de usar el puerto correcto
  },  
});
