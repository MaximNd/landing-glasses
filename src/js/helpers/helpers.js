/**
 * 
 * @param {HTMLElement} el 
 * @param {String} type 
 * @param {Function} fn 
 */
export function addEvent(el, type, fn) {
    if (typeof addEventListener !== 'undefined') {
        el.addEventListener(type, fn, false);
    } else if (typeof el.attachEvent !== 'undefined') {
        el.attachEvent('on' + type, fn);
    } else {
        el['on' + type] = fn;
    }
}
