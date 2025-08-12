/**
 * Server-Sent Events (SSE) 유틸리티
 * 실시간 로그 스트림과 상태 업데이트를 위한 EventSource 래퍼
 */

export interface SSEMessage {
  id?: string;
  event?: string;
  data: string;
  timestamp: number;
}

export interface SSELogEvent {
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  correlationId?: string;
  metadata?: Record<string, unknown>;
}

export interface SSEOptions {
  onMessage?: (message: SSEMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: (event: Event) => void;
  onClose?: () => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export class SSEConnection {
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isManualClose = false;

  constructor(
    private url: string,
    private options: SSEOptions = {}
  ) {}

  connect(): () => void {
    if (this.eventSource) {
      this.close();
    }

    this.isManualClose = false;
    this.eventSource = new EventSource(this.url);

    this.eventSource.onopen = (event) => {
      this.reconnectAttempts = 0;
      this.options.onOpen?.(event);
    };

    this.eventSource.onmessage = (event) => {
      const message: SSEMessage = {
        id: event.lastEventId,
        event: event.type,
        data: event.data,
        timestamp: Date.now(),
      };
      
      this.options.onMessage?.(message);
    };

    this.eventSource.onerror = (event) => {
      this.options.onError?.(event);
      
      if (!this.isManualClose) {
        this.handleReconnect();
      }
    };

    // cleanup function 반환
    return () => this.close();
  }

  private handleReconnect() {
    const maxAttempts = this.options.maxReconnectAttempts ?? 5;
    const interval = this.options.reconnectInterval ?? 3000;

    if (this.reconnectAttempts >= maxAttempts) {
      console.error('SSE: 최대 재연결 시도 횟수 초과');
      return;
    }

    this.reconnectAttempts++;
    
    this.reconnectTimer = setTimeout(() => {
      console.log(`SSE: 재연결 시도 ${this.reconnectAttempts}/${maxAttempts}`);
      this.connect();
    }, interval);
  }

  close() {
    this.isManualClose = true;
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    this.options.onClose?.();
  }

  get readyState() {
    return this.eventSource?.readyState ?? EventSource.CLOSED;
  }
}

/**
 * 간편한 SSE 연결 함수
 */
export function connectSSE(
  url: string,
  onEvent: (event: SSEMessage) => void,
  options?: Omit<SSEOptions, 'onMessage'>
): () => void {
  const connection = new SSEConnection(url, {
    ...options,
    onMessage: onEvent,
  });

  return connection.connect();
}

/**
 * 로그 이벤트 파싱 유틸리티
 */
export function parseLogEvent(data: string): SSELogEvent | null {
  try {
    return JSON.parse(data) as SSELogEvent;
  } catch {
    return null;
  }
}
