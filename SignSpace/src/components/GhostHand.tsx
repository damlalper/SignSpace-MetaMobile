import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface GhostHandProps {
  gestureData: any; // Replace with proper type
  visible: boolean;
}

const GhostHand: React.FC<GhostHandProps> = ({ gestureData, visible }) => {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      // Mock animation: rotate based on time if no gesture data
      mesh.current.rotation.x += delta * 0.5;
      mesh.current.rotation.y += delta * 0.2;
    }
  });

  if (!visible) return null;

  return (
    <mesh ref={mesh} scale={[0.5, 0.5, 0.5]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} transparent opacity={0.8} />
    </mesh>
  );
};

export default GhostHand;
