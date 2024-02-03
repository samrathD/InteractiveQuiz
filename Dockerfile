FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/interactive_quiz-0.0.1-SNAPSHOT.jar interactive_quiz.jar
EXPOSE ["java","-jar","demo.jar"]