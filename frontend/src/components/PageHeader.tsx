import { CloudSun } from 'lucide-react';
import type { ApiStatus } from '../hooks/useApiStatus';

type PageHeaderProps = { status: ApiStatus };

const STATUS_LABELS: Record<ApiStatus, string> = {
  checking: 'Checking service',
  online: 'Service online',
  offline: 'Service unavailable',
};
const STATUS_COLORS: Record<ApiStatus, string> = {
  checking: 'bg-amber-400',
  online: 'bg-emerald-500',
  offline: 'bg-rose-500',
};

export function PageHeader({ status }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-emerald-950/10 py-5">
      <a href="#home" aria-label="Skyward home" className="flex items-center gap-3 font-semibold tracking-tight text-slate-800">
        <span className="grid size-10 place-items-center rounded-xl bg-emerald-950 text-amber-300"><CloudSun size={22} /></span>
        <span className="text-lg">skyward<span className="text-amber-600">.</span></span>
      </a>
      <div className="flex items-center gap-2 text-xs text-slate-500" role="status" aria-live="polite">
        <span className={`size-2 rounded-full ${STATUS_COLORS[status]}`} />
        <span>{STATUS_LABELS[status]}</span>
      </div>
    </header>
  );
}
