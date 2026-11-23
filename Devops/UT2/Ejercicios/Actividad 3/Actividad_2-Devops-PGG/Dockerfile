FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package && rm -f target/original-*.jar

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]