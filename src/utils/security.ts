/**
 * Chai Free Cafe - Security Utility Module
 *
 * Provides cryptographic hashing, rate limiting, and input sanitization
 * to secure client-side admin operations against tampering, plaintext leakage,
 * and injection attacks.
 */

// Cryptographic salt for owner passcode hashing
const AUTH_SALT = 'chaifree_cafe_auth_salt_2026';

// SHA-256 hash of default initial owner passcode 'chaicafe2026' salted with AUTH_SALT
export const DEFAULT_OWNER_HASH = '42f5322bb22203c9466a47beb549189c9de67dc8c8e6e729c11a495f4ca37ae7';

export const OWNER_HASH_STORAGE_KEY = 'chaicafe_owner_hash_v2';
export const LOCKOUT_STORAGE_KEY = 'chaicafe_auth_lockout_v1';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds lockout

/**
 * Computes a salted SHA-256 hash using the native browser Web Crypto API.
 * Never stores or transmits plaintext passwords.
 */
export async function hashPasscode(passcode: string): Promise<string> {
  const normalized = passcode.trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${AUTH_SALT}:${normalized}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Retrieves the currently active owner passcode hash.
 * If no custom hash is stored, returns the default initial hash.
 */
export function getActiveOwnerHash(): string {
  try {
    const stored = localStorage.getItem(OWNER_HASH_STORAGE_KEY);
    if (stored && /^[a-f0-9]{64}$/i.test(stored.trim())) {
      return stored.trim();
    }
  } catch (err) {
    console.warn('Failed to read owner hash from storage', err);
  }
  return DEFAULT_OWNER_HASH;
}

/**
 * Verifies a candidate passcode against the active stored cryptographic hash.
 * Avoids any hardcoded plaintext comparison or fallback backdoor.
 */
export async function verifyPasscode(candidate: string): Promise<boolean> {
  if (!candidate || candidate.trim().length === 0) return false;
  const candidateHash = await hashPasscode(candidate);
  const activeHash = getActiveOwnerHash();
  return candidateHash === activeHash;
}

/**
 * Sets a new active owner passcode hash, revoking all previous passcodes.
 */
export async function updateOwnerPasscode(newPasscode: string): Promise<void> {
  const newHash = await hashPasscode(newPasscode);
  localStorage.setItem(OWNER_HASH_STORAGE_KEY, newHash);
  // Remove legacy plaintext storage keys if present
  try {
    localStorage.removeItem('chaicafe_owner_pass_v1');
    localStorage.removeItem('chaicafe_owner_pass');
  } catch {
    // ignore
  }
}

/**
 * Resets the owner passcode hash to the default factory hash.
 */
export function resetOwnerPasscodeToDefault(): void {
  try {
    localStorage.removeItem(OWNER_HASH_STORAGE_KEY);
    localStorage.removeItem('chaicafe_owner_pass_v1');
    localStorage.removeItem('chaicafe_owner_pass');
  } catch {
    // ignore
  }
}

/**
 * Checks if the user is currently locked out due to repeated failed attempts.
 * Returns the remaining seconds if locked, or 0 if not locked.
 */
export function getLockoutRemainingSeconds(): number {
  try {
    const raw = sessionStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return 0;
    const lockoutUntil = parseInt(raw, 10);
    const now = Date.now();
    if (lockoutUntil > now) {
      return Math.ceil((lockoutUntil - now) / 1000);
    } else {
      sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
      return 0;
    }
  } catch {
    return 0;
  }
}

/**
 * Records a failed attempt and triggers a 60s lockout if attempts exceed threshold.
 */
export function recordFailedAttempt(currentFailures: number): { isLocked: boolean; remainingSeconds: number } {
  const nextFailures = currentFailures + 1;
  if (nextFailures >= MAX_FAILED_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    try {
      sessionStorage.setItem(LOCKOUT_STORAGE_KEY, lockoutUntil.toString());
    } catch {
      // ignore
    }
    return { isLocked: true, remainingSeconds: 60 };
  }
  return { isLocked: false, remainingSeconds: 0 };
}

/**
 * Clears lockout and failure tracking on successful authentication.
 */
export function clearLockout(): void {
  try {
    sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Sanitizes user-entered text strings by stripping HTML tags and control characters
 * to prevent Stored XSS and injection in local storage and rendering.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, 500) // Bound input length against memory bloat attacks
    .replace(/[<>]/g, '') // Strip angle brackets to disallow HTML tags
    .replace(/(?:javascript|data|vbscript):/gi, '') // Strip script pseudo-protocols
    .trim();
}

/**
 * Validates and bounds a price number. Returns null if blank/null.
 */
export function sanitizePrice(val: number | string | null | undefined): number | null {
  if (val === null || val === undefined || val === '' || val === 'null') return null;
  const num = typeof val === 'number' ? val : parseFloat(val);
  if (isNaN(num) || num < 0) return null;
  if (num > 10000) return 10000; // sensible maximum
  return Math.round(num);
}

/**
 * Safely opens external URLs without crashing sandboxed iFrames or throwing unhandled popup errors.
 * Validates protocol to ensure only safe http/https schemes are navigated.
 */
export function safeOpenExternalUrl(url: string): void {
  if (!url || typeof url !== 'string') return;
  const cleanUrl = url.trim();
  if (!cleanUrl) return;

  try {
    // Validate protocol strictly
    const parsed = new URL(cleanUrl, window.location.origin);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      console.warn('Blocked unsafe URL scheme navigation:', parsed.protocol);
      return;
    }

    // Programmatic anchor click with noopener & noreferrer to isolate browsing context
    const a = document.createElement('a');
    a.href = parsed.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    // Append to body temporarily for robust cross-browser click dispatch
    if (document.body) {
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      a.click();
    }
  } catch (err) {
    console.error('Failed to open external link safely', err);
  }
}


