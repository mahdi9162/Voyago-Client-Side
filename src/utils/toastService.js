import { toast } from 'react-toastify';

const baseToast = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  style: {
    fontWeight: 500,
    backdropFilter: 'blur(6px)',
    borderRadius: '12px',
  },
};

const successColors = {
  bgColor: 'rgba(0, 255, 170, 0.08)',
  borderColor: '#00ffaa40',
  textColor: '#00ffae',
  progressBarColor: '#00ffaa',
};

const errorColors = {
  bgColor: 'rgba(255, 0, 70, 0.08)',
  borderColor: '#ff4a4a40',
  textColor: '#ff4a4a',
  progressBarColor: '#ff4a4a',
};

export const notifySuccess = (message) => {
  toast.success(message, {
    ...baseToast,
    style: {
      ...baseToast.style,
      background: successColors.bgColor,
      border: `1px solid ${successColors.borderColor}`,
      color: successColors.textColor,
    },
    progressStyle: { background: successColors.progressBarColor },
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    ...baseToast,
    autoClose: 3000,
    style: {
      ...baseToast.style,
      background: errorColors.bgColor,
      border: `1px solid ${errorColors.borderColor}`,
      color: errorColors.textColor,
    },
    progressStyle: {
      background: errorColors.progressBarColor,
    },
  });
};
