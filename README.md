# Passport mauritius server
This is the side implementation of the passport mauritius official web app. The main goal of this app is to setup an server architecture that enables quick iteration and fast development cycle. for this  we have decided to adopt latest modern technologies and architecture

## Technology
1. [Nodejs](https://nodejs.org/en/)
2. [AWS Lambda](https://aws.amazon.com/lambda/)
3. [Serverless](https://serverless.com/)
4. [Webpack](https://webpack.js.org/)
5. [Graphql](https://graphql.org/)

Currently the server exposes three endpoint that allows users query graphql for data. Although only one of this endpoint is required for actual
production work, the other two gives you nice intuitive visual editors that allows you test out the qraphql functions. 
1. ``<gateway-url>/production/graphql`` this is the actual production url for graphql,
2. ``http://localhost:4000/playground`` this uses graphql-playground
3. ``http://localhost:4000/graphqli`` this exposes graphqli console for manual testing

**NB** The graphql query ui would eventually be scraped as both perform almost the same thing

Serverless is currently used for running/deploying the app to aws lambda. 

## Local Development
To run and **test** the app locally you need to:
1. clone repository 
2. setup aws **serverless** locally using your aws credentials to do this you have to add this varaibles to you environment
    ```
    export AWS_ACCESS_KEY_ID=<your-key-here>
    export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
    ```
You can visit the serverless doc here on [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to configure multiple aws profile if you already have one setup.
note, it's not advisable to use your root credentials make sure to create Iam user for this service. The serverless docs covers this
extensive
3. run ``npm install``
4. run ``npm start``

To **deploy** to aws

1. ``run npm deploy``