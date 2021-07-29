const express = require('express');
const app = express();

const { quotes } = require('./data'); //array with quote and person property
const { getRandomElement } = require('./utils'); //returns random element from array

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));



//get a route for random route and send response
app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.status(200).send({ quote: quote });
  });


//get api routes and return and return all query from data if no query params
app.get('/api/quotes', (req, res, next) => {
    
    //query is an object containing a property for each query string parameter in the route

    //GET all quotes or all quotes from a specific author
    const author = req.query.person;

    if (!author){
        res.send({ quotes: quotes });
        //res.status(200).send({ quotes: quotes });
        return;
    }else{
        const filteredQuotes = quotes.filter(quote => quote.person === author);
        res.send({quotes: filteredQuotes});
    } 
});

//adding new quotes
app.post('/api/quotes', (req, res, next) => {
    const author = req.query.person;
    const quote = req.query.quote;

    //if any of the properties do not exist, return error
    if (author && quote){
        const newQuote = {
            person: author,
            quote: quote
        };
        quotes.push(newQuote);
        res.status(200).send({ quote: newQuote });

    } else {
        res.status(400).send("Bad request!!! Try again");
    }
});

app.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`)
});
