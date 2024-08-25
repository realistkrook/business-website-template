import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/realisttech/', // Replace 'your-repo-name' with the actual repository name
  plugins: [react()],
})