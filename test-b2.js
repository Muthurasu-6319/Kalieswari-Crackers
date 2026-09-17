import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const b2 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
  }
});

async function testUpload() {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: 'test.txt',
      Body: 'Hello World',
      ContentType: 'text/plain',
    });
    
    await b2.send(command);
    console.log("Upload successful!");
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

testUpload();
