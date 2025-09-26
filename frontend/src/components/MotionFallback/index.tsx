import React from 'react';
import type { ReactNode, ComponentType, ElementType } from 'react';

type MotionProps = {
  children?: ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  style?: React.CSSProperties;
  [key: string]: any;
};

// Função para criar componentes de movimento
const createMotionComponent = (tag: string) => {
  const MotionComponent = ({
    children,
    className,
    initial,
    animate,
    variants,
    whileHover,
    whileTap,
    transition,
    style,
    ...props
  }: MotionProps) => {
    const mergedStyle = {
      ...(initial?.style || {}),
      ...(animate?.style || {}),
      ...(style || {})
    };
    
    const Element = tag as ElementType;
    
    return (
      <Element 
        className={className} 
        style={mergedStyle}
        {...props}
      >
        {children}
      </Element>
    );
  };
  
  return MotionComponent;
};

export const motion = new Proxy({} as any, {
  get: (_, tag: string) => {
    return createMotionComponent(tag as any);
  }
});

export const AnimatePresence = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

// Exporta os componentes de movimento mais comuns para facilitar a importação
export const motionComponents = new Proxy({} as any, {
  get: (_, tag: string) => {
    return createMotionComponent(tag as any);
  }
});
