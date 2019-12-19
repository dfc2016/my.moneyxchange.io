# moneyxchange.io

Here you'll find two folders:
 - **moneyxchange-api** is a rest API written with java 10 using spring boot 2, which exposes the rates resource, just like in the example provided in the moneyxchange.io challenge.
 - **moneyxchange-webapp** is an angular application to convert from USD currency to EUR, it consumes the *moneyxchange-api* rates resource.

## moneyxchange-api

You need maven installed and java 10.

Once in its root folder, run unit tests (if it's the first time, it will download all the dependencies) with:

    > mvn test

And run the application with:

    > mvn package
    > cd target
    > java -jar moneyxchange-api-1.0.0-SNAPSHOT.jar

It will start the API on port 8000.

## moneyxchange-webapp

You need node 8.9 or higher installed on you machine.

Once in its root folder, install dependencies with:

    > npm install

Run unit tests with:

    > ng test

Start the app with:

    > ng serve -o

It will start the webapp on port 4200.

