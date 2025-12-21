# PowerShell script to upload ALL assets (images and videos) to S3
# Make sure AWS CLI is installed and configured

$bucketName = "portfolio2025-assets"
$region = "us-east-2"
$basePath = "public\pictures\portfolio-content_spring2026"
$s3BasePath = "s3://$bucketName/assets/portfolio-content_spring2026/"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Uploading ALL assets to S3 bucket" -ForegroundColor Green
Write-Host "Bucket: $bucketName" -ForegroundColor Green
Write-Host "Region: $region" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Function to upload files with appropriate content type
function Upload-File {
    param(
        [string]$LocalPath,
        [string]$S3Path,
        [string]$ContentType
    )
    
    if (Test-Path $LocalPath) {
        Write-Host "Uploading: $LocalPath" -ForegroundColor Cyan
        aws s3 cp $LocalPath $S3Path --content-type $ContentType --region $region
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  Success" -ForegroundColor Green
        } else {
            Write-Host "  Failed" -ForegroundColor Red
        }
    } else {
        Write-Host "  Path not found: $LocalPath" -ForegroundColor Yellow
    }
}

# Function to upload all files in a directory recursively
function Upload-Directory {
    param(
        [string]$LocalDir,
        [string]$S3Dir,
        [string[]]$Extensions,
        [string]$ContentType
    )
    
    if (Test-Path $LocalDir) {
        Write-Host ""
        Write-Host "Processing: $LocalDir" -ForegroundColor Yellow
        
        foreach ($ext in $Extensions) {
            Get-ChildItem -Path $LocalDir -Filter "*.$ext" -Recurse | ForEach-Object {
                $relativePath = $_.FullName.Replace((Resolve-Path $basePath).Path + "\", "").Replace("\", "/")
                $s3FullPath = "$s3BasePath$relativePath"
                
                Upload-File -LocalPath $_.FullName -S3Path $s3FullPath -ContentType $ContentType
            }
        }
    } else {
        Write-Host "  Directory not found: $LocalDir" -ForegroundColor Yellow
    }
}

# Upload Images
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "UPLOADING IMAGES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Upload JPG images
Write-Host ""
Write-Host "Uploading JPG images..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("jpg", "jpeg") -ContentType "image/jpeg"

# Upload PNG images
Write-Host ""
Write-Host "Uploading PNG images..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("png") -ContentType "image/png"

# Upload GIF images
Write-Host ""
Write-Host "Uploading GIF images..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("gif") -ContentType "image/gif"

# Upload SVG images
Write-Host ""
Write-Host "Uploading SVG images..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("svg") -ContentType "image/svg+xml"

# Upload ICO files
Write-Host ""
Write-Host "Uploading ICO files..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("ico") -ContentType "image/x-icon"

# Upload PDF files
Write-Host ""
Write-Host "Uploading PDF files..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("pdf") -ContentType "application/pdf"

# Upload Videos
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "UPLOADING VIDEOS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Upload MP4 videos
Write-Host ""
Write-Host "Uploading MP4 videos..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("mp4") -ContentType "video/mp4"

# Upload MOV videos
Write-Host ""
Write-Host "Uploading MOV videos..." -ForegroundColor Yellow
Upload-Directory -LocalDir $basePath -S3Dir $s3BasePath -Extensions @("mov") -ContentType "video/quicktime"

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "UPLOAD COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Verify uploads
Write-Host ""
Write-Host "Verifying uploads..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Listing uploaded files in S3:" -ForegroundColor Yellow
aws s3 ls $s3BasePath --recursive --region $region | Select-Object -First 20

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Make sure your S3 bucket has public read access for assets/*" -ForegroundColor Yellow
Write-Host "2. Update your code to use S3 URLs for assets (if needed)" -ForegroundColor Yellow
Write-Host "3. Rebuild and redeploy your app" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your assets are now at:" -ForegroundColor Green
$assetUrl = "https://" + $bucketName + ".s3.amazonaws.com/assets/portfolio-content_spring2026/"
Write-Host $assetUrl -ForegroundColor Cyan
