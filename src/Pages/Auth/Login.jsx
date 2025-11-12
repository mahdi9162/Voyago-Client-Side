import React, { use } from 'react';
import Container from '../../components/container/Container';
import loginImgLight from '../../assets/images/LightLogin.jpg';
import loginImgDark from '../../assets/images/loginDark.jpg';
import { Link } from 'react-router';
import LoginButton from '../../components/ui/LoginButton';
import { ThemeContext } from '../../context/ThemeProvider';

const Login = () => {
  const { theme } = use(ThemeContext);
  const loginImage = theme === 'dark' ? loginImgDark : loginImgLight;

  return (
    <>
      <Container>
        <section className="bg-(--bg-primary) rounded-4xl">
          <div className="flex lg:items-center justify-between my-20 flex-col lg:flex-row ">
            {/* Login Form Start */}
            <div className="flex-1 px-6 md:px-10 my-10">
              <h3 className="text-xl md:text-3xl font-semibold text-(--text-primary)">Welcome back to Voyago !</h3>
              <p className="mt-3 text-xs md:text-base text-(--text-muted)">Sign in to continue your Voyago journey.</p>

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
                      <LoginButton>Login</LoginButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* Login Form End */}
            <div className="flex-2 relative aspect-16/10 md:aspect-video rounded-r-4xl overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-black/10 "></div>
              <img src={loginImage} className="flex-2 absolute inset-0 h-full w-full object-cover" alt="" />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Login;
