#!groovy

def branch = env.BRANCH_NAME
def branchParts = branch.split('-')
def isMaster = (branch == 'master')
def isPR = (branchParts[0] == 'PR')
def shouldBuild = !isPR // Ignore the additional build trigger by PR, Fork PR won't be built
def isLastBuildSuccess = (currentBuild?.getPreviousBuild()?.result == 'SUCCESS')

properties([
  overrideIndexTriggers(shouldBuild),
  disableConcurrentBuilds(),
])

if(isMaster) {
  properties([
    pipelineTriggers([cron('H H/12 * * *')])
  ])
}

def common

def getBIM360Common() {
  def folder = 'common-functions'
  def versionTag = '3.4.0'
  def commonBranch = "tags/${versionTag}"

  sh "rm -rf ${folder} || true"
  dir(folder) {
    git url: 'https://git.autodesk.com/BIM360/bim360-shared-jenkins-groovy.git', credentialsId: 'BIM360-git-integration'
    sh """
      git checkout ${commonBranch}
    """
  }

  def commonPath = "${folder}/common.groovy"
  return load(commonPath)
}

def jenkinsLabel = "centos"
def workSpaceFolder = "api-test-${env.BUILD_NUMBER}"
def nodeDockerVersion = 'node:8.9.1'
def recentChanges
def commit
def author

node(jenkinsLabel) { 
  timestamps {
    common = getBIM360Common();
    common.emailList = 'bim.360.volantis.eng@autodesk.com';
    common.emailTemplatePath = 'CI/Jenkins/template.html';
    common.notifySlack = true;
    common.slackChannel = '#bim360-volantis-bot'
    
    try {
      dir(workSpaceFolder){
        stage ('Pull source code') {
            sh "rm -rf *"

            checkout scm
          
            recentChanges = common.getRecentChanges()
            commit = common.sh_out('git rev-parse --short HEAD')
            author = common.sh_out('git show -s --format=\'%an\'')
        }

        stage('Api test') {
          withCredentials([[$class: 'StringBinding', credentialsId: 'FILE_SECRET', variable: 'fileSecret']]) {
            withEnv(["FILE_SECRET=${fileSecret}"]) {
              sh """
              docker run -t -v \$(pwd):/app -w /app -e FILE_SECRET=${fileSecret} ${nodeDockerVersion} /bin/sh -c 'yarn && npm run test:config'
              docker image pull loadimpact/k6
              docker run -t --rm  -v \$(pwd)/src:/k6 loadimpact/k6 run /k6/APITest/index.js
              """
            }
          }
        }
        currentBuild.result = 'SUCCESS'
      }
    } catch (error) {
      currentBuild.result = 'FAILURE'
    } finally {
      stage('Send scan result') {
        if(isMaster) {
          def shortMessage = "Cost API Testing: ${currentBuild.result} \nAuthor: `${author}`\nBuild: `${env.BUILD_URL}`";
          def slackColor = 'danger';

          if(currentBuild.result == 'SUCCESS') {
            def result = 'SUCCESS'
            
            if(!isLastBuildSuccess) {
              result = 'RECOVERED'
            }
            shortMessage = "Cost API Testing: ${result}\nCommit: `${commit}`";

            slackColor = 'good';
          }

          common.notifySlack(shortMessage, slackColor);
        }
      }
    }
  }
}

