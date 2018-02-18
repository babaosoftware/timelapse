'use-strict';

import style from './../css/main.css'
import TimeLapse from './timelapse.js'

function addTimeLapse()
{
    ReactDOM.render(
        <TimeLapse imageSource='./json/timelapse.json'/>,
        $('.time-lapse-wrapper')[0]);
}


$(document).ready(function()
{
    addTimeLapse();
});
