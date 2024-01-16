import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const base = process.env.NODE_ENV === "development" ? "" : "/tiptap-editor"

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [vue()],
})
