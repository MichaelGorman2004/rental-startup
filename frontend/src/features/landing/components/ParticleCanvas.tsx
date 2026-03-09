import { Box } from '@mantine/core';
import { useParticles } from '../hooks/useParticles';
import classes from './ParticleCanvas.module.css';

/** Full-viewport canvas with drifting copper particles. */
export function ParticleCanvas() {
  const canvasRef = useParticles();

  return (
    <Box className={classes['wrapper']}>
      <canvas ref={canvasRef} className={classes['canvas']} aria-hidden="true" />
    </Box>
  );
}
