import {Component} from 'react';
import type {ErrorInfo, ReactNode} from 'react';
import './ErrorBoundary.scss';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return {hasError: true, error};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Erreur capturée par ErrorBoundary:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1 className="error-boundary__title">Oops! Quelque chose s'est mal passé</h1>
                    <p className="error-boundary__description">
                        Une erreur inattendue s'est produite. Veuillez réessayer.
                    </p>
                    {this.state.error && (
                        <details className="error-boundary__details">
                            <summary className="error-boundary__summary">
                                Détails de l'erreur
                            </summary>
                            <pre className="error-boundary__error-content">
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                    <button
                        onClick={this.handleReset}
                        className="error-boundary__button"
                    >
                        Réessayer
                    </button>
                </div>
            );
        }

        return this.props.children;
    }

    private handleReset = () => {
        this.setState({hasError: false, error: null});
    };
}

export default ErrorBoundary;
