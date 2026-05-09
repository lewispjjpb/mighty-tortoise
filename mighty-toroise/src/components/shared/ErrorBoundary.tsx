import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type AppErrorBoundaryProps = {children: ReactNode}
export const AppErrorBoundary = ({ children}: AppErrorBoundaryProps) =>
  <ErrorBoundary
    fallbackRender={() => <div>An unexpected error occurred!</div>}
  >
    {children}
  </ErrorBoundary>