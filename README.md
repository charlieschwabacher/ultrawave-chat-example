# Ultrawave Chat Example

This is a simple peer to peer chat app using [ultrawave](//github.com/charlieschwabacher/ultrawave)
and [react](//github.com/facebook/react).

You can find the javascript code in [src/index.js](src/index.js), and [**try a live example here**](//charlieschwabacher.github.io/ultrawave-chat-example) (the example is hosted on the free tier of openshift and gets shut down after a period of inactivity, so if it doesn't work on the first try, give the server a minute to spin up and try again).  The entire app is 60 lines of commented es6 javascript.

To run locally, `npm install` and `npm start`, then visit [localhost:8080](http://localhost:8080/) in a few tabs and try messaging back and forth.

After editing the source, run `npm run build` to compile w/ babel and cssnext.
