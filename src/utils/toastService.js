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
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    maxWidth: '420px',
    marginTop: '8px',
  },
};

const successColors = {
  bgColor: 'rgba(15, 23, 42, 0.96)',
  borderColor: 'rgba(74, 222, 128, 0.5)',
  textColor: '#dcfce7',
  progressBarColor: '#22c55e',
};

const errorColors = {
  bgColor: 'rgba(15, 23, 42, 0.96)',
  borderColor: 'rgba(248, 113, 113, 0.55)',
  textColor: '#fee2e2',
  progressBarColor: '#f97373',
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
    progressStyle: { background: errorColors.progressBarColor },
  });
};
