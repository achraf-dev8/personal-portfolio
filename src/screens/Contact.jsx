import React, { useState, useEffect, useRef } from 'react';
import '../styles/Contact.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useApp } from '../context/AppContext';

const EMAIL = "ssportclan@gmail.com";
const PHONE = "+213780006920";
const PHONE_DISPLAY = "+213 780006920";

const ContactCard = ({ icon, title, displayValue, href, copyText, isExternal, copyLabel, copiedLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a 
      className="contact-card" 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="contact-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3>{title}</h3>
      <p dir="ltr">{displayValue}</p>
      <button className="contact-copy-btn" onClick={handleCopy} title="Copy to clipboard">
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
        <span>{copied ? copiedLabel : copyLabel}</span>
      </button>
    </a>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const { t } = useApp();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const heading    = section.querySelector('.contact-heading');
            const invitation = section.querySelector('.contact-invitation');
            const cards      = section.querySelectorAll('.contact-card');

            if (heading) heading.classList.add('visible');
            if (invitation) invitation.classList.add('visible');

            // Stagger cards
            cards.forEach((card, i) => {
              setTimeout(() => card.classList.add('visible'), 600 + i * 200);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="contact" className="contact-section" ref={sectionRef}>

      <h1 className="contact-heading">{t.contact.heading}</h1>

      <div className="contact-invitation">
        <h2>{t.contact.invitationH2}</h2>
        <p>{t.contact.invitationP}</p>
      </div>

      <div className="contact-details">
        <ContactCard
          icon={faEnvelope}
          title={t.contact.email}
          displayValue={EMAIL}
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
          copyText={EMAIL}
          isExternal={true}
          copyLabel={t.contact.copy}
          copiedLabel={t.contact.copied}
        />
        <ContactCard
          icon={faPhone}
          title={t.contact.phone}
          displayValue={PHONE_DISPLAY}
          href={`https://wa.me/${PHONE.replace('+', '')}`}
          copyText={PHONE_DISPLAY}
          isExternal={true}
          copyLabel={t.contact.copy}
          copiedLabel={t.contact.copied}
        />
      </div>

    </div>
  );
};

export default Contact;

