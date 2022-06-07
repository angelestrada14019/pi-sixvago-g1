FROM maven:3-jdk-8-alpine as builder

WORKDIR /app

COPY . /app
RUN mvn package

FROM openjdk:8-jre-alpine

COPY --from=builder /app/target/*.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java"]
CMD ["-jar", "/app.jar"]