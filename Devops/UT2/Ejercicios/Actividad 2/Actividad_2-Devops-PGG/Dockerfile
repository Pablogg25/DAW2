# ETAPA 1: Compilación y ejecución de tests (Builder)
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /build

# Copiamos el pom.xml y el código fuente
COPY pom.xml .
COPY src ./src

# Compilamos, ejecutamos los tests JUnit y empaquetamos el .jar
# Si algún test falla, Maven detendrá la construcción automáticamente
RUN mvn clean package

# ETAPA 2: Entorno ligero de ejecución (Runtime)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiamos únicamente el archivo .jar generado en la Etapa 1 con el nuevo nombre
COPY --from=builder /build/target/Actividad_2-Devops-PGG-1.0-SNAPSHOT.jar app.jar

# Ejecutamos la aplicación Java
CMD ["java", "-jar", "app.jar"]