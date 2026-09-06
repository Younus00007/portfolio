// Synthesized Web Audio API sound effects (zero external assets needed)
class SoundManager {
  constructor() {
    this.ctx = null
    this.enabled = false // Off by default to respect user privacy until enabled or interacted
    this.initialized = false
  }

  init() {
    if (this.initialized) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.initialized = true
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e)
    }
  }

  toggle() {
    this.init()
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.enabled = !this.enabled
    return this.enabled
  }

  setEnabled(val) {
    if (val && !this.initialized) this.init()
    if (val && this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    this.enabled = Boolean(val)
  }

  // Gentle futuristic click
  playClick() {
    if (!this.enabled || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05)
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.05)
    } catch (e) {}
  }

  // Soft hover tick
  playHover() {
    if (!this.enabled || !this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(800, this.ctx.currentTime)
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.03)
    } catch (e) {}
  }

  // Futuristic chime for success / modal open
  playChime() {
    if (!this.enabled || !this.ctx) return
    try {
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04)
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime + i * 0.04)
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.04 + 0.2)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(this.ctx.currentTime + i * 0.04)
        osc.stop(this.ctx.currentTime + i * 0.04 + 0.25)
      })
    } catch (e) {}
  }
}

export const soundFx = new SoundManager()
