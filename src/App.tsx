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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./components/ui/button";
import { useCartStore } from "./stores";
import { Separator } from "./components/ui/separator";

const links = ["Collections", "Men", "Women", "About", "Contact"];

function App() {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="max-w-screen-xl mx-auto">
      <header className="flex items-center p-4 gap-2 lg:gap-8">
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
                <Button key={index} variant="link" disabled>
                  {link}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <img className="mb-1" src={Logo} alt="sneakers" />

        <ul className="lg:flex hidden">
          {links.map((link, index) => (
            <li>
              <Button key={index} variant="link" disabled>
                {link}
              </Button>
            </li>
          ))}
        </ul>

        <Popover>
          <PopoverTrigger className="ml-auto" asChild>
            <Button variant="ghost" size="icon">
              <img src={Cart} alt="" />
              <span className="sr-only">Open shopping cart</span>
            </Button>
          </PopoverTrigger>
          <PopoverTrigger className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ring-offset-background rounded-full">
            <Avatar>
              <AvatarImage src={AvatarImg} alt="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="sr-only">Open shopping cart</span>
          </PopoverTrigger>
          <PopoverContent>
            <h2>Cart</h2>
            <Separator className="my-2" />
            <div className="flex items-center justify-center min-h-32">
              {cart.length === 0 ? <strong>Your cart is empty.</strong> : ""}
            </div>
          </PopoverContent>
        </Popover>
      </header>
    </div>
  );
}

export default App;
