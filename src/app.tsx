import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { initHeroCanvas } from './webgl/heroCanvas';
import ResponsivePreview from './ResponsivePreview';

type FinishId = 'sage' | 'basalt' | 'glacier';

const FINISH_META: Record<FinishId, { name: string; dot: string }> = {
  sage: { name: 'Alpine Sage', dot: '#48634B' },
  basalt: { name: 'Basalt Black', dot: '#222624' },
  glacier: { name: 'Glacier Silver', dot: '#B4BDB8' },
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [finish, setFinish] = useState<FinishId>('sage');
  const [view, setView] = useState<'landing' | 'app'>('landing');

  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const tiltWrapRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (view !== 'landing') return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const cleanupHeroGl = initHeroCanvas(heroCanvasRef.current);

    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;
    let velX = 0;
    let velY = 0;
    let tiltTicker: (() => void) | null = null;

    const heroStage = heroStageRef.current;
    const onHeroMove = (e: PointerEvent) => {
      if (!heroStage) return;
      const rect = heroStage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = nx * 14;
      targetRotX = -ny * 10;
    };
    const onHeroLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    if (heroStage && tiltWrapRef.current && !prefersReduced) {
      heroStage.addEventListener('pointermove', onHeroMove);
      heroStage.addEventListener('pointerleave', onHeroLeave);
      tiltTicker = () => {
        const ax = (targetRotX - curRotX) * 0.08;
        const ay = (targetRotY - curRotY) * 0.08;
        velX = (velX + ax) * 0.82;
        velY = (velY + ay) * 0.82;
        curRotX += velX;
        curRotY += velY;
        if (tiltWrapRef.current) {
          tiltWrapRef.current.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;
        }
        if (shadowRef.current) {
          shadowRef.current.style.transform = `translateX(${(-curRotY * 1.4).toFixed(1)}px) scale(${1 - Math.abs(curRotX) * 0.01})`;
        }
      };
      gsap.ticker.add(tiltTicker);
    }

    return () => {
      cleanupHeroGl();
      if (tiltTicker) gsap.ticker.remove(tiltTicker);
      heroStage?.removeEventListener('pointermove', onHeroMove);
      heroStage?.removeEventListener('pointerleave', onHeroLeave);
    };
  }, [view]);

  if (view === 'app') {
    return <ResponsivePreview onBack={() => setView('landing')} />;
  }

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />

      <header className="site-header" id="site-header">
        <div className="container header-inner">
          <a href="#hero" className="brand-lockup" aria-label="Higen Home">
            <svg
              className="brand-mark"
              width="24"
              height="15"
              viewBox="0 0 28 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 16L10.5 3L16 11.5L19.5 6.5L26 16H2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="brand-wordmark">Higen</span>
          </a>

          <nav className="header-nav" aria-label="Primary">
            <button
              type="button"
              className="icon-btn theme-toggle"
              aria-label="Toggle color theme"
              title="Switch light or dark theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <svg width="19" height="19" viewBox="0 0 256 256" fill="none" aria-hidden="true">
                <circle cx="128" cy="128" r="56" stroke="currentColor" strokeWidth="18" />
                <line x1="128" y1="24" x2="128" y2="44" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="128" y1="212" x2="128" y2="232" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="24" y1="128" x2="44" y2="128" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="212" y1="128" x2="232" y2="128" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="54" y1="54" x2="68" y2="68" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="188" y1="188" x2="202" y2="202" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="54" y1="202" x2="68" y2="188" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                <line x1="188" y1="68" x2="202" y2="54" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <canvas
            ref={heroCanvasRef}
            id="hero-gl-canvas"
            className="hero-canvas"
            aria-hidden="true"
          />

          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 className="hero-title">Preview any site. Any screen.</h1>
              <p className="hero-sub">
                Higen lets developers preview websites across iPhones, MacBooks,
                and Windows devices at once, so you can catch responsive bugs
                before your users do.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn btn-primary magnetic-btn"
                  onClick={() => setView('app')}
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="hero-stage" ref={heroStageRef} id="hero-stage">
              <div className="flask-tilt-wrap" ref={tiltWrapRef} id="flask-tilt-wrap">
                <img
                  src="https://www.gstatic.com/aistudio/starter-apps/flask-applet/flask-cutout.webp"
                  alt="Higen device preview illustration"
                  className="flask-hero-img"
                  id="hero-flask-img"
                  data-finish={finish}
                  width={519}
                  height={940}
                />
              </div>
              <div className="flask-shadow" ref={shadowRef} aria-hidden="true" />

              <div className="hero-swatches" role="radiogroup" aria-label="Select theme finish">
                {(Object.keys(FINISH_META) as FinishId[]).map((key) => {
                  const meta = FINISH_META[key];
                  const isActive = finish === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      className={`swatch-btn${isActive ? ' is-active' : ''}`}
                      data-finish={key}
                      aria-checked={isActive}
                      aria-label={`${meta.name} finish`}
                      onClick={() => setFinish(key)}
                    >
                      <span className="swatch-dot" style={{ background: meta.dot }} />
                      <span className="swatch-label">{meta.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}