FROM gradle:6.8.3-jdk11 AS TEMP_BUILD
ENV APP_DIR=/usr/app/src
WORKDIR $APP_DIR
COPY --chown=gradle:gradle . $APP_DIR
RUN gradle build --no-daemon

FROM adoptopenjdk/openjdk11:latest
ENV ARTIFACT_NAME=app-0.0.1-SNAPSHOT.jar
ENV APP_DIR=/usr/app/src

WORKDIR $APP_DIR/
COPY --from=TEMP_BUILD $APP_DIR/build/libs/$ARTIFACT_NAME .

EXPOSE 8080
ENTRYPOINT exec java -jar ${ARTIFACT_NAME}