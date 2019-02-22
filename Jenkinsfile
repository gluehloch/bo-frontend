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
                sh 'tar -zcvf ./dist/betoffice-angular2.tar.gz -C ./dist/angularapp .'
            }
        }
        stage('Test') { 
            steps {
                echo 'Start test...'
            }
        }
        stage('Deploy to remote host') {
            steps {
                // Clean up remote upload directory and copy to remote host
                sh 'ssh boprod.tdkb rm -f /home/boprod/upload/betoffice-angular2.tar.gz'
                sh 'scp ./dist/betoffice-angular2.tar.gz boprod.tdkb:~/upload'
            }
        }
        stage('Deploy Development') { 
            steps {
                echo 'Start deploy development ...'
                sh 'ssh boprod.tdkb rm -f /home/boprod/www/tdkb-dev/*'
                sh 'ssh boprod.tdkb tar xvf /home/boprod/upload/betoffice-angular2.tar.gz -C /home/boprod/www/tdkb-dev'
            }
        }
        stage('Deploy Test') { 
            steps {
                echo 'Start deploy test ...'
                sh 'ssh boprod.tdkb rm -f /home/boprod/www/tdkb-test/*'
                sh 'ssh boprod.tdkb tar xvf /home/boprod/upload/betoffice-angular2.tar.gz -C /home/boprod/www/tdkb-test'
            }
        }
        stage('Deploy Prelive') { 
            steps {
                echo 'Start deploy prelive ...'
                sh 'ssh boprod.tdkb rm -f /home/boprod/www/tdkb-prelive/*'
                sh 'ssh boprod.tdkb tar xvf /home/boprod/upload/betoffice-angular2.tar.gz -C /home/boprod/www/tdkb-prelive'
            }
        }
        stage('Deploy Production') { 
            steps {
                echo 'Start deploy production ...'
                sh 'ssh boprod.tdkb rm -f /home/boprod/www/tippdiekistebier/*'
                sh 'ssh boprod.tdkb tar xvf /home/boprod/upload/betoffice-angular2.tar.gz -C /home/boprod/www/tippdiekistebier'
            }
        }                
    }
}
