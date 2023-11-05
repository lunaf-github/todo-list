class DOM {
    constructor(){};

    root = null;
    div = (props, content) => this.createElement('div', props, content)
    p = (props, content) => this.createElement('p', props, content)
    input= (props, content) => this.createElement('input', props, content)
    img = (props, content) => this.createElement('img', props, content)
    button = (props, content) => this.createElement('button', props, content)
    form = (props, content) => this.createElement('form', props, content)
    nav = (props, content) => this.createElement('nav', props, content)
    ul = (props, content) => this.createElement('ul', props, content)
    li = (props, content) => this.createElement('li', props, content)
    h1 = (props, content) => this.createElement('h1', props, content)
    h2 = (props, content) => this.createElement('h2', props, content)
    h3 = (props, content) => this.createElement('h3', props, content)
    h4 = (props, content) => this.createElement('h4', props, content)
    createElement = function(tagName, props = {}, content) {
        const element = document.createElement(tagName);

        if (!this.isStandardElement(element)) {
            console.warn(tagName + "is not a standard tag name");
        }

        for (const property of Object.keys(props)) {
            if (property.slice(0,2) === 'on') {
                element.addEventListener(property.substring(2), props[property]);
            } else {
                element.setAttribute(property, props[property]);
            }
        }

        if (content) {
            if (Array.isArray(content)) {
                content.forEach(child => {
                    if (child) element.appendChild(child);
                })
            } else {
                element.append(content);
            }
        }

        return element;
    }
    isStandardElement = function(element) {
        return element instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
    }
    render = function(root, element) {
        this.root = root;
        if (typeof element === 'function') {
            element = element();
        }

        if (!this.isStandardElement(element)) {
            console.warn(element + "is not a standard element");
        }
        
        this.root.appendChild(element);
    }
    rerender = function(component) {
        this.root.innerHTML = '';
        this.root.append(component);
    }
}

const DOMLibrary = new DOM();

export default DOMLibrary;