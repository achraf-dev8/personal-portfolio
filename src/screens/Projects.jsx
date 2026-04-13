import React, { useRef, useState, useEffect } from 'react';
import '../styles/Projects.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useApp } from '../context/AppContext';

// Asset Import
import zayda1 from '../assets/screenhsots/zayda/zayda1.png';
import zayda2 from '../assets/screenhsots/zayda/zayda2.png';
import zayda3 from '../assets/screenhsots/zayda/zayda3.png';
import zayda4 from '../assets/screenhsots/zayda/zayda4.png';

import answerit1 from '../assets/screenhsots/answerit/answerit1.png';
import answerit2 from '../assets/screenhsots/answerit/answerit2.png';
import answerit3 from '../assets/screenhsots/answerit/answer3.png';
import answerit4 from '../assets/screenhsots/answerit/answerit4.png';
import answerit5 from '../assets/screenhsots/answerit/answerit5.png';
import answerit6 from '../assets/screenhsots/answerit/answerit6.png';

import stockmg1 from '../assets/screenhsots/stockmg/stockmg1.png';
import stockmg2 from '../assets/screenhsots/stockmg/stockmg2.png';
import stockmg3 from '../assets/screenhsots/stockmg/stockmg3.png';
import stockmg4 from '../assets/screenhsots/stockmg/stockmg4.png';
import stockmg5 from '../assets/screenhsots/stockmg/stockmg5.png';
import stockmg6 from '../assets/screenhsots/stockmg/stockmg6.png';

const ProjectCard = ({ project, isRtl }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(null);

  const nextImg = (e) => {
    e?.stopPropagation();
    setImgIndex((prev) => (prev + 1) % project.images.length);
  };
  
  const prevImg = (e) => {
    e?.stopPropagation();
    setImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const nextZoom = (e) => {
    e?.stopPropagation();
    setZoomIndex((prev) => (prev + 1) % project.images.length);
  };
  
  const prevZoom = (e) => {
    e?.stopPropagation();
    setZoomIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const openZoom = (index) => {
    setZoomIndex(index);
  };

  const closeZoom = (e) => {
    e?.stopPropagation();
    setZoomIndex(null);
  };

  return (
    <div className="project-card">
      <div className="project-images">
        {imgIndex > 0 && (
          <button className={`inner-nav-btn ${isRtl ? 'right' : 'left'}`} onClick={prevImg}>
            <FontAwesomeIcon icon={isRtl ? faChevronRight : faChevronLeft} />
          </button>
        )}
        
        <div className="project-images-track" style={{ transform: `translateX(${isRtl ? '' : '-'}${imgIndex * 100}%)` }}>
          {project.images.map((img, i) => (
            <img 
              key={i} 
              src={img} 
              alt={`${project.title} screenshot ${i}`} 
              className="project-screenshot"
              onClick={() => openZoom(i)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        
        {imgIndex < project.images.length - 1 && (
          <button className={`inner-nav-btn ${isRtl ? 'left' : 'right'}`} onClick={nextImg}>
            <FontAwesomeIcon icon={isRtl ? faChevronLeft : faChevronRight} />
          </button>
        )}
      </div>

      <div className="project-info">
        <h2 className="project-title">{project.title}</h2>
        <p className="project-desc">{project.description}</p>
      </div>

      {zoomIndex !== null && (
        <div className="zoom-modal-overlay" onClick={closeZoom}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="zoom-close-btn" onClick={closeZoom}>&times;</span>
            
            {zoomIndex > 0 && (
              <button className="zoom-nav-btn left" onClick={prevZoom}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}

            <img src={project.images[zoomIndex]} alt="Zoomed Project" className="zoom-img" />

            {zoomIndex < project.images.length - 1 && (
              <button className="zoom-nav-btn right" onClick={nextZoom}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const scrollRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { t, lang } = useApp();
  const isRtl = lang === 'ar';

  const imageGroups = [
    [zayda1, zayda2, zayda3, zayda4],
    [answerit1, answerit2, answerit3, answerit4, answerit5, answerit6],
    [stockmg1, stockmg2, stockmg3, stockmg4, stockmg5, stockmg6],
  ];

  const projectsList = t.projects.items.map((item, i) => ({
    id: i + 1,
    title: item.title,
    description: item.description,
    images: imageGroups[i],
  }));

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const absLeft = Math.abs(scrollLeft);
      // In RTL Chrome/Firefox, scrollLeft is negative. Start is 0. 
      // Safari is max to 0. We'll handle the standard modern behavior gracefully:
      setCanScrollLeft(absLeft > 5);
      setCanScrollRight(absLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  useEffect(() => {
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    if (!heading) return;

    // Hide heading immediately before first paint
    heading.classList.add('slide-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heading.classList.remove('slide-ready');
            heading.classList.add('visible');
            if (subtitle) subtitle.classList.add('visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  const scrollLeftNav = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ 
        left: isRtl ? scrollRef.current.offsetWidth : -scrollRef.current.offsetWidth, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ 
        left: isRtl ? -scrollRef.current.offsetWidth : scrollRef.current.offsetWidth, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div id="projects" className="projects-section">
      <div style={{ width: "100%", maxWidth: "1300px", margin: "0 auto", display: "flex", flexDirection: "column", height: "100%" }}>
        
        <h1 className="projects-heading" ref={headingRef}>{t.projects.heading}</h1>
        <p className="projects-subtitle" ref={subtitleRef}>{t.projects.subtitle}</p>

        <div className="projects-carousel-wrapper">
          {canScrollLeft && (
            <button className={`projects-nav-btn ${isRtl ? 'right' : 'left'}`} onClick={scrollLeftNav}>
              <FontAwesomeIcon icon={isRtl ? faChevronRight : faChevronLeft} />
            </button>
          )}

          <div className="projects-viewport" ref={scrollRef} onScroll={handleScroll}>
            {projectsList.map((project) => (
              <ProjectCard project={project} key={project.id} isRtl={isRtl} />
            ))}
          </div>

          {canScrollRight && (
            <button className={`projects-nav-btn ${isRtl ? 'left' : 'right'}`} onClick={scrollRightNav}>
              <FontAwesomeIcon icon={isRtl ? faChevronLeft : faChevronRight} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Projects;
