pipeline {
    agent any
    /*
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    } 
    */
    stages {
        stage('Prepare') {
            steps {
                echo 'Prepare and check environment ...'
                sh 'nodejs -v'
                sh 'npm -v'
                sh 'java -version'
                sh 'javac -version'
                sh 'ssh boprod.tdkb ls /var/www'
                sh 'cp src/environments/environment.prod.ts src/environments/environment.ts'
                sh 'npm install'
                sh 'npm uninstall @angular/cli'
                // sh 'npm cache clean'
                sh 'npm install @angular/cli@latest'
            }            
        }
        stage('Build') { 
            steps {
                echo 'Start build...'
                sh 'npm run ng -- build'
            }
        }
        stage('Test') { 
            steps {
                echo 'Start test...'
            }
        }
        stage('Deploy Prelive') { 
            steps {
                echo 'Start deploy prelive ...'
            }
        }
        stage('Deploy Development') { 
            steps {
                echo 'Start deploy production ...'
                // Prepare distribution ...
                sh 'tar -zcvf ./dist/betoffice-angular2.tar.gz -C ./dist/angularapp .'

                // Clean up remote upload directory ...
                sh 'ssh boprod.tdkb rm -f /home/boprod/upload/betoffice-angular2.tar.gz'

                // Copy distribution ...
                sh 'scp ./dist/betoffice-angular2.tar.gz boprod.tdkb:~/upload'

                // Gunzip and copy ...
                sh 'ssh boprod.tdkb rm -f /home/boprod/www/tdkb-dev/*'
                sh 'ssh boprod.tdkb cp /home/boprod/upload/betoffice-angular2.tar.gz /home/boprod/www/tdkb-dev'
                sh 'ssh boprod.tdkb tar xvf /home/boprod/www/tdkb-dev/betoffice-angular2.tar.gz'
            }
        }        
    }
}
