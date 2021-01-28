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

//creates the title of each scale
function createTitle() {
    if(event.key === 'Enter') {
        $('.scale__input').replaceWith(function(){
            return '<h1>'+this.value+'</h1>'
        })
    }
}
//creates a new scale
function addScale(){
    $(".new-scale").before('<div class="scale"><input type="text" class="scale__input" placeholder="Title" onkeydown="createTitle()" required> <input type="range" min="0" max="100" value="50" class="scale__range" id="range-1" onchange="savePosition(\'range-1\')"/><div class="scale__ticks"><div></div><div></div><div></div></div><ul class="scale__labels"><li>Saving What You Can</li><li>Avoiding Failure</li><li>Stagnant</li><li>Chasing Success</li><li>Upgrading Your Goal</li></ul></div>');
}