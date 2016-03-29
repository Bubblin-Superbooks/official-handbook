# Bubblin Official-Handbook
A superquick guide to writing & publishing [Superbooks](https://bubbl.in/faq) on Bubblin.

This app was baked with [bookiza](http://bookiza.io) - the "book baking" tool.

# Live render
The book is rendered here: [Official Handbook](https://bubbl.in/cover/official-handbook-by-marvin-danig)

# Hack the book

```
    $ git clone https://github.com/bubblin/Official-Handbook.git
    $ npm install
    $ bookiza server

```

Best place to read about how bookiza works is its [documentation](https://github.com/bookiza/bookiza).

# Support

Superbooks are generally [supported](https://bubbl.in/support) everywhere i.e. all devices, all desktops and all browsers. However, quirks do appear from time to time and it is best then to report that [issue](https://github.com/bookiza/bookiza/issues) immediately. 

Superbooks are otimized for linear reading on tablets: iPadsiOS 7+, Kindle 3 - Fire and Fire HD and Android 5.0+ tablets etc. 


## Quick info:
Bubblin works like a substrate for all your superbooks. Each page of a book is a virgin iframe that will hold your HTML, CSS and JavaScript (and external resources over CDN) together. And render it immediately, in realtime using a [codemirror](https://github.com/codemirror/CodeMirror) instances to process your code.

Note: You'll require at least working knowledge of HTML, CSS and JavaScript to be able to flexibly compose pages of your book. If you're completely new to front-end development then you might want to [start here](http://www.codecademy.com/en/tracks/web) instead. 

#### Tip-1 
It is likely that you're going to need to [style](https://github.com/bubblin/The-Solar-System/blob/master/css/page-9/style.css) your content scalably & responsively across multiple devices - a.k.a. mobile, tablets and desktops. Feel free to use our [CSS template](https://raw.githubusercontent.com/bubblin/Official-Handbook/master/templates/template.css) and your book will work right out of the box! 

Observe we're using vee-dublew (`vw` or `viewport width`) here and a single break-point @media-query to handle book bifoliums easily. This means that very little CSS is required for textbooks, about 14 lines only, to scale from smartphones to desktops/HDTVs. And that the requirement of reflow for e-books is totally redundant now! :-)

#### Tip-2
It is very easy to add [Full-Bleed](https://bubbl.in/book/official-handbook-by-marvin-danig/45) images on bubblin. In fact a whole set of designer, sports & fashion magazines are possible with full-bleed visuals using just [4 lines of CSS](https://github.com/bubblin/Official-Handbook/blob/master/manuscript/page-45/style.css)! 


#### Tip-3
JavaScript libraries can be flexibly [added](https://medium.com/bubblin-superbooks/head-72e72d772a8c) via the `HEAD` of the page iframe. Or you can wrap it inside `BODY` of your HTML; whatever works for you! 

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

## Licenses
[![Creative Commons License](https://i.creativecommons.org/l/by/3.0/us/88x31.png)](http://creativecommons.org/licenses/by/3.0/us/)  
All content of this superbook is licensed under a [Creative Commons Attribution 3.0 United States License](http://creativecommons.org/licenses/by/3.0/us/).

The underlying code used to format and display the content is licensed under the <a href="http://opensource.org/licenses/mit-license.php">MIT license </a>.