<h1 align="center">AI Powered Quiz Application</h1>

<div>
</div>

<h1 align="center">
        ** Note WIP or Work in Progress **
</h1>

## Running the application

The project is a standard Maven project. To run it from the command line,
type `mvnw` (Windows), or `./mvnw` (Mac & Linux), then open
http://localhost:8080 in your browser.

You can also import the project to your IDE of choice as you would with any
Maven project.

Before running the project, make sure that you have all the necessary dependencies.
As of now, the project depends on [MariaDB](https://mariadb.org/)(You can use other relational databases),
[maildev](https://github.com/maildev/maildev), [MinIO](https://min.io/) and
[clamav-rest](https://github.com/Cisco-Talos/clamav).
For necessary details,
please have a look at the [application.properties](src/main/resources/application.properties) file.

**Todo: Add a more detailed process**

## Deploying to Production

To create a production build, call `mvnw clean package -Pproduction` (Windows),
or `./mvnw clean package -Pproduction` (Mac & Linux).
This will build a JAR file with all the dependencies and front-end resources,
ready to be deployed. The file can be found in the `target` folder after the build completes.

Once the JAR file is built, you can run it using
`java -jar target/myapp-1.0-SNAPSHOT.jar` (NOTE, replace
`myapp-1.0-SNAPSHOT.jar` with the name of your jar).

&#160;

<p align="center">Copyright &copy; 2023-present 
     <a href="https://github.com/Inmoresentum" target="_blank">Inmoresentum</a>
</p>
<p align="center">
    <a href="LICENSE.md">
      <img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=unlicense&colorA=AAA500&colorB=1F69B4"
         alt="whatever" style="border-radius: 5px"/>
   </a>
</p>