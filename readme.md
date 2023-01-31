# Purpose of this repo

-  This repository shows the boiler plate code required to setup aws-s3 configuration.
-  This repository shows how to upload/ download/ generate a shareable url of photos in aws s3.

## Pre-requisites:

Before we proceed, make sure you have created a user who's credentials will be used for making sure that our node js server can communicate with aws.

If not, you can do the following:

1. First login/sign up to aws s3 console and create a bucket.
2. Go to IAM section, create a new policy that gives read and write permissions and attach that policy to a new user (this is the user who's credentials will be used by the node server to communicate with aws).
3. To generate the access keys of the newly created user, go to "users > security credentials > access keys" and click "Create access keys"
4. These credentials i.e."aws access key" and "aws secret access key" will be used for configuring connection with aws.
