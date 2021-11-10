//creation de ma petite bibliotheque JS pour le dom
//le dom est charge
function loaded(callable) {
    window.addEventListener('DOMContentLoaded', callable);
}

function s(selector) {
    return document.querySelector(selector);
}
function sAll(selector) {
    return document.querySelectorAll(selector);
}
function cE(element) {
    return document.createElement(element);
}


function setCookie(name, value = "", days = -1) {
    let dateNow = new Date();
    dateNow.setTime(dateNow.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${dateNow}; path=/introduction; SameSite=None; Secure`;
}

function getCookie(name) {
    //monCookie=Nico; unAutreCookie=23; dernierCookie=fin
    let tabCookie = document.cookie.split('; ');
    /*
    tabCookie[0] = monCookie=Nico; 
    tabCookie[1] = unAutreCookie=23; 
    tabCookie[2] = dernierCookie=fin;
    */
    for (cookie of tabCookie) {
        let tabValue = cookie.split('=');
        if (name === tabValue[0]) {
            return tabValue[1];
        }
    }
    return false;
}

function loadNav() {
    fetch('../includes/navigation.html')
        .then(
            function (response) {
                //console.log(response);
                return response.text();
            }
        )
        .then(
            function (nav) {
                document.querySelector('body > nav').innerHTML = nav;
            }
        )
}

function getXhr() {
    let xhr = null;
    //est ce que le navigateur supporte ajax ?
    if (window.XMLHttpRequest || window.ActiveXObject ) {
        if(window.ActiveXObject){//est ce que le navigateur est un IE ?
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');               
            }
        }else{
            xhr = new XMLHttpRequest;
        }
    }else{
        console.log('Votre navigateur ne supporte AJAX');
        xhr = false;
    }
    return xhr;
}

function toTableRow(data){
    //console.log(data);
    let html = '';
    for (user of data) {
        //console.log(user);
        html += `
        <tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>
        `;
    }
    return html;
}
function toTableRowObject(data){
    let tbodyContent = '';
    let theadContent = '';
    let isFirstRound = true;

    theadContent += '<tr>';

    for (let user of data) {
        tbodyContent += `<tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">`;
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                if(isFirstRound){
                    theadContent += `<th>${key}</th>`;
                }
                if('object' !== typeof user[key]){
                    tbodyContent += `<td>${user[key]}</td>`;
                }else{
                    tbodyContent += `<td>`;
                    for(item in user[key]){
                        if (user[key].hasOwnProperty(item)) {
                            if('object' !== typeof user[key][item]){
                                tbodyContent += `${item} : ${user[key][item]}<br/>`;
                            }
                        }
                    }
                    tbodyContent += `</td>`;
                }
                

            }
        }
        isFirstRound = false;
        tbodyContent += '</tr>';
        
    }
    theadContent += '</tr>';
    return [theadContent, tbodyContent];
}