pipeline{
    agent any 

    tools {
        nodejs 'nodejs-24.0.0'
    }


    stages{
        stage("Check node version"){
            steps{
                sh "node --version"
            }
        }
    }
}