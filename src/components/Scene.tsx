import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { StarField } from './StarField';
import { AsteroidBelt } from './AsteroidBelt';
import { CameraRig } from './CameraRig';
import { SimulationDriver } from './SimulationDriver';
import { PLANETS } from '../data/planets';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [70, 55, 95], fov: 50, near: 0.1, far: 2000 }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <color attach="background" args={['#050810']} />
      {/* Low ambient so the side facing away from the sun reads as night.
          Planets keep their colour there via an emissive texture floor, so a
          dark side never collapses into flat grey. */}
      <ambientLight intensity={0.1} color={'#ffffff'} />

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
