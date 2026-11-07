import { LandingBento } from '@/components/landing/LandingBento';
import { OpenSourceSection } from '@/components/landing/OpenSourceSection';
import { Layout } from '@/components/layout/Layout.component';
import { personLd, Seo, websiteLd } from '@/utils/seo';

const LandingPage = () => {
  return (
    <Layout>
      <Seo
        title="Sal Anvarov — Full Stack Developer & Co-founder of Cleanlist.ai"
        description="Sal Anvarov is a full stack developer and Co-founder of Cleanlist.ai based in Toronto. Portfolio of React, TypeScript, Node.js, and AI-engineering work, plus a writing archive on software architecture, devex, and frontend safety."
        path="/"
        keywords="Sal Anvarov, full stack developer, Toronto, React, TypeScript, Next.js, Cleanlist.ai, AI engineer, portfolio"
        jsonLd={[personLd(), websiteLd()]}
      />
      <LandingBento />
      <OpenSourceSection />
    </Layout>
  );
};

export default LandingPage;
