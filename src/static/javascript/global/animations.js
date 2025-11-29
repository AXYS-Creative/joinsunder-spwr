// // Cubic Bézier easing function (for cross-browser compatible animations)
// export const cubicBezier = (p1x, p1y, p2x, p2y) => {
//   // Example: const ease = cubicBezier(0.09, 0.9, 0.5, 1);
//   return function (t) {
//     t = Math.max(0, Math.min(1, t));

//     const t2 = t * t;
//     const t3 = t2 * t;
//     const mt = 1 - t;
//     const mt2 = mt * mt;
//     const mt3 = mt2 * mt;

//     const x = 3 * mt2 * t * p1x + 3 * mt * t2 * p2x + t3;
//     const y = 3 * mt2 * t * p1y + 3 * mt * t2 * p2y + t3;

//     return y;
//   };
// };

// GSAP
{
  gsap.registerPlugin(ScrollTrigger);

  let responsiveGsap = gsap.matchMedia();

  responsiveGsap.add(
    {
      maxSm: "(max-width: 480px)",
      maxMd: "(max-width: 768px)",
      maxLg: "(max-width: 1024px)",
      maxXxl: "(max-width: 1512px)",
      maxXl: "(max-width: 1200px)",
      minMd: "(min-width: 769px)",
      minLg: "(min-width: 1025px)",
      noMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      let { maxSm, maxMd, maxLg, maxXl, maxXxl, minMd, minLg, noMotion } = context.conditions;

      let navyMarkers = {
        startColor: "navy",
        endColor: "navy",
        indent: 128,
      };
      let redMarkers = {
        startColor: "crimson",
        endColor: "crimson",
        indent: 256,
      };

      let bodyPaddingSm = 12;
      let bodyPadding = 24;
      let bodyPaddingDouble = bodyPadding * 2;

      // Page - SPWR Way
      {
        // Sunday way scrollTrigger fix
        if (document.querySelector(".main-spwr-way")) {
          window.addEventListener("load", () => {
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 500); // try 200–500ms if needed
          });
        }

        // Ethos Section (Desktop)
        if (document.querySelector(".section-ethos") && maxLg) {
          const pinDuration = "+=160%";
          // Pinning Ethos Section
          gsap.to(".ethos-pin", {
            scrollTrigger: {
              trigger: ".ethos-pin",
              start: `top ${bodyPaddingSm}px`,
              end: pinDuration,
              pin: true,
            },
          });

          // // Ethos Bottom slide in
          // let ethosBottom = document.querySelector(".ethos-bottom");
          // gsap.to(ethosBottom, {
          //   scrollTrigger: {
          //     trigger: ethosBottom,
          //     start: "bottom bottom",
          //     onEnter: () => ethosBottom.classList.add("active"),
          //     onLeaveBack: () => ethosBottom.classList.remove("active"),
          //   },
          // });

          // Ethos Overlay Color (mobile)
          let ethosOverlay = document.querySelector(".ethos-gsap-overlay");
          gsap.to(ethosOverlay, {
            opacity: 0.65,
            scrollTrigger: {
              trigger: ".section-ethos",
              scrub: 0.2,
              start: "top top",
              end: "center bottom",
            },
          });

          // Ethos Copy Shift (mobile)
          let ethosCopy = document.querySelector(".ethos-copy");
          gsap.fromTo(
            ethosCopy,
            {
              y: maxSm ? "66%" : maxMd ? "74%" : "90%",
              ease: "none",
            },
            {
              y: maxSm ? "-26%" : maxMd ? "-24%" : "-10%",
              ease: "none",
              scrollTrigger: {
                trigger: ".section-ethos",
                scrub: 0.2,
                start: `top ${bodyPaddingSm}px`,
                end: maxSm ? "+=140%" : pinDuration,
              },
            }
          );
        }

        // Competitions Section (YOG)
        if (document.querySelector(".section-competitions")) {
          // Fade YOG logo
          gsap.to(".yog-logo", {
            opacity: 0,
            scrollTrigger: {
              trigger: ".yog",
              start: "85% 90%",
              end: "85% 40%",
              scrub: 0,
              // markers: true,
            },
          });
        }

        // Experience Section (Collage)
        if (document.querySelector(".collage")) {
          const yVal = maxMd ? "-16.15%" : maxXxl ? "-16.225%" : "-16.2%";
          const yValMobile = "-24.01%";

          const collageSlide = (el, distance) => {
            const element = document.querySelector(el);
            if (element) {
              gsap.to(el, {
                y: distance,
                ease: "none",
                scrollTrigger: {
                  trigger: ".collage",
                  start: maxSm ? "-48px 10%" : "top top",
                  end: "98% bottom",
                  scrub: 1,
                  // markers: true,
                },
              });
            }
          };

          collageSlide(".collage__column-1", yVal);
          collageSlide(".collage__column-3", yVal);
          collageSlide(".collage__column-mobile-1", yValMobile);
        }
      }

      // Animate any element with the class 'gsap-animate' using the 'gsap-animated' companion class. Comes with different data attributes for customization.
      {
        const gsapElems = document.querySelectorAll(".gsap-animate");

        gsapElems.forEach((gsapElem) => {
          const animOnce = gsapElem.dataset.gsapOnce === "true";
          const animTrigger = gsapElem.dataset.gsapTrigger || gsapElem;
          const animStart = gsapElem.dataset.gsapStart || "top 98%";
          const animEnd = gsapElem.dataset.gsapEnd || "bottom 2%";
          const animMediaQueryUp = gsapElem.dataset.gsapMediaQueryUp || "lg"; // only apply above this point
          const animMarkers = gsapElem.dataset.gsapMarkers === "true";

          // Conditionally running aniamtion based on media query
          let shouldRun = true;

          switch (animMediaQueryUp) {
            case "md":
              shouldRun = minMd;
              break;
            case "lg":
              shouldRun = minLg;
              break;
            case "none":
              shouldRun = true;
              break;
            default:
              shouldRun = true;
          }

          if (!shouldRun) return;

          if (animOnce) {
            ScrollTrigger.create({
              trigger: animTrigger,
              start: animStart,
              end: animEnd,
              once: true,
              onEnter: () => {
                gsapElem.classList.add("gsap-animated");
              },
              markers: animMarkers,
            });
          } else {
            // Repeating animation
            ScrollTrigger.create({
              trigger: animTrigger,
              start: animStart,
              end: animEnd,
              onEnter: () => gsapElem.classList.add("gsap-animated"),
              onLeave: () => gsapElem.classList.remove("gsap-animated"),
              onEnterBack: () => gsapElem.classList.add("gsap-animated"),
              onLeaveBack: () => gsapElem.classList.remove("gsap-animated"),
              markers: animMarkers,
            });
          }
        });
      }
    }
  );

  // Refresh ScrollTrigger instances on page load and resize
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Greater than 520 so it doesn't refresh on  mobile(dvh)
  if (window.innerWidth > 520) {
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }
}
