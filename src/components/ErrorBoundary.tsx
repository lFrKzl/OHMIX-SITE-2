import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro capturado pela política de segurança (ErrorBoundary):", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-azul-escuro font-sans p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg text-center border-t-4 border-dourado">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Algo deu errado</h1>
            <p className="text-slate-600 mb-6 text-sm">
              Por motivos de segurança, a operação foi interrompida. Nossa equipe de operações já foi notificada.
              Por favor, recarregue a página ou tente novamente mais tarde.
            </p>
            <button
              className="bg-dourado text-azul-escuro font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 hover:shadow-lg transition-all"
              onClick={() => window.location.reload()}
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
