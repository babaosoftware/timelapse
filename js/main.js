'use-strict';

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
