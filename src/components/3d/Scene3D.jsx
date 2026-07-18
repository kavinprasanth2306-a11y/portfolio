import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, MeshDistortMaterial, Stars, 
  useGLTF, OrbitControls, Environment,
  ContactShadows, SpotLight
} from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

// 3D Room Model - loaded from /public/models/room.glb
function RoomModel({ scrollProgress }) {
  const { scene } = useGLTF('/models/room.glb')
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Slow auto-rotation + scroll-driven rotation
    groupRef.current.rotation.y = t * 0.05 + scrollProgress * Math.PI * 0.5
    
    // Subtle float
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.1 - 1
    
    // Scroll-driven zoom: camera moves closer as you scroll
    groupRef.current.scale.setScalar(1 + scrollProgress * 0.1)
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={1.5}>
      <primitive object={scene} />
    </group>
  )
}

// Fallback geometric scene (when no .glb is loaded yet)
function FallbackScene({ scrollProgress }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.08 + scrollProgress * Math.PI * 0.4
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.15
  })

  return (
    <group ref={groupRef}>
      {/* Desk-like shape */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor */}
      <mesh position={[0, 0.4, -0.3]}>
        <boxGeometry args={[1.6, 1, 0.05]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.9} roughness={0.1} emissive="#6366f1" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, 0.4, -0.28]}>
        <planeGeometry args={[1.4, 0.85]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.3} />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, -0.1, -0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, -0.42, 0.2]}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.6, -0.42, 0.2]}>
        <capsuleGeometry args={[0.04, 0.06, 4, 8]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[-1, -0.35, 0.3]}>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.4} />
      </mesh>

      {/* Desk legs */}
      {[[-1.4, -1.2, 0.6], [1.4, -1.2, 0.6], [-1.4, -1.2, -0.6], [1.4, -1.2, -0.6]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.03, 0.03, 1.4]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Ambient glow underneath */}
      <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.05} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// Particle field
function ParticleField({ scrollProgress }) {
  const pointsRef = useRef()
  const count = 400

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015 + scrollProgress * 0.3
    pointsRef.current.rotation.x = scrollProgress * 0.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

// Floating accent rings
function FloatingRings({ scrollProgress }) {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2 + scrollProgress * 2
      ring1.current.rotation.z = t * 0.1
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.15 + scrollProgress * 1.5
      ring2.current.rotation.x = t * 0.08
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.12 + scrollProgress
      ring3.current.rotation.y = t * 0.05
    }
  })

  return (
    <>
      <mesh ref={ring1} position={[3, 2, -5]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2} position={[-3, -1, -4]}>
        <torusGeometry args={[0.8, 0.015, 16, 64]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3} position={[0, 3, -6]}>
        <torusGeometry args={[1.5, 0.01, 16, 64]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} transparent opacity={0.2} />
      </mesh>
    </>
  )
}

// Scroll-driven camera
function ScrollCamera({ scrollProgress }) {
  useFrame(({ camera }) => {
    camera.position.z = 6 - scrollProgress * 1.5
    camera.position.y = 1 + scrollProgress * -2
    camera.position.x = Math.sin(scrollProgress * Math.PI) * 1.5
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      shadows
    >
      <ScrollCamera scrollProgress={scrollProgress} />

      {/* Lighting setup */}
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 5, 5]} intensity={1} color="#6366f1" angle={0.4} penumbra={0.5} castShadow />
      <spotLight position={[-3, 3, 4]} intensity={0.5} color="#ec4899" angle={0.3} penumbra={0.8} />
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#8b5cf6" />

      {/* Stars */}
      <Stars radius={40} depth={60} count={2000} factor={3} fade speed={0.3} />

      {/* Main 3D model - try to load room.glb, fallback to geometric desk */}
      <Suspense fallback={<FallbackScene scrollProgress={scrollProgress} />}>
        {/* 
          To use your own 3D room model:
          1. Download a .glb file from Sketchfab
          2. Put it in /public/models/room.glb
          3. Uncomment the line below and comment out FallbackScene
        */}
        {/* <RoomModel scrollProgress={scrollProgress} /> */}
        <FallbackScene scrollProgress={scrollProgress} />
      </Suspense>

      {/* Floating rings */}
      <FloatingRings scrollProgress={scrollProgress} />

      {/* Particle field */}
      <ParticleField scrollProgress={scrollProgress} />

      {/* Ground shadow */}
      <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={2} color="#6366f1" />
    </Canvas>
  )
}
