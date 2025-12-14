import { prisma } from '@/lib/prisma';
import CreateForm from './CreateForm';

export const dynamic = 'force-dynamic';

export default async function CreatePage() {
  const styles = await prisma.style.findMany();

  return (
    <div className="h-full">
      <CreateForm styles={styles} />
    </div>
  );
}
