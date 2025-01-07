import { cn, cva } from "../../utils/style";

const PriceCard = ({ children }: any) => {
  return (
    <div className="size-full rounded-md bg-secondary-100 flex flex-col items-center p-12 gap-2">
      {children}
    </div>
  );
};

const buttonVariance = cva(
  "px-4 py-2 bg-primary text-text-900 rounded-md font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary-500",
        secondary: "bg-secondary-200",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

const Button = ({ children, className, variant = "primary" }: any) => {
  return (
    <button className={cn(buttonVariance({ variant }), className)}>
      {children}
    </button>
  );
};

const Home = () => {
  return (
    <div className="size-full px-[15%] ">
      <div className="h-[45%] flex">
        <div id="hero" className="flex flex-col justify-center gap-4">
          <h1 id="hero-text">
            Visualize Your <br /> Colors & Fonts <br />
            On a Real Site
          </h1>
          <div className="flex gap-4">
            <Button variant="secondary">How does it work?</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
      <div
        id="plans-and-price"
        className="h-[60%] flex flex-col items-center py-2 gap-4"
      >
        <h2>Plans and Prices</h2>
        <div>Some description</div>
        <div className="size-full flex gap-20">
          <PriceCard>
            <h3>Basic</h3>
            <div>Free</div>
            <div className="w-full flex flex-col gap-2 items-start">
              <div>Some description</div>
              <div>Price: $10</div>
            </div>
            <Button className="mt-auto">Buy</Button>
          </PriceCard>
          <PriceCard>
            <h3>Basic</h3>
            <div>Free</div>
            <div className="w-full flex flex-col gap-2 items-start">
              <div>Some description</div>
              <div>Price: $10</div>
            </div>
            <Button className="mt-auto">Buy</Button>
          </PriceCard>
          <PriceCard>
            <h3>Basic</h3>
            <div>Free</div>
            <div className="w-full flex flex-col gap-2 items-start">
              <div>Some description</div>
              <div>Price: $10</div>
            </div>
            <Button className="mt-auto">Buy</Button>
          </PriceCard>
        </div>
      </div>
      <footer className=" h-[40%] bg-text-900/15 text-text-100 p-4 rounded-md"></footer>
    </div>
  );
};

export default Home;
