import Logo from "../src/assets/svg/logo.svg";

import AvatarImg from "../src/assets/images/image-avatar.png";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./components/ui/button";
import { useCartStore } from "./stores";
import { Separator } from "./components/ui/separator";
import { Badge } from "./components/ui/badge";

import Image1 from "./assets/images/image-product-1.jpg";
// import Image1Thumbnail from "./assets/images/image-product-1-thumbnail.jpg";

import Image2 from "./assets/images/image-product-2.jpg";
// import Image2Thumbnail from "./assets/images/image-product-2-thumbnail.jpg";

import Image3 from "./assets/images/image-product-3.jpg";
// import Image3Thumbnail from "./assets/images/image-product-3-thumbnail.jpg";

import Image4 from "./assets/images/image-product-4.jpg";
// import Image4Thumbnail from "./assets/images/image-product-4-thumbnail.jpg";
import { AspectRatio } from "./components/ui/aspect-ratio";
import { Menu, Minus, Plus, ShoppingCart } from "lucide-react";
import { Input } from "./components/ui/input";

const images = [Image1, Image2, Image3, Image4];
// const thumbnails = [
//   Image1Thumbnail,
//   Image2Thumbnail,
//   Image3Thumbnail,
//   Image4Thumbnail,
// ];

const product: Product = {
  id: 1,
  brand: "sneaker company",
  name: "fall limited edition sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  discount: 0.5,
  price: 250.0,
};

const links = ["Collections", "Men", "Women", "About", "Contact"];

function App() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const hasItems = totalItems !== 0;

  return (
    <div className="max-w-screen-xl mx-auto grid grid-rows-[auto_1fr] min-h-screen">
      <header className="flex items-center p-4 gap-4 lg:gap-8">
        <Sheet>
          <SheetTrigger className="lg:hidden" asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col h-full items-center justify-center">
              {links.map((link, index) => (
                <Button key={index} variant="link" size="menu" disabled>
                  {link}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <img className="mb-1" src={Logo} alt="sneakers" />

        <ul className="lg:flex hidden">
          {links.map((link, index) => (
            <li key={index}>
              <Button variant="link" disabled>
                {link}
              </Button>
            </li>
          ))}
        </ul>

        <Popover>
          <PopoverTrigger className="ml-auto" asChild>
            <Button variant="ghost" size="icon">
              <div className="relative">
                <ShoppingCart />
                {hasItems && (
                  <Badge className="absolute top-1/2 right-1/2 -translate-y-full translate-x-full">
                    {totalItems}
                  </Badge>
                )}
              </div>
              <span className="sr-only">Open shopping cart</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Cart</h2>
            <Separator className="my-2" />
            <div className="flex items-center justify-center min-h-32">
              {hasItems ? "" : <strong>Your cart is empty.</strong>}
            </div>
          </PopoverContent>
        </Popover>
        <Avatar>
          <AvatarImage src={AvatarImg} alt="" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>
      <main>
        <h1 className="sr-only">{product.name}</h1>
        <section>
          <h2 className="sr-only">image carousel</h2>
          <Carousel opts={{ loop: true }} className="w-full lg:hidden relative">
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={5 / 4}>
                    <img src={img} alt="" />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
          </Carousel>
        </section>

        <section>
          <h2 className="sr-only">product information</h2>
          <article className="grid p-6 gap-4">
            <span className="uppercase text-xs tracking-widest opacity-50 font-bold">
              {product.brand}
            </span>
            <span className="capitalize text-3xl font-extrabold">
              {product.name}
            </span>
            <p className="opacity-50">{product.description}</p>
            <div className="grid grid-cols-[auto_auto_1fr] gap-4 items-center">
              <strong className="text-3xl">
                ${(product.price * product.discount).toFixed(2)}
              </strong>
              <Badge>{product.discount * 100 + "%"}</Badge>
              <del className="justify-self-end font-bold opacity-50">
                ${product.price.toFixed(2)}
              </del>
            </div>

            <div className="grid gap-4">
              <div className="flex">
                <Button
                  variant="secondary"
                  className="rounded-none rounded-l-full"
                >
                  <Minus />
                  <span className="sr-only">Decrement amount</span>
                </Button>
                <Input
                  className="rounded-none font-bold border-none bg-secondary text-secondary-foreground text-center"
                  readOnly
                  value={0}
                />
                <Button
                  variant="secondary"
                  className="rounded-none rounded-r-full"
                >
                  <Plus />
                  <span className="sr-only">Increment amount</span>
                </Button>
              </div>
              <Button>
                <ShoppingCart />
                Add to cart
              </Button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
