#!/usr/bin/env node
import 'source-map-support/register';
import { Stack, Construct, StackProps, App } from '@aws-cdk/cdk';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';

/*
 * Creates an API Gateway with Lambda as the backend integration, routing all requests to the specified Lambda function.
 */
class RestApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-lambda.html#function
    const restApiHandler = new Function(this, 'RestApiHandler', {
      code: Code.asset('./handlers/rest-api'),
      handler: 'index.handler',
      runtime: Runtime.NodeJS810
    });

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-apigateway.html#lambdarestapi
    new LambdaRestApi(this, 'RestApi', {
      handler: restApiHandler
    });
  }
}

const app = new App();
new RestApiStack(app, 'RestApiStack');
