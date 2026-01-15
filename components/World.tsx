
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Stars, 
  Environment, 
  Box,
  Plane,
  Sky,
  MeshReflectorMaterial,
  BakeShadows,
  Text,
  Torus,
  Float
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GraphicsSettings } from '../types';

// Aliases for speed and type-safety in JSX
const Group = 'group' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PointLight = 'pointLight' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const PlaneGeometry = 'planeGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const DirectionalLight = 'directionalLight' as any;
const GridHelper = 'gridHelper' as any;
const Fog = 'fog' as any;

// Use React.FC to allow 'key' prop when rendering in lists
const PalmTree: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Group position={position}>
      <Box args={[0.4, 8, 0.4]} position={[0, 4, 0]}>
        <MeshStandardMaterial color="#4a3728" roughness={1} />
      </Box>
      <Group position={[0, 8, 0]}>
        {[...Array(6)].map((_, i) => (
          <Box 
            key={i} 
            args={[4.5, 0.05, 1.2]} 
            rotation={[0.3, (i * Math.PI * 2) / 6, 0]} 
            position={[Math.cos((i * Math.PI * 2) / 6) * 1.8, 0, Math.sin((i * Math.PI * 2) / 6) * 1.8]}
          >
            <MeshStandardMaterial color="#1b3d16" />
          </Box>
        ))}
      </Group>
    </Group>
  );
};

