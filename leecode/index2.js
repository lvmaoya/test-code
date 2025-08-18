let debounce = function (fn, delay) {
    let timer = null;
    return function(...args){
        if(timer){
            return;
        } else{
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        }
    }
}