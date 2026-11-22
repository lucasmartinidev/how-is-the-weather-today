import { CloudSun } from 'lucide-react';
import type { ApiStatus } from '../hooks/useApiStatus';

type PageHeaderProps = { status: ApiStatus };

const STATUS_LABELS: Record<ApiStatus, string> = {
  checking: 'Checking service',
  online: 'Service online',
  offline: 'Service unavailable',
};
export function PageHeader({ status }: PageHeaderProps) {
  return (
    <header className="page-header">
      <a href="#home" aria-label="How Is The Weather Today? home" className="page-header__brand">
        <span className="page-header__mark" aria-hidden="true"><CloudSun size={20} strokeWidth={1.7} /></span>
        <span>How Is The Weather Today?</span>
      </a>
      <div className={`service-status service-status--${status}`} role="status" aria-live="polite">
        <span className="service-status__dot" aria-hidden="true" />
        <span>{STATUS_LABELS[status]}</span>
      </div>
    </header>
  );
}
