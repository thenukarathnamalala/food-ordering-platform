pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'thenu8175'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'

                bat 'docker build -t %DOCKERHUB_USERNAME%/food-frontend:latest ./frontend'
                bat 'docker build -t %DOCKERHUB_USERNAME%/food-api-gateway:latest ./api-gateway'
                bat 'docker build -t %DOCKERHUB_USERNAME%/food-user-service:latest ./user-service'
                bat 'docker build -t %DOCKERHUB_USERNAME%/food-restaurant-service:latest ./restaurant-service'
                bat 'docker build -t %DOCKERHUB_USERNAME%/food-order-service:latest ./order-service'
            }
        }

        stage('Push Docker Images') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'

                bat 'docker push %DOCKERHUB_USERNAME%/food-frontend:latest'
                bat 'docker push %DOCKERHUB_USERNAME%/food-api-gateway:latest'
                bat 'docker push %DOCKERHUB_USERNAME%/food-user-service:latest'
                bat 'docker push %DOCKERHUB_USERNAME%/food-restaurant-service:latest'
                bat 'docker push %DOCKERHUB_USERNAME%/food-order-service:latest'
            }
        }
    }
}