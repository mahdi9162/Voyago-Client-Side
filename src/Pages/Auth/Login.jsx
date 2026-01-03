import React, { use, useState } from 'react';
import Container from '../../components/container/Container';
import loginImgLight from '../../assets/images/LightLogin.webp';
import loginImgDark from '../../assets/images/loginDark.webp';
import { Link, useLocation, useNavigate } from 'react-router';
import LoginButton from '../../components/ui/LoginButton';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import GoogleButton from '../../components/ui/GoogleButton';
import { notifyError, notifySuccess } from '../../utils/toastService';
import logoImgLight from '../../assets/images/logo2.webp';
import logoImgDark from '../../assets/images/logo.webp';
import { motion } from 'framer-motion';
import { validatePassword } from '../../utils/validation';

const Login = () => {
  const { theme } = use(ThemeContext);
  const { loading, setLoading, setUser, userSignin, userLoginWithGoogle } = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const loginImage = theme === 'dark' ? loginImgDark : loginImgLight;

  const handleEmailPassLogin = (e) => {
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

    // User Signin
    userSignin(email, password)
      .then((res) => {
        const loginUser = res.user;
        setUser(loginUser);
        notifySuccess(`Logged in successfully! Welcome back ${loginUser?.displayName || 'there'} 🚀`);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          return notifyError('⚠️ Login failed! Check your credentials.');
        }
      })
      .finally(() => setLoading(false));
  };

  // user Google Login
  const handleGoogleLogin = () => {
    userLoginWithGoogle()
      .then((res) => {
        const loginUser = res.user;
        setUser(loginUser);
        notifySuccess(`Logged in successfully! Welcome back ${loginUser?.displayName || 'there'} 🚀`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        notifyError('⚠️ Login failed! Check your credentials.');
      })
      .finally(() => setLoading(false));
  };

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

  return (
    <>
      <Container>
        <section className="bg-(--bg-primary) rounded-4xl">
          <div className="flex lg:items-center justify-between mt-10 lg:my-14 flex-col lg:flex-row">
            {/* Login Form Start */}
            <figure className="flex justify-center my-4 lg:hidden">
              <img src={theme === 'dark' ? logoImgDark : logoImgLight} className="w-20" alt="" />
            </figure>
            <motion.div variants={formParentVariants} initial="hidden" animate="visible" className="flex-1 px-6 md:px-10 mb-10">
              <motion.h3 variants={formChildVariants} className="text-xl md:text-3xl font-semibold text-(--text-primary)">
                Welcome back to Voyago !
              </motion.h3>
              <motion.p variants={formChildVariants} className="mt-3 text-xs md:text-base text-(--text-muted)">
                Sign in to continue your Voyago journey.
              </motion.p>

              <motion.form variants={formChildVariants} onSubmit={handleEmailPassLogin} className="mt-6">
                <div className="rounded-2xl border border-white/10 bg-(--bg-secondary)/60 shadow-xl backdrop-blur-md p-6 md:p-8">
                  <div className="space-y-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="label block text-sm font-medium text-(--text-muted)">
                        Email
                      </label>
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
                      <label htmlFor="password" className="label block text-sm font-medium text-(--text-muted)">
                        Password
                      </label>
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

                    {/* Links */}
                    <div className="flex items-center flex-col lg:flex-row gap-3 lg:gap-0 justify-between pt-1">
                      <Link className="text-sm font-medium text-(--accent) hover:text-(--accent-cyan) transition-colors">
                        Forgot password?
                      </Link>
                      <p className=" text-sm text-(--text-muted)">
                        New to Voyago ?{' '}
                        <Link to="/signup" className="font-semibold text-(--accent) hover:text-(--accent-cyan)">
                          Sign up
                        </Link>
                      </p>
                    </div>
                    <div className="pt-2 w-full">
                      <LoginButton>{loading ? 'Logging in…' : 'Login'}</LoginButton>
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
            {/* Login Form End - image */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="w-[60%] relative h-[550px] lg:h-[700px] rounded-r-4xl overflow-hidden hidden lg:block"
            >
              <div className="absolute inset-0 bg-primary/10 "></div>
              <motion.img
                key={theme}
                src={loginImage}
                className="flex-2 absolute inset-0 h-full w-full object-cover"
                alt=""
                variants={imageVariants}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Login;
