import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { LanguageProvider } from '@/lib/language-context'

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    )
    const heading = screen.getByRole('heading', {
      name: /transform leaders, transform organizations/i,
    })
    expect(heading).toBeInTheDocument()
  })
}) 