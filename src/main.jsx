import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const queryClient =
  new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <QueryClientProvider client={queryClient}>

    <App />

  </QueryClientProvider>

</StrictMode>
)
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    console.log('🔄 New version available')
  },
  onOfflineReady() {
    console.log('✅ App ready offline')
  }
})