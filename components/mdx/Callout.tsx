import { cn } from '@/lib/utils';
import { BadgeInfo, Lightbulb, CircleAlert, TriangleAlert, OctagonX } from 'lucide-react';

type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
  typeColor?: string;
}

const calloutMap: Record<CalloutType, { icon: React.ReactNode; borderColor: string; typeColor: string }> = {
  note: {
    icon: <BadgeInfo className='mr-2 h-6 w-6 text-blue-500' />,
    borderColor: 'border border-4 !border-blue-500',
    typeColor: 'text-blue-500',
  },
  tip: {
    icon: <Lightbulb className='mr-2 h-6 w-6 text-green-500' />,
    borderColor: 'border border-4 !border-green-500',
    typeColor: 'text-green-500',
  },
  important: {
    icon: <CircleAlert className='mr-2 h-6 w-6 text-orange-500' />,
    borderColor: 'border border-4 !border-orange-500',
    typeColor: 'text-orange-500',
  },
  warning: {
    icon: <TriangleAlert className='mr-2 h-6 w-6 text-yellow-500' />,
    borderColor: 'border border-4 !border-yellow-500',
    typeColor: 'text-yellow-500',
  },
  caution: {
    icon: <OctagonX className='mr-2 h-6 w-6 text-red-500' />,
    borderColor: 'border border-4 !border-red-500',
    typeColor: 'text-red-500',
  },
};

export function Callout({ type, children }: CalloutProps) {
  const { icon, borderColor, typeColor } = calloutMap[type];

  return (
    <div
      className={cn(
        'mb-8 flex flex-col items-start rounded',
        borderColor,
        'bg-neutral-100 px-4 py-3 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
      )}
    >
      <div className='flex items-center'>
        {icon}
        <div className={cn('ml-1 text-base font-bold', typeColor)}>{type.toUpperCase()}</div>
      </div>
      <div className='callout w-full text-base'>{children}</div>
    </div>
  );
}
