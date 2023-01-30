# Purpose of this repo

-  This repository shows the boiler plate code required to setup aws-s3 configuration.
-  This repository shows how to upload/ download/ generate a shareable url of photos in aws s3.

## How to:

1. First login/sign up to aws s3 console and create a bucket.
2. Go to IAM section, create a new policy that gives read and write permissions and attach that policy to a new user (this is the user who's credentials will be used by the node server to communicate with aws).
3. To generate the credentials of the newly created user, go to "users > security credentials > access keys" and click "Create access keys"

## Note

-  In this repo, i'm using v2 of aws and multer-s3, as they are compatible with each other.
