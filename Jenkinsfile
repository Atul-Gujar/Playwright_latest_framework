pipeline {

    agent any

    environment {
        CI = 'true'
    }

    parameters {

        choice(
            name: 'ENV',
            choices: ['qa', 'uat', 'prod'],
            description: 'Select test environment'
        )

        choice(
            name: 'TEST_SUITE',
            choices: ['api', 'ui', 'regression', 'all'],
            description: 'Select test suite'
        )
    }

    stages {

        stage('Show Configuration') {
            steps {
                echo "================================="
                echo "Environment : ${params.ENV}"
                echo "Test Suite  : ${params.TEST_SUITE}"
                echo "================================="
            }
        }

        stage('Verify Environment File') {
            steps {
                bat '''
                    if exist .env.%ENV% (
                        echo Environment file exists: .env.%ENV%
                    ) else (
                        echo ERROR: Environment file .env.%ENV% does not exist
                        exit /b 1
                    )
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {

            steps {

                script {

                    switch (params.TEST_SUITE) {

                        case 'api':

                            bat "set ENV=${params.ENV} && npx playwright test tests/api"

                            break

                        case 'ui':

                            bat "set ENV=${params.ENV} && npx playwright test tests/ui"

                            break

                        case 'regression':

                            bat "set ENV=${params.ENV} && npx playwright test --grep @regression"

                            break

                        case 'all':

                            bat "set ENV=${params.ENV} && npx playwright test"

                            break
                    }
                }
            }
        }
    }

    post {

        always {

            echo 'Publishing Playwright artifacts...'

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )

            archiveArtifacts(
                artifacts: 'test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright tests completed successfully.'
        }

        failure {
            echo 'Playwright tests failed.'
        }
    }
}