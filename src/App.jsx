
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  const audioRef = useRef(null);

  const birthdayPerson = "Thangoo 💕";

  const startSurprise = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;

    audioRef.current
      .play()
      .then(() => {
        setStarted(true);

        confetti({
          particleCount: 180,
          spread: 100,
          origin: { y: 0.6 },
        });
      })
      .catch(() => {
        setStarted(true);
      });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      audioRef.current.play();
      setMusicOn(true);
    }
  };

  const openGift = () => {
    setGiftOpen(true);

    confetti({
      particleCount: 250,
      spread: 120,
      startVelocity: 35,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="birthday-app">
      {/* Background Music */}
      <audio ref={audioRef} src="/song.mp3" />

      {/* Music Button */}
      {started && (
        <motion.button
          className="music-button"
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {musicOn ? "🔊" : "🔇"}
        </motion.button>
      )}

      {/* Floating Background Particles */}
      <div className="particles">
        {Array.from({ length: 35 }).map((_, index) => (
          <motion.span
            key={index}
            className="particle"
            initial={{
              y: "110vh",
              opacity: 0,
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "linear",
            }}
            style={{
              left: `${(index * 37) % 100}%`,
            }}
          >
            {index % 3 === 0 ? "✦" : "·"}
          </motion.span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!started ? (
          /* ================= OPENING ================= */
          <motion.section
            className="hero-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 0.8 },
            }}
          >
            <motion.div
              className="moon"
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  "0 0 30px rgba(255,255,255,0.2)",
                  "0 0 60px rgba(255,255,255,0.35)",
                  "0 0 30px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.div>

            <motion.p
              className="small-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A LITTLE SURPRISE FOR YOU
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1,
              }}
            >
              I have something
              <br/>
              special for you...
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Today is not just another day.
              <br />
              It's a day worth celebrating. ✨
            </motion.p>

            <motion.button
              className="surprise-button"
              onClick={startSurprise}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 35px rgba(255, 105, 180, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Open Your Surprise ✨
            </motion.button>
          </motion.section>
        ) : (
          /* ================= MAIN CONTENT ================= */
          <motion.main
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* BALLOONS */}
            <div className="balloons">
              {["🎈", "🎈", "🎈", "🎈", "🎈"].map((balloon, index) => (
                <motion.span
                  key={index}
                  className="balloon"
                  animate={{
                    y: [-20, 20, -20],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 3 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    animationDelay: `${index * 0.4}s`,
                  }}
                >
                  {balloon}
                </motion.span>
              ))}
            </div>

            {/* BIRTHDAY REVEAL */}
            <section className="birthday-section">
              <motion.p
                className="small-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                TODAY IS YOUR DAY
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  type: "spring",
                }}
              >
                Happy Birthday
                <br />
                <span>{birthdayPerson}</span>
              </motion.h2>

              <motion.div
                className="cake"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                🎂
              </motion.div>
            </section>

            {/* MESSAGE */}
            <section className="message-section">
              <motion.div
                className="glass-card"
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <span className="card-icon">💌</span>

                <h3>A Little Message</h3>

                <p>
                  Some people make ordinary days feel special.
                  <br />
                  Some people bring happiness without even trying.
                </p>

                <p>
                  You are one of those special people.
                  <br />
                  I hope this birthday brings you endless happiness,
                  beautiful memories, and everything you wish for. ✨
                </p>

                <p className="signature">
                  Keep smiling. Keep shining. 💕
                </p>
              </motion.div>
            </section>

            {/* WHY SPECIAL */}
            <section className="special-section">
              <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span>✨</span>
                <h3>Why You're Special</h3>
                <p>Just a few little things that make you amazing.</p>
              </motion.div>

              <div className="special-grid">
                {[
                  {
                    icon: "😊",
                    title: "Your Smile",
                    text: "It has a way of making everything feel better.",
                  },
                  {
                    icon: "🧸",
                    title: "Your Cute Little Things",
                    text: "The tiny things you do somehow make everything a little more adorable. 🥹💕",
                  },
                  {
                    icon: "💕",
                    title: "Your Kindness",
                    text: "Your little acts of kindness mean more than you know.",
                  },
                  {
                    icon: "🌸",
                    title: "Your Presence",
                    text: "Having you around makes ordinary moments memorable.",
                  },
                  {
                    icon: "🥺",
                    title: "That Little Shyness",
                    text: "That cute little shy smile is honestly impossible not to adore. 💗",
                  },
                  {
                    icon: "🌷",
                    title: "Your Beautiful Heart",
                    text: "You have a beautiful heart, and that's one of the things that makes you truly special. 🫶",
                  },
                  {
                    icon: "🐻",
                    title: "Simply You",
                    text: "You don't have to do anything special. Just being you is already enough. 🤍",
                  },
                  {
                    icon: "🫶",
                    title: "The Memories",
                    text: "Every beautiful memory becomes a story worth keeping.",
                  },
                ].map((item, index) => (
                  <motion.div
                    className="special-card"
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.7,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                    }}
                  >
                    <div className="special-icon">{item.icon}</div>

                    <h4>{item.title}</h4>

                    <p>{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* GIFT */}
            <section className="gift-section">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {!giftOpen ? (
                  <>
                    <p className="small-heading">ONE LAST SURPRISE</p>

                    <h3>There's something waiting for you 🎁</h3>

                    <motion.button
                      className="gift-button"
                      onClick={openGift}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🎁
                    </motion.button>

                    <p>Click the gift</p>
                  </>
                ) : (
                  <motion.div
                    className="gift-message"
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                    }}
                  >
                    <div className="opened-gift">✨</div>

                    <h3>One More Thing...</h3>

                    <p>
                      No matter where life takes you,
                      <br />
                      always remember how special you are.
                    </p>

                    <p>
                      May your future be filled with
                      <br />
                      happiness, success, love and beautiful moments. 💕
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </section>

            {/* FINAL */}
            <section className="final-section">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="final-stars">✦ ✧ ✦</div>

                <h2>
                  Happy Birthday
                  <br />
                  <span>Once Again Thangoo 💕</span>
                </h2>

                <p>
                  May this year be your most beautiful chapter yet.
                </p>

                <div className="heart-animation">
                  💕
                </div>

                <small>Made with 💕 just for you</small>
              </motion.div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
