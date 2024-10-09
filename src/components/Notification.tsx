import React, { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  show,
  onClose,
}) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [show]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // Trigger the onClose callback after 5 seconds
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } transition-all duration-500 ease-in-out`}
    >
      {/* Notification Box with margin and adjusted width */}
      <div className="w-auto max-w-xl px-6 py-3 m-4 text-center text-white bg-red-500 rounded shadow-lg pointer-events-auto">
        <div className="flex items-start justify-between">
          <span className="mr-4">{message}</span>
          <button onClick={() => setVisible(false)} className="font-bold">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
