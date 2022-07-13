FROM maven:3-jdk-8-alpine as builder

WORKDIR /usr/src/app

COPY . /usr/src/app
ARG USERNAME=${USERNAME}
ARG PASSWORD=${PASSWORD}
ARG SECRET_KEY=${SECRET_KEY}
ARG EMAIL_USERNAME=${EMAIL_USERNAME}
ARG EMAIL_PASSWORD=${EMAIL_PASSWORD}
RUN mvn package

FROM openjdk:8-jre-alpine

COPY --from=builder /usr/src/app/target/*.jar /app.jar

CMD gunicorn --bind 0.0.0.0:$PORT wsgi

ENTRYPOINT ["java"]
CMD ["-jar", "/app.jar"]
