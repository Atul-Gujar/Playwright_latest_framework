pipeline {

    agent any

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

    environment {
        CI = 'true'
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
                bat """
                    if exist .env.${params.ENV} (
                        echo Environment file exists: .env.${params.ENV}
                    ) else (
                        echo ERROR: Environment file .env.${params.ENV} does not exist
                        exit /b 1
                    )
                """
            }
        }

        stage('Verify Environment Variables') {
            steps {
                bat """
                    echo Checking .env.${params.ENV}...

                    findstr /B "BASE_URL=" .env.${params.ENV} >nul
                    if errorlevel 1 (
                        echo ERROR: BASE_URL is missing in .env.${params.ENV}
                        exit /b 1
                    )

                    findstr /B "API_URL=" .env.${params.ENV} >nul
                    if errorlevel 1 (
                        echo ERROR: API_URL is missing in .env.${params.ENV}
                        exit /b 1
                    )

                    echo BASE_URL and API_URL are present.
                """
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

                    if (params.TEST_SUITE == 'api') {

                        bat """
                            set "ENV=${params.ENV}"
                            echo Running API tests on ENV=%ENV%
                            npx playwright test tests/api
                        """

                    } else if (params.TEST_SUITE == 'ui') {

                        bat """
                            set "ENV=${params.ENV}"
                            echo Running UI tests on ENV=%ENV%
                            npx playwright test tests/ui
                        """

                    } else if (params.TEST_SUITE == 'regression') {

                        bat """
                            set "ENV=${params.ENV}"
                            echo Running regression tests on ENV=%ENV%
                            npx playwright test --grep @regression
                        """

                    } else if (params.TEST_SUITE == 'all') {

                        bat """
                            set "ENV=${params.ENV}"
                            echo Running all tests on ENV=%ENV%
                            npx playwright test
                        """
                    }
                }
            }    
        }

         stage('Verify Report') {
    steps {
        bat '''
            echo Checking Playwright report...

            if exist playwright-report\\index.html (
                echo =========================================
                echo Playwright report found!
                echo =========================================
                dir playwright-report
            ) else (
                echo =========================================
                echo ERROR: index.html NOT FOUND
                echo =========================================
                exit /b 1
            )
        '''
    }
}
    }

    post {

    always {

        echo 'Publishing Playwright reports...'

        // Archive the raw Playwright report
        archiveArtifacts(
            artifacts: 'playwright-report/**',
            allowEmptyArchive: true
        )

        // Archive test results
        archiveArtifacts(
            artifacts: 'test-results/**',
            allowEmptyArchive: true
        )

        // Publish HTML report directly in Jenkins
        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report',
            reportTitles: 'Playwright Test Report'
        ])
    }

    success {
        echo 'Playwright tests completed successfully.'
    }

    failure {
        echo 'Playwright tests failed.'
    }
}
}