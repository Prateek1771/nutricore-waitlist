export default function Footer() {
  return (
    <footer className="bg-nc-sidebar text-white/60 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white text-sm font-bold font-serif">N</span>
              </span>
              <span className="font-semibold text-white text-base tracking-tight">NutriCore</span>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              AI‑powered assistant for diet and exercise in India. Personalized meal plans, exercise routines, and Swiggy‑friendly planning — all in one app.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/30 mb-1">Built by</p>
            <p className="text-sm text-white font-medium mb-1">Prateek Hitli</p>
            <a href="https://nutricore.space" target="_blank" rel="noopener noreferrer"
               className="block text-xs text-white/40 hover:text-white/70 transition-colors">
              nutricore.space
            </a>
            <a href="mailto:hello@nutricore.space"
               className="block text-xs text-white/40 hover:text-white/70 transition-colors">
              hello@nutricore.space
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">© 2026 NutriCore · MVP launching across India</p>
          <p className="text-xs text-white/25">Pitch deck · May 2026</p>
        </div>
      </div>
    </footer>
  )
}
