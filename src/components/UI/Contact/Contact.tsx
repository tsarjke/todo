import React from 'react';
import cl from './Contact.module.css';

import { ReactComponent as GithubIcon } from './img/github.svg';
import { ReactComponent as TgIcon } from './img/telegram2.svg';
import { ReactComponent as LinIcon } from './img/linkedin2.svg';
import { ReactComponent as GmailIcon } from './img/gmail2.svg';

const Contact: React.FC = () => {
  const contactList = [
    [<GithubIcon />, 'https://github.com/tsarjke'],
    [<TgIcon />, 'https://t.me/tsarjke'],
    [<LinIcon />, 'https://www.linkedin.com/in/tsarev-ivan/'],
    [<GmailIcon />, 'mailto:ivantsarb@gmail.com'],
  ].map(([svg, link]) => (
    <li className={cl.elem} key={link.toString()}>
      <a href={link.toString()} target="_blank" rel="noreferrer" className={cl.link}>
        {svg}
      </a>
    </li>
  ));

  return (
    <ul className={cl.contactList} data-testid="contact">
      {contactList}
    </ul>
  );
};

export default Contact;
