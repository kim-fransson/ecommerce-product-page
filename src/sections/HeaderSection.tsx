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

import { Menu, ShoppingCart, Trash } from "lucide-react";

import Logo from "../../src/assets/svg/logo.svg";
import AvatarImg from "../../src/assets/images/image-avatar.png";

import { useCartStore } from "@/stores";

const links = ["Collections", "Men", "Women", "About", "Contact"];

function HeaderSection() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const handleRemoveItemFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const cartItem = useCartStore((state) => state.cart[0]);
  const hasItems = totalItems !== 0;

  return (
    <header className="flex items-center p-4 gap-4 lg:gap-8 sticky lg:static top-0 z-50 bg-white/95 backdrop-blur-sm lg:border-b">
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
        <PopoverContent className="w-[calc(100dvw-1rem)] mx-2 my-6 lg:min-w-[22rem] lg:w-auto">
          <h2 className="font-bold">Cart</h2>
          <Separator className="my-2" />
          <div className="flex items-center justify-center min-h-44 border-none">
            {hasItems ? (
              <div className="grid gap-5 w-full">
                <div className="grid gap-4 grid-cols-[auto_1fr_auto] items-center">
                  <img
                    src={cartItem.product.images[0].thumbnail}
                    alt=""
                    className="object-cover rounded max-w-12"
                  />
                  <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                    <span className="col-span-full capitalize text-sm font-semibold opacity-50">
                      {cartItem.product.name}
                    </span>
                    <span className="opacity-50">{`$${(
                      cartItem.product.price * cartItem.product.discount
                    ).toFixed(2)} x ${cartItem.quantity}`}</span>

                    <strong className="justify-self-start">
                      {`$${(
                        cartItem.product.price *
                        cartItem.product.discount *
                        cartItem.quantity
                      ).toFixed(2)}`}
                    </strong>
                  </div>
                  <Button
                    onClick={() =>
                      handleRemoveItemFromCart(cartItem.product.id)
                    }
                    className="justify-self-end"
                    size="icon"
                    variant="ghost"
                  >
                    <Trash />
                  </Button>
                </div>
                <Button size="lg">Checkout</Button>
              </div>
            ) : (
              <strong className="opacity-50">Your cart is empty.</strong>
            )}
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