// Use React.FC to allow 'key' prop when rendering in lists
const Landmark: React.FC<{ type: string, position: [number, number, number], rotation?: [number, number, number] }> = ({ type, position, rotation = [0, 0, 0] }) => {
  const wheelRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (wheelRef.current && type === 'ferris') {
      wheelRef.current.rotation.z += 0.005;
    }
  });

  switch (type) {
    case 'spire':
      return (
        <Group position={position}>
          <Box args={[10, 100, 10]} castShadow>
            <MeshStandardMaterial color="#00ffff" transparent opacity={0.25} metalness={1} roughness={0} />
          </Box>
          <PointLight position={[0, 60, 0]} color="#00ffff" intensity={120} distance={150} />
          <Box args={[2, 110, 2]}>
            <MeshStandardMaterial color="white" emissive="white" emissiveIntensity={10} />
          </Box>
        </Group>
      );
    case 'sign':
      return (
        <Group position={position} rotation={rotation}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <Text 
              fontSize={15} 
              color="white" 
              font="https://fonts.gstatic.com/s/chakrapetch/v11/c69_AEoLoV6pP4Y29ZfX_FUM79I.woff"
              anchorX="center"
              anchorY="middle"
            >
              GEMINI
            </Text>
          </Float>
          <Box args={[70, 20, 3]} position={[0, 0, -3]}>
            <MeshStandardMaterial color="#050505" />
          </Box>
          {[...Array(10)].map((_, i) => (
            <PointLight key={i} position={[i * 6 - 30, 0, 1]} color="white" intensity={2} distance={10} />
          ))}
        </Group>
      );
    case 'ferris':
      return (
        <Group position={position}>
          <Group ref={wheelRef}>
            <Torus args={[22, 1, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
              <MeshStandardMaterial emissive="#ff00ff" emissiveIntensity={15} />
            </Torus>
            {[...Array(16)].map((_, i) => (
              <Box key={i} args={[2.5, 2.5, 2.5]} position={[0, Math.cos((i * Math.PI * 2) / 16) * 22, Math.sin((i * Math.PI * 2) / 16) * 22]}>
                <MeshStandardMaterial emissive="#00ffff" emissiveIntensity={3} />
              </Box>
            ))}
          </Group>
          <Box args={[2, 50, 2]} position={[0, -25, 0]}>
            <MeshStandardMaterial color="#111" />
          </Box>
        </Group>
      );
    case 'observatory':
      return (
        <Group position={position}>
          <Mesh position={[0, 0, 0]} castShadow>
            <SphereGeometry args={[20, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <MeshStandardMaterial color="#222" metalness={1} roughness={0.05} />
          </Mesh>
          <Box args={[50, 8, 30]} position={[0, -4, 0]}>
            <MeshStandardMaterial color="#1a1a1a" />
          </Box>
          <PointLight position={[0, 20, 0]} color="#00ffcc" intensity={200} />
        </Group>
      );
    case 'cathedral':
      return (
        <Group position={position}>
          <Box args={[20, 40, 20]} castShadow>
            <MeshStandardMaterial color="#0a0a0a" />
          </Box>
          <Box args={[6, 80, 6]} position={[0, 20, 0]} castShadow>
            <MeshStandardMaterial color="#111" emissive="#ffaa00" emissiveIntensity={0.4} />
          </Box>
          <PointLight position={[0, 70, 0]} color="orange" intensity={100} />
        </Group>
      );
    case 'plaza':
      return (
        <Group position={position}>
          {[...Array(12)].map((_, i) => (
            <PalmTree key={i} position={[Math.sin(i * 0.6) * 20, 0, Math.cos(i * 0.6) * 20]} />
          ))}
          <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
            <PlaneGeometry args={[50, 50]} />
            <MeshStandardMaterial color="#050505" emissive="#00ff00" emissiveIntensity={0.05} />
          </Mesh>
        </Group>
      );
    case 'boardwalk':
      return (
        <Group position={position}>
          <Box args={[15, 1.5, 150]} position={[0, 0.75, 0]} receiveShadow>
            <MeshStandardMaterial color="#221105" />
          </Box>
          {[...Array(30)].map((_, i) => (
            <PointLight key={i} position={[0, 5, i * 5 - 75]} color="#ff4400" intensity={20} distance={15} />
          ))}
        </Group>
      );
    default: return null;
  }
};

// Use React.FC to allow 'key' prop when rendering in lists
const TrafficCarInstance: React.FC<{ lane: number, offset: number }> = ({ lane, offset }) => {
  const ref = useRef<THREE.Group>(null);
  const color = useMemo(() => ['#ff0000', '#ffffff', '#111111', '#0044ff', '#ffff00', '#44ff44'][Math.floor(Math.random() * 6)], []);
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z += speed * lane;
      if (lane > 0 && ref.current.position.z > 250) ref.current.position.z = -250;
      if (lane < 0 && ref.current.position.z < -250) ref.current.position.z = 250;
    }
  });

  return (
    <Group ref={ref} position={[lane * 20 + (lane > 0 ? 5 : -5), 0.75, (offset % 500) - 250]}>
      <Box args={[2.5, 1.2, 5]} castShadow>
        <MeshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </Box>
      <PointLight position={[0, 0.5, lane > 0 ? 3 : -3]} intensity={15} color={lane > 0 ? 'white' : 'red'} distance={8} />
      <Mesh position={[0.8, 0.2, lane > 0 ? 2.51 : -2.51]}>
        <PlaneGeometry args={[0.5, 0.3]} />
        <MeshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
      </Mesh>
      <Mesh position={[-0.8, 0.2, lane > 0 ? 2.51 : -2.51]}>
        <PlaneGeometry args={[0.5, 0.3]} />
        <MeshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
      </Mesh>
    </Group>
  );
};

