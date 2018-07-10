import { S3, AWSError } from 'aws-sdk';
import { PutObjectOutput } from 'aws-sdk/clients/s3';
import { readFile } from 'fs';

const config = {
    accessKeyId: '[YOUR ACCESS ID]',
    secretKey: '[YOUR SECRET KEY]',
    region: '[YOUR AWS REGION]',
    filePath: 'D:/StudentsForToday.csv',
    fileKey: 'Students.csv',
    bucketName: 'example-careerhub-provisioning'
};

const client = new S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretKey,
    region: config.region
});

readFile(config.filePath, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    client.putObject({
        Key: config.fileKey,
        Bucket: config.bucketName,
        Body: data
    }, (s3Error: AWSError, response: PutObjectOutput) => {
        if (s3Error) {
            console.error(s3Error);
        }
        console.log(response);
    });
});

