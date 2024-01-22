import {
  FC,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import type { IUseCanvasProps } from '@/common/hooks';
import { useCanvas } from '@/common/hooks';
import useResizeObserver from '@/common/hooks/useResizeObserver/UseResizeObserver';

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
  const [canvasRef, ctxRef] = useCanvas({ ...props.sketch });
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

  const containerRef = useResizeObserver<HTMLDivElement>(handleResize);

  const [dimentions, setDimentions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      canvasRef.current!.width = width;
      canvasRef.current!.height = height;

      setDimentions({ width, height });
      containerRef.current.addEventListener('resize', handleResize);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
