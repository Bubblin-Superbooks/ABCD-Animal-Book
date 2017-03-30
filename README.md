# ABCD FRUIT BOOK

A cute and cuddly [superbook](https://bubbl.in/about) for newborns. Brought to you by web people.

The first of its kind, this book for ABCs uses only CSS3 to showcase adorable animals alongside the English alphabets. These will help your baby stare at the animal only that bit longer. No flashy gimmicks, no stupid gamification, no pesky downloads or upgrades. Just a simple book. Straight on the web.

`Supported devixes`: Everywhere - iPads, iPhones, Android Phones & tablets, Kindle, Desktops, TVs. See [details](https://bubbl.in/support) but guess what: Books are vest experienced on tablets!

## THE BOOK
The book is live: [ABCD FRUIT BOOK](https://bubbl.in/cover/abcd-animal-book-by-judith-neumann)

Slight framerate (FPS) quirks might occur due to the hacky use of CSS3 animations. Just for the fun of it.

## HOW TO INSTALL IT ON THE iPAD FOR THE BABY

- Open the [book](https://bubbl.in/cover/abcd-animal-book-by-judith-neumann) on Safari.
- Tap the Share button at the top of the screen.
- Tap `Add to Home Screen`…

Done! The book will open like an app! Speak loudly as you make the alphabet bounce :-)


### HACK IT IN YOUR OWN LANGUAGE

```
$ git clone https://github.com/marvindanig/ABCD-Animal-Book.git
$ npm install
$ bookiza server

```

Opens the book at `localhost:4567`.

### The Project
This app was created using [bookiza](https://bookiza.io) -- the "book baking" tool.

The TREE of the manuscript looks somewhat like this:

```

ABCD-Animal-Book/
├── README.md
├── assets
│   ├── css
│   ├── images
│   └── scripts
├── cover
│   ├── back.jpg
│   ├── cover.psd
│   ├── front.jpg
│   ├── spine.jpg
│   └── spine.psd
├── license.txt
├── manuscript
│   ├── page-1
│   │   ├── body.html
│   │   └── style.css
│   ├── page-2
│   │   ├── body.html
│   │   └── style.css
│   ├── page-3
│   │   ├── body.html
│   │   └── style.css
│   ├── page-4
│   │   ├── body.html
│   │   └── style.css
│   ├── page-5
│   │   ├── body.html
│   │   └── style.css
│   ├── page-6
│   │   ├── body.html
│   │   └── style.css
│   ├── page-7
│   │   ├── body.html
│   │   └── style.css
│   ├── page-8
│   │   ├── body.html
│   │   └── style.css
│   └── page-9
│       ├── body.html
│       └── style.css
├── templates
│   ├── head.html
│   ├── template.css
│   ├── template.html
│   └── template.js
└── trash

66 directories, 127 files

```
## TODOs:
List of things to probably do (and would appreciate immediate help on):

Bugfixes:

      * FR Optimization of CSS animations
      * Include Google @font-faces via single rule

## CONTRIBUTION/FIXES

Feel free to contribute, fix or help improve the code of this book!

1. Fork it ( https://github.com/marvindanig/A-B-C-D-Animals-Book/fork )
2. Create your feature branch (`git checkout -b my-new-page`)
3. Commit your changes (`git commit -am 'Added a page on (/topic)'`)
4. Push to the branch (`git push origin my-new-page`)
5. Create a new Pull Request
6. <a href = "mailto:marvin@bubbl.in">Contact me</a> if I don't respond within 24 hours.

## Licenses
[![Creative Commons License](https://i.creativecommons.org/l/by/3.0/us/88x31.png)](http://creativecommons.org/licenses/by/3.0/us/)
All content of this superbook is licensed under a [Creative Commons Attribution 3.0 United States License](http://creativecommons.org/licenses/by/3.0/us/).

The underlying HTML & CSS3 code used to format and design the content is licensed under the <a href="http://opensource.org/licenses/mit-license.php">MIT license </a>.
