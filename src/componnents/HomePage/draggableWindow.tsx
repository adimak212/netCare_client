import React, { useEffect, useMemo, useRef, useState, type JSX } from "react";

type DraggableWindowProps = {
  title: string;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  onClose?: () => void;
  children: React.ReactNode;
};

type Point = { x: number; y: number };

export default function DraggableWindow({
  title,
  initialX = 80,
  initialY = 80,
  width = 720,
  height = 420,
  onClose,
  children,
}: DraggableWindowProps): JSX.Element {
  const [pos, setPos] = useState<Point>({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState<boolean>(false);

  const startMouse = useRef<Point | null>(null);
  const startPos = useRef<Point | null>(null);

  const style = useMemo<React.CSSProperties>(
    () => ({
      position: "fixed",
      left: pos.x,
      top: pos.y,
      width,
      height,
      background: "#0b1220",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 12,
      boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
      overflow: "hidden",
      zIndex: 9999,
    }),
    [pos.x, pos.y, width, height],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent): void => {
      if (!startMouse.current || !startPos.current) return;
      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      const nextX = startPos.current.x + dx;
      const nextY = startPos.current.y + dy;

      // לשמור את החלון בתוך המסך (רשות)
      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - height;

      setPos({
        x: Math.max(0, Math.min(maxX, nextX)),
        y: Math.max(0, Math.min(maxY, nextY)),
      });
    };

    const onUp = (): void => {
      setDragging(false);
      startMouse.current = null;
      startPos.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, width, height]);

  const onMouseDownHeader = (e: React.MouseEvent<HTMLDivElement>): void => {
    setDragging(true);
    startMouse.current = { x: e.clientX, y: e.clientY };
    startPos.current = { ...pos };
  };

  return (
    <div style={style}>
      <div
        onMouseDown={onMouseDownHeader}
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          cursor: "grab",
          userSelect: "none",
          background: "rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div style={{ height: `calc(100% - 44px)` }}>{children}</div>
    </div>
  );
}