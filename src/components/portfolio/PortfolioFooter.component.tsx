import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export const PortfolioFooter = () => {
  return (
    <Reveal className="mt-10 flex justify-center">
      <Button
        asChild
        variant="outline"
        className="group h-12 rounded-full px-6 text-sm"
      >
        <Link to="/portfolio">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio Entries
        </Link>
      </Button>
    </Reveal>
  );
};
