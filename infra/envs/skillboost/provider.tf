provider "aws" {
  region  = "ap-northeast-1"
  profile = "AdministratorAccess-077793792738"
}

resource "aws_s3_bucket" "site" {
  bucket = "skillboost-bucket"
}
