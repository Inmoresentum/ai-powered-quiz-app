<h1 align="center">AI Powered Quiz Application</h1>

Contains my CSE310 project that I did a while ago.

## Running the application

The project is a standard Maven project. To run it from the command line,
type `mvnw` (Windows), or `./mvnw` (Mac & Linux), then open
http://localhost:8080 in your browser.

You can also import the project to your IDE of choice as you would with any
Maven project.

Todo: Add instructions how to setup MariaDB, MinIO, ClamAV, OpenAI API Key ect.

## Deploying to Production

To create a production build, call `mvnw clean package -Pproduction` (Windows),
or `./mvnw clean package -Pproduction` (Mac & Linux).
This will build a JAR file with all the dependencies and front-end resources,
ready to be deployed. The file can be found in the `target` folder after the build completes.

Once the JAR file is built, you can run it using
`java -jar target/myapp-1.0-SNAPSHOT.jar` (NOTE, replace
`myapp-1.0-SNAPSHOT.jar` with the name of your jar).

<p align="center">Copyright &copy; 2023-present 
   <a href="https://github.com/Inmoresentum" target="_blank">Inmoresentum</a>
</p>