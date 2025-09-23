export function video() {
      const videoWrap = document.querySelectorAll('.video-wrap');
      videoWrap.forEach(v => {


          const btn = v.querySelector('.icon-play');
          const video = v.querySelector("video")
          const hlsSourceEl = video.querySelector('source[type="application/vnd.apple.mpegurl"]');
          let hydrated = false;

          async function hydrateAndPlay() {
               // Show native controls from now on
               video.controls = true;
               gsap.to(btn, {opacity: 0, duration: .3})

               // Prefer HLS if supported; hydrate only once
               const m3u8 = hlsSourceEl?.dataset.src;
               if (!hydrated && m3u8) {
                    hydrated = true;
                    try {
                    if (video.canPlayType('application/vnd.apple.mpegurl')) {
                         video.src = m3u8; // Safari (and some modern browsers)
                    } else {
                         const { default: Hls } = await import('https://cdn.jsdelivr.net/npm/hls.js@latest');
                         if (Hls.isSupported()) {
                         const hls = new Hls({ lowLatencyMode: false });
                         hls.loadSource(m3u8);
                         hls.attachMedia(video);
                         }
                    }
                    } catch (e) {
                    // Fallback stays as the progressive MP4 sources already in markup
                    console.warn('HLS hydration failed, using progressive fallback:', e);
                    }
               }

               // Start playback, then hide the overlay button
               try { await video.play(); } catch (err) { /* user gesture issues, etc. */ }
               btn.hidden = true;
          }

          // Mouse click
          btn.addEventListener('click', hydrateAndPlay);

          // Keyboard: Enter / Space trigger
          btn.addEventListener('keydown', (e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hydrateAndPlay();
                    console.log("shiut")
          }
          });

          // Optional: clicking the poster/video itself (before controls appear) also plays
          video.addEventListener('click', () => {
               if (!video.controls && video.paused) hydrateAndPlay();
          }, { once: false });

      })
          
}