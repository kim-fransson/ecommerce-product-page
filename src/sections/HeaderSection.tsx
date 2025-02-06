import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { Menu, ShoppingCart } from "lucide-react";

import Logo from "../../src/assets/svg/logo.svg";
import AvatarImg from "../../src/assets/images/image-avatar.png";

import { useCartStore } from "@/stores";

const links = ["Collections", "Men", "Women", "About", "Contact"];

function HeaderSection() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const hasItems = totalItems !== 0;

  return (
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
  );
}

export default HeaderSection;
