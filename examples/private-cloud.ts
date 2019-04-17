#!/usr/bin/env node
import 'source-map-support/register';
import { Stack, Construct, StackProps, App } from '@aws-cdk/cdk';
import { VpcNetwork } from '@aws-cdk/aws-ec2';

/*
 * Creates a VPC with private and public subnets in each availability zone.
 */
class PrivateCloudStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-ec2.html#vpcnetwork
    new VpcNetwork(this, 'PrivateCloud');
  }
}

const app = new App();
new PrivateCloudStack(app, 'PrivateCloudStack');
