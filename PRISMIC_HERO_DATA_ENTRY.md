# Prismic Hero Section - Data Entry Guide

## Homepage Content Type Fields

### 🎯 **Main Tab Fields**

#### **1. UID Field**

- **Field Name**: `uid`
- **Value**: `homepage`
- **Description**: Unique identifier for the homepage document

---

#### **2. Hero Background Image**

- **Field Name**: `hero_background_image`
- **Type**: Image Upload
- **Recommended Size**: 1920x1080px (or larger)
- **Content**: Upload a high-quality image of a cozy wooden reception or luxury hotel interior
- **Alt Text**: "Luxury hotel reception area"

---

#### **3. Hero Left Caption**

- **Field Name**: `hero_left_caption`
- **Type**: Text
- **Value**: `Brilliant Brands`

---

#### **4. Hero Center Caption**

- **Field Name**: `hero_center_caption`
- **Type**: Text
- **Value**: `Marketing for Luxury Hotels & Real Estate Developments`

---

#### **5. Hero Main Title**

- **Field Name**: `hero_main_title`
- **Type**: Text
- **Value**: `Orchestrating the Symphonic Nature of Luxury Brands`

---

#### **6. Hero Subtitle**

- **Field Name**: `hero_subtitle`
- **Type**: Text
- **Value**: `Think Critically. Act Creatively.®`

---

#### **7. Hero Navigation Links**

- **Field Name**: `hero_navigation`
- **Type**: Group (Repeatable)

**Add 5 Navigation Items:**

**Item 1:**

- **Link Text**: `Services`
- **Link URL**: `/services` (or `services.html` for now)

**Item 2:**

- **Link Text**: `Work`
- **Link URL**: `/work` (or `work.html` for now)

**Item 3:**

- **Link Text**: `About`
- **Link URL**: `/about` (or `about.html` for now)

**Item 4:**

- **Link Text**: `Think Tank`
- **Link URL**: `/blog` (or `blog.html` for now)

**Item 5:**

- **Link Text**: `Contact`
- **Link URL**: `/contact` (or `contact.html` for now)

---

### 📱 **SEO & Metadata Tab Fields**

#### **8. Meta Title**

- **Field Name**: `meta_title`
- **Value**: `Smarthinking Inc. - Luxury Marketing Agency`

---

#### **9. Meta Description**

- **Field Name**: `meta_description`
- **Value**: `Smarthinking Inc. is a luxury marketing agency based in Miami, Florida. We specialize in real estate, hotels, and private club brands. Think Critically. Act Creatively.®`

---

#### **10. Meta Image**

- **Field Name**: `meta_image`
- **Type**: Image Upload
- **Recommended Size**: 1200x630px
- **Content**: Upload the same hero image or a branded social sharing image
- **Description**: Used for social media sharing (Facebook, Twitter, LinkedIn)

---

## 📋 **Quick Copy-Paste Reference**

### Text Fields (Copy these exactly):

```
hero_left_caption: Brilliant Brands

hero_center_caption: Marketing for Luxury Hotels & Real Estate Developments

hero_main_title: Orchestrating the Symphonic Nature of Luxury Brands

hero_subtitle: Think Critically. Act Creatively.®

meta_title: Smarthinking Inc. - Luxury Marketing Agency

meta_description: Smarthinking Inc. is a luxury marketing agency based in Miami, Florida. We specialize in real estate, hotels, and private club brands. Think Critically. Act Creatively.®
```

### Navigation Links:

```
1. Services → /services
2. Work → /work
3. About → /about
4. Think Tank → /blog
5. Contact → /contact
```

---

## 🎨 **Content Guidelines**

### **Hero Background Image**

- **Style**: Luxury, warm, professional
- **Subject**: Hotel reception, elegant interior, or architectural detail
- **Quality**: High resolution (minimum 1920x1080)
- **Format**: JPG or PNG
- **File Size**: Optimized for web (under 1MB preferred)

### **Text Content**

- **Tone**: Professional, sophisticated, luxury-focused
- **Brand Voice**: Confident, creative, strategic
- **Key Message**: Emphasizes both analytical thinking and creative execution

### **Navigation Strategy**

- **Services**: Main service offerings page
- **Work**: Portfolio/case studies page
- **About**: Company story and team page
- **Think Tank**: Blog/insights page (original was "Blog")
- **Contact**: Contact information and inquiry form

---

## ✅ **Checklist for Content Entry**

- [ ] Upload hero background image (1920x1080+)
- [ ] Enter hero left caption: "Brilliant Brands"
- [ ] Enter hero center caption: "Marketing for Luxury Hotels & Real Estate Developments"
- [ ] Enter hero main title: "Orchestrating the Symphonic Nature of Luxury Brands"
- [ ] Enter hero subtitle: "Think Critically. Act Creatively.®"
- [ ] Add all 5 navigation links with correct text and URLs
- [ ] Enter meta title for SEO
- [ ] Enter meta description for SEO
- [ ] Upload meta image for social sharing (1200x630)
- [ ] Set UID to "homepage"
- [ ] Save and publish the document

---

## 🔄 **After Data Entry**

1. **Save the document** in Prismic
2. **Publish the document** to make it live
3. **Test the hero section** on your Next.js site
4. **Verify all links** work correctly
5. **Check responsive behavior** on mobile devices
6. **Validate SEO data** using browser dev tools

This content will perfectly recreate the hero section from the original HTML version while making it fully manageable through Prismic CMS!
