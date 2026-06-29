pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'thenu8175'
        EC2_HOST = '18.138.11.108'
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

                sh 'docker build -t $DOCKERHUB_USERNAME/food-frontend:latest ./frontend'
                sh 'docker build -t $DOCKERHUB_USERNAME/food-api-gateway:latest ./api-gateway'
                sh 'docker build -t $DOCKERHUB_USERNAME/food-user-service:latest ./user-service'
                sh 'docker build -t $DOCKERHUB_USERNAME/food-restaurant-service:latest ./restaurant-service'
                sh 'docker build -t $DOCKERHUB_USERNAME/food-order-service:latest ./order-service'
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'

                    sh 'docker push $DOCKERHUB_USERNAME/food-frontend:latest'
                    sh 'docker push $DOCKERHUB_USERNAME/food-api-gateway:latest'
                    sh 'docker push $DOCKERHUB_USERNAME/food-user-service:latest'
                    sh 'docker push $DOCKERHUB_USERNAME/food-restaurant-service:latest'
                    sh 'docker push $DOCKERHUB_USERNAME/food-order-service:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@$EC2_HOST "
                            cd ~/food-ordering-platform &&
                            git pull origin main &&
                            kubectl apply -f k8s/ &&
                            kubectl rollout restart deployment/frontend -n food-app &&
                            kubectl rollout restart deployment/api-gateway -n food-app &&
                            kubectl rollout restart deployment/user-service -n food-app &&
                            kubectl rollout restart deployment/restaurant-service -n food-app &&
                            kubectl rollout restart deployment/order-service -n food-app &&
                            kubectl get pods -n food-app
                        "
                    '''
                }
            }
        }
    }
}