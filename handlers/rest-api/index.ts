import { APIGatewayProxyResult } from 'aws-lambda';

exports.handler = async function(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify('Hello, World')
  };
};
