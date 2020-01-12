---
title: Consuming an API in Svelte
date: "2019-12-20"
tags: ["programming","web development"]
---
I'd been figuring out Svelte since a week now and saying that I've fallen in love with it would be an understatement. Everything is so much faster to do and easier to understand that you'll probably see me becoming an unofficial evangelist for it. To be honest, React was difficult for me to grasp and it took me atleast a month of trying it out on and off before I was comfortable with it. It was only after the introduction of hooks that I was able to use it better. With Svelte though, here I am writing an article about it after fiddling with it for just over a week!

Without further ado, here we go!

#Installation
Assuming you have Node installed on your system, enter the following in your command line, 
```
npx degit sveltejs/template numberfacts
```
This uses the template from the official Svelte repository on Github and provides us with a ready to use Hello World project. Once that is done, `cd` into your directory and run `npm install`. It should install all the packages that Svelte needs to run your project. If you followed it right, `npm run dev` should serve your project up on localhost:5000.

![Svelte Hello World](https://thepracticaldev.s3.amazonaws.com/i/jqw1hzw6tm6kms5v7e31.png)

#What we're making
We'll be using the [Numbers API](http://numberapi.com) as our endpoint to generate random facts about any number our user enters.

#Overview
This is what our directory structure looks like - 
```
node_modules
public
src
--app.svelte
--main.js
package.json
package-lock.json
README.md
rollup.config.js
```
I ignored the contents of the folders and have only focused on the ones we will be working with. In the `main.js` file, remove the `props: 'World'` part and replace the contents of the `App.svelte` file with the following code,

```
<script>
	let query = "";
	let result;

	async function getResult() {

		let response = await fetch(`http://numbersapi.com/${query}`);
		let text = await response.text();
		let data = text;
		return data;
	}

	function submitHandler(e) {
		result = getResult();
	}
</script>

<div class="container mt-5">
	<div class="row">
		<div class="col-md"></div>
		<div class="col-md-8 text-center">
			<h1 class="display-4">Random Number Facts</h1>
			<form class="form-inline" on:submit|preventDefault={submitHandler}>
				<input class="w-75 form-control" type="number" bind:value={query}>
				<button class="w-25 btn btn-dark">Submit</button>
			</form>

			{#if result===undefined}

			<p></p>

			{:else}

			{#await result}

			<p>Loading...</p>

			{:then value}

			{value}

			{:catch error}

			{error.message}
				
			{/await}

			{/if}
		</div>
		<div class="col-md"></div>
	</div>
</div>
```
##What is happening here?
In Svelte, an application is composed from one or more components. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file. The 'hello world' example we currently have is a simple component.

In the code above, we are only using HTML and Javascript and letting Bootstrap take care of the CSS for us.

We initialize a `query` string which we bind to the value of input using `bind:value={query}`. The curly brackets indicate that we are using JS variables inside HTML. Next, we declare a `result` variable that will store the result of our request when we send it.

The `onSubmitHandler()` runs when the user enters a number in the input. We assign the return value of `getResult()` to `result` here. `getResult()` performs an async fetch request and returns the response.

On to the HTML part, Svelte provides a lot of functionality out of the box which is very helpful. The `on:submit` directive is the Svelte version of the event listener in Javascript. We assign it the `onSubmitHandler()` function when the user presses 'Submit'.

The `{#await}`,`{:then}` and `{:catch}` blocks are used to resolve promises on the rendered component. The `{#if}` `{:else}` block as you may have guessed is a conditional block.

##Creating a Card component

Next, we will create a new component that will render the content we get from the fetch request. Create a new file in the same directory and call it `Card.svelte`. Add the following code in `Card.svelte`,

```
<script>
export let data;
</script>
    
<div class="card mt-5">
    <div class="card-body">
        <h5 class="card-title">{data}</h5>
    </div>
</div>
```
This one is pretty small. Here we simply write how we want our card to look like and where we want the rendered data to be. We use `export let data` to let our main `App.svelte` component use this variable to pass props down to our card. The syntax is a little weird in places, but you will get used to it. Just remember that Svelte is not Javascript. It's a compiler for Javascript which builds to vanilla Javascript in production.

Now, we have to make some changes in our `App.svelte` component to render our card. First, add this line in the script tag on top,
```
import Card from './Card.svelte';
```
Now we can add the card component as an HTML tag and pass down the result of our request to it as a prop, like so,

```
{#if result===undefined}

 <p></p>

{:else}

<p>Loading...</p>

{#await result}

{:then value}

 <Card data={value} />

{:catch error}

 <Card data={error.message}/>
				
{/await}

{/if}
```
Aand, that's pretty much it! You should be able to enter a number and have a result rendered on your screen. There are other minor things you can do, such as clearing the input field once a number is entered and adding a spinner instead of the loading p tag that we have right now. Svelte provides some [animations and transitions](https://svelte.dev/docs#svelte_transition) out of the box too!

TL;DR Take me to the code:
[Blazephoenix/numberfacts](https://github.com/Blazephoenix/numberfacts)
