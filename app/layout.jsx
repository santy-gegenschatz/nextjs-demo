import '@/styles/globals.css'

import Nav from '@/components/Nav'
import Provider from '@components/Provider'

// Change the metadata of our application
export const metadata = {
    title: 'Next.js Demo',
    description: 'A demo of Next.js features',
}

// In this layout we'll use the resusable components that apply to all pages like for example the navigation bar
const RootLayout = ({ children }) => {
  return (
    <html lang = 'en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>

  )
}

export default RootLayout