# AWS S3 configuration for `portfolio2025-assets`

Apply once (or whenever these files change). Requires AWS CLI configured with credentials that can manage the bucket.

```bash
# 1. Allow bucket-policy-based public access (keep ACL-based access blocked)
aws s3api put-public-access-block \
  --bucket portfolio2025-assets \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region us-east-2

# 2. Make assets/* publicly readable
aws s3api put-bucket-policy \
  --bucket portfolio2025-assets \
  --policy file://aws-config/bucket-policy.json \
  --region us-east-2

# 3. Allow cross-origin GET (harmless for <img>/<video>, required if you ever fetch assets via JS)
aws s3api put-bucket-cors \
  --bucket portfolio2025-assets \
  --cors-configuration file://aws-config/cors.json \
  --region us-east-2
```

## Verifying

After applying, this should return 200 with the image bytes:

```bash
curl -I https://portfolio2025-assets.s3.amazonaws.com/assets/portfolio-content_spring2026/<some-known-file.jpg>
```

If it returns 403, the bucket policy didn't apply (check Block Public Access settings in the AWS console).
If it returns 404, the file isn't at that S3 key — re-run `upload-all-assets-to-s3.ps1`.

## Notes

- The policy only opens `assets/*`, matching what `getAssetPath` in `src/utils/assetUtils.ts` builds. Older `videos/*` keys from `upload-videos-to-s3.ps1` are not covered (that script is stale; `upload-all-assets-to-s3.ps1` is the current one).
- `AllowedOrigins: ["*"]` is fine for a public portfolio. Narrow to your deployed origin (e.g. `https://yourdomain.com`) if you prefer.
