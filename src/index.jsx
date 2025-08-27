import App from './App'
import { AppProvider } from './providers/AppProvider'
import './style.css'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <AppProvider>
        <App />
    </AppProvider>
)