import Header from "./Header.jsx"
import { ContextProvider } from "./components/Clients.jsx"
export const metadata = {
  title : 'todo app',
  description: 'This is Next.js project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ContextProvider>
        <>
        <Header />
        {children}
        </>
      </ContextProvider>
        </body>
    </html>
  )
}
