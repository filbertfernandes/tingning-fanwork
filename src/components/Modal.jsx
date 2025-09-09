import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../providers/AppContext";

const Modal = ({ onClose }) => {
	const { showModal, setShowModal } = useContext(AppContext);

	if (showModal === null) return null;

	// useEffect(() => {
	// 	console.log(showModal)
	// }, [showModal])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			{showModal.type === 'trailer' ? (
				<div className="relative w-[45vh] h-[30vh] flex items-center justify-center md:w-[70vw] md:h-[75vh]">
					<button
						className="absolute -top-10 -right-2 z-50 flex items-center justify-center 
										size-12 rounded-xl border-4 border-[#abf630] bg-[#316897] 
										transform rotate-12 shadow-lg hover:scale-110 transition cursor-pointer
										md:-top-10 md:-right-10 md:size-16 md:border-6"
						onClick={() => setShowModal(null)}
						aria-label="Close modal"
					>
						<IoClose className="text-[#abf630] text-4xl md:text-6xl" />
					</button>

					<iframe
						className="rounded-xl shadow-2xl w-full h-full"
						src={showModal.embedLink}
						title="YouTube video player"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						style={{ border: 'none' }}
					/>
				</div>
			) : showModal.type === 'poster' ? (
				<div className="relative h-[75vh] w-auto max-h-[80vh] flex items-center justify-center">
					<button
						className="absolute top-2 -right-4 z-50 flex items-center justify-center 
										size-12 rounded-xl border-4 border-[#abf630] bg-[#316897] 
										transform rotate-12 shadow-lg hover:scale-110 transition cursor-pointer
										md:-top-10 md:-right-10 md:size-16 md:border-6"
						onClick={() => setShowModal(null)}
						aria-label="Close modal"
					>
						<IoClose className="text-[#abf630] text-4xl md:text-6xl" />
					</button>
					<img
						className="rounded-xl shadow-2xl h-full w-auto object-contain"
						src={showModal.imageSource}
						alt="Poster"
						style={{ border: 'none', maxHeight: '100%', maxWidth: '90vw' }}
					/>
				</div>
			) : (
				null
			)}
    </div>
  );
};

export default Modal;
