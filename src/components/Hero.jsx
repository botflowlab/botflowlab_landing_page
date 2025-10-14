import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const videoRef = useRef();

    const isMobile = useMediaQuery({maxWidth: 767})

    useGSAP(() => {
      const heroSplit = new SplitText(".title", { type: "chars, words" });
      const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
  
      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

      gsap.from(heroSplit.chars, {
        yPercent: 200,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.02
      
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 1,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
      .to('.right-leaf', {y: 200}, 0)
      .to('.left-leaf', {y: -200}, 0)

      const startValue = isMobile ? "top 50%" : "center 60%";
	    const endValue = isMobile ? "120% top" : "bottom top";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'video',
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,  
        }
      })

      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration
        })
      }

    }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">
          LANZA TU SITIO WEB <div className='text-align right'>
            LISTO PARA VENDER
          </div>
        </h1>

        <img src="images/hero-left-leaf.png" alt="left leaf" className="left-leaf" />
        <img src="images/hero-right-leaf.png" alt="right leaf" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Diseño y Desarrollo Web</p>
              <p className="subtitle">Para agencias creativas <br /> que quieran una ventaja injusta</p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Todo lo que hacemos es completamente personalizado
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className='video absolute inset-0'>
        <video 
          ref={videoRef}
          src = '/videos/output.mp4'
          muted
          playsInline
          preload = "auto"
        />
      </div>
    </>
  )
}
export default Hero 