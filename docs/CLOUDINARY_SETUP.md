# Cloudinary Setup Guide

## Quick Setup (5 minutes)

The Joy Juncture admin panel uses Cloudinary for product image uploads. Follow these steps to set it up:

### 1. Create a Free Cloudinary Account

1. Go to [Cloudinary Sign Up](https://cloudinary.com/users/register/free)
2. Sign up for a free account (no credit card required)
3. Verify your email

### 2. Get Your Cloud Name

1. After logging in, you'll see your dashboard at `https://console.cloudinary.com/`
2. Your **Cloud Name** is displayed prominently at the top
3. Copy this value - you'll need it for your `.env.local` file

### 3. Create an Upload Preset

An upload preset allows the admin panel to upload images without exposing API secrets.

**Steps:**
1. In the Cloudinary console, click **Settings** (gear icon) in the bottom left
2. Go to the **Upload** tab
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**
5. Configure the preset:
   - **Upload preset name**: `joy-juncture-preset`
   - **Signing Mode**: **Unsigned** (important!)
   - **Folder**: `joy-juncture/products` (optional, helps organize your images)
   - Leave other settings as default
6. Click **Save**

### 4. Update Your Environment Variables

Add this to your `.env.local` file:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
```

Replace `your_actual_cloud_name` with the Cloud Name from step 2.

### 5. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 6. Test Image Upload

1. Navigate to `http://localhost:3000/admin/products/new`
2. Go to the "🖼️ Media" tab
3. Click "Upload an Image"
4. The Cloudinary upload widget should open
5. Upload a test image
6. The image should appear in the form

---

## Advanced Configuration (Optional)

### Custom Upload Preset Name

If you want to use a different preset name:

1. Edit `src/components/ui/image-upload.tsx`
2. Change line 57:
   ```tsx
   uploadPreset="your-custom-preset-name"
   ```

### Folder Organization

To organize uploads by date or type, you can configure the upload preset's folder path:
- `joy-juncture/products/${Date.now()}`
- `joy-juncture/products/${userId}`

### Image Transformations

Cloudinary can automatically optimize images. In your upload preset settings:
- **Format**: Auto
- **Quality**: Auto
- **Incoming Transformation**: 
  - Width: 1000px (max)
  - Crop mode: Limit

This ensures uploaded images are optimized for web use.

---

## Troubleshooting

### Error: "A Cloudinary Cloud name is required"

**Solution**: Make sure `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set in `.env.local` and restart your dev server.

### Error: "Upload preset must be whitelisted"

**Solution**: Your upload preset's Signing Mode must be set to **Unsigned**. Edit it in Cloudinary settings.

### Images not showing after upload

**Solution**: 
1. Check browser console for errors
2. Verify the secure_url is being saved to the database
3. Ensure Next.js `next.config.js` has Cloudinary in `images.domains`:

```js
images: {
  domains: ['res.cloudinary.com'],
}
```

### Upload widget not opening

**Solution**: 
1. Clear browser cache
2. Check if `next-cloudinary` is installed: `npm list next-cloudinary`
3. If not: `npm install next-cloudinary`

---

## Free Tier Limits

Cloudinary's free tier includes:
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ Unlimited transformations
- ✅ Perfect for development and small production sites

For higher traffic, consider upgrading to a paid plan.

---

## Security Best Practices

1. **Never commit** your Cloud Name to public repositories (it's in `.env.local` which is gitignored)
2. Use **unsigned presets** only - they limit what users can upload
3. Set **file size limits** in your upload preset (e.g., max 5MB)
4. Enable **moderation** if you allow user-generated content

---

## Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [next-cloudinary docs](https://next-cloudinary.dev/)
- [Upload Presets Guide](https://cloudinary.com/documentation/upload_presets)
