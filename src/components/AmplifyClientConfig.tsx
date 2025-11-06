'use client';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

/**
 * Dynamically configures Amplify for the client.
 * This version avoids require() and supports both JSON + env-based config.
 */
async function configureAmplify() {
  try {
    // ✅ Try dynamic import for amplify_outputs.json (avoids ESLint error)
    const outputs = await import('../../amplify_outputs.json');
    Amplify.configure(outputs.default || outputs, { ssr: true });
  } catch (err) {
    // ✅ Fallback to environment variable-based config (optional)
    if (process.env.NEXT_PUBLIC_AMPLIFY_CONFIG) {
      Amplify.configure(
        JSON.parse(process.env.NEXT_PUBLIC_AMPLIFY_CONFIG),
        { ssr: true }
      );
    } else {
      console.warn(
        '⚠️ Amplify configuration skipped — no amplify_outputs.json or env config found.'
      );
    }
  }
}

// Run configuration once on load
configureAmplify();

/**
 * This component is purely for Amplify setup.
 * It renders nothing.
 */
export default function AmplifyClientConfig() {
  return null;
}
