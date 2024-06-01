import { Avatar, AvatarFallback } from "../ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface Testimonial {
  name: string;
  testimonial: string;
  imageUrl: string;
  title: string;
}

const testimonialExample: Testimonial[] = [
  {
    name: "Sarah Johnson",
    testimonial: "The customer service I received was exceptional. The support team went above and beyond to address my concerns.",
    imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    title: "Marketing Manager, Acme Inc.",
  },
  {
    name: "Emily Parker",
    testimonial:
      "The platform has been a game-changer for our team. The automation and collaboration features have streamlined our workflow and       helped us ship features faster.",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    title: "Software Engineer, Acme Inc.",
  },
  {
    name: "Alan Smith",
    testimonial:
      "The platform has been a game-changer for our team. The automation and collaboration features have streamlined our workflow and       helped us ship features faster.",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    title: "Product Manager, Acme Inc.",
  },
];

export function Testimonials() {
  return (
    <div className="mx-auto max-w-2xl py-12 md:py-16 lg:py-20">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400">Hear from the people who love our product.</p>
      </div>
      <div className="mt-10">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {" "}
            {testimonialExample.map(testimonial => (
              <CarouselItem>
                <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:gap-8">
                  <Avatar className="h-16 w-16 border">
                    <img src={testimonial.imageUrl} alt={testimonial.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{testimonial.title}.</p>
                    <p className="text-lg leading-relaxed">{testimonial.testimonial}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
