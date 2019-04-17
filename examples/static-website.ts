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

    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html'
    });

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
