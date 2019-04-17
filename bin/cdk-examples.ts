#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { CdkExamplesStack } from '../lib/cdk-examples-stack';

const app = new cdk.App();
new CdkExamplesStack(app, 'CdkExamplesStack');
