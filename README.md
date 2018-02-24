# Time-lapse Player
A reactjs component that plays a sequence of images.

[Run sample page.](http://babaosoftware.com/apps/timelapse/timelapse.html)

## Options
  + title: used at the top of the widget box.
  + desc: optional description.
  + cacheSize: how many images to cache in advance.
  + autoPlay: start immediately after loading.
  + speed: time between consecutive images, in ms.
  + root: optional root url to be added in front of each image url.
  + images: array of objects with two members:
       + url: the url to the image. It can be relative if root is used.
       + speed: optional override for the global speed option.
       
[See valid options in the attached sample json file.](json/timelapse.json)
