---
title: Using Sass mixins for Flexbox
date: "2019-10-03"
description: Making flexbox CSS easier with SASS mixins.
tags: ["web development"]
---
![CSS and HTML](https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)

I was scouring the internet for a good mixin for flexbox but I would always come across mixins like these,

```
@mixin flexbox() {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
```
with a mixin for every possible property,
```
@mixin justify-content($justify) {
  -webkit-justify-content: $justify;
     -moz-justify-content: $justify;
      -ms-justify-content: $justify;
          justify-content: $justify;
            -ms-flex-pack: $justify;
}
```
While this may work for a lot of people, I still felt that it could be made simpler, or "DRY'er". I'm pretty sure someone must have done something like this before, but I couldn't find it. So after a little bit of struggling around with SCSS mixins and functions, I came up with this [gist](https://gist.github.com/Blazephoenix/aca2ab809fa44937f51452ce64b922c5#file-flexbox-mixins-scss "Flexbox mixins for SASS").

More functions can be created and extended into the mixin such as flex-direction, flex-wrap, flex-grow, etc. with the @content directive in a similar way. It can also be used on properties that use the same values like justify-self or align-self. I will be updating this post with a github repo for all the functions and mixins soon.

---
Would love to know if anyone finds it useful. Thanks.