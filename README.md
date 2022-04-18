# Cactus Courseware

Michael Fatemi, Alvan Caleb Arulandu, Cyril Sharma, Tarushii Goel

## Inspiration
New technologies appear every day, but they are often inaccessible to people who don’t aren’t connected to someone knowledgeable or are not in a university covering the course. Self-taught options are unstandardized and difficult to improve. We decided that open-source education was the future of online courses, and created an online platform where people could publish courses hosted on Github repositories.

## What it does
* The Cactus CourseWare Team developed a full-stack web application that allows creators, teachers, and developers to upload open-source educational materials to the public. 
* These courses are then exposed using an accessible search for users to find courses they are interested in.
* Courses are rendered in the application with functionality for traditional content, embeddable animations, multiple choice / multiple select questions, and community-sourced explanations
* Curated resources are updated daily and can be retrieved from popular knowledge databases.

## How we built it
* Frontend: Typescript, React, ReMark, TailwindCSS, MaterialUI
* Backend: Node.js, Express, Mongo.db, Mongoose ORM
* Data Population: BeautifulSoup to scrape data from Wikipedia and generate sample tutorials.
* Hosting: Heroku (backend), Vercel (frontend)
* DNS: Google Domains + Google Analytics
* External APIs: GitHub API

## Challenges we ran into
* Over the course of development, we were frequently rate limited by the GitHub API before learning to use PAT authorization to enable higher rate limits.
* Integrating the backend API with the frontend interface was quite time consuming.
* Persisting state across the React component tree as well as maintaining a Module Tree datastructure to store courses.
* Rendering markdown documents with custom syntax / directives dynamically in React.
* Last evening at 5:00 PM, Heroku stopped GitHub deploy support, breaking out automated deploy workflow for our backend REST API. Multiple hours were spent circumventing this with a custom build and deploy.

## Accomplishments that we're proud of
* It works! After iterating upon the material UI specification, we were able to design and implement custom web design using react and Figma.
* We’re pleased with the look of the product.

## What we learned
* How to connect a MongoDB and Express/Node backend to a React frontend.
* The principles of artistic design
* Tailwind will destroy your styles
* How to interface with the github API
* How to render markdown dynamically in react.

## What's next for Cactus CourseWare
* Future development would include making it easier to convert repos to the format our website expects.
* Adding more functionality, like progress tracking, community forums, etc.
* Encouraging course developers to upload produce content to post on our website
