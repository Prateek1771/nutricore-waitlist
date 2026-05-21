import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import FeaturesSection from './components/FeaturesSection'
import PagesSection from './components/PagesSection'
import PricingSection from './components/PricingSection'
import FeedbackForm from './components/FeedbackForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <PagesSection />
        <PricingSection />
        <FeedbackForm />
      </main>
      <Footer />
    </>
  )
}
