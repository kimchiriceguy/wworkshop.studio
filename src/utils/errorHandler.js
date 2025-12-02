/**
 * Error Handler Utility
 * Handles Firebase errors gracefully, especially blocked requests from ad blockers
 */

/**
 * Check if an error is due to blocking (ad blocker, privacy extension, etc.)
 */
export const isBlockedError = (error) => {
  if (!error) return false;
  const errorMessage = error.message || error.toString() || '';
  const errorCode = error.code || '';
  
  return (
    errorMessage.includes('ERR_BLOCKED_BY_CLIENT') ||
    errorMessage.includes('blocked') ||
    errorCode === 'unavailable' ||
    errorCode === 'permission-denied'
  );
};

/**
 * Check if an error is due to offline status
 */
export const isOfflineError = (error) => {
  if (!error) return false;
  const errorMessage = error.message || error.toString() || '';
  const errorCode = error.code || '';
  
  return (
    errorMessage.includes('offline') ||
    errorMessage.includes('network') ||
    errorMessage.includes('Failed to fetch') ||
    errorCode === 'unavailable'
  );
};

/**
 * Handle Firebase errors gracefully
 * Suppresses console errors for blocked/offline errors
 */
export const handleFirebaseError = (error, context = '') => {
  if (!error) return;
  
  const isBlocked = isBlockedError(error);
  const isOffline = isOfflineError(error);
  
  if (isBlocked || isOffline) {
    // Don't log blocked/offline errors - they're expected with ad blockers
    return;
  }
  
  // Log real errors
  if (context) {
    console.error(`Error in ${context}:`, error);
  } else {
    console.error('Error:', error);
  }
};

/**
 * Wrap Firebase operations with error handling
 */
export const safeFirebaseOperation = async (operation, fallback = null, context = '') => {
  try {
    return await operation();
  } catch (error) {
    handleFirebaseError(error, context);
    return fallback;
  }
};

