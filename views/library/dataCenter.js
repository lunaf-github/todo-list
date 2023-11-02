
let state = {
    currentPage: 'login',
    theme: 'dark'
}

const subscribers = [];


const dataCenter = {
    getState: function(key) {
        return state[key];
    },
    setState: function(newState) {
        console.log('setState')
        for (const key of Object.keys(newState)) {
            state[key] = newState[key];
        }
        this.notify(state)
    },
    subscribe: function(func) {
        subscribers.push(func)
    },

    unsubscribe: function(func) {
        subscribers = subscribers.filter((subscriber) => subscriber != func)
    },

    notify: function(state) {
        console.log('notify')
        subscribers.forEach((subscriber) => subscriber(state))
    },
}

Object.freeze(dataCenter);

export default dataCenter;