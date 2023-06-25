import { CompetitionWizard, Layout } from '@gpseries/ui';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import React, { useCallback, useState } from 'react';

export default function CreateCompetition() {
  const [session] = useSession();

  return (
    <Layout session={session}>
      <CompetitionWizard />
    </Layout>
  );
}
