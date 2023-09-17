const quoteContainer = document.getElementById('quote-container')
const quoteLeft = document.getElementsByClassName('fa-quote-left')[0]
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Show Loading
const loading = () => {
	loader.hidden = false
	quoteContainer.hidden = true
}

// Hide Loading
const complete = () => {
	loader.hidden = true
	quoteContainer.hidden = false
}

// Show New Quote
const newQuote = () => {
	loading()
	// Pick a random quote from apiQuotes Array
	const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

	// Add a style definition for long quotes
	if (randomQuote.text.length > 100) {
		quoteLeft.style.fontSize = '3rem'
		quoteText.classList.add('long-quote')
		authorText.style.fontSize = '1.55rem'
	} else {
		quoteLeft.style.fontSize = '4rem'
		quoteText.classList.remove('long-quote')
		authorText.style.fontSize = '2rem'
	}

	// Set Quote, Hide Quote
	quoteText.textContent = randomQuote.text
	authorText.textContent = randomQuote.author
	complete()
}

// Get Quotes From API
const getQuotes = async () => {
	loading()
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

	try {
		const response = await fetch(apiUrl)
		apiQuotes = await response.json()
		newQuote()
	} catch (error) {}
}

// Tweet Quote
const tweetQuote = () => {
	const tweet = `"${quoteText.textContent}"`
	const author = authorText.textContent
	const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet} - ${author}`
	window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
