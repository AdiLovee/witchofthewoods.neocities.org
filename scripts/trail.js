// Cursor Trail Effect
document.addEventListener('DOMContentLoaded', function() {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);
  
  // Initialize canvas
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Variables for particles
  const particles = [];
  const mouse = { x: 0, y: 0 };
  
  // Options (customizable)
  const options = {
    trailEffect: 'glow',
    particleCount: 12,
    particleSize: 9,
    particleColor: '#FFD166',
    fadeSpeed: 0.89
  };
  
  // Update mouse position on move
  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Add new particle
    particles.push({
      x: mouse.x,
      y: mouse.y,
      size: options.particleSize,
      alpha: 1
    });
    
    // Keep particles array at desired length
    if (particles.length > options.particleCount) {
      particles.splice(0, particles.length - options.particleCount);
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update particles
    particles.forEach((particle, index) => {
      if (options.trailEffect === 'dots') {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `${options.particleColor}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      } else if (options.trailEffect === 'line') {
        if (index > 0) {
          const prevParticle = particles[index - 1];
          ctx.beginPath();
          ctx.moveTo(prevParticle.x, prevParticle.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = `${options.particleColor}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = particle.size * particle.alpha;
          ctx.stroke();
        }
      } else if (options.trailEffect === 'glow') {
        ctx.beginPath();
        const grd = ctx.createRadialGradient(
          particle.x, particle.y, 0, 
          particle.x, particle.y, particle.size * 2 * particle.alpha
        );
        grd.addColorStop(0, `${options.particleColor}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`);
        grd.addColorStop(1, `${options.particleColor}00`);
        ctx.fillStyle = grd;
        ctx.arc(particle.x, particle.y, particle.size * 2 * particle.alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Update alpha
      particle.alpha *= options.fadeSpeed;
    });
    
    // Remove faded particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].alpha < 0.01) {
        particles.splice(i, 1);
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
});