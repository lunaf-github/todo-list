function once(callback) {
    let invoked = false;
    return function(...args) {
        if (invoked) return;
        invoked = true;
        return callback()
    }
}


export {
    once
};