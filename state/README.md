# `state`

This was intended to become the new state management framework for Ink.

- RXJS stores/observables written in typescript that you can subscribe to in order to always get the current state of whatever you were subscribing to.

Features the code here has that is missing from the main stores code (many of which are actively used by the reading UI):

- state fetches that are aware of online/offline state: will automatically refresh when the browser goes back online
- A visibility observer that lets you easily monitor the page's visibility (hidden, in a background tab, etc.). Could be used to automatically refresh when the window regains focus.
- A set of observables for observing DOM state: get notified when elements that match a selector are added to the DOM or become visible.
- Selection state observable.

And a few more.

The `models` directory contains annotation models that unify update, create, and delete routines for Annotation and Bookmark into a single model so that those functions aren't spread around other components.

The `controllers` directory currently only contains the SelectionToolbar controller which contains event handlers and logic for the SelectionToolbar component.
