/// <reference types="vite/client" />

declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare const process: {
  env: Record<string, string | undefined>;
  cwd(): string;
};

declare const __dirname: string;

declare module 'path' {
  export function join(...paths: string[]): string;
  export function resolve(...paths: string[]): string;
}

declare module 'react' {
  export const StrictMode: any;
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useRef<T>(initialValue: T): { current: T };
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export const Fragment: any;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): {
    render(children: any): void;
  };
}

declare module 'express' {
  const express: any;
  export default express;
}

declare module 'vite' {
  export function createServer(options?: any): Promise<any>;
  export function defineConfig(config: any): any;
}

declare module '@vitejs/plugin-react' {
  export default function react(): any;
}

declare module '@tailwindcss/vite' {
  export default function tailwindcss(): any;
}

declare module 'dotenv' {
  const dotenv: any;
  export default dotenv;
}

declare module '@google/genai' {
  export class GoogleGenAI {
    constructor(options?: any);
    models: any;
  }
}

declare module 'lucide-react' {
  export const ChevronLeft: any;
  export const ChevronRight: any;
  export const Copy: any;
  export const Check: any;
  export const MessageSquare: any;
  export const Monitor: any;
  export const Sparkles: any;
  export const Info: any;
  export const ZoomIn: any;
  export const ZoomOut: any;
  export const CheckCircle2: any;
}
