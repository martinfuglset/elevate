import { render, screen, fireEvent } from '@testing-library/react'
import { HeroSection } from '../hero-section'
import { LanguageProvider } from '@/lib/language-context'

// Mock the AssessmentModal component
jest.mock('@/components/assessment/AssessmentModal', () => ({
  AssessmentModal: ({ isOpen, onClose, onComplete }: any) => (
    <div data-testid="assessment-modal" data-open={isOpen}>
      {isOpen && (
        <div>
          <div>Assessment Modal Content</div>
          <button onClick={onClose}>Close Modal</button>
          <button onClick={onComplete}>Complete Assessment</button>
        </div>
      )}
    </div>
  ),
}))

describe('HeroSection', () => {
  const renderHeroSection = () => {
    return render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    )
  }

  it('should render the main heading', () => {
    renderHeroSection()
    const heading = screen.getByRole('heading', {
      name: /transform leaders, transform organizations/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('should render the assessment button', () => {
    renderHeroSection()
    const button = screen.getByRole('button', {
      name: /take need analysis/i,
    })
    expect(button).toBeInTheDocument()
  })

  it('should open assessment modal when button is clicked', () => {
    renderHeroSection()
    const button = screen.getByRole('button', {
      name: /take need analysis/i,
    })
    
    // Modal should be closed initially
    const modal = screen.getByTestId('assessment-modal')
    expect(modal).toHaveAttribute('data-open', 'false')
    
    // Click the button to open modal
    fireEvent.click(button)
    
    // Modal should be open
    expect(modal).toHaveAttribute('data-open', 'true')
    expect(screen.getByText('Assessment Modal Content')).toBeInTheDocument()
  })

  it('should close modal when close button is clicked', () => {
    renderHeroSection()
    const button = screen.getByRole('button', {
      name: /take need analysis/i,
    })
    
    // Open modal
    fireEvent.click(button)
    expect(screen.getByTestId('assessment-modal')).toHaveAttribute('data-open', 'true')
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close modal/i })
    fireEvent.click(closeButton)
    
    // Modal should be closed
    expect(screen.getByTestId('assessment-modal')).toHaveAttribute('data-open', 'false')
  })

  it('should close modal when assessment is completed', () => {
    renderHeroSection()
    const button = screen.getByRole('button', {
      name: /take need analysis/i,
    })
    
    // Open modal
    fireEvent.click(button)
    expect(screen.getByTestId('assessment-modal')).toHaveAttribute('data-open', 'true')
    
    // Complete assessment
    const completeButton = screen.getByRole('button', { name: /complete assessment/i })
    fireEvent.click(completeButton)
    
    // Modal should be closed
    expect(screen.getByTestId('assessment-modal')).toHaveAttribute('data-open', 'false')
  })
}) 