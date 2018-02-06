/*Out of the box webpack knows how to consume JavaScript modules in a variety of formats, the most notable two are:
ES2015 import statements
CommonJS require() statements*/

import {hello, sup} from './js/module';

// import 'jquery';
import 'bootstrap';

import './css/main.css';
import './scss/main.scss';

/*TODO got the below from https://github.com/manojkm/static-website-webpack-boilerplate/blob/master/app/js/imports.js */
// import "bootstrap/dist/js/bootstrap.js";
// import "bootstrap/dist/css/bootstrap.css";
// import "../scss/style.scss";
// import "font-awesome/css/font-awesome.css";

$(function () {
    console.log('jquery works');
});

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

hello();
sup();

