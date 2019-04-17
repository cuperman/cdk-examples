#!/usr/bin/env node
import 'source-map-support/register';
import { Stack, Construct, StackProps, App } from '@aws-cdk/cdk';
import { VpcNetwork, SubnetType, SecurityGroup } from '@aws-cdk/aws-ec2';

/*
 * Creates a VPC with private and public subnets in each availability zone, allowing all outbound traffic and no inbound
 */
class PrivateCloudStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-ec2.html#vpcnetwork
    const privateCloud = new VpcNetwork(this, 'PrivateCloud', {
      cidr: '10.0.0.0/16',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public subnet',
          subnetType: SubnetType.Public
        },
        {
          cidrMask: 24,
          name: 'Private subnet',
          subnetType: SubnetType.Private
        }
      ]
    });

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-ec2.html#securitygroup
    new SecurityGroup(this, 'PrivateCloudSecurityGroup', {
      vpc: privateCloud
    });
  }
}

const app = new App();
new PrivateCloudStack(app, 'PrivateCloudStack');
