
let storage = {
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    remove: function (key) {
    	return localStorage.removeItem(key);
    },
    setSession: function(key, value) {
    	sessionStorage.setItem(key, JSON.stringify(value));
    },
    getSession: function(key) {
    	return JSON.parse(sessionStorage.getItem(key));
    },
    removeSession: function(key) {
    	return sessionStorage.removeItem(key);
    },
};

export default storage;