// Internal component to hold all 3D content. This ensures it's a child of the Canvas provider.
const SceneContent: React.FC<{ graphics: GraphicsSettings }> = ({ graphics }) => {
  const cityscape = useMemo(() => {
    const buildings = [];
    for (let i = -15; i < 15; i++) {
      for (let j = -15; j < 15; j++) {
        if (Math.abs(i) > 2 || Math.abs(j) > 2) {
          if (Math.random() > 0.4) {
            const height = 20 + Math.random() * 60;
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.4).getStyle();
            buildings.push(
              <Group key={`${i}-${j}`} position={[i * 25, height / 2, j * 25]}>
                <Box args={[8, height, 8]} castShadow receiveShadow>
                  <MeshStandardMaterial color={color} roughness={0.05} metalness={0.9} />
                </Box>
                <PointLight position={[0, height / 2 + 2, 0]} intensity={25} color={color} distance={20} />
              </Group>
            );
          }
          if (Math.random() > 0.9) {
            buildings.push(<PalmTree key={`palm-${i}-${j}`} position={[i * 25 + 10, 0, j * 25 + 10]} />);
          }
        }
      }
    }
    return buildings;
  }, []);

  const wonders = useMemo(() => [
    <Landmark key="w1" type="spire" position={[0, 50, -180]} />,
    <Landmark key="w2" type="sign" position={[120, 60, -250]} rotation={[0, -0.3, 0]} />,
    <Landmark key="w3" type="ferris" position={[-150, 25, 80]} />,
    <Landmark key="w4" type="observatory" position={[180, 0, 180]} />,
    <Landmark key="w5" type="cathedral" position={[-180, 0, -180]} />,
    <Landmark key="w6" type="plaza" position={[80, 0, 150]} />,
    <Landmark key="w7" type="boardwalk" position={[-220, 0, 150]} />,
  ], []);

  const trafficCars = useMemo(() => {
    return Array.from({ length: Math.floor(80 * graphics.trafficDensity) }).map((_, i) => (
      <TrafficCarInstance key={i} lane={i % 2 === 0 ? 1 : -1} offset={i * 25.5} />
    ));
  }, [graphics.trafficDensity]);

  return (
    <>
      <Group>
        {cityscape}
        {wonders}
        {trafficCars}
        
        <Group position={[0, 1.8, 0]}>
          <Box args={[0.8, 2, 0.5]} castShadow>
            <MeshStandardMaterial color="#000" metalness={1} roughness={0} />
          </Box>
          <PointLight position={[0, 0.8, 0.8]} intensity={15} color="#00ffff" distance={10} />
        </Group>
      </Group>

      <Plane args={[1500, 1500]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        {graphics.reflections ? (
          <MeshReflectorMaterial
            blur={[400, 150]}
            resolution={1024}
            mixBlur={1}
            mixStrength={45}
            roughness={1}
            depthScale={1.5}
            color="#050505"
            metalness={0.7}
            mirror={0.95}
          />
        ) : (
          <MeshStandardMaterial color="#050505" roughness={0.9} />
        )}
      </Plane>

      <GridHelper args={[1500, 150, '#1a1010', '#050303']} position={[0, 0.1, 0]} />

      <OrbitControls 
        enableDamping 
        dampingFactor={0.03} 
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={15}
        maxDistance={250}
        target={[0, 10, 0]}
        makeDefault
      />
      
      <Environment preset="sunset" />

      <EffectComposer enableNormalPass={false}>
        {graphics.bloom && <Bloom luminanceThreshold={0.4} intensity={2.0} radius={0.5} mipmapBlur />}
        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
        <Vignette darkness={graphics.vignette} eskil={false} offset={0.1} />
      </EffectComposer>
    </>
  );
};

interface WorldProps {
  graphics: GraphicsSettings;
}

const World: React.FC<WorldProps> = ({ graphics }) => {
  return (
    <div className="w-full h-full absolute inset-0 bg-[#050308]">
      <Canvas shadows gl={{ antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[40, 30, 80]} fov={40} />
        <Fog attach="fog" args={['#050308', 40, 300]} />
        
        <Sky sunPosition={[100, 3, 100]} turbidity={12} rayleigh={4} mieCoefficient={0.01} mieDirectionalG={0.8} />
        <Stars radius={200} depth={50} count={10000} factor={6} fade speed={1.5} />
        
        <AmbientLight intensity={0.4} />
        <DirectionalLight 
          position={[100, 50, 100]} 
          intensity={3} 
          color="#ff7722" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />

        <SceneContent graphics={graphics} />

        <BakeShadows />
      </Canvas>
    </div>
  );
};

export default World;
