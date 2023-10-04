// the import statement causes the functions inside the imported document to run. 
import App from './components/App.js'
import './styles.css'

document.addEventListener('DOMContentLoaded', App.loadContent("root"))
