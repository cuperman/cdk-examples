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

    const restApiHandler = new Function(this, 'RestApiHandler', {
      code: Code.asset('./handlers/rest-api'),
      handler: 'index.handler',
      runtime: Runtime.NodeJS810
    });

    new LambdaRestApi(this, 'RestApi', {
      handler: restApiHandler
    });
  }
}

const app = new App();
new RestApiStack(app, 'RestApiStack');
