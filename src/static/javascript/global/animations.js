// Cubic Bézier easing function (for cross-browser compatible animations)
export const cubicBezier = (p1x, p1y, p2x, p2y) => {
  // Example: const ease = cubicBezier(0.09, 0.9, 0.5, 1);
  return function (t) {
    t = Math.max(0, Math.min(1, t));

    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    const x = 3 * mt2 * t * p1x + 3 * mt * t2 * p2x + t3;
    const y = 3 * mt2 * t * p1y + 3 * mt * t2 * p2y + t3;

    return y;
  };
};

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
        // if (document.querySelector(".section-ethos") && minLg) {
        // const pinDuration = "+=160%";
        // let bodyPadding = maxXl ? 64 : 96;
        // // Pinning Ethos Section
        // gsap.to(".ethos-pin", {
        //   scrollTrigger: {
        //     trigger: ".ethos-pin",
        //     start: `top ${bodyPaddingSm}px`,
        //     end: pinDuration,
        //     pin: true,
        //     // markers: true,
        //   },
        // });
        // // Step animation (Image cycle and panel reveal)
        // {
        //   const steps = document.querySelectorAll(
        //     ".ethos-pin-step-1, .ethos-pin-step-2, .ethos-pin-step-3"
        //   );
        //   const panelsDesc = document.querySelectorAll(
        //     ".panel-desc-1, .panel-desc-2, .panel-desc-3"
        //   );
        //   const images = document.querySelectorAll(
        //     ".ethos-img-2, .ethos-img-3, .ethos-img-4"
        //   );
        //   steps.forEach((step, index) => {
        //     const panel = panelsDesc[index];
        //     const image = images[index];
        //     gsap.to(panel, {
        //       scrollTrigger: {
        //         trigger: step,
        //         start: `top ${bodyPadding}px`,
        //         end: `bottom top`,
        //         onEnter: () => panel.classList.add("active"),
        //         onLeaveBack: () => panel.classList.remove("active"),
        //       },
        //     });
        //     gsap.to(image, {
        //       scrollTrigger: {
        //         trigger: step,
        //         start: `top ${bodyPadding}px`,
        //         end: `bottom top`,
        //         onEnter: () => image.classList.add("active"),
        //         onLeaveBack: () => image.classList.remove("active"),
        //       },
        //     });
        //   });
        // }
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
        // }

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

      // GLOBAL (place under other tweens i.e. pinned sections) - Animate any element with the class 'gsap-animate' using the 'animate' companion class
      {
        // BASE: All screen sizes
        document.querySelectorAll(".gsap-animate:not([class*='gsap-animate-'])").forEach((el) => {
          setupScrollAnimation(el);
        });

        // LARGE SCREENS ONLY
        if (maxLg) {
          document.querySelectorAll(".gsap-animate-lg").forEach((el) => {
            setupScrollAnimation(el);
          });
        }

        function setupScrollAnimation(targetElem) {
          gsap.to(targetElem, {
            scrollTrigger: {
              trigger: targetElem,
              start: "top 98%",
              end: "bottom top",
              onEnter: () => targetElem.classList.add("animate"),
              onLeave: () => targetElem.classList.remove("animate"),
              onEnterBack: () => targetElem.classList.add("animate"),
              onLeaveBack: () => targetElem.classList.remove("animate"),
              // markers: navyMarkers,
            },
          });
        }
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
