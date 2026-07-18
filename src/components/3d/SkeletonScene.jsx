import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, Text, Html } from '@react-three/drei'
import { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'

/**
 * Skeleton Scroll Experience:
 * - A 3D human skeleton is positioned vertically
 * - The camera starts at the skull and scrolls DOWN the spine
 * - At each vertebra/bone region, portfolio content appears as floating HTML panels
 * - Bones glow as you reach them
 */

// Skeleton model loader
function SkeletonModel({ scrollProgress }) {
  const groupRef = useRef()
  
  // Try loading the model, fallback to procedural skeleton
  let model = null
  try {
    const gltf = useGLTF('/models/skeleton.glb')
    model = gltf.scene
  } catch(e) {
    model = null
  }

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    // Subtle sway
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.02
  })

  if (model) {
    return (
      <group ref={groupRef} position={[0, 0, 0]} scale={2}>
        <primitive object={model} />
      </group>
    )
  }

  // Procedural skeleton fallback
  return <ProceduralSkeleton scrollProgress={scrollProgress} ref={groupRef} />
}

// Procedural skeleton made of bones/joints
const ProceduralSkeleton = ({ scrollProgress }) => {
  const groupRef = useRef()
  const bonesRef = useRef([])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.015
    
    // Make bones glow based on scroll position
    bonesRef.current.forEach((bone, i) => {
      if (!bone) return
      const boneProgress = i / 20
      const dist = Math.abs(scrollProgress - boneProgress)
      const glow = Math.max(0, 1 - dist * 5)
      bone.material.emissiveIntensity = glow * 2
    })
  })

  // Spine vertebrae positions (top to bottom, skull to pelvis)
  const vertebrae = useMemo(() => {
    const v = []
    for (let i = 0; i < 24; i++) {
      const y = 8 - i * 0.7
      const z = Math.sin(i * 0.15) * 0.3 // natural spine curve
      v.push([0, y, z])
    }
    return v
  }, [])

  // Rib positions (attached to upper spine)
  const ribs = useMemo(() => {
    const r = []
    for (let i = 3; i < 15; i++) {
      const y = 8 - i * 0.7
      const spread = 0.8 + (i - 3) * 0.05
      r.push({ y, spread, index: i })
    }
    return r
  }, [])

  return (
    <group ref={groupRef}>
      {/* Skull */}
      <mesh position={[0, 9, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.6} emissive="#6366f1" emissiveIntensity={0} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 8.3, 0.2]}>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshStandardMaterial color="#d4ccc0" roughness={0.7} />
      </mesh>

      {/* Spine vertebrae */}
      {vertebrae.map((pos, i) => (
        <mesh
          key={`v-${i}`}
          position={pos}
          ref={(el) => { bonesRef.current[i] = el }}
        >
          <cylinderGeometry args={[0.12 + i * 0.005, 0.14 + i * 0.005, 0.25, 8]} />
          <meshStandardMaterial
            color="#e8e0d4"
            roughness={0.5}
            emissive="#6366f1"
            emissiveIntensity={0}
          />
        </mesh>
      ))}

      {/* Ribs */}
      {ribs.map((rib, i) => (
        <group key={`rib-${i}`}>
          {/* Left rib */}
          <mesh position={[-rib.spread, rib.y, 0]} rotation={[0, 0, 0.4 + i * 0.02]}>
            <torusGeometry args={[rib.spread * 0.7, 0.03, 8, 16, Math.PI * 0.7]} />
            <meshStandardMaterial color="#e0d8cc" roughness={0.6} emissive="#8b5cf6" emissiveIntensity={0.1} />
          </mesh>
          {/* Right rib */}
          <mesh position={[rib.spread, rib.y, 0]} rotation={[0, Math.PI, 0.4 + i * 0.02]}>
            <torusGeometry args={[rib.spread * 0.7, 0.03, 8, 16, Math.PI * 0.7]} />
            <meshStandardMaterial color="#e0d8cc" roughness={0.6} emissive="#8b5cf6" emissiveIntensity={0.1} />
          </mesh>
        </group>
      ))}

      {/* Pelvis */}
      <mesh position={[0, -8.5, 0]}>
        <torusGeometry args={[0.8, 0.12, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ddd5c9" roughness={0.6} />
      </mesh>

      {/* Shoulder blades */}
      <mesh position={[-1.2, 5.5, -0.3]} rotation={[0.2, 0.3, 0.5]}>
        <boxGeometry args={[0.8, 0.6, 0.08]} />
        <meshStandardMaterial color="#ddd5c9" roughness={0.7} />
      </mesh>
      <mesh position={[1.2, 5.5, -0.3]} rotation={[0.2, -0.3, -0.5]}>
        <boxGeometry args={[0.8, 0.6, 0.08]} />
        <meshStandardMaterial color="#ddd5c9" roughness={0.7} />
      </mesh>

      {/* Arms (upper) */}
      {[-1, 1].map((side) => (
        <group key={`arm-${side}`}>
          <mesh position={[side * 1.8, 4.5, 0]} rotation={[0, 0, side * 0.15]}>
            <cylinderGeometry args={[0.06, 0.05, 2.5]} />
            <meshStandardMaterial color="#e0d8cc" roughness={0.6} />
          </mesh>
          {/* Forearm */}
          <mesh position={[side * 2, 2.5, 0.3]} rotation={[0.3, 0, side * 0.1]}>
            <cylinderGeometry args={[0.05, 0.04, 2.2]} />
            <meshStandardMaterial color="#e0d8cc" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Legs */}
      {[-1, 1].map((side) => (
        <group key={`leg-${side}`}>
          <mesh position={[side * 0.5, -10.5, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 3.5]} />
            <meshStandardMaterial color="#e0d8cc" roughness={0.6} />
          </mesh>
          <mesh position={[side * 0.5, -13.5, 0.2]}>
            <cylinderGeometry args={[0.06, 0.05, 3]} />
            <meshStandardMaterial color="#e0d8cc" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Camera that scrolls down the spine
function SpineCamera({ scrollProgress }) {
  useFrame(({ camera }) => {
    // Camera travels from skull (y=10) down to feet (y=-14)
    const startY = 10
    const endY = -14
    const y = startY + (endY - startY) * scrollProgress
    
    camera.position.set(3, y, 5)
    camera.lookAt(0, y - 1, 0)
  })
  return null
}

// Floating particles along the spine
function SpineParticles({ scrollProgress }) {
  const ref = useRef()
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#6366f1" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export default function SkeletonScene({ scrollProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [3, 10, 5], fov: 50 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <SpineCamera scrollProgress={scrollProgress} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 10, 5]} intensity={1.5} color="#6366f1" angle={0.5} penumbra={0.8} />
      <spotLight position={[-3, -5, 4]} intensity={0.8} color="#ec4899" angle={0.4} penumbra={0.6} />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#8b5cf6" />

      {/* Skeleton */}
      <Suspense fallback={null}>
        <ProceduralSkeleton scrollProgress={scrollProgress} />
      </Suspense>

      {/* Particles */}
      <SpineParticles scrollProgress={scrollProgress} />
    </Canvas>
  )
}
