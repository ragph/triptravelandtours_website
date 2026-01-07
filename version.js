/**
 * Cache Busting Version Manager
 * Automatically generates version strings for cache busting
 *
 * Usage:
 * - Update VERSION whenever you make changes to CSS/JS files
 * - Or use BUILD_TIME for automatic versioning based on deployment time
 */

// Manual version - increment this when you make changes
const VERSION = '1.0.0';

// Automatic version based on build/deployment time
// This will be the same for all files in a deployment
const BUILD_TIME = '20260107'; // Format: YYYYMMDD or timestamp

// Use whichever approach you prefer
const CACHE_VERSION = BUILD_TIME;

// Export for use in HTML files
window.CACHE_VERSION = CACHE_VERSION;

/**
 * Helper function to add version to any URL
 * @param {string} url - The URL to add version to
 * @returns {string} URL with version parameter
 */
window.versionedUrl = function(url) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${CACHE_VERSION}`;
};
