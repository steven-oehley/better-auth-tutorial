/* eslint-disable security/detect-object-injection */
'use client';

import { useEffect, useRef } from 'react';

export default function MatrixDigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops array
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
    }

    // Matrix-style characters: Mix of katakana, numbers, and symbols
    const characters =
      'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345689ZYNTEXQLRPKOVHWJUAGDCSBIFM';

    // Store character trails for fading effect
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const trails: Array<{
      char: string;
      x: number;
      y: number;
      brightness: number;
    }> = [];

    function draw() {
      if (!ctx || !canvas) return;

      // Create trailing effect with semi-transparent black
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set up text properties
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = 'center';

      // Draw the falling characters
      for (let i = 0; i < drops.length; i++) {
        // Pick random character
        const char = characters.charAt(
          Math.floor(Math.random() * characters.length),
        );

        // Calculate position
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Create gradient effect - brightest at the head
        const gradient = ctx.createLinearGradient(x, y - fontSize * 10, x, y);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.1)');
        gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        // Add bright white highlight for the leading character
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);
        }

        // Reset drop when it goes off screen or randomly
        if (y > canvas.height || (Math.random() > 0.99 && y > fontSize * 10)) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;

        // Occasionally add some randomness to the drop speed
        if (Math.random() > 0.95) {
          drops[i] += Math.floor(Math.random() * 3);
        }
      }

      // Add occasional horizontal glitch lines
      if (Math.random() > 0.997) {
        const glitchY = Math.random() * canvas.height;
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(0, glitchY, canvas.width, 2);
      }

      // Add random bright flashes
      if (Math.random() > 0.999) {
        const flashX = Math.random() * canvas.width;
        const flashY = Math.random() * canvas.height;
        const flashChar = characters.charAt(
          Math.floor(Math.random() * characters.length),
        );

        ctx.fillStyle = '#ffffff';
        ctx.font = `${fontSize * 1.5}px 'Courier New', monospace`;
        ctx.fillText(flashChar, flashX, flashY);
        ctx.font = `${fontSize}px 'Courier New', monospace`;
      }
    }

    const intervalId = setInterval(draw, 50);

    function handleResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recalculate columns
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        drops[i] ??= Math.floor((Math.random() * canvas.height) / fontSize);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='fixed inset-0 overflow-hidden bg-black'>
      <canvas
        ref={canvasRef}
        className='block h-full w-full'
        style={{ background: '#000000' }}
      />
    </div>
  );
}
