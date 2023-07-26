import PropTypes from 'prop-types';

export const setCookie = (title, value, expiratedHours=1) => {
    // Pengaturan cookie yang hangus dalam hitungan waktu jam
    const expirationHours = expiratedHours;
    const date = new Date();
    date.setTime(date.getTime() + (expirationHours * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    return document.cookie = `${title}=${value}; ${expires}; path=/`;
}

export const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`; 
    }
}

setCookie.propTypes= {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    expiratedHours: PropTypes.number,
}
getCookie.propTypes= {
    name: PropTypes.string.isRequired,
}