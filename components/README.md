# Reusable Components Guide

This guide explains how to use the reusable header and footer components across all pages.

## Files Structure

```
components/
├── header.html    # Top bar + navigation
├── footer.html    # Footer with links and contact info
├── loader.js      # Automatically loads components
└── README.md      # This file
```

## How to Use on New Pages

Add these lines to any HTML page:

### 1. In the `<head>` section:

```html
<!-- Component Loader -->
<script src="components/loader.js" defer></script>
```

### 2. In the `<body>` section:

```html
<!-- Header Component Placeholder -->
<div id="header-placeholder" class="sticky-header-wrapper"></div>

<!-- Your page content here -->

<!-- Footer Component Placeholder -->
<div id="footer-placeholder"></div>
```

## Complete Example Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>

    <!-- Your CSS files -->
    <link rel="stylesheet" href="../styles.css">

    <!-- Component Loader -->
    <script src="../components/loader.js" defer></script>
</head>
<body>
    <!-- Header Component -->
    <div id="header-placeholder" class="sticky-header-wrapper"></div>

    <!-- Your page content -->
    <section>
        <h1>Your Content Here</h1>
    </section>

    <!-- Footer Component -->
    <div id="footer-placeholder"></div>

    <!-- Your scripts -->
    <script src="../script.js"></script>
</body>
</html>
```

## Features Included

### Header Features:
- ✅ Sticky navigation on scroll
- ✅ Active state highlighting based on scroll position
- ✅ Smooth scrolling to sections
- ✅ Mobile responsive menu
- ✅ Top bar with contact info and social links

### Footer Features:
- ✅ Company info and logo
- ✅ Quick links navigation
- ✅ Support links
- ✅ Contact information
- ✅ Social media links

## Editing Components

To update the header or footer across all pages:

1. Edit `components/header.html` or `components/footer.html`
2. Save the file
3. Refresh any page - changes appear everywhere!

## Important Notes

- Use `#section-id` format for anchor links (not `/#section-id`)
- The `sticky-header-wrapper` class is required for sticky navigation
- Scroll padding is set to 120px in CSS to prevent header overlap
- Smooth scroll behavior is enabled globally

## Troubleshooting

**Navigation not sticky?**
- Make sure the header placeholder has `class="sticky-header-wrapper"`

**Active states not working?**
- Ensure your sections have `id` attributes
- Check that navigation links use `#section-id` format

**Components not loading?**
- Check the path to `loader.js` is correct
- Open browser console to see any error messages
- Ensure you're running on a web server (not file://)
