resource "aws_ecr_repository" "scholar_dorm_repo" {
  name = "${var.project_name}-repo"
  image_tag_mutability = "MUTABLE"
}

resource "aws_rds_cluster" "mongo_cluster" {
  cluster_identifier  = "${var.project_name}-mongo"
  engine              = "docdb" # DocumentDB as a MongoDB-compatible service
  master_username     = "admin"
  master_password     = "your_secure_password"
  skip_final_snapshot = true
}

resource "aws_ecs_cluster" "scholar_dorm_cluster" {
  name = "${var.project_name}-cluster"
}

resource "aws_vpc" "scholar_dorm_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "${var.project_name}-vpc"
  }
}