FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Optimize for Render Free Tier (512MB RAM)
ENV MAVEN_OPTS="-Xmx300m -Xms300m"
RUN mvn clean package -DskipTests -e

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/jansevak-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
