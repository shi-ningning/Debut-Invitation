import React from 'react';
import SaveTheDate from '../components/SaveTheDate';
import PageLayout from '../components/PageLayout';

/**
 * HomePage — rendered at "/home".
 * Entry point after the Landing cover screen.
 * Shows the SaveTheDate photo section with embedded CTA overlay.
 */
export default function HomePage() {
  return (
    <PageLayout showFooter={false}>
      <SaveTheDate />
    </PageLayout>
  );
}
