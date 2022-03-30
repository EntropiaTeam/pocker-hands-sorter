# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Poker hand ranking

Compare two hands, each should have 5 combination of face and suit in format '4H' where first symbol is face, second - suit.

Available faces: 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A

Suits are not validated currently, and could be each symbol.

You should provide to input cards for two hands, separated by space, like: 'AH 9S 4D TD 8S 4H JS 3C TC 8D', where 'AH 9S 4D TD 8S' - first hand carts and '4H JS 3C TC 8D' second.

Hands are compared using rank and if ranks are equal - by higher cart value or higher cart of combination.

Ranks:

Rank | Combination | Description
1 | High card | Highest value card
2 | Pair Two | cards of same value
3 | Two pairs | Two different pairs
4 | Three of a kind | Three cards of the same value
5 | Straight | All five cards in consecutive value order
6 | Flush | All five cards having the same suit
7 | Full house | Three of a kind and a Pair
8 | Four of a kind | Four cards of the same value
9 | Straight flush | All five cards in consecutive value order, with the same suit
10 | Royal Flush | Ten, Jack, Queen, King and Ace in the same suit

Wins of player 1 and player 2 are counted during session.
