import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { MemoryRouter, useLocation } from 'react-router-dom'

// mock child components
vi.mock('../src/components/MainComponent', () => ({
    default: () => <div data-testid="main-component">Main Component</div>
}))
vi.mock('../src/components/SecondaryComponent', () => ({
    default: () => <div data-testid="secondary-component">Secondary Component</div>
}))

// mock useLocation to track route changes
const MockLocationDisplay = () => {
    const location = useLocation()
    return <div data-testid="location-display">{location.pathname}</div>
}

// import tested component
import App from '../src/App'

describe('App component', () => {
    beforeEach(() => {
        // mock window.matchMedia for mobile view tests
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: query.includes('max-width: 767px'), // simulate mobile screen
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn()
            }))
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    const renderWithRouter = (initialEntries = ['/']) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <App/>
                <MockLocationDisplay/>
            </MemoryRouter>
        )
    }

    // test navigation and default MainComponent on initial load
    it('renders navigation and default MainComponent on initial load', () => {
        renderWithRouter()

        // expect navigation links
        expect(screen.getByText('Main component')).toBeInTheDocument()
        expect(screen.getByText('Secondary component')).toBeInTheDocument()

        // expect the MainComponent is rendered by default
        expect(screen.getByTestId('main-component')).toBeInTheDocument()
        expect(screen.queryByTestId('secondary-component')).not.toBeInTheDocument()

        // verify the initial route is correct
        expect(screen.getByTestId('location-display')).toHaveTextContent('/')
    })

    // test navigation to SecondaryComponent when the link is clicked
    it('navigates to SecondaryComponent when the link is clicked', () => {
        renderWithRouter()

        // there are multiple links with the same text (desktop and mobile)
        const secondaryLinks = screen.getAllByText('Secondary component')
        fireEvent.click(secondaryLinks[0])

        // check SecondaryComponent is now rendered
        expect(screen.getByTestId('secondary-component')).toBeInTheDocument()
        expect(screen.queryByTestId('main-component')).not.toBeInTheDocument()

        // verify the route has changed
        expect(screen.getByTestId('location-display')).toHaveTextContent('/secondary')
    })

    // test mobile menu toggle and navigation
    it('toggles mobile menu and navigates correctly', async () => {
        renderWithRouter()

        const menuButton = screen.getByRole('button', { name: /menu/i })

        // open mobile menu
        fireEvent.click(menuButton)

        // find mobile menu container
        const mobileMenu = await screen.findByTestId('mobile-menu')
        expect(mobileMenu).toBeInTheDocument()

        // find link within the mobile menu
        const mobileSecondaryLink = within(mobileMenu).getByText('Secondary component')
        fireEvent.click(mobileSecondaryLink)

        // check SecondaryComponent is rendered
        expect(screen.getByTestId('secondary-component')).toBeInTheDocument()

        // verify the route has changed
        expect(screen.getByTestId('location-display')).toHaveTextContent('/secondary')
    })

    // test MainComponent for a non-matching route
    it('renders MainComponent for a non-matching route', () => {
        renderWithRouter(['/some/random/route'])

        // check MainComponent is rendered as the fallback
        expect(screen.getByTestId('main-component')).toBeInTheDocument()
        expect(screen.queryByTestId('secondary-component')).not.toBeInTheDocument()

        // location display will show the random route
        expect(screen.getByTestId('location-display')).toHaveTextContent('/some/random/route')
    })
})
