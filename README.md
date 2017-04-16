# BeerHustle #
Let's face it.  If you're a bar owner, it's time to up your selling game!  Smart phones are in the hands of more people these days, and mobile ordering is becoming more of the norm.  Keep up!  That's where this app comes into play.

Want to advertise your drinks and specials directly to your customers?  You got it.  Need an easy way of keeping track of sales?  Done.  Do you want to make an easy point system where your consumers are incentivised to buy more?  Game on!

This app is simple on the surface, give a list of all the beers and drinks you have available for them, and make it easy to tap, order, and receive.  Deep down, it is a customer acquisition app to keep your patreons drinking.

### Who is this for? ###
This is for the bar owners and their customers alike, to make the experience of ordering drinks simple and fun.  The customers with a smartphone, be it Android or iPhone, regardless on if they have a payment system setup, and requiring as much expertise as using any app ever.  On the bar owner side, expertise is needed a bit more, but the tools required will be streemlined for a fluid, enjoyable experience.

### Now for the nitty gritty ###
The application is built with a strong backend of Google's Firebase, from Authentication to database hosting.  We also will be using a few Cordova plugins for mobile payment, location, and QR code reading.

## Build Instructions: ##
### Make sure you have the following dependencies: ###
1. Visual Studio Code - Installed
2. Node.js - Installed
3. Run in terminal or Command Prompt as Administrator: npm install -g ionic
4. keys.js - Upon request, required for firebase

### Instructions to build ###
1. Clone or download this repo
2. Place keys.js file in root of cloned directory
3.  Build Ionic app 
 * a. Open beerApp folder in Visual Studio Code
 * b. Run this command in terminal: npm install
 * c. Run this command in terminal: ionic serve
4.  Build Admin terminal 
 * a. Open beerAppAdminConsole folder in Visual Studio Code
 * b. Run this command in terminal: npm install
 * c. Run this command in terminal: ng serve
 * d. Navigate here in your web browser: localhost:4200


## Here's a preview of what I have so far: ##
![alt tag](https://github.com/aaronteague/BeerHustle/blob/master/Additional%20Files/BeerAppProgress.png)
