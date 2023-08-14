import Cookies from "js-cookie";

function signOut () {
    Cookies.remove("token");
    return window.location.replace(window.location.origin);
}

export {
    signOut
}