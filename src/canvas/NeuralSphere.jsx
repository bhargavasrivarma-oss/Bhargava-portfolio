import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function SphereMesh() {
  const groupRef = useRef();

  useFrame((state) => {
    const { clock, pointer } = state;
    if (groupRef.current) {
      // Rotation drift
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      
      // Interpolate rotation towards mouse coords
      const targetX = pointer.y * 0.3;
      const targetY = pointer.x * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY + clock.getElapsedTime() * 0.12, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Sphere Grid */}
      <mesh>
        <sphereGeometry args={[1.7, 24, 24]} />
        <meshBasicMaterial
          color="#00f5ff"
          wireframe={true}
          transparent={true}
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Inner Sphere Matrix */}
      <mesh>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshBasicMaterial
          color="#7c3aed"
          wireframe={true}
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Futuristic Orbit Ring (Vertical Angle) */}
      <mesh rotation={[Math.PI / 2.5, 0.5, 0]}>
        <torusGeometry args={[2.1, 0.008, 6, 64]} />
        <meshBasicMaterial
          color="#00ffb2"
          transparent={true}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbit Ring (Horizontal Angle) */}
      <mesh rotation={[Math.PI / -3, -0.4, 0]}>
        <torusGeometry args={[2.3, 0.006, 6, 64]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function NeuralSphere() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Glowing atmospheric core behind sphere */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-secondary/15 blur-[60px] pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.0} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f5ff" />
        <SphereMesh />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
