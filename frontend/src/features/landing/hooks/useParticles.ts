import {
  useRef, useEffect, useCallback,
} from 'react';
import { PARTICLE_CONFIG } from '../constants/landing.constants';
import type { Particle } from '../types/landing.types';

const {
  COUNT, MIN_RADIUS, MAX_RADIUS, MIN_SPEED, MAX_SPEED,
  MIN_OPACITY, MAX_OPACITY, COLOR,
  MOUSE_INFLUENCE_RADIUS, MOUSE_INFLUENCE_STRENGTH,
} = PARTICLE_CONFIG;

/** Generate a random float between min and max. */
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Create a single particle with randomized properties. */
function createParticle(width: number, height: number): Particle {
  const baseOpacity = rand(MIN_OPACITY, MAX_OPACITY);
  const sign = () => (Math.random() < 0.5 ? -1 : 1);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: rand(MIN_SPEED, MAX_SPEED) * sign(),
    vy: rand(MIN_SPEED, MAX_SPEED) * sign(),
    radius: rand(MIN_RADIUS, MAX_RADIUS),
    opacity: baseOpacity,
    baseOpacity,
  };
}

/** Wrap particle position when it exits the canvas bounds. */
function wrapPosition(particle: Particle, w: number, h: number) {
  const p = particle;
  if (p.x < -10) p.x = w + 10;
  else if (p.x > w + 10) p.x = -10;
  if (p.y < -10) p.y = h + 10;
  else if (p.y > h + 10) p.y = -10;
}

/** Update a single particle's physics and draw it. */
function updateParticle(
  particle: Particle,
  mx: number,
  my: number,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const p = particle;
  const dx = mx - p.x;
  const dy = my - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < MOUSE_INFLUENCE_RADIUS) {
    const force = (1 - dist / MOUSE_INFLUENCE_RADIUS)
      * MOUSE_INFLUENCE_STRENGTH;
    p.vx -= dx * force;
    p.vy -= dy * force;
    p.opacity = Math.min(p.baseOpacity * 1.8, 1);
  } else {
    p.opacity += (p.baseOpacity - p.opacity) * 0.02;
  }

  p.x += p.vx;
  p.y += p.vy;
  p.vx *= 0.995;
  p.vy *= 0.995;

  wrapPosition(p, w, h);

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${COLOR}, ${p.opacity})`;
  ctx.fill();
}

/**
 * Manages a full-screen canvas particle animation.
 * Returns a ref to attach to a <canvas> element.
 * Particles drift slowly and respond to mouse proximity.
 */
export function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      if (import.meta.env.DEV) console.warn('[useParticles] Failed to acquire 2D canvas context');
      return undefined;
    }

    function resize() {
      if (!canvas) return;
      const oldW = canvas.width || 1;
      const oldH = canvas.height || 1;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Scale existing particle positions proportionally to new dimensions
      particlesRef.current.forEach((p) => {
        p.x *= canvas.width / oldW;
        p.y *= canvas.height / oldH;
      });
    }

    resize();
    particlesRef.current = Array.from(
      { length: COUNT },
      () => createParticle(canvas.width, canvas.height),
    );

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;

      particlesRef.current.forEach((p) => {
        updateParticle(p, mx, my, ctx, canvas.width, canvas.height);
      });

      frameRef.current = requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return canvasRef;
}
