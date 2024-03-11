import { FC, PropsWithChildren } from "react";

interface PanelProps extends PropsWithChildren {
  className?: string;
}

export const Panel: FC<PanelProps> = ({ children, className }) => {
  return (
    <div
      className={`w-full bg-gray-900 bg-gradient-to-tr rounded-lg p-2 border-gray-700 border-2 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};
