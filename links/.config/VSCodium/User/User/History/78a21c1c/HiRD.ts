import ServerMonitoringDAO from '../db/ServerMonitoringDAO';

export async function monitorServers() {
  const servers = await ServerMonitoringDAO.getAllMonitoredServers();

  for (const server of servers) {
    if (!server.publicUrl || !server.id)return;
    const isOnline = await checkServerStatus(server.publicUrl);
    // Insert data into the database
    await ServerMonitoringDAO.createServerMonitoring(server.id, isOnline);
  }
}

const checkServerStatus = async(url: string) => {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
    });
    return res.status === 200;
  } catch {
    return false;
  }
}


import { PerformanceObserver, performance } from 'node:perf_hooks';

export class UptimeRequest {
  name: string;
  method: string;
  url: string;
  timeout: number;
  expectedResponse: number;
  actualResponse: number | null;
  response: Response | null;
  timestamp: Date | null;
  performance: PerformanceEntry | null;
  error: { [key: string]: any } | null;
  hasTimedOut: boolean | null;
  constructor({
    name,
    method,
    url,
    timeout,
    response
  }: {
    name: string;
    method: string;
    url: string;
    timeout: number;
    response: number;
  }) {
    // config
    this.name = name;
    this.method = method;
    this.url = url;
    this.timeout = timeout;
    this.expectedResponse = response;
    this.actualResponse = null;

    // results / measurements
    this.response = null;
    this.timestamp = null;
    this.performance = null;
    this.error = null;
    this.hasTimedOut = null;
    this.response = null;
  }

  async fire() {
    this.timestamp = new Date();

    // prepare performance measures
    // see https://nodejs.org/api/perf_hooks.html#performanceentryduration
    const observer = new PerformanceObserver((items) => {
      items.getEntries().forEach((entry) => {
        this.performance = entry;
      });
    });
    observer.observe({ entryTypes: ['measure'] });

    const start = `${this.name} - start`;
    const ended = `${this.name} - ended`;
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      this.hasTimedOut = true;
      controller.abort();
    }, this.timeout);

    try {
      performance.mark(start);
      this.response = await fetch(this.url, {
        method: this.method,
        priority: 'high',
        redirect: 'error',
        signal: controller.signal
      });
    } catch (error) {
      this.error = error as Error;
    } finally {
      performance.mark(ended);
      clearTimeout(timeout);
      performance.measure(this.url, start, ended);
      observer.disconnect();
    }

    this.actualResponse = this.response?.status || null;

    // post checkup
    if (!this.error && this?.response?.status !== this.expectedResponse) {
      this.error = new Error('Response code mismatch');
    }

    // normalize error
    if (this.error) {
      const error: { [key: string]: any } = {};
      Object.getOwnPropertyNames(this.error).forEach((prop) => {
        if (this.error) {
          error[prop] = this.error[prop];
        }
      });
      delete error.stack;
      this.error = error;
    }
  }

  toDocument() {
    // here we will return results that matter
  }
}
