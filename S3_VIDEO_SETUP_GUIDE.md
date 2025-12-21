# Complete Guide: Using S3 for Video Assets

## Why Use S3 for Videos?

Your videos are large (2-33 MB each) and your web hosting is returning HTML instead of video files. By uploading videos to S3:

1. **Reliable Delivery**: S3 serves files directly without routing through your app
2. **No Size Limits**: S3 can handle large files easily
3. **Faster**: Can use CloudFront CDN for global distribution
4. **Separate from Deployments**: Videos don't need to be in every build

## Step-by-Step Setup

### Step 1: Upload Videos to S3

#### Option A: Use the PowerShell Script (Easiest)

1. **Install AWS CLI** if you haven't:
   - Download: https://aws.amazon.com/cli/
   - Or: `winget install Amazon.AWSCLI`

2. **Configure AWS credentials**:
   ```powershell
   aws configure
   ```
   Enter:
   - Access Key ID: (your key)
   - Secret Access Key: (your secret)
   - Default region: `us-east-2`
   - Default output format: `json`

3. **Run the upload script**:
   ```powershell
   cd C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
   .\upload-videos-to-s3.ps1
   ```

#### Option B: Manual AWS CLI Commands

```powershell
# CODE videos
aws s3 cp public/pictures/portfolio-content_spring2026/03_CODE/ s3://portfolio2025-assets/videos/03_CODE/ --recursive --content-type "video/mp4" --exclude "*" --include "*.mp4"

# ART videos
aws s3 cp public/pictures/portfolio-content_spring2026/04_ART/motionMedia/ s3://portfolio2025-assets/videos/04_ART/motionMedia/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"

# DESIGN videos
aws s3 cp public/pictures/portfolio-content_spring2026/02_DESIGN/04_RR/ s3://portfolio2025-assets/videos/02_DESIGN/04_RR/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
aws s3 cp public/pictures/portfolio-content_spring2026/02_DESIGN/03_DISHWASHER/ s3://portfolio2025-assets/videos/02_DESIGN/03_DISHWASHER/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
```

#### Option C: AWS Console (Web Interface)

1. Go to https://s3.console.aws.amazon.com/
2. Open bucket: `portfolio2025-assets`
3. Create folder structure:
   - `videos/03_CODE/`
   - `videos/04_ART/motionMedia/`
   - `videos/02_DESIGN/04_RR/`
   - `videos/02_DESIGN/03_DISHWASHER/`
4. Upload each video file
5. **IMPORTANT**: For each file, click it → Properties → Metadata → Set:
   - `Content-Type`: `video/mp4` for `.mp4` files
   - `Content-Type`: `video/quicktime` for `.mov` files

### Step 2: Verify Upload

Test that files are accessible:
```powershell
# Test a video URL
curl.exe -I https://portfolio2025-assets.s3.amazonaws.com/videos/03_CODE/minesweeper.mp4
```

Should return:
- `HTTP/1.1 200 OK`
- `Content-Type: video/mp4`

### Step 3: Set Up Bucket Permissions

Your S3 bucket needs public read access for videos. In AWS Console:

1. Go to your bucket → **Permissions** tab
2. **Bucket Policy** → Edit
3. Add this policy (replace `portfolio2025-assets` with your bucket name if different):

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

4. **Block Public Access** → Edit → Uncheck "Block all public access" (or at least uncheck "Block public access to buckets and objects granted through new public bucket or access point policies")

### Step 4: Configure Your App

1. **Create a `.env` file** in your project root (if it doesn't exist):

```env
# Enable S3 URLs for videos
REACT_APP_USE_S3_VIDEOS=true

# Optional: Use CloudFront URL instead of direct S3 (faster)
# REACT_APP_S3_BUCKET_URL=https://your-cloudfront-id.cloudfront.net
```

2. **Restart your dev server** (if running):
   ```powershell
   npm start
   ```

3. **Rebuild for production**:
   ```powershell
   npm run build
   ```

### Step 5: Test

1. Check browser console - you should see logs like:
   ```
   Using S3 URL for video: { originalPath: '/pictures/...', s3Path: 'videos/...', s3Url: 'https://...' }
   ```

2. Videos should now load from S3 URLs like:
   ```
   https://portfolio2025-assets.s3.amazonaws.com/videos/03_CODE/minesweeper.mp4
   ```

## How It Works

The code in `src/utils/assetUtils.ts` now:

1. Checks if `REACT_APP_USE_S3_VIDEOS=true` is set
2. If true and the file is a video (`.mp4` or `.mov`), it:
   - Converts the local path to an S3 path
   - Example: `/pictures/portfolio-content_spring2026/03_CODE/minesweeper.mp4`
   - Becomes: `https://portfolio2025-assets.s3.amazonaws.com/videos/03_CODE/minesweeper.mp4`
3. If false or not a video, uses the original local path logic

## File Structure in S3

After upload, your S3 bucket should look like:

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

## Troubleshooting

### Videos still not loading?

1. **Check S3 permissions**: Make sure bucket policy allows public read
2. **Verify URLs**: Open a video URL directly in browser - should download/play
3. **Check Content-Type**: Files must have correct MIME type
4. **Environment variable**: Make sure `.env` has `REACT_APP_USE_S3_VIDEOS=true`
5. **Rebuild**: Run `npm run build` after changing `.env`

### Want to use CloudFront?

1. Create CloudFront distribution pointing to your S3 bucket
2. Set `REACT_APP_S3_BUCKET_URL=https://your-cloudfront-id.cloudfront.net` in `.env`
3. Videos will be served through CloudFront (faster, global CDN)

## Cost Considerations

- **S3 Storage**: ~$0.023 per GB/month (your videos are ~130 MB total = ~$0.003/month)
- **Data Transfer**: First 100 GB/month free, then ~$0.09/GB
- **CloudFront**: First 1 TB/month free, then ~$0.085/GB

For a portfolio site, costs should be minimal (likely free tier).

