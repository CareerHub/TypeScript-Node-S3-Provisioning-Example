import { S3, AWSError } from 'aws-sdk';
import { PutObjectOutput } from 'aws-sdk/clients/s3';
import { readFile } from 'fs';
import { promisify } from 'util';
const readFileAsync = promisify(readFile);

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

const handleError = (error: Error) => {
    console.error(error);
    process.exit();
};

const main = async() => {
    try {
        const data = await readFileAsync(config.filePath);
        client.putObject({
            Key: config.fileKey,
            Bucket: config.bucketName,
            Body: data
        }, (s3Error: AWSError, response: PutObjectOutput) => {
            if (s3Error) {
                throw s3Error;
            }
            console.log(response);
        });
    } catch (err) {
        handleError(err);
    }
};

main().catch(handleError);

