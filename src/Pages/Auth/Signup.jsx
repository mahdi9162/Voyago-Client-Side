import React, { use } from 'react';
import Container from '../../components/container/Container';
import signupLight from '../../assets/images/signupLight.jpg';
import signupDark from '../../assets/images/signupDark.jpg';
import { Link } from 'react-router';
import LoginButton from '../../components/ui/LoginButton';
import { ThemeContext } from '../../context/ThemeProvider';

const Signup = () => {
  const { theme } = use(ThemeContext);
  const loginImage = theme === 'dark' ? signupDark : signupLight;

  return (
    <>
      <Container>
        <section className="bg-(--bg-primary) rounded-4xl">
          <div className="flex lg:items-center justify-between my-20 flex-col lg:flex-row ">
            {/* Login Form Start */}
            <div className="flex-1 px-6 md:px-10 my-10">
              <h3 className="text-xl md:text-3xl font-semibold text-(--text-primary)">Sign up for Voyago !</h3>
              <p className="mt-3 text-xs md:text-base text-(--text-muted)">Start your effortless journey today.</p>

              <form className="mt-6">
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
                    </div>
                    {/* Photo URL */}
                    <div>
                      <label htmlFor="email" className="label block text-sm font-medium text-(--text-muted)">
                        Photo URL
                      </label>
                      <input
                        id="email"
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
                      <p className=" text-sm text-(--text-muted)">
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
            <div className="flex-2 relative aspect-16/10  rounded-r-4xl overflow-hidden hidden lg:block">
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
