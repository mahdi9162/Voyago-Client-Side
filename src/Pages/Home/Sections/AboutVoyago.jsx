import React from 'react';
import Container from '../../../components/container/Container';

const AboutVoyago = () => {
  return (
    <section className="my-10 lg:my-20 px-3 lg:px-0">
      <Container>
        {/* Top intro */}
        <div className="max-w-3xl mb-10">
          <p data-aos="fade-right" className="text-xs font-semibold tracking-[0.25em] uppercase text-(--accent)">
            About Voyago
          </p>
          <h2 data-aos="fade-right" data-aos-delay="60" className="mt-3 text-xl md:text-2xl font-semibold text-(--text-primary)">
            A smarter way to book rides.
          </h2>
          <p data-aos="fade-right" data-aos-delay="120" className="mt-4 text-xs md:text-sm text-justify lg:text-base text-(--text-muted)">
            Voyago is a smart vehicle booking platform that connects travelers with trusted local hosts. Compare electric, SUVs and city
            cars in one place, see real reviews, and book in a few clicks — no hidden steps, no confusion.
          </p>
        </div>

        {/* Main content grid */}
        <div data-aos="fade-up" data-aos-delay="120" className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          {/* Left - Story + bullets */}
          <div className="bg-(--bg-secondary)/70 border border-white/10 rounded-3xl p-6 md:p-8 shadow-lg backdrop-blur-2xl">
            <h2 className="text-xl md:text-2xl font-semibold text-(--text-primary)">Why Voyago?</h2>
            <p className="mt-3 text-sm md:text-base text-(--text-muted)">
              We built Voyago for people who want the comfort of their own car, without the headache of a traditional rental desk.
              <span className="lg:block">
                Every vehicle is verified, every host is reviewed, and pricing stays clear from start to finish.
              </span>
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* Card 1 */}
              <div
                data-aos="fade-up"
                data-aos-delay="160"
                className="rounded-2xl bg-(--accent-cyan)/20 border border-white/10 p-4 flex flex-col gap-2"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--accent)/10 text-(--accent) text-lg">
                  🚗
                </span>
                <h3 className="text-sm font-semibold text-(--text-primary)">Vehicles that fit your trip</h3>
                <p className="text-xs text-(--text-muted)">
                  From compact city rides to family-ready SUVs and electric models — pick exactly what you need.
                </p>
              </div>

              {/* Card 2 */}
              <div
                data-aos="fade-up"
                data-aos-delay="220"
                className="rounded-2xl bg-(--accent-cyan)/20 border border-white/10 p-4 flex flex-col gap-2"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--accent)/10 text-(--accent) text-lg">
                  🤝
                </span>
                <h3 className="text-sm font-semibold text-(--text-primary)">Trusted local hosts</h3>
                <p className="text-xs text-(--text-muted)">
                  Each host is verified with ratings, response time and trip history so you always know who you’re booking from.
                </p>
              </div>

              {/* Card 3 */}
              <div
                data-aos="fade-up"
                data-aos-delay="280"
                className="rounded-2xl bg-(--accent-cyan)/20 border border-white/10 p-4 flex flex-col gap-2"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--accent)/10 text-(--accent) text-lg">
                  ⚡
                </span>
                <h3 className="text-sm font-semibold text-(--text-primary)">Fast, clear booking flow</h3>
                <p className="text-xs text-(--text-muted)">
                  See total price per day, key specs and availability in seconds — then send a request with one click.
                </p>
              </div>

              {/* Card 4 */}
              <div
                data-aos="fade-up"
                data-aos-delay="340"
                className="rounded-2xl bg-(--accent-cyan)/20 border border-white/10 p-4 flex flex-col gap-2"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--accent)/10 text-(--accent) text-lg">
                  🌍
                </span>
                <h3 className="text-sm font-semibold text-(--text-primary)">Built for real trips</h3>
                <p className="text-xs text-(--text-muted)">
                  Weekend escapes, airport runs or long roadtrips — Voyago adapts to different routes, budgets and travel styles.
                </p>
              </div>
            </div>
          </div>

          {/* Right: How it works & stats card */}
          <div className="space-y-4">
            {/* How it works card */}
            <div
              data-aos="fade-up"
              data-aos-delay="140"
              className=" bg-(--accent-cyan)/20 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-2xl"
            >
              <h2 className="text-lg md:text-xl font-semibold text-(--text-primary)">How Voyago works</h2>
              <ol className="mt-4 space-y-3 text-sm text-(--text-muted)">
                <li>
                  <span className="font-semibold text-(--text-primary)">1. Browse vehicles</span>
                  <br />
                  Filter by category, location and price to find a ride that matches your plan.
                </li>
                <li>
                  <span className="font-semibold text-(--text-primary)">2. Check the host</span>
                  <br />
                  Review host ratings, response time and vehicle details before you send a request.
                </li>
                <li>
                  <span className="font-semibold text-(--text-primary)">3. Send a request</span>
                  <br />
                  Pick your pick-up date & location, then submit a ride request in one click.
                </li>
                <li>
                  <span className="font-semibold text-(--text-primary)">4. Hit the road</span>
                  <br />
                  Once confirmed, meet your host, grab the keys and start your Voyago trip.
                </li>
              </ol>
            </div>

            {/* footer about */}
            <div
              data-aos="zoom-in-up"
              data-aos-delay="200"
              className="bg-(--accent)/60 border text-white border-white/10 rounded-3xl px-5 py-4 flex items-center justify-between gap-4 text-sm"
            >
              <div>
                <p className="text-lg font-semibold ">200+ vehicles</p>
                <p className="text-xs ">across multiple categories</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-lg font-semibold ">4.8★ average</p>
                <p className="text-xs ">based on host ratings</p>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                <p className="text-lg font-semibold ">Minutes to request</p>
                <p className="text-xs ">no long forms, no queues</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutVoyago;
