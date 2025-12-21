# How to Find Your AWS Credentials

## Your .env File Doesn't Exist Yet

I checked your project folder and there's no `.env` file. That's okay! Here's how to find or create your AWS credentials:

---

## Option 1: Check If You Have Credentials Somewhere Else

Your AWS credentials might be:
- In your deployment platform (Vercel, Netlify, etc.) as environment variables
- In your AWS account (you can create new ones)
- Written down somewhere

---

## Option 2: Get Your Credentials from AWS Console

If you don't have your credentials, you can get them from AWS:

### Step 1: Go to AWS Console
1. Go to: https://console.aws.amazon.com/
2. Log in with your AWS account

### Step 2: Go to IAM (Identity and Access Management)
1. In the search bar at the top, type: **IAM**
2. Click on **IAM** (the service, not a user)

### Step 3: Find Your Access Keys
1. Click **Users** in the left sidebar
2. Click on your username (or the user that has access to S3)
3. Click the **Security credentials** tab
4. Scroll down to **Access keys**

### Step 4: Create or View Access Key
- **If you see an existing key**: Click "Show" next to it to see the Secret Access Key
- **If you don't have a key**: Click "Create access key" and follow the steps

⚠️ **IMPORTANT**: The Secret Access Key is only shown ONCE when you create it. If you lose it, you'll need to create a new one.

---

## Option 3: Create a New Access Key (If You Don't Have One)

1. Follow Option 2 above to get to the Access keys section
2. Click **"Create access key"**
3. Choose **"Command Line Interface (CLI)"** as the use case
4. Check the box that says you understand
5. Click **"Next"**
6. Click **"Create access key"**
7. **COPY BOTH VALUES IMMEDIATELY**:
   - **Access Key ID**: Looks like `AKIAIOSFODNN7EXAMPLE`
   - **Secret Access Key**: Looks like `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
8. **Save them somewhere safe!** You won't be able to see the Secret Access Key again.

---

## Option 4: Check Your Deployment Platform

If you're using Vercel, Netlify, or another platform:

### For Vercel:
1. Go to your project on Vercel
2. Click **Settings**
3. Click **Environment Variables**
4. Look for `REACT_APP_ACCESS_KEY_ID` and `REACT_APP_SECRET_ACCESS_KEY`

### For Netlify:
1. Go to your site on Netlify
2. Click **Site configuration**
3. Click **Environment variables**
4. Look for the AWS keys

---

## Once You Have Your Credentials

1. **Create a `.env` file** in your project root:
   - Location: `C:\Users\amyen\OneDrive\Documents\portfolio\portfolio-2025\.env`
   - Make sure it's called `.env` (starts with a dot, no extension)

2. **Add these lines** (replace with YOUR actual values):
   ```
   REACT_APP_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID_HERE
   REACT_APP_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY_HERE
   REACT_APP_USE_S3_VIDEOS=true
   ```

3. **Save the file**

4. **For AWS CLI configuration**, you'll use the SAME credentials when you run `aws configure`

---

## Security Note

⚠️ **NEVER** share your AWS credentials publicly or commit them to GitHub. The `.env` file should be in your `.gitignore` (which it probably already is).

---

## Need Help?

If you can't find your credentials:
1. Check your AWS account - you might need to create new ones
2. Check your deployment platform's environment variables
3. If all else fails, create a new Access Key in AWS (Option 3 above)

