# Official-Handbook
A quick and handy guide to writing Superbooks.

The best place to start hacking your book is at [Bookiza](https://github.com/bookiza/bookiza), our tiny framework for Superbooks.

Bubblin has a wide [support](https://bubbl.in/support) for devices and desktops; it is specially otimized for (iPads) iOS 7+ and Android 5.0+ tablets. 

## Live Book
Read the book here: [Official Handbook](https://bubbl.in/cover/official-handbook-by-marvin-danig)

Learn how to write universal scalable, responsive and  books with hyperexplanations. 

## Quick Tips:
Bubblin works like a substrate for your superbook. Each page of a book is a virgin iframe that holds your HTML, CSS and JavaScript (and external resources over CDN) together. And renders it immediately, in realtime using a [codemirror](https://github.com/codemirror/CodeMirror) instance under it.

Note: You'll require at least working knowledge of HTML, CSS and JavaScript to be able to compose pages of your book. If you're completely new to frontend development you might want to [start here](http://www.codecademy.com/en/tracks/web) instead. 

#### Tip-1 
It is likely that you're going to need a template [style](https://github.com/bubblin/The-Solar-System/blob/master/css/page-9/style.css) to help you scale text responsively across multiple devices - a.k.a. mobile, tablets and desktops. Feel free to use our [CSS template](https://raw.githubusercontent.com/bubblin/Official-Handbook/master/templates/template.css) and your book will work right out of the box! 

Observe we're using vee-dublew (`vw` or `viewport width`) and single break-point media queries to  scale the text. This means very little CSS is required for textbooks and that requirement of reflow is redundant now! :-)

#### Tip-2
It is very easy to add [full_bleed images](https://bubbl.in/book/official-handbook-by-marvin-danig/45) on bubblin. In fact a whole set of designer, sports & fashion magazines are possible with full-bleed visuals using just [4 lines of CSS](https://github.com/bubblin/Official-Handbook/blob/master/manuscript/page-45/style.css). 


#### Tip-3
JavaScript libraries can be flexibly [added via the `HEAD`](https://medium.com/bubblin-superbooks/head-72e72d772a8c) of iframe. Or you can wrap it inside `BODY` of your HTML; whatever works for you! 

To include your own JS libraries into your book you can use [Github with proper CONTENT-TYPE headers](https://rawgit.com/) to host the sourcecode of your library. Or use another CDN service like [cdnJS](https://cdnjs.com/) or your own server or `vagrant` / `droplet`. 

```
Note: Images / assets are included over https! 
```

## The Project
This project was automatically generated using [bookiza](https://bookiza.io) i.e. `$ bookiza new Official-Handbook 30` command and then the `manuscript` was handplugged into Bubblin for the live render.

This is what the TREE of the Official Handbook looks like:

```

Official Handbook/
├── README.md
├── config
├── cover
│   ├── back.jpg
│   ├── front.jpg
│   ├── front.psd
│   ├── spine.psd
│   └── summary.html
├── images
│   ├── 3d-cover.png
│   ├── Bertrand-Russell-1951-014.jpg
│   ├── about-author.jpg
│   └── about-author.png
├── license.txt
├── manuscript
│   ├── page-1
│   │   ├── body.html
│   │   └── style.css
│   ├── page-10
│   │   ├── body.html
│   │   └── style.css
│   ├── page-11
│   │   ├── body.html
│   │   └── style.css
│   ├── page-12
│   │   ├── body.html
│   │   └── style.css
│   ├── page-13
│   │   ├── body.html
│   │   └── style.css
├── templates
│   ├── head.html
│   ├── template.css
│   ├── template.html
│   └── template.js
└── trash
    ├── page-15
    │   ├── body.html
    │   └── style.css
    ├── page-23
    │   ├── body.html
    │   └── style.css
    ├── page-24
    │   ├── body.html
    │   └── style.css
    ├── page-26
    │   ├── body.html
    │   └── style.css

92 directories, 243 files


```
## TODOs:
List of things to probably do (and would appreciate immediate help on):

Bugfixes:

      * NSerror on Firefox
      * Detach render of heavy SVGs
      * Include Google @font-faces via single rule

## Contributing

Feel free to contribute, fix or help improve the code of this book. 

1. Fork it ( https://github.com/bubblin/Official-Handbook/fork )
2. Create your feature branch (`git checkout -b my-new-page`)
3. Commit your changes (`git commit -am 'Added a page on (/topic)'`)
4. Push to the branch (`git push origin my-new-page`)
5. Create a new Pull Request
6. <a href = "mailto:marvin@bubbl.in">Contact me</a> if I don't respond within 24 hours.

## License
The content of this project itself is licensed under the <a href="http://creativecommons.org/licenses/by/3.0/us/deed.en_US">Creative Commons Attribution 3.0 </a> license, and the underlying source code used to format and display that content is licensed under the <a href="http://opensource.org/licenses/mit-license.php">MIT license </a>.