import React from 'react';
import { useNavigate } from 'react-router-dom';
import DressCode from '../components/DressCode';
import PageLayout from '../components/PageLayout';

export default function DressCodePage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <DressCode onContinue={() => navigate('/countdown')} />
    </PageLayout>
  );
}
