import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /saas mvp template/i,
    })
    expect(heading).toBeInTheDocument()
  })
}) 