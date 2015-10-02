#eHouse Studio Project Starter
A CMS agnostic front-end project starter.

###Dependencies:
**Node:** Run `$ node -v` to see if Node is installed. If Node is not installed, visit [nodejs.org](http://nodejs.org) and then click that big green "Install" button.

###Installation:
1. Clone Project Starter - `$ git clone https://github.com/ehousestudio/project-starter.git ProjectName`
2. `$ cd ProjectName`
3. Run `$ npm install` to install the [NPM](https://www.npmjs.com/) packages.
4. Run `$ bower install` to install all the [Bower](http://bower.io/) packages. If you get an error, it's probably because Bower wants to be installed globally. Run `$ npm install -g bower` to take care of that.
5. You can now run any of the Gulp tasks manually (i.e. `$ gulp sass` or `$ gulp scripts`).
6. In order to get BrowserSync working properly, add a proxy URL value at line 85 of `gulpfile.js`. Add a path to your HTML/template files at line 89 (this accepts an array so you can pass multiple paths). Once these are updated `$ gulp serve` will work.
