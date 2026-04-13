import { Menu } from "antd";
import logoLight from "./assets/logos/logo_light.png";
import logoDark from "./assets/logos/logo_dark.png";
import logoBrowserLight from "./assets/logos/logo_browser_light.png";
import logoBrowserDark from "./assets/logos/logo_browser_dark.png";
import { useApp } from "./context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import About from "./screens/About";
import Services from "./screens/Services";
import TechArsenal from "./screens/TechArsenal";
import Projects from "./screens/Projects";
import Contact from "./screens/Contact";

function Portfolio() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [activeSection, setActiveSection] = useState("about");
  const [navVisible, setNavVisible] = useState(true);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Dynamic favicon based on browser/system theme, NOT app theme
  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (!favicon) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateFavicon = (e) => {
      const isSystemDark = e.matches;
      favicon.href = isSystemDark ? logoBrowserDark : logoBrowserLight;
    };

    updateFavicon(mediaQuery);

    mediaQuery.addEventListener("change", updateFavicon);
    return () => mediaQuery.removeEventListener("change", updateFavicon);
  }, []);

  useEffect(() => {
    // 1. Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Hide/Show Nav Bar on scroll
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos < 50) {
        setNavVisible(true);
      } else {
        setNavVisible(prevScrollPos > currentScrollPos);
      }
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Highlight active section via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: "-30% 0px -60% 0px"
    });

    const sections = ['about', 'services', 'tech-arsenal', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = document.querySelector('.ant-menu-item-selected');
      if (activeItem) {
        const { offsetLeft, clientWidth } = activeItem;
        setIndicatorStyle({
          left: offsetLeft,
          width: clientWidth,
          opacity: 1
        });
      }
    };

    // Initial update and on activeSection change
    setTimeout(updateIndicator, 100); // Small delay to ensure Antd has updated classes

    // Also update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  function HeaderMenu() {
    const handleClick = (e) => {
      const section = document.getElementById(e.key);
      section?.scrollIntoView({ behavior: "smooth" });
    };

    const items = [
      { key: "about",        label: t.nav.about },
      { key: "services",     label: t.nav.services },
      { key: "tech-arsenal", label: t.nav.techArsenal },
      { key: "projects",     label: t.nav.projects },
      { key: "contact",      label: t.nav.contact },
    ];

    return (
      <div style={{ position: "relative", display: "flex", alignItems: "center", flex: 1, justifyContent: "flex-end" }}>
        {/* Sliding Indicator Pill */}
        <div style={{
          position: "absolute",
          height: "38px",
          background: "var(--icon-bg)",
          borderRadius: "12px",
          transition: "all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)",
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
          pointerEvents: "none",
          zIndex: 0
        }} />
        
        <Menu
          mode="horizontal"
          items={items}
          onClick={handleClick}
          selectedKeys={[activeSection]}
          style={{ 
            background: "transparent", 
            border: "none", 
            zIndex: 1, 
            width: "100%", 
            display: "flex", 
            justifyContent: "flex-end" 
          }}
        />
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: "20px",
        position: "fixed",
        width: "100%",
        top: navVisible ? "0" : "-100px",
        zIndex: 1000,
        background: "var(--card-bg)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "top 0.4s ease, background 0.3s ease",
      }}>
        <img 
          src={theme === "light" ? logoLight : logoDark} 
          alt="logo" 
          style={{ width: "50px", height: "50px", flexShrink: 0, objectFit: "contain" }} 
        />

        <HeaderMenu />

        {/* Toggle buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "12px", flexShrink: 0 }}>

          {/* Dark mode toggle */}
          <button onClick={toggleTheme} style={{
            background: "var(--icon-bg)",
            border: "none",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--light-blue)",
            fontSize: "1rem",
            transition: "background 0.3s ease",
          }}>
            <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
          </button>

          {/* Language toggle */}
          <button onClick={toggleLang} style={{
            background: "var(--icon-bg)",
            border: "none",
            borderRadius: "20px",
            padding: "6px 14px",
            cursor: "pointer",
            color: "var(--light-blue)",
            fontWeight: "700",
            fontSize: "0.85rem",
            letterSpacing: "0.5px",
            transition: "background 0.3s ease",
          }}>
            {lang === "en" ? "AR" : "EN"}
          </button>

        </div>
      </div>

      <About />
      <Services />
      <TechArsenal />
      <Projects />
      <Contact />

    </div>
  );
}

export default Portfolio;