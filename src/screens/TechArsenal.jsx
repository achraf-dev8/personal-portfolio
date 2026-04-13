import React, { useEffect, useRef } from 'react';
import '../styles/TechArsenal.css';
import { useApp } from '../context/AppContext';

// Asset Imports
import androidStudioImg from '../assets/skills/android_studio.png';
import antigravityImg from '../assets/skills/antigravity.png';
import cssImg from '../assets/skills/css.png';
import dartImg from '../assets/skills/dart.png';
import expressImg from '../assets/skills/express.png';
import expressDarkImg from '../assets/skills/express_dark.png';
import figmaImg from '../assets/skills/figma.png';
import flutterImg from '../assets/skills/flutter.png';
import githubImg from '../assets/skills/github.png';
import githubDarkImg from '../assets/skills/github_dark.png';
import htmlImg from '../assets/skills/html.png';
import javaImg from '../assets/skills/java.png';
import javascriptImg from '../assets/skills/javascript.png';
import kotlinImg from '../assets/skills/kotlin.png';
import mongodbImg from '../assets/skills/mongodb.png';
import mysqlImg from '../assets/skills/mysql.png';
import phpImg from '../assets/skills/php.png';
import pythonImg from '../assets/skills/python.webp';
import reactImg from '../assets/skills/react.png';
import firebaseImg from '../assets/skills/firebase.png';

const TechArsenal = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const { t, theme } = useApp();

  const getInterpolatedColor = (percentage) => {
    const ratio = percentage / 100;
    const r = Math.round(255 + ratio * (53 - 255));
    const g = Math.round(73 + ratio * (151 - 73));
    const b = Math.round(138 + ratio * (255 - 138));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const techStack = [
    { id: 2, image: javascriptImg, title: "JavaScript", type: "Language", percentage: 95 },
    { id: 3, image: htmlImg, title: "HTML", type: "Language", percentage: 85 },
    { id: 4, image: cssImg, title: "CSS", type: "Language", percentage: 75 },
    { id: 5, image: reactImg, title: "React", type: "Framework", percentage: 90 },
    { id: 11, image: theme === 'dark' ? expressDarkImg : expressImg, title: "Express.js", type: "Framework", percentage: 90 },
    { id: 12, image: mongodbImg, title: "MongoDB", type: "Database", percentage: 90 },

    { id: 7, image: dartImg, title: "Dart", type: "Language", percentage: 95 },
    { id: 6, image: flutterImg, title: "Flutter", type: "Framework", percentage: 95 },
    { id: 10, image: phpImg, title: "PHP", type: "Language", percentage: 90 },
    { id: 13, image: mysqlImg, title: "MySQL", type: "Database", percentage: 95 },
    
    { id: 8, image: javaImg, title: "Java", type: "Language", percentage: 80 },
    { id: 9, image: kotlinImg, title: "Kotlin", type: "Language", percentage: 85 },
    { id: 16, image: androidStudioImg, title: "Android Studio", type: "Tool", percentage: 85 },
    { id: 14, image: firebaseImg, title: "Firebase", type: "Database", percentage: 85 },
    
    { id: 1, image: pythonImg, title: "Python", type: "Language", percentage: 90 },
    
    { id: 17, image: theme === 'dark' ? githubDarkImg : githubImg, title: "Git", type: "Tool", percentage: 85 },
    { id: 18, image: antigravityImg, title: "Antigravity", type: "Tool", percentage: 90 },
    { id: 15, image: figmaImg, title: "Figma", type: "Tool", percentage: 70 }, 
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section) return;

    // Hide heading immediately so there's no flash
    if (heading) heading.classList.add('slide-ready');

    const animateBar = (fillEl, target, delay) => {
      setTimeout(() => {
        const duration = (target / 100) * 3000;
        const start = performance.now();

        const step = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;

          fillEl.style.width = `${current}%`;
          fillEl.style.backgroundColor = getInterpolatedColor(current);

          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      }, delay);
    };

    const trigger = () => {
      if (heading) {
        heading.classList.remove('slide-ready');
        heading.classList.add('visible');
      }
      const fills = section.querySelectorAll('.tech-progress-fill');
      fills.forEach((fill, i) => {
        const target = parseFloat(fill.dataset.target);
        animateBar(fill, target, 300 + i * 60);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trigger();
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
    <div id="tech-arsenal" className="tech-section" ref={sectionRef}>
      <div className="tech-grid">
        <h1 className="tech-heading-grid" ref={headingRef}>{t.tech.heading}</h1>
        
        {techStack.map((tech) => (
          <div className="tech-card" key={tech.id}>
            <div className={`tech-img-wrapper ${tech.id === 11 ? 'express-wrapper' : ''} 
            ${tech.id === 12 ? 'mongodb-wrapper' : ''} ${tech.id === 10 ? 'php-wrapper' : ''} 
            ${tech.id === 13 ? 'mysql-wrapper' : ''} ${tech.id === 8 ? 'java-wrapper' : ''} ${tech.id === 9 ? 'kotlin-wrapper' : ''} ${tech.id === 16 ? 'android-studio-wrapper' : ''}`}>
              <img src={tech.image} alt={tech.title} className="tech-img" />
            </div>
            
            <h2 className="tech-title">{tech.title}</h2>
            <span className={`tech-type ${tech.type.toLowerCase()}`}>
              {tech.type}
            </span>
            
            <div className="tech-progress-container">
              <div className="tech-progress-header">
                <span>{t.tech.expertise}</span>
              </div>
              <div className="tech-progress-track">
                <div
                  className="tech-progress-fill"
                  data-target={tech.percentage}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechArsenal;

