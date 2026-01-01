declare module 'matter-js' {
  namespace Matter {
    interface IEngine {
      world: IWorld;
      timing: ITiming;
      gravity: IGravity;
    }

    interface IWorld {
      bodies: Body[];
      gravity: IGravity;
    }

    interface IGravity {
      x: number;
      y: number;
      scale: number;
    }

    interface ITiming {
      timeScale: number;
      timestamp: number;
    }

    interface IBody {
      id: number;
      type: string;
      position: IVector;
      velocity: IVector;
      angle: number;
      angularVelocity: number;
      isStatic: boolean;
      isSensor: boolean;
      render: IRender;
    }

    interface IVector {
      x: number;
      y: number;
    }

    interface IRender {
      visible?: boolean;
      fillStyle?: string;
      strokeStyle?: string;
      lineWidth?: number;
      opacity?: number;
    }

    interface IRenderOptions {
      width: number;
      height: number;
      wireframes?: boolean;
      background?: string;
      pixelRatio?: number;
    }

    interface IMouse {
      position: IVector | null;
    }

    interface IMouseConstraint {
      body: Body | null;
      mouse: IMouse;
      constraint: IConstraint;
    }

    interface IConstraint {
      stiffness: number;
      render: IRender;
    }

    class Engine {
      world: IWorld;
      timing: ITiming;
      gravity: IGravity;
      static create(): Engine;
      static clear(engine: Engine): void;
    }

    class Render {
      canvas: HTMLCanvasElement;
      options: IRenderOptions;
      engine: Engine;
      mouse: IMouse | null;
      textures: { [key: string]: any };
      static create(options: {
        element: HTMLElement;
        engine: Engine;
        options: IRenderOptions;
      }): Render;
      static run(render: Render): void;
      static stop(render: Render): void;
      static setPixelRatio(render: Render, ratio: number): void;
    }

    class Runner {
      static create(): Runner;
      static run(runner: Runner, engine: Engine): void;
      static stop(runner: Runner): void;
      static tick(runner: Runner, engine: Engine): void;
    }

    class World {
      static add(world: IWorld, bodies: Body | Body[] | IMouseConstraint | any): void;
      static remove(world: IWorld, bodies: Body | Body[] | IMouseConstraint | any): void;
    }

    class Bodies {
      static rectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        options?: any
      ): Body;
      static circle(
        x: number,
        y: number,
        radius: number,
        options?: any
      ): Body;
      static polygon(
        x: number,
        y: number,
        sides: number,
        radius: number,
        options?: any
      ): Body;
    }

    class Mouse {
      static create(element: HTMLElement): IMouse;
    }

    class MouseConstraint {
      static create(engine: Engine, options: {
        mouse: IMouse;
        constraint: IConstraint;
      }): IMouseConstraint;
    }

    class Events {
      static on(
        object: any,
        event: string,
        callback: (event: any) => void
      ): void;
      static off(
        object: any,
        event: string,
        callback?: (event: any) => void
      ): void;
    }

    type Body = IBody;
  }

  const Matter: typeof Matter;
  export = Matter;
  export default Matter;
}

