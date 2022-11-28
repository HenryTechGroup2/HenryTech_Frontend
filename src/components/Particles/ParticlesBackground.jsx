import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import configParticles from './config';
import { loadFull } from 'tsparticles';
const ParticlesBackground = () => {
  //Configuracion para que funcionen las particulas de fondo instalado de libreria react-tsparticles y tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={configParticles}
    ></Particles>
  );
};

export default ParticlesBackground;
