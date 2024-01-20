import {
  FC,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import type { IUseCanvasProps } from '@/common/hooks';
import { useCanvas } from '@/common/hooks';

interface ICanvasProps {
  refs?: {
    canvas?: React.RefObject<HTMLCanvasElement>;
    ctx?: React.RefObject<CanvasRenderingContext2D>;
  };
  sketch?: IUseCanvasProps;
  canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Canvas: FC<ICanvasProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasRef, ctxRef] = useCanvas({ ...props.sketch });
  const [dimentions, setDimentions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      canvasRef.current!.width = width;
      canvasRef.current!.height = height;
      setDimentions({ width, height });
    }
    props.sketch?.setup?.(ctxRef.current!);
    props.sketch?.draw?.(ctxRef.current!);
  }, [canvasRef, ctxRef, props.sketch]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      canvasRef.current!.width = width;
      canvasRef.current!.height = height;

      setDimentions({ width, height });
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, handleResize]);

  useImperativeHandle(
    props.refs?.canvas,
    () => {
      return canvasRef.current!;
    },
    [canvasRef]
  );

  useImperativeHandle(
    props.refs?.ctx,
    () => {
      return ctxRef.current!;
    },
    [ctxRef]
  );

  return (
    <div ref={containerRef} {...props.containerProps}>
      <canvas
        ref={canvasRef}
        {...props.canvasProps}
        width={dimentions.width}
        height={dimentions.height}
      />
    </div>
  );
};
