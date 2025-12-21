# How to Fix Your Videos - Super Simple Guide

## What's the Problem?
Your videos aren't showing up because your website host isn't serving them correctly. We're going to put them on Amazon S3 (cloud storage) instead, which will work better.

---

## Step 1: Install AWS CLI (If You Don't Have It)

### What is AWS CLI?
It's a tool that lets you upload files to Amazon S3 from your computer.

### How to Install:

**Option A: Using the AWS Website**

1. **Go to this website**: https://aws.amazon.com/cli/
2. **Scroll down** until you see a section that says something like "Download the AWS CLI" or "Install AWS CLI"
3. **Look for Windows** - you should see a link or button that says something like:
   - "Download AWS CLI MSI installer for Windows (64-bit)"
   - Or just a link to download the MSI file
4. **Click that link/button** - it will download a file called `AWSCLIV2.msi`
5. **Find the downloaded file** (usually in your Downloads folder)
6. **Double-click the file** to run the installer
7. **Click "Next" through all the steps** (just use the defaults)
8. **Wait for it to finish**
9. **Click "Finish"** when done

**Option B: Using Windows Package Manager (Easier)**

1. **Open PowerShell** (search for "PowerShell" in Windows, right-click and "Run as Administrator")
2. **Type this command**:
   ```
   winget install Amazon.AWSCLI
   ```
3. **Press Enter**
4. **Wait for it to finish** (it will show progress)
5. **Done!** ✅

### Check if it worked:
1. **Close and reopen PowerShell** (important - so it picks up the new program)
2. **Type**: `aws --version`
3. **Press Enter**
4. **If you see a version number** (like "aws-cli/2.x.x"), it worked! ✅
5. **If you see an error** like "aws: command not found", try:
   - Close PowerShell completely
   - Open a NEW PowerShell window
   - Try `aws --version` again
   - If it still doesn't work, the installation might have failed - try Option B above

---

## Step 2: Connect AWS CLI to Your Account

