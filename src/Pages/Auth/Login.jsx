import React, { use, useRef, useState } from 'react';
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
import axiosPublic from '../../api/axiosPublic';

const Login = () => {
  const { theme } = use(ThemeContext);
  const { loading, setLoading, setUser, userSignin, userLoginWithGoogle } = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const loginImage = theme === 'dark' ? loginImgDark : loginImgLight;

  // refs for demo autofill
  const emailRef = useRef(null);
  const passRef = useRef(null);

  // Demo credentials
  const DEMO = {
    user: { email: 'wednesday@gmail.com', password: 'Mahdi16' },
    host: { email: 'hasina@gmail.com', password: 'Mahdi16' },
  };

  const handleFillDemo = (role) => {
    const creds = DEMO[role];
    if (!creds) return;

    if (emailRef.current) emailRef.current.value = creds.email;
    if (passRef.current) passRef.current.value = creds.password;
    setPasswordError('');
    notifySuccess(`${role === 'host' ? 'Host' : 'User'} demo credentials filled ✅`);
  };

  const handleEmailPassLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const validationMsg = validatePassword(password);
    if (validationMsg) {
      setPasswordError(validationMsg);
      return;
    }
    setPasswordError('');

    userSignin(email, password)
      .then(async (res) => {
        const loginUser = res.user;
        setUser(loginUser);

        const { data } = await axiosPublic.get(`/users?email=${loginUser?.email}`);
        localStorage.setItem('user-role', data?.role || 'user');
        localStorage.setItem('user-email', data?.email || '');

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

  // Google login (Login page)
  const handleGoogleLogin = () => {
    setLoading(true);

    userLoginWithGoogle()
      .then(async (res) => {
        const loginUser = res.user;
        setUser(loginUser);

        // default role for google users
        const userData = {
          firebaseUid: loginUser?.uid,
          name: loginUser?.displayName || 'Google User',
          email: loginUser?.email,
          role: 'user',
          photoURL: loginUser?.photoURL || '',
        };

        //  DB save
        await axiosPublic.post('/signup', userData);

        // localStorage: role store
        localStorage.setItem('user-role', 'user');
        localStorage.setItem('user-email', loginUser.email);

        notifySuccess(`Logged in successfully! Welcome back ${loginUser?.displayName || 'there'} 🚀`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        notifyError('⚠️ Login failed! Check your credentials.');
      })
      .finally(() => setLoading(false));
  };

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

  return (
    <>
      <Container>
        <section className="bg-(--bg-primary) rounded-4xl">
          <div className="flex lg:items-center justify-between mt-10 lg:my-14 flex-col lg:flex-row ">
            {/* Login Form Start */}
            <figure className="flex justify-center my-4 lg:hidden">
              <img src={theme === 'dark' ? logoImgDark : logoImgLight} className="w-20" alt="" />
            </figure>

            <motion.div variants={formParentVariants} initial="hidden" animate="visible" className="flex-1 px-6 md:px-10 mb-10">
              <motion.h3
                variants={formChildVariants}
                className="text-xl md:text-3xl font-semibold text-(--text-primary) text-center md:text-left"
              >
                Welcome back to Voyago !
              </motion.h3>

              <motion.p variants={formChildVariants} className="mt-3 text-xs md:text-base text-(--text-muted) text-center md:text-left">
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
                        ref={emailRef}
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
                        ref={passRef}
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
                    <div className="flex  flex-col lg:flex-row gap-3 lg:gap-0 justify-between pt-1">
                      <Link className="text-xs md:text-sm font-medium text-(--accent) hover:text-(--accent-cyan) transition-colors">
                        Forgot password?
                      </Link>
                      <p className=" text-sm text-(--text-muted)">
                        New to Voyago ?{' '}
                        <Link to="/signup" className="font-semibold text-(--accent) hover:text-(--accent-cyan)">
                          Sign up
                        </Link>
                      </p>
                    </div>

                    {/* Demo Credential Buttons - Premium Voyago Style */}
                    <div className="pt-4 px-1">
                      <div className="relative group p-px rounded-2xl bg-linear-to-r from-(--accent-cyan)/20 via-(--accent-purple)/20 to-(--accent-cyan)/20 overflow-hidden shadow-2xl">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-linear-to-r from-(--accent-cyan)/5 via-transparent to-(--accent-purple)/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative bg-(--bg-secondary)/80 backdrop-blur-xl rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5">
                          {/* Label with Glow Dot */}
                          <div className="flex items-center gap-3">
                            <div className="relative h-2 w-2">
                              <span className="absolute inset-0 rounded-full bg-(--accent-cyan) animate-ping opacity-40"></span>
                              <span className="relative block h-2 w-2 rounded-full bg-(--accent-cyan) shadow-[0_0_10px_var(--accent-cyan)]"></span>
                            </div>
                            <div className="flex flex-col text-left">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--accent-cyan)">Demo Access</p>
                              <p className="text-[9px] text-(--text-muted) uppercase tracking-tighter opacity-60">One-tap auto-fill</p>
                            </div>
                          </div>

                          {/* Buttons Action Group */}
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => handleFillDemo('user')}
                              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer bg-white/5 text-(--text-primary) border border-dashed border-primary/50 hover:bg-(--accent-cyan) hover:text-white hover:border-(--accent-cyan) hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                            >
                              User
                            </button>

                            <button
                              type="button"
                              onClick={() => handleFillDemo('host')}
                              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider 
                     transition-all duration-300 active:scale-95 cursor-pointer
                     bg-(--accent-purple)/10 text-(--accent-purple) border border-(--accent-purple)/30
                     hover:bg-(--accent-purple) hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                            >
                              Host
                            </button>
                          </div>
                        </div>
                      </div>
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
                <p className="text-sm text-center my-2 text-(--text-muted)">Or</p>
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
