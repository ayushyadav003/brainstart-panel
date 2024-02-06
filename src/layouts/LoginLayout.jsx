import './layout.scss'

export default function LoginLayout({ children }) {
  return (
    <div className="loginLayout">
      <div className="loginImage"></div>
      {children}
    </div>
  )
}
