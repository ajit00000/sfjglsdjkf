export interface SpeedTestResult {
  id: string;
  timestamp: number;
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  serverLocation: string;
  userLocation: {
    city: string;
    country: string;
    ip: string;
  };
  testDuration: number;
  bufferbloat?: {
    rating: 'A' | 'B' | 'C' | 'D' | 'F';
    latencyIncrease: number;
  };
  stability?: {
    score: number;
    variance: number;
  };
}

export interface TestProgress {
  phase: 'idle' | 'ping' | 'download' | 'upload' | 'bufferbloat' | 'complete';
  progress: number;
  currentSpeed: number;
  elapsedTime: number;
}

export interface TestServer {
  id: string;
  name: string;
  location: string;
  host: string;
  distance: number;
  latency?: number;
}

export interface GraphData {
  time: number;
  speed: number;
  phase: string;
  ping?: number;
}

export interface TestConfig {
  duration: number;
  parallelConnections: number;
  enableBufferbloat: boolean;
  enableStressTest: boolean;
}

export interface NetworkStabilityData {
  timestamp: number;
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
}