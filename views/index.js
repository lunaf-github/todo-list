// the import statement causes the functions inside the imported document to run. 
import App from './App.js'
import DOM from './libraries/dom.js';

import './styles.css'

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    DOM.render(root, App)
})


