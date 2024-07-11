// src/components/ClientModel.tsx
'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';

const Model = () => {
  const fbx = useFBX('/models/second.fbx');
  return <primitive object={fbx} scale={0.01} />;
};

const ClientModel = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ClientModel;
