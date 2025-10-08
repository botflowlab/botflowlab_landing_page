import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';

const Hero = () => {

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
    }, []);

  return (
    <>
      <section id="hero" className="">
        <h1 className="title text-7xl">Lanza tu sitio web listo para vender</h1>

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
    </>
  )
}
export default Hero 