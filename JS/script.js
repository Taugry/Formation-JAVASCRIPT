function setCookie(name, value="", days=-1){
    let dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${dateNow}; path=/introduction; SameSite=None; Secure`;
}

function getCookie(name){
    //monCookie=Nico; unAutreCookie=23; dernierCookie=fin
    let tabCookie = document.cookie.split('; ');
    /*
    tabCookie[0] = monCookie=Nico; 
    tabCookie[1] = unAutreCookie=23; 
    tabCookie[2] = dernierCookie=fin;
    */ 
    for(cookie of tabCookie){
        let tabValue = cookie.split('=');
        if(name === tabValue[0]){
            return tabValue[1];
        }
    }
    return false;
}