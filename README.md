# Graphql serverless
The main goal of this app is to set up a server architecture that enables quick iteration and fast development cycle. For this, we have decided to adopt latest modern technologies and architecture

## Technology
1. [Nodejs](https://nodejs.org/en/)
2. [AWS Lambda](https://aws.amazon.com/lambda/)
3. [Serverless](https://serverless.com/)
4. [Webpack](https://webpack.js.org/)
5. [Graphql](https://graphql.org/)

Currently, the server exposes three endpoint that allows users query graphql. Although only one of this endpoint is required for actual
production work, the other two gives you nice, intuitive visual editors that allow you test out the qraphql functions. 
1. ``<gateway-url>/production/graphql`` this is the actual production URL for graphql,
2. ``http://localhost:4000/playground`` this uses graphql-playground
3. ``http://localhost:4000/graphqli`` this exposes graphqli console for manual testing

**NB** The graphql query ui would eventually be scrapped as both perform almost the same function

Serverless is currently used for running/deploying the app to aws lambda. you will also need docker installed on your system to test this locally.

## Local Development
To run and **test** the app locally you need to:

1. clone repository 
2. setup aws **serverless** locally using your aws credentials to do this you have to add this variable to your environment ```
    export AWS_ACCESS_KEY_ID=<your-key-here>
    export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
    ```
You can visit the serverless doc [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to configure multiple aws profiles if you already have one setup.
note, it's not advisable to use your root credentials make sure to create I am user for this service. The serverless docs cover this
extensive
3. run ``npm install``
4. run ``npm start``

To **deploy** to aws

1. ``run npm deploy``
