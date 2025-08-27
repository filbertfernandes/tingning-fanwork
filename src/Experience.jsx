import { OrbitControls } from '@react-three/drei'
import Butterfly from './components/Butterfly';
import World from './components/World';
import { useMediaQuery } from 'react-responsive'

export default function Experience() {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <>
            <OrbitControls 
                target={isMobile ? [-0.011431438176874767, 0.8917167537103774, -0.16059589723201143] : [0.3074947182196721, 0.72, 0.2918472946144027]}
                enableDamping
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                maxDistance={7}
                minDistance={1}  
            />

            <color
                args={["#316897"]}
                attach="background"
            />

            <ambientLight intensity={1} />

            <World />
            <Butterfly />
        </>
    )
}