import { useEffect, useRef, type JSX } from "react";
import { Terminal } from "xterm";
import type { IDisposable } from "xterm";
import "xterm/css/xterm.css";

type Gns3ConsoleProps = {
  host: string;
  port: number;
};

export default function Gns3Console({ host, port }: Gns3ConsoleProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const term: Terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: "#0f172a",
      },
    });

    term.open(containerRef.current);

    const ws: WebSocket = new WebSocket(`ws://localhost:3000/ws/console?host=${host}&port=${port}`);

    // מהשרת → לטרמינל
    ws.onmessage = (event: MessageEvent<string | Blob>) => {
      if (typeof event.data === "string") {
        term.write(event.data);
      } else {
        event.data.text().then((text) => term.write(text));
      }
    };

    // מהטרמינל → לשרת
    const disposable: IDisposable = term.onData((data: string) => {
      ws.send(data);
    });

    ws.onopen = (): void => {
      term.write("\r\nConnected to GNS3 console\r\n");
    };

    ws.onclose = (): void => {
      term.write("\r\nConnection closed\r\n");
    };

    return () => {
      disposable.dispose();
      ws.close();
      term.dispose();
    };
  }, [host, port]);

  return <div draggable ref={containerRef} style={{ height: "500px" }} />;
}
