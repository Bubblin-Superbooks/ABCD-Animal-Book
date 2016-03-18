# ABCD-Animals-Book

A cute and cuddly [superbook](https://bubbl.in/about) for newborns. Brought to you by web. 

First of its kind, this book uses only css to showcase the English alphabets and adorable animals to help babies stare only that bit longer. No flashy gimmicks, no stupid gamification. Just a book. Straight on the web. 

`Support`: It's supported everywhere - iPads, iPhones, Android Phones & tablets, Kindle, Desktops, TVs. 

# Superbook
The book is live: [ABCD Animals Book](https://bubbl.in/cover/a-b-c-d-animals-book-by-marvin-danig)

It's best experienced on the iPad & Android tablets. Slight frame rate quirks might occur on Android tablets due to the hacky use of CSS3 animations. Just for the fun of it.

# Hack it

```
$ git clone https://github.com/marvindanig/ABCD-Animal-Book.git
$ npm install
$ bookiza server

```

Opens the book at `localhost:4567`.


## How to install the book on your iPad for the baby:

- Open the [book](https://bubbl.in/book/a-b-c-d-animals-book-by-marvin-danig) on Safari.
- Tap the Share button at the top of the screen.
- Tap `Add to Home Screen`…

Done! The book will open like an app! Speak loudly as you make the alphabet bounce :-)

## The Project
This project was created using [bookiza](https://bookiza.io) -- the "book reification" framework. 

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

## Contributing

Feel free to contribute, fix or help improve the code of this book. 

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
