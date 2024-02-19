import './layout.scss'

export default function LoginLayout({ children }) {
  return (
    <div className="loginContainer">
      <div className="loginInner">
        <img src="/authimage.png" alt="" />
      </div>
      {children}
    </div>
  )
}
