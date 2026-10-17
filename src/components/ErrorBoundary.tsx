import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <h1>Xatolik yuz berdi</h1>
          <p>Iltimos, sahifani yangilang.</p>
          <button className="view" onClick={() => window.location.reload()}>
            Yangilash
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
