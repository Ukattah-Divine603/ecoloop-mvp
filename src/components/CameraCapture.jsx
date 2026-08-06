import { useEffect, useRef, useState } from "react";
import { X, Camera, RotateCcw, Check } from "lucide-react";

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError(
          "Could not access camera. Check browser permissions or upload a photo instead.",
        );
      }
    }

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function handleCapture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setPhoto(canvas.toDataURL("image/png"));
  }

  function handleRetake() {
    setPhoto(null);
  }

  function handleConfirm() {
    canvasRef.current.toBlob((blob) => {
      const file = new File([blob], "waste-scan.png", { type: "image/png" });
      onCapture(file);
    }, "image/png");
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 z-10"
        >
          <X size={16} />
        </button>

        {error ? (
          <div className="h-72 flex items-center justify-center text-center text-gray-400 px-4">
            {error}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-black">
            {!photo ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-72 object-cover"
              />
            ) : (
              <img
                src={photo}
                alt="Captured"
                className="w-full h-72 object-cover"
              />
            )}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {!error && (
          <div className="flex items-center justify-center gap-4 mt-4">
            {!photo ? (
              <button
                onClick={handleCapture}
                className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center hover:bg-emerald-400 transition"
              >
                <Camera size={24} className="text-black" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetake}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <RotateCcw size={18} />
                  Retake
                </button>

                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
                >
                  <Check size={18} />
                  Use Photo
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
