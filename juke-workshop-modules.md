# Learning Objectives

By the end of this workshop you will have gained the following skills:

- You'll know how to refactor class components to functional components
- You'll know how class component lifecycle methods to React Hooks
- You'll know a few use cases for core React Hooks including `useState`, `useEffect`, and `useRef`
- You'll know how to replace Redux's `connect` higher-order component logic with React-Redux Hooks' `useSelector` and `useDispatch`
- You'll know how to access route props through React Router's custom hooks and make API calls to individual page views with `useParams`
- Bonus content -- you'll learn how React's Context API and `useContext` can be combined with `useReducer` to manage complex global state by <strong>replacing Redux altogether!</strong>

# Introduction

When you first encountered Juke, it was a single-page application that handled navigation through conditional rendering: single page views were rendered whenever the global app state indicated that a single page view's data was available.

Now that you've got experience with Redux's state management system and React Router's declarative routing, let's take another look at Juke!

## What's new?

By introducing front-end routing into Juke, we've gained the ability to allow users to bookmark and navigate directly to a single album view -- pretty cool! We've also gained a more robust, flexible, and extensible state management system, which has allowed us to add a new feature: our global Player bar now persists albums across site navigation, giving users the ability to listen to an album's songs while they browse other albums. We've also upped the bar (pun intended) by adding a micro album view and real-time track-time updates.

## What's next?

In all the excitement of souping up Juke, we forgot that it's 2021 and React Hooks are all the rage! Your goal: convert all class components to functional components and replace all class lifecycle logic with React Hooks!

# Module 1: Refactoring Class Components to Functional Components, and Class Component Lifecycle Methods to React Hooks

## What's the app tree look like?

Before we dive in to coding, let's get a high-level overview of our app's structure. Map out the app in your preferred whiteboarding software (or, on your preferred IRL whiteboard!), asking yourselves the following questions:

1. How does site navigation work? What routes do we have available to us?
2. What data does our site require, and in which routes does that data get fetched?
3. What is the makeup of our Redux Provider, and which components interact directly with the store?

<details>
<summary>Hint</summary>
<br>
Compare your site overview to this diagram: `insertDiagramHere`
</details>

## Where to begin?

