import React from 'react';
import cl from './Footer.module.css';

interface InputProps {
  text: string;
  children: React.ReactNode;
}

const Footer: React.FC<InputProps> = ({ text, children }) => (
  <footer>
    <div className={cl.content}>
      <h2 className={cl.text}>{text}</h2>
      {children}
    </div>
  </footer>
);

export default Footer;
