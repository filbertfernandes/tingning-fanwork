import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense } from 'react';
import Modal from './components/Modal.jsx';
import { useMediaQuery } from 'react-responsive';
import Credits from './components/Credits.jsx';

const CanvasLoader = () => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-[#316897]">
      <img
        src="/images/title.webp"
        alt="Tinggal Meninggal"
        width={400}
        height={400}
        className="animate-pulse"
      />
    </div>
  );
};

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
      <Suspense fallback={<CanvasLoader />}>
        <Modal />
        <Credits />
        <Canvas
          camera={ {
            fov: isMobile ? 75 : 45,
            near: 0.1,
            far: 20,
            position: isMobile ? [-4.85, 3.33, 4.22] : [-5.3, 2.7, 3.2]
          } }
        >
          <Experience />
        </Canvas>
      </Suspense>
  )
}

export default App