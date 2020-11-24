# Admix Challenge

Implemented everything as per spec with comprehensive typing.

## Decisions and caveats
### TypeORM vs Mongoose
TypeORM catches me out sometimes because it forces me to think in terms of entities rather than documents and objects. Works very nice with Postgres, not so much with MongoDB. So I swapped it out for Mongoose and redefined the entities as schemas.
### Middy
Middy was great. I managed to offload most of the response translation and setup for each lambda onto a /middleware/index.ts file. This definitely needs refactoring though.
### The Query
For the prioritisation query, I used a MongoDB aggregation pipeline and mongoose. I optimised the pipeline by narrowing down the amount of absolutely necessary documents before starting to calculate any scores.
### Profiling
I am also caching the MongoDB connection and service using the middleware in order to save on subsequent lambda calls. On local SLS, the first query is usually about 600ms while every subsequent query is well below 15ms on average.

## Query aggregation task
For this portion, I had to decide what "match percentage" actually means. I could have interpreted it as though we should flatten the filters into an array and then calculate how many of those are present in each returned document. I thought there was a smarter way of doing it. It is fully normalisable to a percentage if necessary to show it on a front end.
The aggregation pipeline I put in place instead attempts to sort by relevance. What is relevant? Since 'stores', 'gender', and 'demographic' were considered required fields I have made the following assumptions:

 - We are searching by stores, we only want results that include our chosen store since this is a binary choice.
 - Gender is a percentage metric. It can therefore be used as a scaling coefficient on a solid metric that already exists (demographics). The gender distribution in each demographic is unknown. If the intended gender percentage is low in the target documents, they will be much less likely to come up.
 - Demographic is a definite metric. It can then be used to calculate a probably relevant score when multiplied with the gender percentage.
 - Since 'geos' and 'categories' are optional, I assumed that they are tools for narrowing a result if it comes back too large.
 
### Methodology and rationale
I aimed to generate a score that could then be used to sort documents in decreasing order i.e. the higher score a document has, the higher it appears in the response. I took a demographically centric approach in the sense that I only used the gender and age information to generate a score. I used the 'geos' and 'categories' parameters when present to narrow the search prior to executing the aggregation pipeline to make the calculation cheaper.
To illustrate the pipeline in a nutshell, it is basically doing this:

 - Multiply each document's desired demographics (from the provided array) by the percentage target gender. Since the gender is encoded as male population percentage, female percentage can be gotten by subtracting the field from 100.
 - Add the multiplied results for each document. (There will be as many multiplies as there are ages provided in the demographics array for each document.)
 - Add result as a score field in the document.
 - Decreasingly sort all documents by score.
...Blazingly fast (~15ms average)

## Room for improvement
### Testing
I ran out of time before I could implement some good test coverage. Lucikly the typing will prevent a lot of the mistakes before runtime but that's no excuse.
The spec.js files were having trouble with recognising functions of the `const func = () => {}` variety that return a Mongoose schema. I'm sure it could be easily fixed given enough time.

### Architecture
I factored out clunky operations from handlers to middleware. Unfortunately, the Challenge service isn't very DRY and there's lots of scope there to parametrise and generalise some database operations. Moreover, it would be good to split Categories, Users, and Apps into separate services altogether.

### Types
I tend to just write the interface wherever I need it and then extract it to a separate file. There are many candidates for refactoring here with lots of inline interfaces and types.

## Try it on POSTMAN
I included a Postman collection so you can easily try it out.
