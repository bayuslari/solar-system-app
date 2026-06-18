import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSimStore } from '../store/useSimStore';
import { getObject3D } from '../store/objectRegistry';

const DEFAULT_CAMERA_POS = new THREE.Vector3(70, 55, 95);

export function CameraRig() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const selectedId = useSimStore((s) => s.selectedId);
  const focusRadius = useSimStore((s) => s.focusRadius);
  const resetSignal = useSimStore((s) => s.resetSignal);

  const prevTarget = useRef(new THREE.Vector3(0, 0, 0));
  const prevSelectedId = useRef<string | null>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(0, 0, 0);
    camera.position.copy(DEFAULT_CAMERA_POS);
    prevTarget.current.set(0, 0, 0);
    prevSelectedId.current = null;
    controlsRef.current.update();
    // resetSignal is intentionally the only dependency that matters here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  useFrame(() => {
    if (!controlsRef.current) return;
    const obj = selectedId ? getObject3D(selectedId) : null;

    if (obj) {
      const worldPos = new THREE.Vector3();
      obj.getWorldPosition(worldPos);

      if (prevSelectedId.current !== selectedId) {
        const dir = camera.position.clone().sub(controlsRef.current.target);
        if (dir.lengthSq() < 0.0001) dir.set(0.6, 0.4, 0.8);
        dir.normalize();
        controlsRef.current.target.copy(worldPos);
        camera.position.copy(worldPos.clone().add(dir.multiplyScalar(focusRadius)));
        prevTarget.current.copy(worldPos);
        prevSelectedId.current = selectedId;
      } else {
        const delta = worldPos.clone().sub(prevTarget.current);
        camera.position.add(delta);
        controlsRef.current.target.add(delta);
        prevTarget.current.copy(worldPos);
      }
    } else {
      prevSelectedId.current = null;
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={3}
      maxDistance={420}
    />
  );
}
