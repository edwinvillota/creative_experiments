import { Shader } from '@/components/molecules/Shader';

export const Shaders = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="aspect-square h-[550px] border">
        <Shader />
      </div>
    </div>
  );
};
