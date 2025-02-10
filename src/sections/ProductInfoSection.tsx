import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Minus, Plus, ShoppingCart } from "lucide-react";

import Image1 from "../assets/images/image-product-1.jpg";
import Image1Thumbnail from "../assets/images/image-product-1-thumbnail.jpg";
import Image2 from "../assets/images/image-product-2.jpg";
import Image2Thumbnail from "../assets/images/image-product-2-thumbnail.jpg";
import Image3 from "../assets/images/image-product-3.jpg";
import Image3Thumbnail from "../assets/images/image-product-3-thumbnail.jpg";
import Image4 from "../assets/images/image-product-4.jpg";
import Image4Thumbnail from "../assets/images/image-product-4-thumbnail.jpg";
import { useCartStore } from "@/stores";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const product = {
  id: 1,
  brand: "sneaker company",
  name: "fall limited edition sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
  discount: 0.5,
  price: 250.0,
  images: [
    { original: Image1, thumbnail: Image1Thumbnail },
    { original: Image2, thumbnail: Image2Thumbnail },
    { original: Image3, thumbnail: Image3Thumbnail },
    { original: Image4, thumbnail: Image4Thumbnail },
  ],
};

function ProductInfoSection() {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(product.images[0].original);
  const incrementQuantity = () => setQuantity((prev) => ++prev);
  const decrementQuantity = () => setQuantity((prev) => --prev);

  const handleAddProductToCart = useCartStore((state) => state.addToCart);
  return (
    <section className="lg:grid lg:grid-cols-2 lg:h-full lg:items-center lg:p-12 lg:gap-28">
      <h1 className="sr-only">{product.name}</h1>
      <section>
        <h2 className="sr-only">image carousel</h2>
        <Carousel opts={{ loop: true }} className="w-full lg:hidden relative">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={5 / 4}>
                  <img
                    src={img.original}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>

        <div className="max-w-[440px] mx-auto hidden lg:grid gap-8">
          <Dialog>
            <DialogTrigger className="w-full focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-2 rounded-2xl">
              <AspectRatio ratio={1 / 1}>
                <img
                  src={currentImage}
                  className="rounded-2xl h-full w-full object-cover"
                />
              </AspectRatio>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <ToggleGroup
            type="single"
            className="justify-between"
            onValueChange={setCurrentImage}
            defaultValue={currentImage}
          >
            {product.images.map((image, index) => (
              <ToggleGroupItem
                key={index}
                value={image.original}
                aria-label={`Thumbnail ${index + 1}`}
              >
                <img
                  src={image.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="max-w-24"
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </section>

      <section>
        <h2 className="sr-only">product information</h2>
        <article className="grid p-6 gap-4 lg:gap-8">
          <span className="uppercase text-xs lg:text-sm tracking-widest opacity-50 font-bold">
            {product.brand}
          </span>
          <span className="capitalize text-3xl lg:text-5xl font-extrabold">
            {product.name}
          </span>
          <p className="opacity-50 lg:text-lg">{product.description}</p>
          <div className="grid grid-cols-[auto_auto_1fr] lg:grid-cols-[auto_1fr] gap-4 items-center">
            <strong className="text-3xl">
              ${(product.price * product.discount).toFixed(2)}
            </strong>
            <Badge className="lg:justify-self-start">
              {product.discount * 100 + "%"}
            </Badge>
            <del className="justify-self-end lg:justify-self-start font-bold opacity-50">
              ${product.price.toFixed(2)}
            </del>
          </div>

          <div className="grid lg:flex gap-4">
            <div className="flex">
              <Button
                disabled={quantity === 0}
                onClick={decrementQuantity}
                size="lg"
                variant="secondary"
                className="rounded-none rounded-l-full z-10 shadow-none"
              >
                <Minus />
                <span className="sr-only">Decrement amount</span>
              </Button>
              <div className="rounded-none h-10 font-bold flex items-center justify-center bg-secondary text-secondary-foreground w-full">
                {quantity}
              </div>
              <Button
                onClick={incrementQuantity}
                size="lg"
                variant="secondary"
                className="rounded-none rounded-r-full z-10 shadow-none"
              >
                <Plus />
                <span className="sr-only">Increment amount</span>
              </Button>
            </div>
            <Button
              disabled={quantity === 0}
              onClick={() => handleAddProductToCart(product, quantity)}
              size="lg"
              className="focus-visible:ring-offset-2 lg:flex-1"
            >
              <ShoppingCart />
              Add to cart
            </Button>
          </div>
        </article>
      </section>
    </section>
  );
}

export default ProductInfoSection;
