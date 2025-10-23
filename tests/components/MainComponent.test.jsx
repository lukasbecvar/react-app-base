import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MainComponent from '../../src/components/MainComponent'

describe('MainComponent', () => {
    // test main component rendering
    it('renders main component', () => {
        render(<MainComponent/>)
        const heading = screen.getByRole('heading', { name: /main component/i })
        expect(heading).toHaveClass('text-red-500')
    })
})
