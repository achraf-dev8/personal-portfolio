import React, { useEffect, useRef } from 'react';
import '../styles/Services.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faLaptopCode, faServer, faNetworkWired, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { useApp } from '../context/AppContext';

const Services = () => {
  const gridRef = useRef(null);
  const headingRef = useRef(null);
  const { t } = useApp();

  const icons = [faMobileScreenButton, faLaptopCode, faServer, faNetworkWired, faPenNib];

  const services = t.services.items.map((item, i) => ({
    id: i + 1,
    icon: icons[i],
    title: item.title,
    description: item.description,
  }));

  useEffect(() => {
    const grid = gridRef.current;
    const heading = headingRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (heading) heading.classList.add('visible');
            const cards = grid.querySelectorAll('.service-card');
            cards.forEach((card) => card.classList.add('visible'));
            observer.disconnect(); // fire only once
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="services" className="services-section">
      <h1 className="services-heading" ref={headingRef}>{t.services.heading}</h1>
      
      <div className="services-grid" ref={gridRef}>
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon-wrapper">
              <FontAwesomeIcon icon={service.icon} />
            </div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services;