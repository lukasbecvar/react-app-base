import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SecondaryComponent from '../../src/components/SecondaryComponent'

describe('SecondaryComponent', () => {
    // test secondary component rendering
    it('renders secondary component', () => {
        render(<SecondaryComponent/>)
        const heading = screen.getByRole('heading', { name: /secondary component/i })
        expect(heading).toHaveClass('text-green-500')
    })
})
