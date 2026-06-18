import type { Object3D } from 'three';

const registry = new Map<string, Object3D>();

export function registerObject3D(id: string, obj: Object3D) {
  registry.set(id, obj);
}

export function unregisterObject3D(id: string) {
  registry.delete(id);
}

export function getObject3D(id: string): Object3D | undefined {
  return registry.get(id);
}
