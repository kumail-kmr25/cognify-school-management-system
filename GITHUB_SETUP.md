# GitHub Repository Setup Guide

Since GitHub CLI (gh) is not installed, please follow these manual steps:

## Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Fill in the details:
   - **Repository name**: `cognify-school-management-system`
   - **Description**: `Smarter schools, simpler management.`
   - **Visibility**: Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

## Step 2: Push Your Code

After creating the repository on GitHub, copy the repository URL and run these commands in your terminal:

```bash
cd c:\spl
git remote add origin https://github.com/YOUR_USERNAME/cognify-school-management-system.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Alternative: Using GitHub Desktop

If you prefer a GUI:
1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Go to File → Add Local Repository
4. Select the `c:\spl` folder
5. Click "Publish repository"
6. Set name to: `cognify-school-management-system`
7. Set description to: `Smarter schools, simpler management.`
8. Uncheck "Keep this code private"
9. Click "Publish Repository"

---

## ✅ Current Status

Your local git repository is ready:
- ✅ Git initialized
- ✅ .gitignore created
- ✅ All files committed
- ⏳ Waiting to be pushed to GitHub

Once you complete the steps above, your project will be live on GitHub!
