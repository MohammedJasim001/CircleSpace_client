import React from 'react';
import MainLayout from "@/layout/mainLayout";

export default function withMainLayout<P extends object>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    return (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    );
  };
}
