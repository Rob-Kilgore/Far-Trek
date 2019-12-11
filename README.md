# Far Trek
## ELeNa

### The Team

- Connor Harmelink
- Danny Maryanski
- Rob Kilgore
- Tenzin Nanglo
- Tony Tran
- Jake Calkins

### Installation
This project uses Node v12.13.0. [You can get it here](https://nodejs.org/en/download/). Once you have node installed, enter the main project folder (which contains package.json) and run `npm install`. This should install all of the modules that the project needs. From there you can run start.bat or run `npm start` to start the application. The app should open in your browser at the address [http://localhost:3000](http://localhost:3000). 

### Using The Application
You should see a map that you can navigate with the mouse. There will also be some inputs at the top left where you can enter coordinates and a difficulty weight (left is shortest path, right is most gentle path). If you then click "Calculate Path" a path will be displayed. At the moment this path is just a test path and does not reflect the inputs that were entered. This is due to the map data not being in a form that could be searched with our algorithm.
