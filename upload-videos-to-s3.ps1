# PowerShell script to upload videos to S3
# Make sure AWS CLI is installed and configured

$bucketName = "portfolio2025-assets"
$region = "us-east-2"

Write-Host "Uploading videos to S3 bucket: $bucketName" -ForegroundColor Green

# Upload CODE videos
Write-Host "`nUploading CODE videos..." -ForegroundColor Yellow
$codePath = "public\pictures\portfolio-content_spring2026\03_CODE"
$s3CodePath = "s3://$bucketName/videos/03_CODE/"

Get-ChildItem -Path $codePath -Filter "*.mp4" | ForEach-Object {
    Write-Host "Uploading: $($_.Name)" -ForegroundColor Cyan
    aws s3 cp $_.FullName $s3CodePath$($_.Name) --content-type "video/mp4" --region $region
}

# Upload ART videos
Write-Host "`nUploading ART videos..." -ForegroundColor Yellow
$artPath = "public\pictures\portfolio-content_spring2026\04_ART\motionMedia"
$s3ArtPath = "s3://$bucketName/videos/04_ART/motionMedia/"

if (Test-Path $artPath) {
    Get-ChildItem -Path $artPath -Filter "*.mov" | ForEach-Object {
        Write-Host "Uploading: $($_.Name)" -ForegroundColor Cyan
        aws s3 cp $_.FullName $s3ArtPath$($_.Name) --content-type "video/quicktime" --region $region
    }
}

# Upload DESIGN videos
Write-Host "`nUploading DESIGN videos..." -ForegroundColor Yellow

# Reading Redesign video
$rrPath = "public\pictures\portfolio-content_spring2026\02_DESIGN\04_RR"
$s3RRPath = "s3://$bucketName/videos/02_DESIGN/04_RR/"

if (Test-Path $rrPath) {
    Get-ChildItem -Path $rrPath -Filter "*.mov" | ForEach-Object {
        Write-Host "Uploading: $($_.Name)" -ForegroundColor Cyan
        aws s3 cp $_.FullName $s3RRPath$($_.Name) --content-type "video/quicktime" --region $region
    }
}

# Dishwasher video
$dishwasherPath = "public\pictures\portfolio-content_spring2026\02_DESIGN\03_DISHWASHER"
$s3DishwasherPath = "s3://$bucketName/videos/02_DESIGN/03_DISHWASHER/"

if (Test-Path $dishwasherPath) {
    Get-ChildItem -Path $dishwasherPath -Filter "*.mov" | ForEach-Object {
        Write-Host "Uploading: $($_.Name)" -ForegroundColor Cyan
        aws s3 cp $_.FullName $s3DishwasherPath$($_.Name) --content-type "video/quicktime" --region $region
    }
}

Write-Host "`nUpload complete! Verifying files..." -ForegroundColor Green

# Verify uploads
Write-Host "`nVerifying CODE videos..." -ForegroundColor Yellow
aws s3 ls s3://$bucketName/videos/03_CODE/ --region $region

Write-Host "`nVerifying ART videos..." -ForegroundColor Yellow
aws s3 ls s3://$bucketName/videos/04_ART/motionMedia/ --region $region

Write-Host "`nVerifying DESIGN videos..." -ForegroundColor Yellow
aws s3 ls s3://$bucketName/videos/02_DESIGN/ --recursive --region $region

Write-Host "`nDone! Don't forget to:" -ForegroundColor Green
Write-Host "1. Set REACT_APP_USE_S3_VIDEOS=true in your .env file" -ForegroundColor Yellow
Write-Host "2. Make sure your S3 bucket has public read access for videos/*" -ForegroundColor Yellow
Write-Host "3. Rebuild and redeploy your app" -ForegroundColor Yellow

