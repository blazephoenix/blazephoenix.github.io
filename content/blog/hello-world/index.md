---
title: Webscraping in Python with Flask and BeautifulSoup 4
date: "2015-03-23T23:46:37.121Z"
---

![](https://thepracticaldev.s3.amazonaws.com/i/vlb3nw2civ5iyd3ats4w.jpg)

##What is web scraping?

Web scraping is a term used for the process of extracting HTML/XML data from websites. Once extracted, it can be parsed into a different HTML file or saved locally in text/spreadsheet documents.

##Who does it?

A lot of websites that aggregate data from other websites on the internet. Some examples could be websites that give you the best deals on the same product after comparing across multiple platforms (Amazon, Flipkart, Ebay, etc.), and also sites that collect datasets to apply ML algorithms to.

##How is it useful to me?

I would recommend you to limit your thinking to how something could benefit you especially when you know little to nothing about it. It helps to be a generalist when you’re just starting out. Learn everything, you never know when you’ll need it! You can always settle and specialize in one area eventually, when you’re well aware of the options you have.

___


##What we’ll need

* Python v3.6.8
* VSCode

##Installing Python (skip if already installed)

* Go to — python.org > Downloads > Windows
* Scroll to version 3.6.8 > x86 (32 bit) / x86–64 (64 bit) > Executable
* Double-click and check “Add Python to PATH”
* Follow the installation instructions.
* Check if correctly installed
* Press Windows key+R > Type “cmd” to open the command line.
* In the command line > Type,
* python --version

If Python is installed correctly, you should see, `3.6.8` in the terminal.

##Installing VSCode (skip if already installed)

VSCode is a free code editor with lots of features that make writing and debugging code much easier.

* Go to code.visualstudio.com > Download for Windows > x86/x64 > Installer.
* Double-click and follow the instructions.

___

##Let’s begin!

* Create a new folder and call it “Webscraper”
* Inside the folder, create a new file named webscraper.py
* Open VSCode > File > Open Folder > Navigate to “Webscraper”

Now we need to import a few libraries which will help us build our web scraper.

* Go to Terminal > New Terminal

This is basically the command line but within the editor so we don’t have to have two windows and keep switching between them.

* Next we call `pip`

*You could call it the Alfred to Python’s Batman. Hehe.*

* In your terminal, type `pip install beautifulsoup4`

*This installs the beautifulsoup library which will help us scrape webpages.*

* Next type `pip install flask` and `pip install requests`

*Flask is a lightweight framework to build websites. We’ll use this to parse our collected data and display it as HTML in a new HTML file.*

*The requests module allows us to send http requests to the website we want to scrape.*

In your file, type the following code:

```
    from flask import Flask, render_template
    from bs4 import BeautifulSoup
    import requests
```

*The first line imports the Flask class and the render_template method from the flask library. The second line imports the BeautifulSoup class, and the third line imports the requests module from our Python library.*

Next, we declare a variable which will hold the result of our request

```
    source = requests.get(‘https://webscraper.droppages.com/').text
```

We send a `GET` request to https://webscraper.droppages.com and convert the HTML to plain text and store that in the `source` variable.

Next we declare a `soup` variable and store the value we get after passing `source` to `BS`. ‘lxml’ is the markup we want our rendered code to have.

```
    soup = BeautifulSoup(source, 'lxml')
```

At this point, we have our code working. You can check it out by passing soup to a print function, like this `print(soup)` after the previous line and running `python webscraper.py` in the terminal.

___


Right now, we are pulling the entire web page rather than specific elements on it. To get specific elements, you can try these by yourself.

But before you do that, you should be aware of what exactly you want to get. You can either run the last command again or open the web page in the browser and inspect it by right clicking on the page. Some knowledge of HTML DOM and CSS is required here. You can head over to [W3Schools](https://www.w3schools.com) or [MDN](https://developer.mozilla.org/en-US) for a quick crash course on both.

```
    <variable> = soup.find('<HTML_element_name>')
    <variable> = soup.find('<HTML_element_name>').select_one('child_element')
    <variable> = soup.find('<HTML_element_name>').find_all('child_element')
```

*You can pass regular CSS notation in the brackets to be more specific about the elements you want.*

**Now, we are only actually just outputting HTML along with the text inside it. What if we just want the text?**

That’s easy.

We simply pass `.text` at the end of it. Just like we did with `source`. Here’s an example.

```
    head = soup.find(‘main’).select_one(‘article:nth-of-type(4)’).div.text
```

*Here, we tell Python to store the text of the div in the 4th article element which is in the main element, in the head variable.*

You can check the output by passing head to `print()` and running `python webscraper.py` in the terminal.

Try getting the names of one of the authors if you can.

___

You can get an author like this,

```
    author = soup.find(‘main’).select_one(‘p’).text
```
___

Notice how you also get the date along with the name. That’s because both of them share the same element. There is a way to get the author name separately by using Python string methods like `split` and `slice`. But we won’t cover that here.

____


Next up, we will use flask to re-render our received data the way we want on a local server.

In your file, type the following code,
```
    app = Flask(__name__)
    @app.route('/')
    def index():
       return render_template('index.html,**locals())
    app.run(debug=True)
```

Create a new templates folder in your main webscraper folder and call it `index.html`

The flask part is a little complicated to explain but to put it simply, we created a simple server that will take our `index.html` from the templates folder and serve it on a local server — ` localhost://5000`

Now, we can combine multiple variables we declared in all the previous code using soup and pass the text to our HTML and use CSS to style them the way we want!

You can use this code for the `index.html` file,

```
    <!DOCTYPE html>
    <html lang=”en”>
     <head>
      <meta charset=”UTF-8">
      <meta name=”viewport” content=”width=device-width, initial-scale=1.0">
      <meta http-equiv=”X-UA-Compatible” content=”ie=edge”>
      <title>Webscraper in Python using Flask</title>
     </head>
     <body>
      <!-- Variables from Flask here -->
     </body>
    </html>
```

Now, we can use all the code we learned so far to create custom variables and pull specific data from our site. If we are well versed with the structure of our target site, we can use shortcuts like these.
```
    head = soup.header.h1.text

    second_author = soup.main.select_one(‘article:nth-of-type(2)’).p.text

    first_article = soup.main.article.div
```

* Type these inside the `index()` function that we created, just above the return statement.
* Save the file
* Go to index.html

Now we’ll pass these variables into our HTML while it gets rendered so we can see the data on our webpage.
```
    <!DOCTYPE html>
    <html lang=”en”>
     <head>
      <meta charset=”UTF-8">
      <meta name=”viewport” content=”width=device-width, initial-scale=1.0">
      <meta http-equiv=”X-UA-Compatible” content=”ie=edge”>
      <title>Webscraper in Python using Flask</title>
     </head>
     <body>
      <h1>{{ head }}</div>
      <p>{{ second_author }}</p>
      <article>{{ first_article }}</article>
     </body>
    </html>
```

Now open the terminal and run `python webscraper.py`

###Aand we did it!

If you’re wondering how it’s so easy, well, it’s not. This was just a single page, and a simple one at that, with no classes or IDs added to the HTML. But this is a good start.

**Wonder how you can scrape multiple pages?**

The answer is multiple `for`, `while`, `try`, `except` and `if-else` loops!

___

Hello, this was my very first technical article. If you find any errors in the code or the way I approached the tutorial, feel free to correct me. I'm excited to be part of this community as I grow with it and intend to contribute meaningful content. Thank you for reading!