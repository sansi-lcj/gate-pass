import { getAllStyles } from '@/components/templates/registry';
import CreateForm from './CreateForm';

export default function CreatePage() {
  const styles = getAllStyles();

  return (
    <div className="h-full">
      <CreateForm styles={styles} />
    </div>
  );
}
