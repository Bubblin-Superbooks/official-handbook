# Official-Handbook
An official guide to writing & publishing [superbooks](https://bubbl.in/faq). This book was initially written by hand and then later baked with [Bookiza](http://bookiza.io) - the "book reification" framework.

## Live render
The book is rendered here: [Official Handbook](https://bubbl.in/cover/official-handbook-by-marvin-danig)

## Hack & host

In your local:

```
    $ git clone https://github.com/bubblin/Official-Handbook.git
    $ npm install
    $ bookiza server
    
    
    $ bookiza register  // Give your Bubblin's credentials
    $ bookiza publish   // Goes online! 

```

Read the [bookiza documentation](https://bookiza.github.io/docs/) for more.

# Support

Superbooks are generally [supported](https://bubbl.in/support) everywhere i.e. all devices, all desktops and all browsers. However, quirky behavior does appear from time to time and it is then best to report [issue](https://github.com/bookiza/bookiza/issues) immediately. 

Note: Despite ubiquity, the effort with superbooks points to mostly yielding best reading experience on tablets: i.e. iPads(iOS 7+), Kindle 3 (Silk) and Android 5.0+ phablets. Because, well, even though it's great to support desktops, smartphones, TVs and whatnot, the most ideal situation and surface for reading books is the tablet.


## Quick info:

- Bubblin is a production substrate for Superbooks. Read [more](https://bubbl.in/about).

- Superbook is a responsive container that holds your book. Read [more](https://bubbl.in/faq) 

#### How it works

Each page of the book is a *virgin iframe* (book is a collection of web pages) that holds your HTML, CSS and JavaScript together. All content is rendered instantly -- in realtime -- using a [codemirror](https://github.com/codemirror/CodeMirror) instance underneath.


#### Templates 
Even though the superbook container is responsive, it is likely that the content you're going to put inside it isn't. Use the following [style templates](https://github.com/bookiza/templates) and guidelines to convert your content into a responsive scalable object. 

Warn: DO NOT USE 'px', 'em', or 'pt' on your book CSS. Even the best CSS frameworks are too old school to get this right. Use viewport units (`vw` or `viewport width`) instead and a single break-point @media-query at 871px to handle bifoliums and single-page mode easily. 

Interestingly, just [10 lines of CSS](https://github.com/bookiza/templates/blob/master/novels/novella/style.css) is enough to scale content responsively across all devices in the world.


#### Using CDN
It is possible to add [CDN resources](https://medium.com/bubblin-superbooks/head-72e72d772a8c) to your book. Or you can wrap it within the 'body` tag of your HTML; whatever works! 


Tip: You can use [rawgit i.e. Github with proper CONTENT-TYPE headers](https://rawgit.com/) to host your library and assets. Note all includes inside the book from external CDN or source must be served under https -- i.e. secured url


## The Project
This project was initially generated using [bookiza bash plugin](https://github.com/bookiza/bookiza/tree/master/bash) i.e. with command `$ bookiza new Official-Handbook 30`. 

The bash plugin is now deprecated.

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