
let state = {
    currentPage: 'login',
    theme: 'dark'
}

let subscribers = new Set();


const dataCenter = {
    getState: function(key) {
        return state[key];
    },
    setState: function(newState) {
        for (const key of Object.keys(newState)) {
            state[key] = newState[key];
        }
        this.notify(state)
    },
    subscribe: function(func) {
        subscribers.add(func)
    },

    unsubscribe: function(func) {
        subscribers = new Set(Array.from(subscribers).filter((subscriber) => subscriber != func));
    },

    notify: function(state) {
        Array.from(subscribers).forEach((subscriber) => subscriber(state))
    },
}

Object.freeze(dataCenter);

export default dataCenter;