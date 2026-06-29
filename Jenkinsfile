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

        stage('Deploy to Kubernetes with Helm') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@$EC2_HOST "
                            export KUBECONFIG=/home/ubuntu/.kube/config &&
                            cd ~/food-ordering-platform &&
                            git pull origin main &&
                            helm upgrade --install food-app ./helm/food-ordering-chart -n food-app &&
                            kubectl rollout status deployment/frontend -n food-app &&
                            kubectl rollout status deployment/api-gateway -n food-app &&
                            kubectl rollout status deployment/user-service -n food-app &&
                            kubectl rollout status deployment/restaurant-service -n food-app &&
                            kubectl rollout status deployment/order-service -n food-app &&
                            kubectl get pods -n food-app
                        "
                    '''
                }
            }
        }
    }
}