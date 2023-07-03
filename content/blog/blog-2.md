---
title: "Blog 2"
date: "2021-03-01"
---

# Ubiqtui Checker

### The problem

I need to purchase Ubiquii products but they are always sold out. I’ve been on their official “subscribe to back in stock e‑mails” for months but that I’ve never gotten those. I know there’s services online that will text you when products are stock or even the r/UbiquitiInStock subreddit. But those are either paid or manual. Obviously I’m not going to pay money or check a subreddit when I can spend hours reinventing the wheel.

### The solution

So let’s waste more money and time by building a bot that will check their site and text me if the products I want are in stock

If I was buying the product normally, I would visit the webpage, see if the button says “Add to Cart” and if it does, I know I can buy the item. So let’s make my bot behave the way same.

### The code

There’s two ways that come to mind when building a web scrapper, I could use a headless browser like Puppeteer or Selenium to visit the product page, but this is overkill since I don’t need to interact with the browser.

Since all I need is just to see if the page says sold out or not and i’m not navigating around, I thought simply having my bot get the page, and look through it for keywords would be enough to know if a product is in stock or not.

## Code

Our program has a few requirements

- [ ]  Go to our product page
- [ ]  Check if the product is in stock
- [ ]  Notify me if the product is in stock.
- [ ]  Run every 10 minutes

First the bot visits the page by making a GET request to the webpage. 

We’ll use axios to make the request.

To node the request will just return a large string of HTML with no easy way of looking through it. obviously we do what any good JavaScript dev does, add a library to do it for you!

Let’s add node-html-parser to give us browser like methods to query the DOM.


node-html-parser gives us access to the same methods as the browser, so we can query the page and look for anything that let’s us know it’s in stock.

The next problem is knowing what to look for, if we compare what an in-stock product vs a sold out product looks like, we know that there’s a “Add to Cart” button on something we can buy.

Let’s look through the DOM for something that says “Add to Cart”

The transpiler hashes all the class names and id’s, we can’t relay on these always being the same so we’ll have to use something more consistent. 

Luckily the button to purchase has a label on it which is perfect. 


Let’s query for any button with a label of “Add to Cart”, if an element is found, it will return an the DOM object, otherwise it’ll be null. We’ll also throw in the title so we can use it later


Taking a look at our code our bot now does the first two things, It can visit a product page and check if that product is in stock.

- [x]  Go to our product page
- [x]  Check if the product is in stock
- [ ]  Notify me if the product is in stock.
- [ ]  Run every 10 minutes

Now the bot needs to notify me if the product is in stock.  I’m going to go with texting since I want to know as soon as possible. You could switch this out for any type of notification like email or even a push notification service. Since i’ve worked with Twilio’s API in the past, this is the quickest solution for me.

Let’s create a .env file to store any sensitive keys, and add two libraries, dotenv to read the env file and Twilio to send messages.

Now we can create a function using the Twilio library to send us a text


So we can check number 3 off the list

- [x]  Go to our product page
- [x]  Check if the product is in stock
- [x]  Notify me if the product is in stock.
- [ ]  Run every 10 minutes

Now our project works! it can check a URL to see if a product is in stock, and text me when it is. But running this manually every 10 minutes isn’t any better then just going to the website, so the final step is having it run automatically every 10 minutes.

Luckily someone smarter as already done the hard part, we can just install another library node-cron. 


Let’s wrap our code into a function to clean it up a bit


and schedule it


That’s the final item!

- [x]  Go to our product page
- [x]  Check if the product is in stock
- [x]  Notify me if the product is in stock.
- [x]  Run every 10 minutes

We're done! the bot now checks all the boxes. I could stop here and this would work most of the time, but there’s still a a few things we can improve to make the bot a little btter.

## Checking multiple products

Great we can check one product at a time, I could just create multiple functions per product and schedule those, but we can make that a little cleaner.

Let’s create an array of url’s for our products we want to check

If we want to make multiple requests with axios, our flow is a little different. We have to make each request, wait for them all to finish, then check each product if it’s sold out.

Let’s create an empty list for our requests, and for each url add a request to that list.


Axios has a handy method that will take a list of requests, wait for them all to complete, and run some code per request.


Now we can check a whole list of products, and get notified per product when it comes in stock.


There we go! we can now check multiple products and get notified if one of them is in stock