# A-B-C-D-Animals-Book

A cute and cuddly [Superbook](https://bubbl.in/about) for newborns. Brought to you by the web. 

The first of its kind, this book uses only css to showcase alphabets and adorable animals together that help babies stare only that bit longer. No flashy gimmicks, no stupid gamification. Just a book. 

Works *almost* everywhere - iPads, iPhones, Android Phones, Desktops, TVs! 

Great, help your little ones learn their ABCs where they are!

# Superbook
The book is live over here: [A-B-C-D Animals Book](https://bubbl.in/cover/a-b-c-d-animals-book-by-marvin-danig)

Best experienced on the iPad. 

## How to install book on iPad:

- Open the [book](https://bubbl.in/book/a-b-c-d-animals-book-by-marvin-danig) on Safari.
- Tap the Share button at the top of the screen.
- Tap Add to Home Screen…

That's it! Now you'll find your book on the homescreen (like an app!), go ahead open and start reading in fullscreen.

# Hack it

```
$ git clone https://github.com/marvindanig/ABCD-Animal-Book.git
$ npm install
$ bookiza server

```

Opens the book at `localhost:4567`.

## The Project
This project was created using [bookiza](https://bookiza.io) -- the "book reification" framework. 

This is what the TREE of the manuscript looks like:

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

The underlying code used to format and display the content is licensed under the <a href="http://opensource.org/licenses/mit-license.php">MIT license </a>.
