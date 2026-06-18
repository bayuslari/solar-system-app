import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { StarField } from './StarField';
import { AsteroidBelt } from './AsteroidBelt';
import { CameraRig } from './CameraRig';
import { SimulationDriver } from './SimulationDriver';
import { PLANETS } from '../data/planets';
import { useSimStore } from '../store/useSimStore';

export function Scene() {
  const deselect = useSimStore((s) => s.deselect);

  return (
    <Canvas
      camera={{ position: [70, 55, 95], fov: 50, near: 0.1, far: 2000 }}
      onPointerMissed={() => deselect()}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <color attach="background" args={['#050810']} />
      <ambientLight intensity={0.35} color={'#ffffff'} />

      <StarField />
      <Sun />
      {PLANETS.map((planet) => (
        <Planet key={planet.id} planet={planet} />
      ))}
      <AsteroidBelt />

      <SimulationDriver />
      <CameraRig />
    </Canvas>
  );
}
