const Animator = {
  animate(element, properties, duration = 300) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const startValues = {};
      for (let prop in properties) {
        if (prop === 'opacity') startValues[prop] = parseFloat(window.getComputedStyle(element).opacity) || 1;
        else if (prop === 'translateY' || prop === 'translateX') startValues[prop] = 0;
        else if (prop === 'scale') startValues[prop] = 1;
      }
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        for (let prop in properties) {
          const target = properties[prop], start = startValues[prop] || 0, current = start + (target - start) * eased;
          if (prop === 'opacity') element.style.opacity = current;
          else if (prop === 'translateY') element.style.transform = `translateY(${current}px)`;
          else if (prop === 'translateX') element.style.transform = `translateX(${current}px)`;
          else if (prop === 'scale') element.style.transform = `scale(${current})`;
        }
        if (progress < 1) requestAnimationFrame(update);
        else resolve();
      }
      requestAnimationFrame(update);
    });
  },
  stagger(elements, properties, staggerDelay = 100, duration = 300) {
    return Promise.all(Array.from(elements).map((el, i) => new Promise((resolve) => setTimeout(() => this.animate(el, properties, duration).then(resolve), i * staggerDelay))));
  }
};
if (typeof module !== 'undefined' && module.exports) module.exports = { Animator };
