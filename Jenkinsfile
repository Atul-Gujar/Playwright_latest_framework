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
                        echo ERROR: BASE_URL is missing
                        exit /b 1
                    )

                    findstr /B "API_URL=" .env.${params.ENV} >nul
                    if errorlevel 1 (
                        echo ERROR: API_URL is missing
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

        stage('Verify Playwright Report') {
            steps {
                bat '''
                    echo =========================================
                    echo Checking Playwright report
                    echo =========================================

                    if exist playwright-report\\index.html (
                        echo SUCCESS: Playwright HTML report found.
                        echo.
                        dir playwright-report
                    ) else (
                        echo ERROR: playwright-report\\index.html NOT FOUND
                        exit /b 1
                    )
                '''
            }
        }
    }

    post {

        always {

            echo '========================================='
            echo 'Publishing Playwright reports...'
            echo '========================================='

            /*
             * Publish Playwright HTML Report
             *
             * Requires:
             * HTML Publisher Plugin
             */
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                reportTitles: 'Playwright Test Report'
            ])

            /*
             * Archive Playwright HTML report
             */
            archiveArtifacts(
                artifacts: 'playwright-report/**/*',
                allowEmptyArchive: true,
                fingerprint: true
            )

            /*
             * Archive screenshots, videos, traces,
             * error-context files, etc.
             */
            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true,
                fingerprint: true
            )

            /*
             * Send email notification
             *
             * Requires:
             * Email Extension Plugin
             */
            emailext(
    subject: "Playwright ${currentBuild.currentResult} - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
    body: """
Hello Atul,

Playwright automation execution has completed.

Environment : ${params.ENV}
Test Suite  : ${params.TEST_SUITE}
Build Number: ${env.BUILD_NUMBER}
Build Status: ${currentBuild.currentResult}

Jenkins Build URL:
${env.BUILD_URL}

Playwright Report:
${env.BUILD_URL}Playwright_20HTML_20Report/

Regards,
Jenkins Automation
""",
    to: 'atulgujar.mae@gmail.com'
)
        }

        success {

            echo '========================================='
            echo 'Playwright tests completed successfully.'
            echo 'Email notification sent.'
            echo '========================================='
        }

        failure {

            echo '========================================='
            echo 'Playwright tests failed.'
            echo 'Report has been archived/published.'
            echo 'Failure notification email sent.'
            echo '========================================='
        }

        unstable {

            echo '========================================='
            echo 'Playwright build is UNSTABLE.'
            echo 'Email notification sent.'
            echo '========================================='
        }
    }
}