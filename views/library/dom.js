const DOM = {
    root: null,
    createElement: function(tagName, props = {}, content) {
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
                    element.appendChild(child);
                })
            } else {
                element.append(content);
            }
        }

        return element;
    },
    isStandardElement: function(element) {
        return element instanceof HTMLElement && !(element instanceof HTMLUnknownElement);
    },
    render: function(root, element) {
        this.root = root;
        if (typeof element === 'function') {
            element = element();
        }


        if (!this.isStandardElement(element)) {
            console.warn(element + "is not a standard element");
        }
        
        this.root.appendChild(element);
    },
    rerender: function(component) {
        console.log('rerenderer', component)
        this.root.innerHTML = '';
        this.root.append(component);
    }
}

export default DOM;