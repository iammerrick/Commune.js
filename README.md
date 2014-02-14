# Commune.js

It's what [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage) would look like if it was implemented with JavaScript [Promises](http://promises-aplus.github.io/promises-spec/). A useful tool when you need cross-domain iFrames to communicate and play nice (or WebWorkers).

# Why?

Currently [Channel Messaging](http://www.whatwg.org/specs/web-apps/current-work/multipage/web-messaging.html#channel-messaging) requires a polyfill. If you only need to communicate between yourself and a child iFrame in a controlled environment it doesn't make sense to incur all of that overhead. If you need something more robust take a look at the excellent [Oasis.js](https://github.com/tildeio/oasis.js) library.
