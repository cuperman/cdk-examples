#!/usr/bin/env node
import 'source-map-support/register';
import { Stack, Construct, StackProps, App } from '@aws-cdk/cdk';
import { Bucket } from '@aws-cdk/aws-s3';
import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';

/*
 * Creates an S3 bucket and CDN with public read access and web configuration.
 */
class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-s3.html#bucket
    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html'
    });

    // https://awslabs.github.io/aws-cdk/refs/_aws-cdk_aws-cloudfront.html#cloudfrontwebdistribution
    new CloudFrontWebDistribution(this, 'WebsiteDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket
          },
          behaviors: [
            {
              isDefaultBehavior: true
            }
          ]
        }
      ]
    });
  }
}

const app = new App();
new StaticWebsiteStack(app, 'StaticWebsiteStack');
