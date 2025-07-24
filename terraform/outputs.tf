output "ecr_repository_url" {
  value = aws_ecr_repository.scholar_dorm_repo.repository_url
}

output "rds_cluster_endpoint" {
  value = aws_rds_cluster.mongo_cluster.endpoint
}