import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                    <Card className="max-w-md w-full p-6 glass border-destructive/50">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                                <AlertTriangle className="w-12 h-12" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
                            <p className="text-muted-foreground">
                                We're sorry, but an unexpected error occurred. Our team has been notified.
                            </p>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <pre className="text-xs text-left w-full bg-muted p-2 rounded overflow-auto max-h-32">
                                    {this.state.error.toString()}
                                </pre>
                            )}
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-gradient-to-r from-primary to-destructive hover:opacity-90"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reload Page
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
