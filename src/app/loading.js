"use client";

export default function Loader() {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .spinner {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="spinner"></div>
    </div>
  );
}