// Header.tsx

import { FC } from "react";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <div className="w-full">
      <header className="w-full bg-gray-800 text-white text-center py-4 shadow-xl">
        <span className="font-sans font-bold text-2xl">{title}</span>
      </header>
    </div>
  );
};

export default Header;
