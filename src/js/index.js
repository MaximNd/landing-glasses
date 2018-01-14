//@ts-check
import './../scss/style.scss';
import { DropDownMenu } from './components/menu';
import Carousel from 'maximnd-simple-carousel';

new DropDownMenu('.dropdown-menu .bars', 0.8).init();

new Carousel({
    slider: '.slider',
    slidesContainer: '.slider-inner',
    next: '.next',
    prev: '.prev',
    autoPlay: false
});