Our best bet will be to refactor the components that fetch data first, so that we're guaranteed that our downstream components are able to execute their Redux logic when we get around to refactoring them as well. The `AllAlbums` view is a great place to start! We've got a single lifecycle method to contend with -- `componentDidMount` -- as well as our Redux logic using `connect`, `mapState(ToProps)`, and `mapDispatch(ToProps)` (we've included `(ToProps)` to remind ourselves <em>where</em> these callback functions place the data and methods we supply to `connect`!)

The first hook we'll want to look into is `useEffect`. Browse the `useEffect` docs [here](https://reactjs.org/docs/hooks-effect.html) before moving on.

## Using useEffect

`useEffect` combines our class component lifecycle methods `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` into one streamlined function made up of three principal parts. Take a look at the following `useEffect` logic and see if you can identify each of the class component "phases":

```javascript
import axios from 'axios'; // we will have access to a frontend fetching library like axios

useEffect(() => {
	let isMounted = true;

	const fetchData = async () => {
		try {
			const { data } = await axios.get(myUri);
			// data is passed along the foodchain, somehow ... more on this soon!
		} catch (err) {
			console.error(err);
		}
	};

	if (isMounted) fetchData();

	return () => {
		isMounted = false;
	};
}, [...dependencies]);
```

<details>
<summary>Hint</summary>
<br>
`useEffect` consists of three main pieces:

1. `componentDidMount` logic is carried out by the `fetchData` function defined within the callback we pass to `useEffect`
2. `componentDidUpdate` logic is handled by our <strong>dependency array</strong>
3. `componentWillUnmount` logic is handled by our anonymous <strong>cleanup function</strong>

Notice that we "mount" our component inside `useEffect` by setting a flag and returning the flipped boolean of this flag in our cleanup function. While it's probably unnecessary here since our network call is one-and-done (it will either fire and resolve, or fire and fail and continue to retry, during which period we can supply a loading component and/or message), it is a good habit to provide this mounted + cleanup logic to your React components that have subscribed to an update source/service, since <em>memory leaks</em> will occur whenever unmounted components receive updates. Learn more [here](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)

</details>

## Converting Redux's connect logic to hooks

Great! We can now fetch in data to our functional component via `useEffect`. Our next challenge will be to replace our `connect` logic with React-Redux's custom hooks `useSelector` and `useDispatch`. Read the docs [here](https://react-redux.js.org/api/hooks) before you start refactoring!

<details>
<summary>Hint</summary>
<br>
React-Redux supplies a custom hook to replace our Redux boilerplate functions. Let's see how they work.

`useSelector` takes a callback function with one argument -- our global state (ie our Redux store). To grab any piece of state, follow this pattern:

```javascript
const pieceOfState = useSelector(state => state.pieceOfState);
```

`useDispatch` simply returns the store's `dispatch` method to us, allowing us to wrap our action creators and thunks in the body of our functional component, rather than providing a dispatch-wrapped function <strong>on our component's props</strong>.

```javascript
const dispatch = useDispatch();
```

The complete flow combined with our prior `useEffect` call:

```javascript
// we'll have access to our hooks via imports outside the component
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

***

const dispatch = useDispatch();

useEffect(() => {
	dispatch(fetchAlbums());
}, []);

// notice our dependency array is empty!
// we are telling React to handle our useEffect call
// like componentDidMount, and only fire ONCE after rendering

const albums = useSelector(state => state.albums);
```

</details>

## Refactoring our single-album view

Now that we've successfully refactored our `AllAlbums` view, let's dig in to the `SingleAlbum` view and refactor its logic! Things will progress in much the same way -- however, there is a wrinkle! How will we access our `this.props.match.params.id` to fetch the `currentAlbum` we'd like to place on our global state? Read up on React Router's custom hooks [here](https://reactrouter.com/web/api/Hooks/useparams) and see if you can identify which hook we'll want to employ in our refactored `SingleAlbum` functional component.

<details>
<summary>Hint</summary>
<br>
React Router gives us direct access to the `params` object on our `match` route prop via `useParams`. Using `useParams` is a cakewalk!

```javascript
import { useParams } from 'react-router-dom'; // we'll have imported the hook outside our functional component ...

const { id } = useParams();
```

</details>

Now that you've correctly identified `useParams`, go ahead and write the complete fetch logic, replacing our `connect` logic with React-Redux hooks and making our network call inside `useEffect`

<details>
<summary>Hint</summary>
<br>
We'll follow exactly the same logic we used in `AllAlbums` and simply add our extracted id to the network call. We've omitted the imports, but you'll remember that each hook we're employing here should be imported from its corresponding library.

```javascript
const { id } = useParams();

const dispatch = useDispatch();

useEffect(() => {
	dispatch(fetchCurrentAlbum(id)); // our id is supplied to our thunk here!
}, []);

const currentAlbum = useSelector(state => state.currentAlbum);
```

</details>

## Imperative DOM manipulation with useRef

Congratulations, you've learned to manage internal and external data flow with React Hooks! Let's dig in to our Audio component next. If you'll remember, we've attached helper methods to our Audio component to simplify starting and stopping tracks, as well as providing a callback to the `audio` tag's `onTimeUpdate` event listener, which will allow us to extract playback details and provide them to our global Player component. To get access to these methods, we need an imperative handle that <em>directly interfaces</em> with our mounted `audio` element. In our class component, this was `React.createRef()`. Functional components can instead use React's `useRef` hook -- you can learn more about how `useRef` works [here](https://reactjs.org/docs/hooks-reference.html#useref).

## Refactoring the Audio component

How will we make the ref we've attached to `audio` available globally? Our class component passes the ref into our global state -- can you figure out how to accomplish the same feat without class lifecycle methods like `componentDidMount`?

<details>
<summary>Hint</summary>
<br>
To refactor your `React.createRef()` call, try this:

Whenever `useRef` is used to track a DOM element, it's almost always supplied a `null` value initially. You'll assign the returned value from `useRef` as the `ref` prop on your `audio` element in the functional component's return statement, and we're off to the races!

</details>

## Putting it all together: refactoring the Player component

We're now ready to tackle the most complicated component to refactor: our Player bar. Using your newfound React Hooks skills, migrate the `connect` logic over to React-Redux Hooks.

# Module 2: Bonus content

## React Context API, useReducer, and useContext

Under the hood, Redux uses a native React API called `Context` that supplies a state object and its attendant methods to whichever components and component subtrees are wrapped by the `Context`'s `Provider` component. Before we jump in to refactoring our Redux logic, browse the `Context` docs [here](https://reactjs.org/docs/context.html).

## What is a Context?

React Context API consists of three main parts:

1. The `Context` itself, created by invoking `React.createContext()`
2. The `Provider` component that's, well, <em>provided</em> by the `Context` object. We'll supply the `Provider` `children` props, allowing it to render any component tree we supply it.
3. The `value` prop our `Provider` expects -- this is equivalent to Redux's `store`, which you'll remember is supplied to the Redux `Provider` in much the same way.

To access values placed on the `Provider`, we call `useContext` in any downstream component and destructure whichever items we'd like to grab from our "store"-like value on the `Provider`.

```javascript
import { useContext } from 'react';
// Contexts are capitalized by convention and are never the default export
// why never default exported? because we'll be default exporting our Provider from the same file!
import { MyContext } from './contexts/myContext';

const MyFuncComponent = () => {
	const { thing, method } = useContext(MyContext);
};
```

## How does a Context Provider work?

The `Provider` component we draw out of our `Context` is structured as follows. Here, we'll use another in-built React hook that you'll want to read up on [here](https://reactjs.org/docs/hooks-state.html) before employing yourself!

To begin, let's create a new directory in our `client` directory named `context` and add two files: `Provider.js` and `reducer.js`.

Next, let's <strong>consolidate our Redux logic</strong> in the reducer file so that we've got one reducing function. You can move all action types and action creators (don't forget to export your action creators!) into this file, and to give you a head start, we've supplied the initState your reducer will be working with.

```javascript
// ... why are we exporting our initState here? Quite mysterious! We'll find out soon ...
export const initState = {
	albums: [],
	currentAlbum: {},
	currentSong: {},
	audio: {
		audioRef: null,
		trackTime: '',
		isPaused: true,
	},
};
```

<details>
<summary>Hint</summary>
<br>
Here's how your file likely looks now!

```javascript
// define our action types
const GET_ALBUMS = 'GET_ALBUMS';
const SET_AUDIO_REF = 'SET_AUDIO_REF';
const UPDATE_TRACK_TIME = 'UPDATE_TRACK_TIME';
const SET_PAUSED = 'SET_PAUSED';
const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

// define our action creators
export const getAlbums = albums => ({
	type: GET_ALBUMS,
	payload: albums,
});
export const setAudioRef = audioRef => ({
	type: SET_AUDIO_REF,
	payload: audioRef,
});
export const updateTrackTime = trackTime => ({
	type: UPDATE_TRACK_TIME,
	payload: trackTime,
});
export const setPaused = isPaused => ({
	type: SET_PAUSED,
	payload: isPaused,
});
export const setCurrentAlbum = album => ({
	type: SET_CURRENT_ALBUM,
	payload: album,
});
export const setCurrentSong = song => ({
	type: SET_CURRENT_SONG,
	payload: song,
});

// reducer goes here!

// build our initial state
export const initState = {
	albums: [],
	currentAlbum: {},
	currentSong: {},
	audio: {
		audioRef: null,
		trackTime: '',
		isPaused: true,
	},
};
```

</details>

Next, let's build our reducer function.

<details>
<summary>Hint</summary>
<br>
Your reducer likely looks like this!

```javascript
// ... why aren't we initializing a default state here? More on that soon!
export const reducer = (state, { type, payload }) => {
	switch (type) {
		case GET_ALBUMS:
			return { ...state, albums: payload };
		case SET_AUDIO_REF:
			return { ...state, audio: { ...state.audio, audioRef: payload } };
		case UPDATE_TRACK_TIME:
			return { ...state, audio: { ...state.audio, trackTime: payload } };
		case SET_PAUSED:
			return { ...state, audio: { ...state.audio, isPaused: payload } };
		case SET_CURRENT_ALBUM:
			return { ...state, currentAlbum: payload };
		case SET_CURRENT_SONG:
			return { ...state, currentSong: payload };
		default:
			return state;
	}
};
```

</details>

## The Provider component itself

Let's build a `Provider` to make the state we're going to pull out of our reducer available to our app.

First, in the `Provider.js` file, copy and past the following boilerplate.

```javascript
import React, { useReducer } from 'react';
import axios from 'axios';

// import our reducer logic
import {
	getAlbums,
	setAudioRef,
	updateTrackTime,
	setPaused,
	setCurrentAlbum,
	setCurrentSong,
	reducer,
	initState,
} from './reducer';

// create our context
export const Context = React.createContext();

// initialize our Provider component, passing it destructured children props
const Provider = ({ children }) => {
	return (
		<Context.Provider /* we need something here! more on that soon ... */>
			{children}
		</Context.Provider>
	);
};
```

At the top of our imports, look: a wild Hook appeared! Do a bit of reading on `useReducer` [here](https://reactjs.org/docs/hooks-reference.html#usereducer) and see if you can figure out how to implement it in the Provider. Hint: `useReducer` mirrors Redux's `state` and `dispatch` logic...

<details>
<summary>Hint</summary>
<br>
`useReducer` operates very similarly to `useState`. The main difference? useReducer takes in our reducer function as its initializer <strong>as well as the initState, as a second parameter</strong>. Note that this diverges from Redux's convention of initializing reducer state as a default parameter of the <em>state argument supplied to the reducer</em>.

```javascript
import React, { useReducer } from 'react';
import axios from 'axios';

// import our reducer logic
import {
	getAlbums,
	setAudioRef,
	updateTrackTime,
	setPaused,
	setCurrentAlbum,
	setCurrentSong,
	reducer,
	initState,
} from './reducer';

// create our context
export const Context = React.createContext();

const Provider = ({ children }) => {
	// useReducer takes a reducer and an initial state and returns state + a dispatch method to send action creators through the reducer fn
	const [state, dispatch] = useReducer(reducer, initState);

	// wrap action creators in dispatch method before making available on Context
	// important! rename wrapped fns to avoid namespace collisions
	const loadAlbums = albums => dispatch(getAlbums(albums));
	const loadCurrentAlbum = album => dispatch(setCurrentAlbum(album));
	const fetchSetAudioRef = audioRef => dispatch(setAudioRef(audioRef));
	const fetchUpdateTrackTime = time => dispatch(updateTrackTime(time));
	const fetchSetPaused = status => dispatch(setPaused(status));
	const fetchSetCurrentSong = song => dispatch(setCurrentSong(song));

	// create thunks for async network calls
	// note: we've * already * wrapped our action creators in dispatch, so we won't need to curry these fns
	const fetchAlbums = async () => {
		try {
			const { data: albums } = await axios.get('/api/albums');
			loadAlbums(albums);
		} catch (err) {
			console.error(err);
		}
	};
	const fetchCurrentAlbum = async albumId => {
		try {
			const { data: album } = await axios.get(`/api/albums/${albumId}`);
			loadCurrentAlbum(album);
		} catch (err) {
			console.error(err);
		}
	};

	// set provider value
	const providerValue = {
		state,
		fetchAlbums,
		fetchCurrentAlbum,
		fetchSetAudioRef,
		fetchUpdateTrackTime,
		fetchSetPaused,
		fetchSetCurrentSong,
	};

	// use the in-built Provider component on Context to wrap its subtree and make the providerValue object available to all downstream components -- here we use the "children" prop to render the wrapped subtree
	return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default Provider;
```

</details>

## Putting it all together: refactoring our functional components' Redux logic to Context

We're nearing the finish line! Our last challenge: replace all Redux calls in our functional components with `useContext` invocations, passing in our `Context` export in every file that needs access. You'll be removing <em>all of your Redux hooks and logic</em> here -- the end goal? Nothing changes! We navigate, press play/pause, and generally find our app functioning exactly in the same manner it was before refactoring out Redux.

<details>
<summary>Hint</summary>
<br>
Here's an example from our `AllAlbums` component. Using this template, see if you can refactor the rest of the downstream components!

```javascript
import React, { useEffect, useContext } from 'react';
import { Context } from '../context/Provider';
import { Link } from 'react-router-dom';
import { AlbumCard } from './';

const AllAlbums = () => {
	const { fetchAlbums, state } = useContext(Context);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) fetchAlbums();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div id='albums' className='row wrap'>
			{state.albums.map(album => (
				<Link key={album.id} to={`/albums/${album.id}`}>
					<AlbumCard album={album} />
				</Link>
			))}
		</div>
	);
};

export default AllAlbums;
```

</details>

# Retrospective

You've learned how to use React Hooks and the custom hooks supplied by React-Redux and React Router to refactor a class-component architecture to functional components, and you've learned how to handle side-effects, state management, and imperative DOM references along the way! You're well on your way to becoming a Hooks master. Some additional content that will further broaden and strengthen your hooks knowledge can be found listed below.

- [Rules of hooks](https://reactjs.org/docs/hooks-rules.html)
- [Build your own custom hooks](https://reactjs.org/docs/hooks-custom.html)
- [A custom hook employing IntersectionObserver for single-page scrollable navigation](https://medium.com/geekculture/scrollable-single-page-site-navigation-with-react-custom-hooks-4e7af716f6b1)
- [Refactoring an imperative game to React's Context API + useReducer](https://medium.com/geekculture/rebuilding-an-imperatively-coded-game-from-scratch-in-react-9a082ad002c0)
