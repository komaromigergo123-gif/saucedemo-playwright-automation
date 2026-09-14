pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.56.1-noble'
            args '-u root:root --ipc=host'
        }
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['test', 'test:smoke', 'test:regression-cross-browser'],
            description: 'Select test script to execute'
        )
        string(
            name: 'BASE_URL',
            defaultValue: 'https://www.saucedemo.com',
            description: 'Target base URL for the test run'
        )
    }

    environment {
        CI = 'true'
        BASE_URL = "${params.BASE_URL}"
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Code Quality Checks') {
            parallel {
                stage('Type Check') {
                    steps {
                        sh 'npm run check-types'
                    }
                }
                stage('Linting') {
                    steps {
                        sh 'npm run lint'
                    }
                }
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                sh "npm run ${params.TEST_SUITE}"
            }
        }
    }

    post {
        always {
            // Publish JUnit XML test results
            junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'

            // Publish Playwright HTML report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            // Archive test artifacts for debugging traces / screenshots / videos
            archiveArtifacts allowEmptyArchive: true, artifacts: 'playwright-report/**, test-results/**'
        }
        success {
            echo "Pipeline succeeded! All tests in '${params.TEST_SUITE}' passed."
        }
        failure {
            echo "Pipeline failed. Review the Playwright HTML report or JUnit test results for details."
        }
    }
}
