declare module "mfe-auth/Auth" {
  export function mount(
    el: HTMLElement | null,
    options: Options
  ): { onParentNavigate: any };
}

declare module "mfe-patients/Patients" {
  export function mount(
    el: HTMLElement | null,
    options: Options
  ): { onParentNavigate: any };
}

declare module "mfe-dashboard/BarChart" {
  export function BarChart(): JSX.Element;
  export function mount(el: HTMLElement | null): void;
}

declare module "mfe-dashboard/SimpleLineChart" {
  export default function (): JSX.Element;
}

declare module "mfe-dashboard/SimpleRadarChart" {
  export function SimpleRadarChart(): JSX.Element;
  export function mount(el: HTMLElement | null): void;
}
