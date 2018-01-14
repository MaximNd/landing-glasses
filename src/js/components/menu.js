//@ts-check
import { addEvent }  from './../helpers/helpers.js';


export class DropDownMenu {

    constructor(selector, speed = 1) {
        this.menu = document.querySelector(selector);
        this.speed = speed;
        this.isOpen = false;
    }

    init() {
        const that = this;
        addEvent(this.menu, 'click', function() {
            const items = document.getElementById(that.menu.dataset.items);
            console.log(that.menu.dataset.items);
            if (that.isOpen) {
                items.style.animation = `closeUp ${that.speed}s`;
                items.style.opacity = '0';
            } else {
                items.style.animation = `dropDown ${that.speed}s`;
                items.style.opacity = '1';
            }
            that.isOpen = !that.isOpen;
        });
    }
}