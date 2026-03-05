// Smooth scroll for anchor links and active nav highlighting
document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // IntersectionObserver to highlight nav links
  const sections = Array.from(document.querySelectorAll('main .section, main > section'))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('a.nav'));

  if('IntersectionObserver' in window && sections.length){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const id = entry.target.id;
        const link = navLinks.find(l=>l.getAttribute('href') === `#${id}`);
        if(link){
          link.classList.toggle('active-nav', entry.isIntersecting && entry.intersectionRatio > 0.4);
        }
      });
    },{threshold:[0.4]});
    sections.forEach(s=>s.id && obs.observe(s));
  }
});
