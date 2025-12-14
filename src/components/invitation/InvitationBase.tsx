import { ReactNode } from 'react';

interface InvitationBaseProps {
  children: ReactNode;
  bgImage?: string;
  className?: string;
}

export const InvitationBase = ({ children, bgImage, className = "" }: InvitationBaseProps) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
      {bgImage && (
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url(${bgImage})` }} 
        />
      )}
      <div className="relative z-10 w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
};
