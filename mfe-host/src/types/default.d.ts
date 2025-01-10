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

declare module "mfe-dashboard/LineChart" {
  export function mount(el: HTMLElement | null): void;
}

declare module "mfe-dashboard/ServicesTable" {
  export function mount(el: HTMLElement | null): void;
}
