if(document.cookie){//if a cookie exists
    //remove white space, the expiry date, and split the cookie to readable chunks
    //replace() = remove the white space
    var cookies = document.cookie.replace(/expires=Tue, 19 Jan 2038 03:14:07 UTC/g,'').replace(/\s/g,'').split(';');
    
    console.log(document.cookie);
    for(var i = 0; i < cookies.length; i++) {//looping through each cookie
        console.log(cookies[i]);
        var name = cookies[i].substring(0, cookies[i].indexOf('='));
        var value = cookies[i].substring(cookies[i].indexOf('=')+1);

        if(document.getElementById(name)){//checking element with the id of the name of a cookie exist
            document.getElementById(name).value = value;
        }
    }
}
//creates the cookie of the save position of the input range
function savePosition(x){
    document.cookie = x+"="+document.getElementById(x).value+"; expires=Tue, 19 Jan 2038 03:14:07 UTC";
}

function createTitle() {
    if(event.key === 'Enter') {
        $('.slider-input-field').replaceWith(function(){
            return '<h1 class='+this.className+'>'+this.value+'</h1>'
        })
    }
}