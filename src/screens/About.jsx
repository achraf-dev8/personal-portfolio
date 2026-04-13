import pfp from "../assets/pfp.png";
import profileVideo from "../assets/video.mp4";
import cvFile from "../assets/CV.pdf";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlay, faCalendarDays, faLocationDot, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, Fragment } from "react";
import { useApp } from "../context/AppContext";
import "../styles/About.css";

// Separate component so the hook mounts fresh when triggered / language changes
const TypewriterText = ({ bio }) => {
  const [text] = useTypewriter({
    words: [bio],
    typeSpeed: 18,
    deleteSpeed: 0,
    loop: 1,
  });
  return <>{text}<Cursor cursorStyle='|' cursorColor='var(--light-blue)' /></>;
};

function About() {
  const { t, lang } = useApp();
  const [showVideo, setShowVideo] = useState(false);
  const [started, setStarted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const sectionRef = useRef(null);

  const githubUrl = "https://www.github.com/achraf-dev8";
  const linkedinUrl = "https://www.linkedin.com/in/laifa-achraf-eddine/";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card    = section.querySelector('.about-card');
            const content = section.querySelector('.about-content-wrapper');

            if (card) card.classList.add('visible');
            if (content) content.classList.add('visible');

            setTimeout(() => setStarted(true), 500);
            observer.disconnect();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Restart typewriter when language changes
  useEffect(() => {
    setStarted(false);
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, [lang]);

  function imageIconBuilder(icon, url){
    return (
      <div className="social-icon" onClick={() => window.open(url, "_blank")}>
        <FontAwesomeIcon icon={icon} alt="icon" />
      </div>
    );
  }

  return (
    <div id="about" className="about-section" ref={sectionRef}>

        {/* LEFT */}
        <div className="about-card">
          <div className="profile-video-wrapper" onClick={() => setShowVideo(true)} style={{ position: 'relative' }}>
            {!imgLoaded && <div className="shimmer-skeleton" style={{ borderRadius: '50%' }}></div>}
            <img 
              src={pfp} 
              alt="pfp" 
              className="profile-image" 
              onLoad={() => setImgLoaded(true)}
              style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
            />
            <div className="play-overlay">
              <FontAwesomeIcon icon={faCirclePlay} />
            </div>
          </div>

          <div>
             <p style={{ fontSize: "12px", color: "var(--grey)", textAlign: "center", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px", fontWeight: "600" }}>{t.about.hiIm}</p>
             <h1 className="profile-name">
                {t.about.firstName} <span>{t.about.lastName}</span>
             </h1>
             <p className="profile-role">
                {t.about.role.split('&').map((part, i, arr) => (
                  <Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span>&</span>}
                  </Fragment>
                ))}
             </p>
          </div>

          <a href={cvFile} download="Laifa_Achraf_Eddine_CV.pdf" className="download-btn">
            {t.about.downloadCV}
          </a>

          <div className="social-icons">
             {imageIconBuilder(faLinkedin, linkedinUrl)}
             {imageIconBuilder(faGithub, githubUrl)}
          </div>

          {/* Info Badges — bottom of card */}
          <div className="about-info-list">
            <div className="about-info-item">
              <FontAwesomeIcon icon={faCalendarDays} className="about-info-icon" />
              <span>{t.about.age}</span>
            </div>
            <div className="about-info-item">
              <FontAwesomeIcon icon={faLocationDot} className="about-info-icon" />
              <span>{t.about.location}</span>
            </div>
            <div className="about-info-item">
              <FontAwesomeIcon icon={faGraduationCap} className="about-info-icon" />
              <span>{t.about.university} <span className="about-info-year">{t.about.universityYear}</span></span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="about-content-wrapper">
           <h1 className="about-heading">{t.about.heading}</h1>
           <p className="about-text">
             {started && <TypewriterText key={lang} bio={t.about.bio} />}
           </p>
        </div>

        {/* VIDEO DIALOG */}
        {showVideo && (
          <div className="video-dialog-overlay" onClick={() => setShowVideo(false)}>
            <div className="video-dialog" onClick={(e) => e.stopPropagation()}>
              <button className="video-close-btn" onClick={() => setShowVideo(false)}>&times;</button>
              <video
                src={profileVideo}
                className="video-dialog-player"
                autoPlay
                controls
              />
            </div>
          </div>
        )}

    </div>
  );
}

export default About;

