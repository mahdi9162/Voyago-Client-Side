import Lottie from 'lottie-react';
import carLoader from '../assets/images/Car revolving animation.json';

const Spinner = () => (
  <div className="flex items-center justify-center py-10">
    <div className="w-28 h-28">
      <Lottie animationData={carLoader} loop autoplay />
    </div>
  </div>
);

export default Spinner;
