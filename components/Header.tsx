// Header.tsx

import { FC } from "react";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <div className="w-full">
      <header className="w-full bg-blue-700 text-white text-center py-6 shadow-xl">
        <span className="font-sans font-bold text-2xl">{title}</span>
      </header>
    </div>
  );
};

export default Header;
