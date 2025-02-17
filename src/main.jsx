import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux'
import App from './components/App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
