import Logo from "../src/assets/svg/logo.svg";
import Menu from "../src/assets/svg/icon-menu.svg";
import Cart from "../src/assets/svg/icon-cart.svg";

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

const images = [Image1, Image2, Image3, Image4];
// const thumbnails = [
//   Image1Thumbnail,
//   Image2Thumbnail,
//   Image3Thumbnail,
//   Image4Thumbnail,
// ];

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
              <img src={Menu} alt="" />
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
                <img src={Cart} alt="" />
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
        <Carousel opts={{ loop: true }} className="w-full lg:hidden relative">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={3 / 2}>
                  <img src={img} alt="" />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
      </main>
    </div>
  );
}

export default App;
