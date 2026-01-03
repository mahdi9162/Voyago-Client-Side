import React, { use, useState } from 'react';
import Container from '../../components/container/Container';
import signupLight from '../../assets/images/signupLight.webp';
import signupDark from '../../assets/images/signupDark.webp';
import { Link, useNavigate } from 'react-router';
import LoginButton from '../../components/ui/LoginButton';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { validatePassword } from '../../utils/validation';
import { motion } from 'framer-motion';
import GoogleButton from '../../components/ui/GoogleButton';
import { notifyError, notifySuccess } from '../../utils/toastService';
import logoImgLight from '../../assets/images/logo2.webp';
import logoImgDark from '../../assets/images/logo.webp';

// Motion start
const formParentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      when: 'beforeChildren',
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const formChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};
// Motion end

const Signup = () => {
  const { theme } = use(ThemeContext);
  const { loading, setUser, setLoading, userSignup, userLoginWithGoogle } = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const signupImage = theme === 'dark' ? signupDark : signupLight;

  const handleSignupWithEmailPass = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    // Password Validation
    const validationMsg = validatePassword(password);
    if (validationMsg) {
      setPasswordError(validationMsg);
      return;
    }
    setPasswordError('');

    // User Signup with email and password
    userSignup(email, password)
      .then((res) => {
        const loginUser = res.user;
        setUser(loginUser);
        notifySuccess(`🎉 Signup successful! Welcome aboard, ${loginUser?.displayName || 'there'} !`);
        navigate('/');
      })
      .catch((error) => {
        notifyError(`❌ Signup failed! ${error.message}`);
      })
      .finally(() => setLoading(false));
  };

  // user Google Login
  const handleGoogleLogin = () => {
    userLoginWithGoogle()
      .then((res) => {
        const loginUser = res.user;
        setUser(loginUser);
        notifySuccess(`🎉 Welcome to Voyago ${loginUser?.displayName || 'there'} ! Your account was created successfully via Google.🚀`);
        navigate('/');
      })
      .catch((error) => {
        notifyError(`❌ Signup failed! ${error.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container>
        <section className="bg-(--bg-primary) rounded-4xl">
          <div className="flex lg:items-center justify-between mt-10 lg:my-14 flex-col lg:flex-row ">
            {/* Logo for mobile */}
            <figure className="flex justify-center my-4 lg:hidden">
              <img src={theme === 'dark' ? logoImgDark : logoImgLight} className="w-20" alt="" />
            </figure>

            {/* Motion start - left form side */}
            <motion.div className="lg:w-[35%] px-6 md:px-10 mb-8 lg:mb-0" variants={formParentVariants} initial="hidden" animate="visible">
              <motion.h3 variants={formChildVariants} className="text-xl md:text-3xl font-semibold text-(--text-primary)">
                Sign up for Voyago !
              </motion.h3>

              <motion.p variants={formChildVariants} className="mt-3 text-xs md:text-base text-(--text-muted)">
                Start your effortless journey today.
              </motion.p>

              <motion.form variants={formChildVariants} onSubmit={handleSignupWithEmailPass} className="mt-4">
                <div className="rounded-2xl border border-white/10 bg-(--bg-secondary)/60 shadow-xl backdrop-blur-md p-6 md:p-8">
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="label block text-sm font-medium text-(--text-muted)">Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="
                          input mt-2 w-full rounded-xl
                          bg-(--bg-primary) text-(--text-primary)
                          placeholder:text-(--text-muted)
                          border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-(--accent)
                        "
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label block text-sm font-medium text-(--text-muted)">Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="
                          input mt-2 w-full rounded-xl
                          bg-(--bg-primary) text-(--text-primary)
                          placeholder:text-(--text-muted)
                          border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-(--accent)
                        "
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="label block text-sm font-medium text-(--text-muted)">Password</label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="
                          input mt-2 w-full rounded-xl
                          bg-(--bg-primary) text-(--text-primary)
                          placeholder:text-(--text-muted)
                          border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-(--accent)
                        "
                      />
                      {passwordError && (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className=" text-xs font-medium text-red-400 py-2"
                        >
                          🚫 {passwordError}
                        </motion.p>
                      )}
                    </div>

                    {/* Photo URL */}
                    <div>
                      <label className="label block text-sm font-medium text-(--text-muted)">Photo URL</label>
                      <input
                        id="photoURL"
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className="
                          input mt-2 w-full rounded-xl
                          bg-(--bg-primary) text-(--text-primary)
                          placeholder:text-(--text-muted)
                          border border-white/10
                          focus:outline-none focus:ring-2 focus:ring-(--accent)
                        "
                      />
                    </div>

                    {/* Links */}
                    <div>
                      <p className=" text-xs text-center lg:text-left text-(--text-muted)">
                        Already have an account ?{' '}
                        <Link to="/login" className="font-semibold text-(--accent) hover:text-(--accent-cyan)">
                          Login
                        </Link>
                      </p>
                    </div>

                    <div className="w-full ">
                      <LoginButton>{loading ? 'Signing in…' : 'Sign Up'}</LoginButton>
                    </div>
                  </div>
                </div>
              </motion.form>

              <motion.div
                variants={formChildVariants}
                className="-mt-6 px-6 md:px-8 pb-8 rounded-b-2xl border-x border-b border-white/10 bg-(--bg-secondary)/60 shadow-xl backdrop-blur-md"
              >
                <p className="text-center mb-1 text-(--text-muted)">Or</p>
                <GoogleButton onClick={handleGoogleLogin} />
              </motion.div>
            </motion.div>
            {/* Motion end - left */}

            <div className="w-[60%] relative h-[550px] lg:h-[700px] rounded-r-4xl overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-black/10 "></div>
              {/* Motion start - right image */}
              <motion.img
                key={theme}
                src={signupImage}
                className="flex-2 absolute inset-0 h-full w-full object-cover"
                alt=""
                variants={imageVariants}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
              {/* Motion end - right image */}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Signup;
