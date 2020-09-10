import { ReactNode, Suspense } from "react"
import { Head, Link } from "blitz"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const LoginButtons = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div className="flex flex-grow justify-end">
        <button
          className="btn-purple"
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex flex-grow justify-end">
        <Link href="/signup">
          <a className="btn-purple mx-2">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="btn-purple">
            <strong>Login</strong>
          </a>
        </Link>
      </div>
    )
  }
}

const Header = (props) => (
  <nav className="flex items-center justify-between flex-wrap p-6">
    <div className="flex items-center flex-shrink-0 text-black mr-6">
      <span className="font-semibold text-xl tracking-tight">Syndex</span>
    </div>
    <div className="block flex-grow flex tems-center">
      <div className="text-sm flex-grow flex items-center">
        <Link href="/issues">
          <a className="inline-block hover:text-gray-dark mr-4">Issues</a>
        </Link>

        <Link href="/accounts">
          <a className="inline-block hover:text-gray-dark mr-4">Accounts</a>
        </Link>

        <Suspense fallback={<></>}>
          <LoginButtons />
        </Suspense>
      </div>
    </div>
  </nav>
)

const Layout = ({ title, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title || "investor-portal-interview"}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <div className="container mx-auto">{children}</div>
  </>
)

export default Layout