### What you need:
- Your AWS Access Key ID (you already have this - it's in your `.env.local` file)
- Your AWS Secret Access Key (you already have this too)

**Note**: Your credentials are in `.env.local` (not `.env`). That's fine - React uses `.env.local` for local development.

### How to do it:

1. **Open PowerShell**
2. **Type this command**:
   ```
   aws configure
   ```
3. **Press Enter**
4. **It will ask you 4 questions. Answer them:**

   **Question 1: "AWS Access Key ID"**
   - Paste your Access Key ID
   - Press Enter

   **Question 2: "AWS Secret Access Key"**
   - Paste your Secret Access Key
   - Press Enter

   **Question 3: "Default region name"**
   - Type: `us-east-2`
   - Press Enter

   **Question 4: "Default output format"**
   - Type: `json`
   - Press Enter

5. **Done!** ✅

---

## Step 3: Upload Your Videos to S3

### Option A: Use the Script (Easiest Way)

1. **Open PowerShell**
2. **Go to your project folder**:
   ```
   cd C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
   ```
3. **Run the upload script**:
   ```
   .\upload-videos-to-s3.ps1
   ```
4. **Wait for it to finish** (it will show you progress)
5. **Done!** ✅

### Option B: Manual Upload (If Script Doesn't Work)

**For CODE videos (all the .mp4 files):**

1. Open PowerShell
2. Go to your project:
   ```
   cd C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
   ```
3. Run this command:
   ```
   aws s3 cp public\pictures\portfolio-content_spring2026\03_CODE\ s3://portfolio2025-assets/videos/03_CODE/ --recursive --content-type "video/mp4" --exclude "*" --include "*.mp4"
   ```
4. Wait for it to finish

**For ART videos (.mov file):**

1. Still in PowerShell, run:
   ```
   aws s3 cp public\pictures\portfolio-content_spring2026\04_ART\motionMedia\ s3://portfolio2025-assets/videos/04_ART/motionMedia/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
   ```

**For DESIGN videos (.mov files):**

1. Run this:
   ```
   aws s3 cp public\pictures\portfolio-content_spring2026\02_DESIGN\04_RR\ s3://portfolio2025-assets/videos/02_DESIGN/04_RR/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
   ```

2. Then this:
   ```
   aws s3 cp public\pictures\portfolio-content_spring2026\02_DESIGN\03_DISHWASHER\ s3://portfolio2025-assets/videos/02_DESIGN/03_DISHWASHER/ --recursive --content-type "video/quicktime" --exclude "*" --include "*.mov"
   ```

---

## Step 4: Make Sure Videos Are Public (So Anyone Can View Them)

### What this means:
Right now, your videos are private. We need to make them public so your website visitors can see them.

### How to do it:

1. **Go to AWS website**: https://s3.console.aws.amazon.com/
2. **Log in** with your AWS account
3. **Click on your bucket**: `portfolio2025-assets`
4. **Click the "Permissions" tab** (at the top)
5. **Scroll down to "Bucket policy"** section
6. **Click "Edit"**
7. **Copy and paste this entire thing** (replace everything that's there):

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

8. **Click "Save changes"** at the bottom
9. **Scroll up to "Block public access"** section
10. **Click "Edit"**
11. **Uncheck the box** that says "Block all public access to buckets and objects granted through new public bucket or access point policies"
12. **Click "Save changes"**
13. **It will ask you to confirm** - type `confirm` and click confirm
14. **Done!** ✅

---

## Step 5: Test That It Worked

### Check if videos are uploaded:

1. **Open a web browser**
2. **Try to open this URL**:
   ```
   https://portfolio2025-assets.s3.amazonaws.com/videos/03_CODE/minesweeper.mp4
   ```
3. **What should happen:**
   - ✅ **Good**: The video starts downloading or playing
   - ❌ **Bad**: You see an error page or "Access Denied"

### If you see "Access Denied":
- Go back to Step 4 and make sure you did all the permission steps
- Wait a few minutes and try again (sometimes it takes time)

---

## Step 6: Tell Your Code to Use S3 Videos

### What this does:
Right now your code looks for videos in the local folder. We need to tell it to look on S3 instead.

### How to do it:

1. **Open your project folder** in File Explorer:
   ```
   C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
   ```

2. **Look for a file called `.env.local`** (this is the file you're using)
   - Open it with Notepad

3. **Add this line to the file** (at the end):
   ```
   REACT_APP_USE_S3_VIDEOS=true
   ```

4. **Save the file**

5. **Your `.env.local` file should now look like this** (replace with YOUR actual credentials):
   ```
   REACT_APP_ACCESS_KEY_ID="your_access_key_here"
   REACT_APP_SECRET_ACCESS_KEY="your_secret_key_here"
   REACT_APP_USE_S3_VIDEOS=true
   ```

6. **Done!** ✅

---

## Step 7: Rebuild Your Website

### What this does:
Your code changed, so you need to rebuild the website so the changes take effect.

### How to do it:

1. **Open PowerShell**
2. **Go to your project**:
   ```
   cd C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
   ```
3. **Run this command**:
   ```
   npm run build
   ```
4. **Wait for it to finish** (it will take a minute or two)
5. **When you see "Build complete!"** you're done! ✅

---

## Step 8: Deploy Your Website

### What this does:
Upload the newly built website to your hosting.

### How to do it:
- **Do whatever you normally do to deploy** (upload to your hosting, push to GitHub, etc.)
- The exact steps depend on how you're hosting your site

---

## Step 9: Test Your Website

1. **Go to your website** in a browser
2. **Go to the Code page** (where the videos should be)
3. **Check if videos are playing** ✅
4. **Open the browser console** (F12) and look for any errors

### What you should see:
- Videos loading and playing
- In the console, you might see logs like "Using S3 URL for video"

### If videos still don't work:
1. **Check the console for errors**
2. **Make sure you did Step 4** (making videos public)
3. **Make sure you did Step 6** (added the .env file)
4. **Make sure you did Step 7** (rebuilt the site)

---

## Quick Checklist

Before you start, make sure you have:
- [ ] AWS account
- [ ] AWS Access Key ID
- [ ] AWS Secret Access Key
- [ ] Your project folder location

Steps to complete:
- [ ] Step 1: Installed AWS CLI
- [ ] Step 2: Configured AWS CLI (`aws configure`)
- [ ] Step 3: Uploaded videos to S3
- [ ] Step 4: Made videos public (bucket permissions)
- [ ] Step 5: Tested that videos are accessible
- [ ] Step 6: Created/updated `.env` file
- [ ] Step 7: Rebuilt website (`npm run build`)
- [ ] Step 8: Deployed website
- [ ] Step 9: Tested on live site

---

## Common Problems and Fixes

### Problem: "aws: command not found"
**Fix**: AWS CLI isn't installed. Go back to Step 1.

### Problem: "Access Denied" when trying to view videos
**Fix**: Go back to Step 4 and make sure videos are public.

### Problem: Videos still not showing after deployment
**Fix**: 
1. Make sure you added `REACT_APP_USE_S3_VIDEOS=true` to `.env`
2. Make sure you ran `npm run build` AFTER adding it
3. Make sure you deployed the new build

### Problem: "The system cannot find the path specified"
**Fix**: Make sure you're in the right folder. Run:
```
cd C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025
```
Then try again.

---

## Need Help?

If you get stuck:
1. **Read the error message** - it usually tells you what's wrong
2. **Check which step you're on** - go back and re-read that step
3. **Make sure you did all the previous steps** - you can't skip steps!

Good luck! 🎉

