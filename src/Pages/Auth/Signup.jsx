import React, { use, useState } from 'react';
import Container from '../../components/container/Container';
import signupLight from '../../assets/images/signupLight.jpg';
import signupDark from '../../assets/images/signupDark.jpg';
import { Link } from 'react-router';
import LoginButton from '../../components/ui/LoginButton';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { validatePassword } from '../../utils/validation';
import { motion } from 'framer-motion';

const Signup = () => {
  const { theme } = use(ThemeContext);
  const { setUser, setLoading, loading, userSignup } = use(AuthContext);
  const [passwordError, setPasswordError] = useState('');
  const loginImage = theme === 'dark' ? signupDark : signupLight;

  const handleSignupWithEmailPass = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value;

    console.log(name, photoURL);

    // Password Validation
    const validationMsg = validatePassword(password);
    if (validationMsg) {
      setPasswordError(validationMsg);
      return;
    }

    setPasswordError('');

    userSignup(email, password)
      .then((res) => {
        const loginUser = res.user;
        setUser(loginUser);
        alert('Successfully Signup');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container>
        <section className="bg-(--bg-primary) rounded-4xl">
          <div className="flex lg:items-center justify-between my-20 flex-col lg:flex-row ">
            {/* Login Form Start */}
            <div className="lg:w-[35%] px-6 md:px-10 my-10">
              <h3 className="text-xl md:text-3xl font-semibold text-(--text-primary)">Sign up for Voyago !</h3>
              <p className="mt-3 text-xs md:text-base text-(--text-muted)">Start your effortless journey today.</p>

              <form onSubmit={handleSignupWithEmailPass} className="mt-6">
                <div className="rounded-2xl border border-white/10 bg-(--bg-secondary)/60 shadow-xl backdrop-blur-md p-6 md:p-8">
                  <div className="space-y-5">
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
                    <div className="pt-1">
                      <p className=" text-xs text-center lg:text-left text-(--text-muted)">
                        Already have an account ?{' '}
                        <Link to="/login" className="font-semibold text-(--accent) hover:text-(--accent-cyan)">
                          Login
                        </Link>
                      </p>
                    </div>
                    <div className="pt-2 w-full">
                      <LoginButton>Signup</LoginButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* Login Form End */}
            <div className="w-[60%] relative h-[550px] lg:h-[700px] rounded-r-4xl overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-black/10 "></div>
              <img src={loginImage} className="flex-2 absolute inset-0 h-full w-full object-cover" alt="" />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Signup;
