# Uploading Videos to S3 - Step by Step Guide

## Overview
Instead of serving videos from your web hosting (which may have file size limits or not serve them correctly), you'll upload them to your existing S3 bucket (`portfolio2025-assets`) and reference them directly.

## Benefits
- ✅ Videos are served from S3/CloudFront (faster, more reliable)
- ✅ No file size limits from your web host
- ✅ Videos don't need to be included in every deployment
- ✅ Better performance with CloudFront CDN
- ✅ Separate from your app deployment

## Step 1: Upload Videos to S3

### Option A: Using AWS CLI (Recommended)

1. **Install AWS CLI** (if not already installed):
   ```bash
   # Download from: https://aws.amazon.com/cli/
   ```

2. **Configure AWS credentials**:
   ```bash
   aws configure
   # Enter your Access Key ID and Secret Access Key
   # Region: us-east-2 (or your bucket's region)
   ```

3. **Upload videos with correct content types**:
   ```bash
   # Navigate to your project directory
   cd C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
   
   # Upload all MP4 files
   aws s3 cp public/pictures/portfolio-content_spring2026/03_CODE/ s3://portfolio2025-assets/videos/03_CODE/ --recursive --content-type "video/mp4" --exclude "*" --include "*.mp4"
   
   # Upload MOV files (if any)
   aws s3 cp public/pictures/portfolio-content_spring2026/04_ART/motionMedia/ s3://portfolio2025-assets/videos/04_ART/motionMedia/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
   
   # Upload MOV files from design collections
   aws s3 cp public/pictures/portfolio-content_spring2026/02_DESIGN/ s3://portfolio2025-assets/videos/02_DESIGN/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
   ```

### Option B: Using AWS Console (Web Interface)

1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Open your bucket: `portfolio2025-assets`
3. Create folders: `videos/03_CODE/`, `videos/04_ART/motionMedia/`, `videos/02_DESIGN/04_RR/`, `videos/02_DESIGN/03_DISHWASHER/`
4. Upload each video file
5. **IMPORTANT**: After uploading each file, click on it and set:
   - **Content-Type**: `video/mp4` for `.mp4` files
   - **Content-Type**: `video/quicktime` for `.mov` files
   - Make sure **Public read access** is enabled (or configure bucket policy)

### Option C: Using AWS SDK (Programmatic)

I can create a Node.js script to upload all videos automatically. Let me know if you want this option.

## Step 2: Verify Upload

Check that files are accessible:
```bash
# Test a video URL
curl -I https://portfolio2025-assets.s3.amazonaws.com/videos/03_CODE/minesweeper.mp4
```

Should return `Content-Type: video/mp4` and `200 OK`.

## Step 3: Update Code

The code will be updated to:
1. Check if videos should use S3 (via environment variable)
2. Generate S3 URLs for videos
3. Keep local paths for development if needed

## Step 4: Set Up CloudFront (Optional but Recommended)

If you want faster delivery:
1. Create a CloudFront distribution pointing to your S3 bucket
2. Update the code to use the CloudFront URL instead of direct S3 URL

## File Structure in S3

After upload, your S3 bucket should have:
```
portfolio2025-assets/
├── videos/
│   ├── 03_CODE/
│   │   ├── minesweeper.mp4
│   │   ├── coopalytics.mp4
│   │   ├── djoda.mp4
│   │   ├── threetrios.mp4
│   │   ├── lightemall.mp4
│   │   ├── ztype.mp4
│   │   ├── aniBos.mp4
│   │   ├── 3dmfa_2.mp4
│   │   └── pipefantasy_1.mp4
│   ├── 04_ART/
│   │   └── motionMedia/
│   │       └── omori.mov
│   └── 02_DESIGN/
│       ├── 04_RR/
│       │   └── wireframe_demo.mov
│       └── 03_DISHWASHER/
│           └── lofi.mov
```

## Bucket Permissions

Make sure your S3 bucket has public read access for the `videos/` prefix:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::portfolio2025-assets/videos/*"
    }
  ]
}
```

